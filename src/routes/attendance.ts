import { Router } from "express";
import { add } from "../controllers/attendance";

const routerAttendance = Router();

routerAttendance.post("/add", add);

export default routerAttendance;
