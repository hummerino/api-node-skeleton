import { generateUUID } from "../utils/guid.utils";
import { User } from "../models/user.models"
import { Course } from "../models/course.model";
import { MongoDB } from "../utils/mongodb.utils";



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
