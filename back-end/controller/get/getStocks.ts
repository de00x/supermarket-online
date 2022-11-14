import { Request, Response } from "express";
import { DbModel } from "../../db/connect";

export const getStocks = async (req: Request, res: Response) => {
  let stocks = await DbModel.getStocks();
  if (stocks) {
    res.json(stocks);
  } else res.json({ success: false });
};
