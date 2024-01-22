import { db } from "../db/index.js";
import { SelectUser, userTable } from "../db/schema.js";

import { TCreateUser } from "./dto/create-user.js";
import { Argon2id } from "oslo/password";
import { ulid } from 'ulid'
import { auth } from "./lucia.js";
import { sql } from "drizzle-orm";


class AuthService {
    public async createUser(paylod: TCreateUser) {
        let { password, ...body } = paylod
        const hashedPassword = await new Argon2id().hash(password)
        return db.insert(userTable).values({ id: ulid(), hashedPassword, ...body })
    }

    public craeteSession(useremail: string) {
        return auth.createSession(useremail, {}, { sessionId: ulid() })
    }

    public getUserByEmail(email: string) : Promise<SelectUser[]>{
        return db.select().from(userTable)
        .where(sql`${userTable.email} = ${email}`) as any
    }

}

export default new AuthService()