import express from 'express'
import "reflect-metadata"
import cookieParser from "cookie-parser"
import loadControllers from './helpers/loadControllers.js';
import cors from "cors"
import { getEnv } from 'helpers/env.js';

const app = express()
const port = getEnv("PORT") || 3000

app.use(cors({ credentials: true, origin: getEnv("FRONTEND_URL") || "*" }))
app.use(cookieParser())
app.use(express.json())


async function bootstrap() {
    await loadControllers(app)
    app.listen(port, () => {
        console.log(`localhost:${port}`)
    })
}
bootstrap()