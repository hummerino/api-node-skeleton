import express, { Request, Response } from "express";
import * as ArticleRepository from "../repositories/article.repository";

/*
 * Router Definition
 */
export const ArticleRouter = express.Router();

/*
 *
 */
ArticleRouter.get("/", async (req: Request, res: Response) => {
    console.log("prova")
    try {
      const items = ArticleRepository.getArticle();

      res.status(200).send(items);
    } catch (e) {
      res.status(404).send(e.message);
    }
  });