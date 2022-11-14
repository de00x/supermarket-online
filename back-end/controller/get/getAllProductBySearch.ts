import { Request, Response } from "express";
import { DbModel } from "../../db/connect";

export const getAllProductBySearch = async (req: Request, res: Response) => {
  let productBySearch = await DbModel.getAllProductBySearch();
  if (productBySearch) {
    res.json(productBySearch);
  } else res.json({ success: false });
};
