import { Request, Response } from "express";
import { DbModel } from "../../db/connect";
import * as Formidable from "formidable";

export const deleteAddress = async (req: Request, res: Response) => {
  let form = new Formidable.IncomingForm();
  form.parse(req, async (err, fields: any) => {
    let id = req.query.numberInAddress;
    let deleted = await DbModel.deleteAddress(id, "usersDeliveryAddress");
    if (deleted) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  });
};
