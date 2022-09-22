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
const checkIfUserExist_1 = require("./checkIfUserExist");
exports.sendMiddle = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const ifUserExist = yield (0, checkIfUserExist_1.checkIfUserExist)(req.body.email);
    console.log(ifUserExist, "<===== User Exist");
    if (!ifUserExist)
        return res
            .status(404)
            .json({ msg: "Can't send verification code to inexistant user." });
    next();
});
