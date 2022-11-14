import { Request, Response } from "express";
import { DbModel } from "../../db/connect";
import * as Formidable from "formidable";

export const editUserPassword = async (req: Request, res: Response) => {
  let form = new Formidable.IncomingForm();
  form.parse(req, async (err, fields: any) => {
    let id = fields.id;
    let edited = await DbModel.editUserPassword(id, "users", {
      login: fields.login,
      password: fields.newPassword,
    });
    if (edited) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  });
};
