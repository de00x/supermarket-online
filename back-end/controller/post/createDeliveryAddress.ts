import { Request, Response } from "express";
import { DbModel } from "../../db/connect";
import * as Formidable from "formidable";

export const createDeliveryAddress = async (req: Request, res: Response) => {
  let form = new Formidable.IncomingForm();
  form.parse(req, async (err, fields: any) => {
    let callback = await DbModel.createDeliveryAddress({
      id: fields.id,
      newAddress: fields.newAddress,
    });
    if (callback) {
      res.json({ success: true });
    } else res.json({ success: false });
  });
};
