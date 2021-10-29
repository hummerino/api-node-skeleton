import { Router } from "express";
import { ArticleRouter } from "./article.router";
import { UserRouter } from "./user.router";

export interface IRouter {
    Prefix : string,
    Router : Router
}

export const Routers : IRouter[] = [
    { Prefix : '/user',    Router : UserRouter },
    { Prefix : '/article', Router : ArticleRouter }
];