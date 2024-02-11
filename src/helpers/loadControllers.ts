import { Express } from "express";
import { useExpressServer } from 'routing-controllers';
import { glob} from 'glob'
export default async function loadRoutes(app: Express) {
    const controllersPaths = await glob('**/*controller.{ts,js}', { ignore: 'node_modules/**' });
    const controllers = await Promise.all(controllersPaths.map(async (controllerPath) => {
        return (await import( "../../" +controllerPath.replace("ts", "js").replaceAll("\\", "/"))).default;
    }));
    useExpressServer(app, {
        controllers: controllers
    })
}

