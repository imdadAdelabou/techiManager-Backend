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
const checkIfUserExist_1 = require("../middlewares/checkIfUserExist");
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
exports.verifyCode = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const code = req.body.code;
    const codes = [];
    if (!email || !code) {
        return res
            .status(400)
            .json({ msg: "Bad request", errors: { keys: ["email", "code"] } });
    }
    try {
        // Rechercher l'utilisateur qui dispose de ce mail dans la collection codes
        const queryMatching = (0, firestore_1.query)(codeRef, (0, firestore_1.where)("email", "==", email));
        const docs = yield (0, firestore_1.getDocs)(queryMatching);
        docs.forEach((doc) => codes.push(doc.data()));
        //Si aucun code n'est relié a cette adresse email dans la collection codes, retourner une erreur
        if (!(codes.length > 0))
            return res.status(404).json({
                msg: "No verification code is linked to this email address or user don't exist",
                keys: ["no-code"],
            });
        //Dans le cas qu'un code est associé à cette adresse mail
        // mais que le code envoyé par l'utilsateur est différente de celle stocké dans la base de donnée
        //retourner une erreur
        if (!(codes[0].code === code))
            return res.status(400).json({
                msg: "Wrong confirmation code",
                erros: { keys: ["wrong-code"] },
            });
        // Dans le cas contraire, lorsque le code envoyé par l'utilisateur est correcte
        // Mettre à true la propriété isActive lié au document de l'utilisateur
        const ifUserExist = yield (0, checkIfUserExist_1.checkIfUserExist)(email);
        if (typeof ifUserExist === "boolean") {
            throw "User don't exist";
        }
        yield (0, firestore_1.updateDoc)((0, firestore_1.doc)(db, "users", ifUserExist.id), {
            isActive: true,
        });
        return res
            .status(200)
            .json({ msg: "Thanks for confirming your email address" });
    }
    catch (e) {
        return res.status(500).json({ msg: "Internal server error", erros: e });
    }
});
