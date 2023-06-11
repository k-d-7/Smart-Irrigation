export interface TokenPayload {
    id: string;
    iat: number;
    exp: number;
}

export interface Auth {
    phone: string;
    password: string;
}

export interface DataStoredInToken {
    id: string;
}