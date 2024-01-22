import express from 'express'
import "reflect-metadata"
import {  useExpressServer } from 'routing-controllers';
import AuthController from 'auth/index.js';
import cookieParser from "cookie-parser"
const app = express()
const port = 3000

app.use(cookieParser())
app.use(express.json())
useExpressServer(app, {
    controllers: [AuthController]
})

async function bootstrap() {
    app.listen(port, () => {
        console.log(`localhost:${port}`)
    })
}
bootstrap()