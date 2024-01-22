// schema.js
import { mysqlTable, varchar, datetime } from "drizzle-orm/mysql-core";

export const userTable = mysqlTable("users", {
	id: varchar("id", {
		length: 255 
	}).primaryKey(),
	username: varchar("username", {
		length: 255
	}),
	email: varchar("email", {
		length: 255
	}),
	hashedPassword: varchar("hashed_password", {
		length: 255
	})
});
export type SelectUser = typeof userTable.$inferSelect;


export const sessionTable = mysqlTable("session", {
	id: varchar("id", {
		length: 255
	}).primaryKey(),
	userId: varchar("user_id", {
		length: 255
	})
		.notNull()
		.references(() => userTable.id),
	expiresAt: datetime("expires_at").notNull()
});
