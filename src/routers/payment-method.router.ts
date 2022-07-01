import express, { Request, Response } from "express";
import { PaymentMethodRepository } from "../repositories/payment-method.repository";
import { ShoppingCartRepository } from "../repositories/shopping-cart.repository";

/*
 * Router Definition
 */
export const PaymentMethodRouter = express.Router();

/*
* Get user shopping cart
*/
PaymentMethodRouter.get("/:userId", async (req: Request, res: Response) => {
    const userId = req?.params?.userId;
    try {
      if( !userId ) {
        res.status(400).send('Param userId required');
        return;
      }
      const repo = new PaymentMethodRepository();
      const items: any = await repo.getDocuments({userId: req.params.userId});
      res.status(200).send(items);
    } catch (e) {
      res.status(404).send(e.message);
    }
});

/*
* Save user shopping cart
*/
PaymentMethodRouter.post("/", async (req: Request, res: Response) => {
  try {
    const repo = new PaymentMethodRepository();
    const item: string = await repo.insertDocument(req.body);
    res.status(200).send(item);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

/*
* Save user shopping cart
*/
PaymentMethodRouter.delete("/:id", async (req: Request, res: Response) => {
  const id = req?.params?.id;
  try {
    if( !id ) {
      res.status(400).send('Param id required');
      return;
    }
    const repo = new PaymentMethodRepository();
    const item: boolean = await repo.deleteDocument(id);
    res.status(200).send(item);
  } catch (e) {
    res.status(404).send(e.message);
  }
});