import { Request, Response } from "express";

export function add(req: Request, res: Response) {
  return res.status(201).json({ msg: "Attendance created" });
}
