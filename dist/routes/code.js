const routerCode = require("express").Router();
const codeCtrl = require("./visitor");
routerCode.post("/send", codeCtrl.sendCode);
routerCode.post("/verify", codeCtrl.verifyCode);
module.exports = routerCode;
