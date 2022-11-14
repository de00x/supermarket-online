import { Request, Response } from "express";
import { DbModel } from "../../db/connect";
import * as Formidable from "formidable";

export const productToBasket = async (req: Request, res: Response) => {
  let form = new Formidable.IncomingForm();
  form.parse(req, async (err, fields: any) => {
    let callback = await DbModel.addProduct({
      id: fields.id,
      img: fields.img,
      name: fields.name,
      info: fields.info,
      price: fields.price,
    });
    if (callback) {
      res.json({ success: true });
    } else res.json({ success: false });
  });
};
