import { Request, Response } from "express";

exports.sendCode = (req: Request, res: Response, next: () => void) => {
  return res.status(200).json({ msg: "Code sent" });
};

exports.verifyCode = (req: Request, res: Response, next: () => void) => {
  return res.status(200).json({ msg: "Code verify" });
};
