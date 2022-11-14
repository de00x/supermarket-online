import { Request, Response } from "express";
import { DbModel } from "../../db/connect";
import * as Formidable from "formidable";

export const getCoincidencePass = async (req: Request, res: Response) => {
  let form = new Formidable.IncomingForm();
  form.parse(req, async (err, fields: any) => {
    let coincidencePass = await DbModel.getCoincidencePass({
      id: fields.id,
      oldPassword: fields.oldPassword,
    });
    if (coincidencePass) {
      res.json({ success: true });
    } else res.json({ success: false });
  });
};
