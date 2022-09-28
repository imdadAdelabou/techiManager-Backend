import { Request, Response } from "express";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { sendMail } from "../configs/nodeMailer";
import { checkIfUserExist } from "../middlewares/checkIfUserExist";
const config = require("../configs/firebase");
const db = config.db;

const codeRef = collection(db, "codes");

function generateRandomNumber() {
  let result = [];

  for (let i = 0; i < 6; i++) {
    result.push(Math.floor(Math.random() * 10));
  }
  return result.join("");
}

exports.sendCode = async (req: Request, res: Response, next: () => void) => {
  try {
    const email: string = req.body.email.split("@")[0];
    const code = generateRandomNumber();
    await sendMail(req.body.email, "Code de confirmation", {
      code: code,
      username: email[0].toUpperCase() + email.slice(1),
    });

    await addDoc(codeRef, {
      email: req.body.email,
      code: code,
    });
    return res.status(201).json({ msg: "Code sent" });
  } catch (e) {
    return res.status(500).json({ msg: "Internal server error" });
  }
};

exports.verifyCode = async (req: Request, res: Response, next: () => void) => {
  const email: string = req.body.email;
  const code: string = req.body.code;
  const codes = [];

  if (!email || !code) {
    return res
      .status(400)
      .json({ msg: "Bad request", errors: { keys: ["email"] } });
  }

  try {
    const queryMatching = query(codeRef, where("email", "==", email));
    const docs = await getDocs(queryMatching);

    docs.forEach((doc) => codes.push(doc.data()));
    if (!(codes.length > 0))
      return res.status(404).json({
        msg: "No verification code is linked to this email address or user don't exist",
        keys: ["no-code"],
      });
    if (!(codes[0].code === code))
      return res.status(400).json({
        msg: "Wrong confirmation code",
        erros: { keys: ["wrong-code"] },
      });
    const ifUserExist = await checkIfUserExist(email);
    if (typeof ifUserExist === "boolean") {
      throw "User don't exist";
    }
    await updateDoc(doc(db, "users", ifUserExist), {
      isActive: true,
    });
    return res
      .status(200)
      .json({ msg: "Thanks for confirming your email address" });
  } catch (e) {
    return res.status(500).json({ msg: "Internal server error", erros: e });
  }
};
