import { Request, Response } from "express";
const jwt = require("jsonwebtoken");

export const auth = (req: Request, res: Response, next: () => void) => {
  const token = req.headers["x-access-token"];

  //We verify if user send request with valid token
  if (!token) {
    return res
      .status(403)
      .json({ msg: "Token is required for authentification" });
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    req.body.user = decoded;
  } catch (e) {
    return res.status(401).json({ msg: "Invalid token" });
  }
  next();
};
