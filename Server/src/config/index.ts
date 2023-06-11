import { config } from 'dotenv';

config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});

export const CREDENTIALS = process.env.CREDENTIALS === 'true';

export const {
    DB_HOST,
    DB_PORT,
    DB_USER,
    DB_PASSWORD,
    DB_DATABASE,
    DB_CLUSTER,
    DB_CONNECTION_LIMIT,
    DB_MULTIPLE_STATEMENTS
} = process.env;

export const {
    SERVER_PORT,
    SERVER_HOST,
    NODE_ENV,
    LOG_DIR,
    LOG_FORMAT
} = process.env;

export const {
    SECRET_KEY
} = process.env;

export const {
    X_AIO_Key,
    ADAFRUIT_USERNAME
} = process.env;
