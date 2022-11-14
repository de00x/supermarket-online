import { Request, Response } from "express";
import { DbModel } from "../../db/connect";

export const getSets = async (req: Request, res: Response) => {
  let sets = await DbModel.getSets();
  if (sets) {
    res.json(sets);
  } else res.json({ success: false });
};
