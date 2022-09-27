"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodeMailer_1 = require("../configs/nodeMailer");
function generateRandomNumber() {
    let result = [];
    for (let i = 0; i < 6; i++) {
        result.push(Math.floor(Math.random() * 10));
    }
    return result.join("");
}
exports.sendCode = (req, res, next) => {
    try {
        (0, nodeMailer_1.sendMail)("imdadadelabou0@gmail.com", "Code de confirmation", {
            code: generateRandomNumber(),
            username: req.body.email.split("@")[0],
        });
    }
    catch (e) { }
    return res.status(200).json({ msg: "Code sent" });
};
exports.verifyCode = (req, res, next) => {
    return res.status(200).json({ msg: "Code verify" });
};
