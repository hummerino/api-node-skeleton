import { MongoDB } from "../utils/mongodb.utils";
import { Shopping } from "models/shopping.model";



export class ShoppingRepository extends MongoDB<Shopping>  {
    
    protected collection = 'shopping';

}
