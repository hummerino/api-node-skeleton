import { Router } from "express";
import { CourseCategoriesRouter } from "./course-categories.router";
import { CoursesRouter } from "./courses.router";
import { UserRouter } from "./user.router";

export interface IRouter {
    Prefix : string,
    Router : Router
} 

export const Routers : IRouter[] = [
    { Prefix : '/user',    Router : UserRouter },
    { Prefix : '/courses', Router : CoursesRouter },
    { Prefix : '/course-categories', Router : CourseCategoriesRouter }
];