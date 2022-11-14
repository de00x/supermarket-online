import { Request, Response } from "express";
import { DbModel } from "../../db/connect";

export const getPizzas = async (req: Request, res: Response) => {
  let pizzas = await DbModel.getPizzas();
  if (pizzas) {
    res.json(pizzas);
  } else res.json({ success: false });
};
