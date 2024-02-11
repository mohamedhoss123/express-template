// lucia.ts
import { Lucia } from "lucia";

import { db } from "../db/index.js";
import { DrizzleMySQLAdapter } from "@lucia-auth/adapter-drizzle";
import { sessionTable,userTable } from "db/schema.js";

const adapter = new DrizzleMySQLAdapter(db, sessionTable, userTable);

export const auth = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			// set to `true` when using HTTPS
			secure: process.env.NODE_ENV === "production"
		}
	}
});



declare module "lucia" {
	interface Register {
		Lucia: typeof auth;
	}
}
