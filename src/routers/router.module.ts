import { Router } from "express";
import { CourseCategoriesRouter } from "./course-categories.router";
import { CoursesRouter } from "./courses.router";
import { PaymentMethodRouter } from "./payment-method.router";
import { ShoppingCartRouter } from "./shopping-cart.router";
import { UserRouter } from "./user.router";

export interface IRouter {
    Prefix : string,
    Router : Router
} 

export const Routers : IRouter[] = [
    { Prefix : '/user',    Router : UserRouter },
    { Prefix : '/courses', Router : CoursesRouter },
    { Prefix : '/course-categories', Router : CourseCategoriesRouter },
    { Prefix : '/shopping-cart', Router : ShoppingCartRouter },
    { Prefix : '/payment-method', Router : PaymentMethodRouter }
];