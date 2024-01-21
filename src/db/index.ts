import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { WinstonLogger } from "./logger.js";
import { config } from "dotenv";
import { getEnv } from "helpers/env.js";
config()
export let connection= mysql.createPool(getEnv("DATABASE_URL") as string);;
export const db = drizzle(connection, { logger: new WinstonLogger() });

