import { Request, Response } from "express";
import { DbModel } from "../../db/connect";
import * as Formidable from "formidable";

export const editDeliveryAddress = async (req: Request, res: Response) => {
  const form = new Formidable.IncomingForm();
  form.parse(req, async (err, fields: any) => {
    const numberInAddress = fields.numberInAddress;
    const edited = await DbModel.editDeliveryAddress(
      numberInAddress,
      "usersDeliveryAddress",
      {
        id: fields.id,
        numberInAddress: fields.numberInAddress,
        deliveryAddress: fields.editedDeliveryAddress,
      }
    );
    if (edited) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  });
};
