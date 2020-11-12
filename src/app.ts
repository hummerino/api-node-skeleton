import express from "express";
import cors from "cors";
import helmet from "helmet";

import * as bodyParser from 'body-parser';

import { Routers, IRouter } from './routers/router.module';

const app : express.Application = express();

/*app.use(cors);
app.use(helmet);*/
app.use(express.json());

app.use(bodyParser.json({
    limit: '50mb',
    verify(req: any, res, buf, encoding) {
        req.rawBody = buf;
    }
}));

Routers.forEach( ( r : IRouter ) => app.use( r.Prefix, r.Router ) )

export {app};