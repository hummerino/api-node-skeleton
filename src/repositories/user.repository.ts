import { generateUUID } from "../utils/guid.utils";
import { User } from "../models/user.models"
import { Course } from "../models/course.model";
import { MongoDB } from "../utils/mongodb.utils";

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





export class UserRepository extends MongoDB<User>  {
    
    protected collection = 'users';

    /*
    *
    */
    public async getUserByEmail( email: string ): Promise<User | null> {
      const result = await this.getDocuments( { email } );
      return result?.length > 0 ? result[0] : null;
    }

    /*
    *
    */
    public async addUser( user: User ) {
        const id = await this.insertDocument( user );
        const newUser = { ...user, id };
        return newUser;
    }

}
