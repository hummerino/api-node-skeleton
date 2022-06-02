import express from "express";
import cors from "cors";
import helmet from "helmet";
import * as dotenv from 'dotenv';

const cookieParser = require('cookie-parser');

import * as bodyParser from 'body-parser';

import { Routers, IRouter } from './routers/router.module';

dotenv.config();

const app : express.Application = express();

/*app.use(cors);
app.use(helmet);*/
app.use(express.json());

// To parse cookies from the HTTP Request
app.use(cookieParser());

app.use(bodyParser.json({
    limit: '50mb',
    verify(req: any, res, buf, encoding) {
        req.rawBody = buf;
    }
}));

Routers.forEach( ( r : IRouter ) => app.use( r.Prefix, r.Router ) )

export {app};