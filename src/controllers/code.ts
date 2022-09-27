import { Request, Response } from "express";
import { sendMail } from "../configs/nodeMailer";

function generateRandomNumber() {
  let result = [];

  for (let i = 0; i < 6; i++) {
    result.push(Math.floor(Math.random() * 10));
  }
  return result.join("");
}

exports.sendCode = (req: Request, res: Response, next: () => void) => {
  try {
    const email: string = req.body.email.split("@")[0];
    sendMail(req.body.email, "Code de confirmation", {
      code: generateRandomNumber(),
      username: email[0].toUpperCase() + email.slice(1),
    })
      .then(() => console.log("Message sent"))
      .catch((e) => console.log(e));
  } catch (e) {}
  return res.status(200).json({ msg: "Code sent" });
};

exports.verifyCode = (req: Request, res: Response, next: () => void) => {
  return res.status(200).json({ msg: "Code verify" });
};
