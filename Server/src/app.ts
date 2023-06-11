import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import { connect, set } from 'mongoose';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import hpp from 'hpp';
import morgan from 'morgan';
import {dbConnection} from '@/database';
import bodyParser from 'body-parser';
import apiRoutes from './routes';
import Job from './utils/cron';
import { getIdxGlobal } from './global';

// initialize express instance  
const app = express();
const prefix = process.env.API_ROUTING_PREFIX || '/api/v1/';
// const swaggerConfig = {
//     explorer: true,
//     swaggerDefinitions: { 
//         info: {
//             title: 'meFund API Docs',
//             description: 'meFund API Docs',
//             version: '1.0.0',
//         },
//     },
//     apis: ['swagger.yaml'],
// };

// middlewares
app.use(compression());
app.use(helmet());
app.use(hpp());
app.use(cors());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// error handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send("Internal server error");
}); 

// routes
apiRoutes.forEach((route) => {
    app.use(prefix, route.router);
});

// // cronjob reading data
// Job.readDataFromSensor();

// //cronjob for testing
// Job.storeStatistics();

// connect to mongodb
connect(dbConnection.url, dbConnection.options).then(() => {
  console.log('Connected to the database: ', dbConnection.url);
}).catch((error) => {
  console.log('Error connecting to the database', error);
  console.log(dbConnection.url)
  process.exit();
});

export default app;




