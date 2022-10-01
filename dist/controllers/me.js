"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.me = void 0;
const checkIfUserExist_1 = require("../middlewares/checkIfUserExist");
const me = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body.user);
    const userReq = req.body.user;
    const user = yield (0, checkIfUserExist_1.checkIfUserExist)(userReq.email);
    if (typeof user === "boolean") {
        return res.status(404).json({ msg: "Inexistant user" });
    }
    delete user.password;
    return res.status(200).json({ msg: "Yh it's me", user: user });
});
exports.me = me;
