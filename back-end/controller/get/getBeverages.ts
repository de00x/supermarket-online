import { Request, Response } from "express";
import { DbModel } from "../../db/connect";

export const getBeverages = async (req: Request, res: Response) => {
  let beverages = await DbModel.getBeverages();
  if (beverages) {
    res.json(beverages);
  } else res.json({ success: false });
};
