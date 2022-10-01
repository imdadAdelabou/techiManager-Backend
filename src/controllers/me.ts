import { Request, Response } from "express";
import { checkIfUserExist } from "../middlewares/checkIfUserExist";

export const me = async (req: Request, res: Response, next: () => void) => {
  console.log(req.body.user);
  const userReq = req.body.user;

  const user = await checkIfUserExist(userReq.email);
  if (typeof user === "boolean") {
    return res.status(404).json({ msg: "Inexistant user" });
  }
  delete user.password;
  return res.status(200).json({ msg: "Data ", data: { user: user } });
};
