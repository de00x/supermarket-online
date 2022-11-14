import { Request, Response } from "express";
import { DbModel } from "../../db/connect";

export const getRolls = async (req: Request, res: Response) => {
  let rolls = await DbModel.getRolls();
  if (rolls) {
    res.json(rolls);
  } else res.json({ success: false });
};
