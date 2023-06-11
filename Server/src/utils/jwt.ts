import { sign, SignOptions, verify, VerifyOptions } from 'jsonwebtoken';
import {SECRET_KEY} from '@config';
import fs from 'fs';
import path from 'path';
import { TokenPayload } from '@/interfaces/auth.interface';

export function generateToken(payload: any): string {
    const privateKey = {    
        key: fs.readFileSync(path.join(__dirname, '../../private.pem'), 'utf8'),
        passphrase: SECRET_KEY || "60201"
    }
    const signInOptions: SignOptions = {
        // RS256 uses a public/private key pair. 
        // The API provides the private key to generate the JWT. 
        // The client gets a public key to validate the signature
        algorithm: 'RS256',
    }

    return sign(payload, privateKey, signInOptions);
}

export function verifyToken(token: string): Promise<TokenPayload> {
    const publicKey = fs.readFileSync(path.join(__dirname, '../../public.pem'), 'utf8');
    const verifyOptions: VerifyOptions = {
        algorithms: ['RS256'],
    };

    return new Promise((resolve, reject) => {
        verify(token, publicKey, verifyOptions, (err, decoded) => {
            if (err) {
                return reject(err);
            }

            resolve(decoded as TokenPayload);
        });
    });
}
