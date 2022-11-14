import { Request, Response } from "express";
import { DbModel } from "../../db/connect";

export const getCornDogs = async (req: Request, res: Response) => {
  let cornDogs = await DbModel.getCornDogs();
  if (cornDogs) {
    res.json(cornDogs);
  } else res.json({ success: false });
};
