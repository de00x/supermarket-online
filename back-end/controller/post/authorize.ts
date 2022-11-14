import { Request, Response } from "express";
import { DbModel } from "../../db/connect";
import * as Formidable from "formidable";
import { IUserData } from "../types";

export const authorize = async (req: Request, res: Response) => {
  let user = await DbModel.outUser();
  let form = new Formidable.IncomingForm();
  form.parse(req, (err, fields: any) => {
    const success = user.find(
      (users: IUserData) => users.login === fields.login
    );
    if (success) {
      if (
        fields.login === success.login &&
        fields.password === success.password
      ) {
        res.json({ isLogin: true, login: success.login, id: success.id });
      } else {
        res.json({ isLogin: false });
      }
    } else res.json({ isLogin: false });
  });
};
