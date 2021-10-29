import { generateUUID } from "../utils/guid.utils";
import { User } from "../models/user.models"


const users: User[] = [
    {
      firstName: "simone",
      lastName: "golia",
      email: "simo@simo.it",
      password: "Ylil4Ot3KRHU+SvltdsOFFEe2+AdHQ3dHVosuduaVro=",
      id: "29388573-81e1-4a12-88e0-97145b69f76c"
    }
]


export const getUser = () : User[] => users;

export const getUserById = ( id: string ) : User => users?.find( ( user: User ) => user.id === id );

export const getUserByEmail = ( email: string ) : User => users?.find( ( user: User ) => user.email === email );

export const addUser = ( user: User ) : User => {
    const newUser = { ...user, id : generateUUID() };
    users.push( newUser );
    return newUser;
}

