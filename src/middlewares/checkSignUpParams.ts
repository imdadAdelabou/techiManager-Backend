import { validate } from "class-validator";
import { Request, Response } from "express";
import { SignUp } from "../models/SignUp";

exports.checkSignUpParams = (req: Request, res: Response, next: () => void) => {
  const keys = req.body;
  const signUpData = new SignUp();
  signUpData.email = keys.email;
  signUpData.firstName = keys.firstName;
  signUpData.lastName = keys.lastName;
  signUpData.password = keys.password;
  signUpData.role = keys.role;

  validate(signUpData).then((errors) => {
    if (errors.length > 0)
      return res.status(400).json({ msg: "Bad request", errors: errors });
    next();
  });
};
