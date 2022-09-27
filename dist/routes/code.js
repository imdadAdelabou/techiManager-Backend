"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routerCode = require("express").Router();
const codeCtrl = require("../controllers/code");
const sendMidlle_1 = require("../middlewares/sendMidlle");
routerCode.post("/send", sendMidlle_1.sendMiddle, codeCtrl.sendCode);
routerCode.post("/verify", codeCtrl.verifyCode);
module.exports = routerCode;
