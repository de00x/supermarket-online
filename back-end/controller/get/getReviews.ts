import { Request, Response } from "express";
import { DbModel } from "../../db/connect";

export const getReviews = async (req: Request, res: Response) => {
  let allReview = await DbModel.getReviews();
  if (allReview) {
    res.json(allReview);
  } else res.json({ success: false });
};
