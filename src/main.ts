import auth from 'auth/index.js';
import { getDbConnection } from 'db/index.js';
import express from 'express'
import {useExpressServer} from 'routing-controllers';
const app = express()
const port = 3000


useExpressServer(app,{
    controllers:[auth]
})

async function bootstrap() {
    await getDbConnection()
    app.listen(port, () => {
        console.log(`localhost:${port}`)
    })
}
bootstrap()