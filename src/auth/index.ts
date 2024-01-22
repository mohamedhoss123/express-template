import { Body, Controller, Get, HttpCode, Post, Req, Res, UseBefore } from "routing-controllers";
import { CreateUser, TCreateUser } from "./dto/create-user.js";
import { ValidationFactory } from "../helpers/zodFactory.js";
import { LoginUser, TLoginUser } from "./dto/login-user.js";
import { Response,Request } from "express";
import AuthService from "./service.js";
import { Argon2id } from "oslo/password";
import { serializeCookie } from "oslo/cookie";
import { auth } from "./lucia.js";


@Controller("/auth", { transformRequest: false, transformResponse: false })
export default class AuthController {
    @Post("/login")
    @UseBefore(ValidationFactory(LoginUser))
    async login(@Body() body: TLoginUser, @Res() res: Response) {
        const user = (await AuthService.getUserByEmail(body.email))[0]
        const vali = await (new Argon2id().verify(user.hashedPassword || "", body.password))
        if (vali) {
            const session = await AuthService.craeteSession(user.id)
            res.setHeader("Set-Cookie", serializeCookie("sid", session.id, {
                httpOnly: true,
                maxAge: 3600 * 24 * 30,
                sameSite: 'lax',
                expires: new Date(),
            }))
            res.status(200)
            return "ok"
        }
        res.status(400)
        return "Bad Request"
    }

    @Get("/validate")
    async validate(@Req() req: Request, @Res() res: Response) {
        const sessionCookie = req.cookies["sid"]
        res.status(401)
        if (sessionCookie) {
            console.log(await auth.validateSession(sessionCookie));
            res.status(await auth.validateSession(sessionCookie) ? 200 : 401)
        }
        return ""

    }
    @UseBefore(ValidationFactory(CreateUser))
    @Post("/register")
    @HttpCode(201)
    async register(@Body() body: TCreateUser) {
        await AuthService.createUser(body) as any;
        return "ok"
    }
}
