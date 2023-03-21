import { validate } from "class-validator";
import { Request, Response } from "express";
import { RoleType } from "../helpers/types";
import { SignUp } from "../models/SignUp";
import { checkIfUserExist } from "./checkIfUserExist";
import { matching } from "./isAdminOrGarden";

exports.checkSignUpParams = async (
  req: Request,
  res: Response,
  next: () => void
) => {
  const keys = req.body;
  const signUpData = new SignUp();
  signUpData.email = keys.email;
  signUpData.firstName = keys.firstName;
  signUpData.lastName = keys.lastName;
  signUpData.password = keys.password;
  signUpData.role = keys.role;

  validate(signUpData).then(async (errors) => {
    if (errors.length > 0)
      return res.status(400).json({ msg: "Bad request", errors: errors });

    const result = await checkIfUserExist(signUpData.email);
    if (typeof result != "boolean")
      return res.status(400).json({
        msg: "Account already exists",
        errors: { keys: "user-exist" },
      });
    if (matching[signUpData.role] != RoleType.user) {
      let codeAdmin = req.body.code;
      if (!codeAdmin)
        return res.status(401).json({
          msg: "Admin code is required",
          errors: { keys: ["admin-code-required"] },
        });
      if (codeAdmin != process.env.ADMIN_CODE)
        return res.status(401).json({
          msg: "Wrong admin code",
          errors: { keys: ["wrong-admin-code"] },
        });
    }
    next();
  });
};
