import { Request, Response } from "express";
import { DbModel } from "../../db/connect";
import * as Formidable from "formidable";

export const getPersonalData = async (req: Request, res: Response) => {
  let form = new Formidable.IncomingForm();
  form.parse(req, async (err, fields: any) => {
    let result = await DbModel.getPersonalData({
      id: fields.id,
    });
    if (result) {
      res.json(result);
    } else res.json({ success: false });
  });
};
