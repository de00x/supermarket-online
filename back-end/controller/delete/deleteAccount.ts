import { Request, Response } from "express";
import { DbModel } from "../../db/connect";
import * as Formidable from "formidable";

export const deleteAccount = async (req: Request, res: Response) => {
  const form = new Formidable.IncomingForm();
  form.parse(req, async (err, fields: any) => {
    const currentUserId = req.query.currentUserId;
    const deletedUser = await DbModel.deleteAccount(currentUserId, "users");
    const deletedUserPersonalInfo = await DbModel.deleteUserPeronalInfo(
      currentUserId,
      "usersPersonalInfo"
    );
    const deletedUserDeliveryInfo = await DbModel.deleteUserPeronalInfo(
      currentUserId,
      "usersDeliveryAddress"
    );
    if (deletedUser && deletedUserPersonalInfo && deletedUserDeliveryInfo) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  });
};
