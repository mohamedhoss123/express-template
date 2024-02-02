import { Express } from "express";
import { useExpressServer } from 'routing-controllers';
import { glob} from 'glob'

export default async function loadRoutes(app: Express) {
    const controllers = await glob('**/*controller.{ts,js}', { ignore: 'node_modules/**' });
    for (let i = 0; i < controllers.length; i++) {
        const m = "../../" + controllers[i].replace("ts", "js").replaceAll("\\", "/")
        controllers[i] = (await import(m)).default
    }
    useExpressServer(app, {
        controllers: [...controllers]
    })
}

