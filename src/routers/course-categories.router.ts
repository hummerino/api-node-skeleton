import express, { Request, Response } from "express";
import { Category } from "models/category.model";
import { CourseCategoryRepository } from "../repositories/course-category.repository";

/*
 * Router Definition
 */
export const CourseCategoriesRouter = express.Router();

/*
*
*/
CourseCategoriesRouter.get("/", async (req: Request, res: Response) => {
    try {
      const repo = new CourseCategoryRepository();
      const items: Category[] = await repo.getDocuments();
      res.status(200).send(items);
    } catch (e) {
      res.status(404).send(e.message);
    }
});

/*
*
*/
CourseCategoriesRouter.get("/:id", async (req: Request, res: Response) => {
    try {
      const repo = new CourseCategoryRepository();
      const item: Category = await repo.getById(req.params.id);
      res.status(200).send(item);
    } catch (e) {
      res.status(404).send(e.message);
    }
});