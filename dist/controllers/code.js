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
const firestore_1 = require("firebase/firestore");
const nodeMailer_1 = require("../configs/nodeMailer");
const config = require("../configs/firebase");
const db = config.db;
const codeRef = (0, firestore_1.collection)(db, "codes");
function generateRandomNumber() {
    let result = [];
    for (let i = 0; i < 6; i++) {
        result.push(Math.floor(Math.random() * 10));
    }
    return result.join("");
}
exports.sendCode = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.email.split("@")[0];
        const code = generateRandomNumber();
        yield (0, nodeMailer_1.sendMail)(req.body.email, "Code de confirmation", {
            code: code,
            username: email[0].toUpperCase() + email.slice(1),
        });
        yield (0, firestore_1.addDoc)(codeRef, {
            email: req.body.email,
            code: code,
        });
        return res.status(201).json({ msg: "Code sent" });
    }
    catch (e) {
        return res.status(500).json({ msg: "Internal server error" });
    }
});
exports.verifyCode = (req, res, next) => {
    return res.status(200).json({ msg: "Code verify" });
};
