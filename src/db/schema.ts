// schema.js
import { mysqlTable, bigint, varchar } from "drizzle-orm/mysql-core";

export const userSchema = mysqlTable("users", {
	id: varchar("id", {
		length: 15 // change this when using custom user ids
	}).primaryKey()
	// other user attributes
});

export const keySchema = mysqlTable("keys", {
	id: varchar("id", {
		length: 255
	}).primaryKey(),
	userId: varchar("user_id", {
		length: 15
	})
		.notNull()
		.references(() => userSchema.id),
	hashedPassword: varchar("hashed_password", {
		length: 255
	})
});

export const sessionSchema = mysqlTable("sessions", {
	id: varchar("id", {
		length: 128
	}).primaryKey(),
	userId: varchar("user_id", {
		length: 15
	})
		.notNull()
		.references(() => userSchema.id),
	activeExpires: bigint("active_expires", {
		mode: "number"
	}).notNull(),
	idleExpires: bigint("idle_expires", {
		mode: "number"
	}).notNull()
});