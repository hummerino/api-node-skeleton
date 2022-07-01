import { Course } from "./course.model";
import { PaymentMethod } from "./payment-method.model";

export interface Shopping {
    id: string;
    userId: string;
    products: Course[];
    date: Date;
    paymentMethod: PaymentMethod;
    total: number;
}