import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '@utils/jwt';
import { TokenExpiredError } from 'jsonwebtoken';

export class AuthMiddleware {
    public async authenticateJWT(req: Request, res: Response, next: NextFunction) {
        try {
            const token = req.cookies.meFund.split('Authorization=')[1].split(';')[0];
            if (!token) {
                return res.status(401).json({ message: 'Invalid token' });
            }

            const decoded = await verifyToken(token);
            if (!decoded) {
                return res.status(401).json({ message: 'Unauthorized, please login' });
            }

            const id = decoded.id;
            if (!id) {
                return res.status(401).json({ message: 'Unauthorized, please login' });
            }
            req.body.userId = id;
            next();
        } catch (error) {
            if (error instanceof TokenExpiredError) {
                return res.status(401).json({ message: 'Token expired, please login again' });
            }
            return res.status(401).json({ message: 'Unauthorized, please login' });
        }
    }
}