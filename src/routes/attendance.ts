import { Router } from "express";
import { add, endAttendance } from "../controllers/attendance";

const routerAttendance = Router();

routerAttendance.post("/add", add);
routerAttendance.put("/end-attendance", endAttendance);

export default routerAttendance;
