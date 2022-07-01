import { PaymentMethod } from "models/payment-method.model";
import { MongoDB } from "../utils/mongodb.utils";


export class PaymentMethodRepository extends MongoDB<PaymentMethod>  {
    protected collection = 'payment-methods';
}