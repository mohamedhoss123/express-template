import { db } from "db/index.js";
import { Body, Controller, Get, Post, QueryParams, Req, Res, UseBefore } from "routing-controllers";

import { CreateUser, TCreateUser } from "./dto/create-user.js";
import { ValidationFactory } from "helpers/zodFactory.js";

import { TLoginUser } from "./dto/login-user.js";
import { Response } from "express";
import AuthService from "./service.js";

@Controller("/auth", { transformRequest: false, transformResponse: false })
export default class AuthController {
    @Post("/login")
    async login(@Body() body: TLoginUser, @Res() res: Response, @Req() req: Request) {

    }

    @UseBefore(ValidationFactory(CreateUser))
    @Post("/register")
    async register(@Body() body: TCreateUser) {
        await AuthService.createUser(body) as any;
        return "ok"
    }
}
