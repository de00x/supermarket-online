import { Request, Response } from "express";
import { DbModel } from "../../db/connect";
import * as Formidable from "formidable";

export const createReview = async (req: Request, res: Response) => {
  const newDate = new Date();
  const date = newDate.getDate();
  const year = newDate.getFullYear();
  const month = newDate.getMonth() + 1;
  let form = new Formidable.IncomingForm();
  form.parse(req, async (err, fields: any) => {
    let callback = await DbModel.addReview({
      id: fields.id,
      name: fields.name,
      reviews: fields.reviews,
      stars: fields.stars,
      date: `${date}${" "}${month}${" "}${year}`,
    });
    if (callback) {
      res.json({ success: true });
    } else res.json({ success: false });
  });
};
