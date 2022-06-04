import express, { Request, Response } from "express";
import { UserRepository } from "../repositories/user.repository";
import { User, UserRegiser } from '../models/user.models';
import {getHashedPassword, generateAuthToken} from '../utils/crypto.utils';



/*
 * Router Definition
 */
export const UserRouter = express.Router();

// This will hold the users and authToken related to users
export const authTokens: { [name: string] : User } = {};


UserRouter.post('/token', async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const userRepository = new UserRepository();
    const hashedPassword = getHashedPassword(password);

    const user: User | null = await userRepository.getUserByEmail( email );

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

    res.status(200)
       .send({
           email, 
           firstName,
           lastName, 
           token : authToken
       });
    
});



/*
*
*/
UserRouter.post('/register', async (req: Request, res: Response) => {
    const { email, password } = req.body as UserRegiser;
    const userRepository = new UserRepository();
    // Check if the password and confirm password fields match

        const userFound: User | null = await userRepository.getUserByEmail( email );

        if( userFound ) {
            res.status(400)
               .send('User already registered.');
            return;
        }

        const hashedPassword = getHashedPassword(password);

        // Store user into the database if you are using one
        const newUser: User = await userRepository.addUser( { ...req.body, password: hashedPassword })
        const { firstName, lastName, id: userId } = newUser;
    
        res.status(200)
           .send( { email, firstName, lastName, userId  } );
    
});





