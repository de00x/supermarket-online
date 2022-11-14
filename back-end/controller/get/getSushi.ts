import { Request, Response } from "express";
import { DbModel } from "../../db/connect";

export const getSushi = async (req: Request, res: Response) => {
  let sushi = await DbModel.getSushi();
  if (sushi) {
    res.json(sushi);
  } else res.json({ success: false });
};
