import { Request, Response } from "express";
import { DbModel } from "../../db/connect";

export const getWok = async (req: Request, res: Response) => {
  let wok = await DbModel.getWok();
  if (wok) {
    res.json(wok);
  } else res.json({ success: false });
};
