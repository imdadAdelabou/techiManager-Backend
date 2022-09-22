const routerCode = require("express").Router();
const codeCtrl = require("../controllers/code");
import { sendMiddle } from "../middlewares/sendMidlle";

routerCode.post("/send", sendMiddle, codeCtrl.sendCode);
routerCode.post("/verify", codeCtrl.verifyCode);

module.exports = routerCode;
