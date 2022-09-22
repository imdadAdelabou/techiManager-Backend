import { Request, Response } from "express";
import { checkIfUserExist } from "./checkIfUserExist";

export async function sendMiddle(
  req: Request,
  res: Response,
  next: () => void
) {
  if (!req.body.email)
    return res
      .status(400)
      .json({ msg: "Email is required", errors: { keys: ["email"] } });
  const ifUserExist = await checkIfUserExist(req.body.email);

  if (!ifUserExist)
    return res
      .status(404)
      .json({ msg: "Can't send verification code to inexistant user." });
  next();
}
