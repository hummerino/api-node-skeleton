import express, { Request, Response } from "express";
import { addUser } from "../repositories/user.repository";
import { getUserByEmail } from "../repositories/user.repository";
import { User, UserRegiser } from '../models/user.models';
import {getHashedPassword, generateAuthToken} from '../utils/crypto.utils';



/*
 * Router Definition
 */
export const UserRouter = express.Router();

// This will hold the users and authToken related to users
const authTokens = [];


UserRouter.post('/token', async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const hashedPassword = getHashedPassword(password);

    const user: User = getUserByEmail( email );

    if( !user ) {
        res.status( 400 )
           .send('User not found!');
        return;
    } else if ( user.password !== hashedPassword ) {
        res.status( 400 )
           .send('Invalid password!');
        return;
    }

    const authToken = generateAuthToken();

    // Store authentication token
    authTokens[authToken] = user;

    // Setting the auth token in cookies
    res.cookie('AuthToken', authToken);

    const { firstName, lastName } = user

    res.status(400)
       .send({
           email, 
           firstName,
           lastName, 
           token : authToken
       });
    
});

UserRouter.post('/register', async (req: Request, res: Response) => {
    const { email, firstName, lastName, password, confirmPassword } = req.body as UserRegiser;

    // Check if the password and confirm password fields match
    if ( password !== confirmPassword )
        res.status(400)
           .send('Password does not match.');
    else {

        const userFound: User = getUserByEmail( email );

        if( userFound ) {
            res.status(400)
               .send('User already registered.');
            return;
        }

        const hashedPassword = getHashedPassword(password);

        // Store user into the database if you are using one
        const newUser: User = addUser( { firstName, lastName, email, password: hashedPassword })

        res.status(200)
           .send( newUser );

    }
    
});





