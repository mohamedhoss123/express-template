import { db } from "../db/index.js";
import { sessionTable, userTable } from "../db/schema.js";

import { TCreateUser } from "./dto/create-user.js";
import { Argon2id } from "oslo/password";
import { ulid } from 'ulid'
import { auth } from "./lucia.js";
import { uuid } from "drizzle-orm/pg-core";


export class AuthService {

    public static async createUser(paylod: TCreateUser) {
        let { password, ...body } = paylod
        const hashedPassword = await new Argon2id().hash(password)
        return db.insert(userTable).values({ id: ulid(), hashedPassword, ...body })
    }
    public static craeteSession(userid: string) {
        return auth.createSession(userid, {}, { sessionId: ulid() })
    }
}