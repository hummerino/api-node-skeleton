import { User } from "../models/user.models";
import { NextFunction, Request, Response } from "express";

interface Token {
    user: User;
    loginDate: Date;
    expires: Date;
}

var authTokens: { [token: string] : Token; } = {};

export const setToken = ( token: string, user: User ) : void => {
    // Store authentication token
    const loginDate = new Date();
    const expires = new Date();
    //Valid for 1 day
    expires.setDate(1);

    authTokens[token] = {
        user, 
        loginDate, 
        expires
    }
}


export const isValidToken = ( token: string ) : boolean => {

    if( !token ) 
        return false;

    const found: Token = authTokens[token];

    if( !found ) 
        return false;

    if( found.expires.getTime() < Date.now() ){
        delete authTokens[token];
        return false;
    }

    return true;
}



export const tokenRequired = async (req: Request, res: Response, next: NextFunction ) => {
    if( !isValidToken( req.headers.authorization ) ){
      res.status(403).send('Unauthorized');
      return;
    }
    next();
  }