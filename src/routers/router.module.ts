import { Router } from "express";
import { ArticleRouter } from "./article.router";

export interface IRouter {
    Prefix : string, 
    Router : Router
}

export const Routers : IRouter[] = [
    { Prefix : '/article', Router : ArticleRouter }
];