import { Request, Response } from "express";
import { DbModel } from "../../db/connect";

export const getDeliveryAddress = async (req: Request, res: Response) => {
  let currentId = req.query.currentUserId;
  let delAddress = await DbModel.getDeliveryAddress(currentId);
  if (delAddress) {
    res.json(delAddress);
  } else res.json({ success: false });
};
