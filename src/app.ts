import express from "express";
import cors from "cors";
import helmet from "helmet";
import * as dotenv from 'dotenv';

const cookieParser = require('cookie-parser');

import * as bodyParser from 'body-parser';

import { Routers, IRouter } from './routers/router.module';
import { authTokens } from "./routers/user.router";

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

app.use(function (req, res, next) {
    switch( req.originalUrl ) {
        case '/user/token' : 
        case '/user/token' : 
            next();
            return;
    }

    const authorization = req.headers.authorization;
    if( !authorization ) {
        res.status(401).send('Not Authorized');
        return;
    }

    if( !authorization.startsWith('Bearer ' ) ) {
        res.status(401).send('Invalid Token');
        return;
    }

    const token = authorization.replace( 'Bearer ', '' );
    console.log( token )

    if( !authTokens[token] ) {
        res.status(401).send('Not Authorized');
        return;
    }
    
    next();
});

Routers.forEach( ( r : IRouter ) => app.use( r.Prefix, r.Router ) )

export {app};