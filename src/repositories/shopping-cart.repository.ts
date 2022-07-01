import { ShoppingCart } from "models/shopping-cart.model";
import { MongoDB } from "../utils/mongodb.utils";


export class ShoppingCartRepository extends MongoDB<ShoppingCart>  {
    protected collection = 'shopping-cart';
}