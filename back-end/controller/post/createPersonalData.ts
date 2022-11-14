import { Request, Response } from "express";
import { DbModel } from "../../db/connect";
import * as Formidable from "formidable";

export const createPersonalData = async (req: Request, res: Response) => {
  let form = new Formidable.IncomingForm();
  form.parse(req, async (err, fields: any) => {
    let callback = await DbModel.addPersonalData({
      id: fields.id,
      name: fields.name,
      lastName: fields.lastName,
      email: fields.email,
      telefone: fields.telefone,
    });
    if (callback) {
      res.json({ success: true });
    } else res.json({ success: false });
  });
};
