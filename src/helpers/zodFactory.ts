import { NextFunction, Request, Response } from 'express';
import { ExpressMiddlewareInterface } from 'routing-controllers';
import { ZodSchema } from 'zod';
// this function helps

export function ValidationFactory(ZodSchema:ZodSchema<any>){
    return class implements ExpressMiddlewareInterface {
        use(req: Request, res: Response, next: NextFunction): any {
            const result = ZodSchema
                .safeParse(req.body);
    
            if (!result.success) {
                res.send(result.error.flatten());
                return
            }
            next();
        }
    }
}