import { getDbConnection } from "../db/index.js";
import { userSchema } from "../db/schema.js";
import { eq } from "drizzle-orm";

export class AuthService {

    private static db = getDbConnection()

    public static async getUserById(id: number) {
        return (await this.db).select().from(userSchema)
    }
    public static async getAllUsers() {
        return (await this.db).select().from(userSchema)
    }
    public static async createUser() {
        return (await this.db).insert(userSchema)
    }
}