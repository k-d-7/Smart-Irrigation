import {NextFunction, Request, Response} from 'express';
import AuthService from '@services/auth.service';
import { CreateUserParams, LoginUserParams } from '@params/params';

export default class AuthController {
    public authService = new AuthService();

    public signup = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const params: CreateUserParams = req.body;
            const user = await this.authService.signup(params);
            res.status(201).json({data: user, message: 'Register successfully'});
        } catch (error) {
            next(error);
        }
    }

    public login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const auth: LoginUserParams = req.body;
            const {cookie, oneUser} = await this.authService.login(auth);
            res.cookie('meFund', cookie);
            res.status(200).json({data: oneUser, message: 'Login successfully'});
        } catch (error) {
            next(error);
        }
    }

    public logout = async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.clearCookie('meFund');
            res.status(200).json({ message: 'logout successfully' });
        } catch (error) {
            next(error);
        }
    }
}
