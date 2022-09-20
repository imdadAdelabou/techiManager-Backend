import { Request, Response } from "express";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

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

    // verify if user exist, if yes 400, He just need to login not create an account
    if (oldUsers.length > 0) {
      return res.status(400).json({
        msg: "Account already exists",
        errors: { keys: "user-exist" },
      });
    }

    // if user hav'nt not account hash the password using bcrypt
    const encryptedPassword = await hash(keys.password, 10);
    const userToSave = {
      firstName: keys.firstName,
      lastName: keys.lastName,
      email: keys.email,
      password: encryptedPassword,
      role: keys.role,
      isActive: false,
    };

    //Add User Information on firebase
    const result = await addDoc(visitorsRef, userToSave);
    await updateDoc(doc(db, "users", result.id), {
      id: result.id,
    });
    userToSave["id"] = result.id;

    //Return a response
    return res
      .status(201)
      .json({ msg: "User created", data: { user: userToSave } });
  } catch (e) {
    return res.status(500).json({ msg: "Internal server error" });
  }
}

module.exports = {
  logIn: logIn,
  signUp: signUp,
};
