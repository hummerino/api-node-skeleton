import express, { Request, Response } from "express";
import { PaymentMethod } from "models/payment-method.model";
import { ShoppingCartRepository } from "../repositories/shopping-cart.repository";

/*
 * Router Definition
 */
export const ShoppingCartRouter = express.Router();

/*
* Get user shopping cart
*/
ShoppingCartRouter.get("/:userId", async (req: Request, res: Response) => {
    try {
      const repo = new ShoppingCartRepository();
      const items: any = await repo.getDocuments({userId: req.params.userId});
      res.status(200).send(items);
    } catch (e) {
      res.status(404).send(e.message);
    }
});

/*
* Save user shopping cart
*/
ShoppingCartRouter.post("/", async (req: Request, res: Response) => {
  try {
    const repo = new ShoppingCartRepository();
    const id: string = await repo.insertDocument(req.body);
    res.status(200).send({id});
  } catch (e) {
    res.status(404).send(e.message);
  }
});

/*
* Update user shopping cart
*/
ShoppingCartRouter.patch("/", async (req: Request, res: Response) => {
  try {
    const paymentMethod: PaymentMethod = req.body;
    const repo = new ShoppingCartRepository();
    const result: boolean = await repo.updateDocument(paymentMethod.id, paymentMethod );
    res.status(200).send({result});
  } catch (e) {
    res.status(404).send(e.message);
  }
});