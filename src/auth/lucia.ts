// lucia.ts
import { lucia } from "lucia";
import { mysql2 } from "@lucia-auth/adapter-mysql";

import { connection } from "../db/index.js";
import { express } from "lucia/middleware";

export const auth = lucia({
    middleware: express(),
    adapter: mysql2(connection, {
        key: "users",
        user: "keys",
        session: "sessions"
    }),
    env: "DEV"
});