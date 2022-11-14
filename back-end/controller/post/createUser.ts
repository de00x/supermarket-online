import { Request, Response } from "express";
import { DbModel } from "../../db/connect";
import * as Formidable from "formidable";

export const createUser = async (req: Request, res: Response) => {
  let form = new Formidable.IncomingForm();
  form.parse(req, async (err, fields: any) => {
    let { login, password } = fields;
    let callback = await DbModel.addUser({
      id: 111,
      login,
      password,
    });
    if (callback) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  });
};
