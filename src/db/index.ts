import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { WinstonLogger } from "./logger.js";
import { config } from "dotenv";
config()
export let connection: mysql.Connection;

async function getDbConnection() {
    if (!connection) {
        connection = await mysql.createConnection(process.env["DATABASE_URL"] as string);
    }

    return drizzle(connection,{logger:new WinstonLogger()});
}

export { getDbConnection };

