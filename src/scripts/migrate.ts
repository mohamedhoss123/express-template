import { getDbConnection,connection } from "../db/index.js";
import { migrate } from 'drizzle-orm/mysql2/migrator';
(async() => {
    let drizzle = await getDbConnection()
    await migrate(drizzle, { migrationsFolder: 'drizzle' });
    connection.destroy()
})()

