import { logger } from '@utils/logger';
import { NextFunction, Request, Response } from 'express';

export class LoggerMiddleware {
    public async log(req: Request, res: Response, next: NextFunction) {
        try {  
            logger.info(
                `[${req.method}] ${req.path} >> StatusCode:: ${res.statusCode}`
            );
            next();
        } catch(error) {
            logger.debug(
                `[${req.method}] ${req.path} >> StatusCode:: ${res.statusCode}`
            );
            next(error);
        }
    }
}
