import { db,connection } from "../db/index.js";
import { migrate } from 'drizzle-orm/mysql2/migrator';
(async () => {

    await migrate(db, { migrationsFolder: 'drizzle' });
    await connection.end()
})()

