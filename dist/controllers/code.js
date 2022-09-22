"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendCode = (req, res, next) => {
    return res.status(200).json({ msg: "Code sent" });
};
exports.verifyCode = (req, res, next) => {
    return res.status(200).json({ msg: "Code verify" });
};
