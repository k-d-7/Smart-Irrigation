import {Auth, TokenPayload} from '@interfaces/auth.interface';
import {IUser} from '@interfaces/user.interface';
import {hash, compare} from 'bcrypt';
import User from '@models/user.model';
import { CreateUserParams, LoginUserParams } from '@params/params';
import { isEmpty } from '@utils/validate';
import { generateToken } from '@utils/jwt';
import { generateCookie } from '@utils/cookie';

export default class AuthService {
    public async signup(params: CreateUserParams): Promise<IUser> {
        if (isEmpty(params)) {
            throw new Error('Missing params');
        }

        const user = await User.findOne({phone: params.phone});
        if (user) {
            throw new Error('User already exists');
        }

        const hashed = await hash(params.password, 10);
        const newUser = new User({
            phone: params.phone,
            password: hashed,
        });

        // can use token with email here, but too lazy to implement LOL

        return newUser.save();
    }

    public async login(auth: LoginUserParams): Promise<{cookie: string; oneUser: IUser}> {
        if (isEmpty(auth)) {
            throw new Error('Missing params');
        }
        try {
            const user = await User.findOne({phone: auth.phone});
            if (!user) {
                throw new Error('User not found');
            }
            // const isMatchPhone = auth.phone === user.phone
            const isMatch = await compare(auth.password, user.password);
            if (!isMatch) {
                throw new Error('Password incorrect');
            }
            const payload: TokenPayload = {
                id: user._id,
                iat: Date.now(),
                exp: Date.now() + 3600000,
            };
            const token = generateToken(payload);
            const cookie = generateCookie(token);
            
            return {cookie, oneUser: user};
        } catch (error) {
            throw error;
        }
    }

    public async logout(params: CreateUserParams): Promise<IUser> {
        if (isEmpty(params)) {
            throw new Error('Missing params');
        }

        const user = await User.findOne({phone: params.phone});
        if (!user) {
            throw new Error('User not found');
        }

        return user;
    }

    // just make a temporary version first
    public async changePassword(auth: Auth): Promise<IUser> {
        if (isEmpty(auth)) {
            throw new Error('Missing params');
        }
        try {
            const user = await User.findOne({phone: auth.phone});
            if (!user) {
                throw new Error('User not found');
            }

            const isMatch = await compare(auth.password, user.password);
            if (!isMatch) {
                throw new Error('Password incorrect');
            } else {
                const hased = await hash(auth.password, 10);
                user.password = hased;
                return user.save();
            }
        } catch (error) {
            throw error;
        }
    }
}

