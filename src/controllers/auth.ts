import { Request, Response } from "express";
import { collection, getDoc, query, where, getDocs } from "firebase/firestore";

import { hash } from "bcrypt";
const configFirebase = require("../configs/firebase");
const db = configFirebase.db;
const visitorsRef = collection(db, "users");

function logIn(req: Request, res: Response, next: () => void) {
  return res.status(200).json({ data: "Everything work fine" });
}

async function signUp(req: Request, res: Response, next: () => void) {
  const keys = req.body;
  const querySignUp = query(visitorsRef, where("email", "==", keys.email));
  const oldUsers = [];

  try {
    const querySnaphot = await getDocs(querySignUp);
    querySnaphot.forEach((doc) => {
      oldUsers.push(doc.data());
    });
    if (oldUsers.length > 0) {
      return res.status(400).json({
        msg: "Account already exists",
        errors: { keys: "user-exist" },
      });
    }

    const encryptedPassword = await hash(keys.password, 10);
    
    return res.status(200).json({ data: "SignUp middleware" });
  } catch (e) {
    return res.status(500).json({ msg: "Internal server error" });
  }
}

module.exports = {
  logIn: logIn,
  signUp: signUp,
};
