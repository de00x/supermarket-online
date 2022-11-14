import { Request, Response } from "express";
import { DbModel } from "../../db/connect";
import * as Formidable from "formidable";

export const editUserInfo = async (req: Request, res: Response) => {
  let form = new Formidable.IncomingForm();
  form.parse(req, async (err, fields: any) => {
    let id = fields.id;
    let edited = await DbModel.editUserInfo(id, "usersPersonalInfo", {
      name: fields.name,
      lastName: fields.lastName,
      email: fields.email,
      telefone: fields.telefone,
    });
    if (edited) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  });
};
