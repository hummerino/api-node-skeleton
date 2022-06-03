import express, { Request, Response } from "express";
import { CourseRepository } from "../repositories/courses.repository";

/*
 * Router Definition
 */
export const CoursesRouter = express.Router();

/*
*
*/
CoursesRouter.get("/", async (req: Request, res: Response) => {
    try {
      const repo = new CourseRepository();
      const items: any = await repo.getDocuments();
      res.status(200).send(items);
    } catch (e) {
      res.status(404).send(e.message);
    }
});