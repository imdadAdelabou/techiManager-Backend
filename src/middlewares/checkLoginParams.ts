import { validate } from "class-validator";
import { Request, Response } from "express";
import { Login } from "../models/Login";

exports.checkLoginParams = (req: Request, res: Response, next: () => void) => {
  const keys = req.body;
  const loginData = new Login();
  loginData.email = keys.email;
  loginData.password = keys.password;

  //Check if user send the correct parameters
  validate(loginData).then((errors) => {
    if (errors.length > 0) {
      return res.status(400).json({ msg: "Bad request", errors: errors });
    }

    next();
  });
};
