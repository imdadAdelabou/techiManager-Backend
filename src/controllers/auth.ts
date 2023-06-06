import { Request, Response } from "express";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
const jwt = require("jsonwebtoken");

import { hash, compare } from "bcrypt";
import { checkIfUserExist } from "../middlewares/checkIfUserExist";
const configFirebase = require("../configs/firebase");
const db = configFirebase.db;
const visitorsRef = collection(db, "users");

async function logIn(req: Request, res: Response, next: () => void) {
  const { email, password } = req.body;
  const user = await checkIfUserExist(email);

  if (typeof user === "boolean")
    return res
      .status(404)
      .json({ msg: "No user with this e-mail address exists" });

  console.log(user.password);
  console.log(password);

  const isSame: boolean = await compare(password, user.password);
  if (!isSame)
    return res
      .status(401)
      .json({ msg: "Wrong password", erros: { keys: ["wrong-password"] } });
  if (!user.isActive)
    return res.status(401).json({
      msg: "You must verify your account before logging in with account",
    });

  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.TOKEN_KEY,
    { expiresIn: "2h" }
  );
  return res.status(200).json({ data: "User is logged", token: token });
}

async function signUp(req: Request, res: Response, next: () => void) {
  const keys = req.body;

  try {
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
