import { getDbConnection } from "db/index.js";
import { userSchema } from "db/schema.js";
import { Body, Controller, Get, Post, QueryParams } from "routing-controllers";

@Controller("/auth", {transformRequest: false, transformResponse: false})
export default class {
    @Get()
    async test(){
        let db = await getDbConnection()
        console.log(await db.select().from(userSchema));
        return "hellow form auth"
    }
}