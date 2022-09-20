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
const bcrypt_1 = require("bcrypt");
const configFirebase = require("../configs/firebase");
const db = configFirebase.db;
const visitorsRef = (0, firestore_1.collection)(db, "users");
const docUser = (0, firestore_1.doc)(db, "users");
function logIn(req, res, next) {
    return res.status(200).json({ data: "Everything work fine" });
}
function signUp(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const keys = req.body;
        const querySignUp = (0, firestore_1.query)(visitorsRef, (0, firestore_1.where)("email", "==", keys.email));
        const oldUsers = [];
        try {
            const querySnaphot = yield (0, firestore_1.getDocs)(querySignUp);
            querySnaphot.forEach((doc) => {
                oldUsers.push(doc.data());
            });
            if (oldUsers.length > 0) {
                return res.status(400).json({
                    msg: "Account already exists",
                    errors: { keys: "user-exist" },
                });
            }
            console.log("here");
            const encryptedPassword = yield (0, bcrypt_1.hash)(keys.password, 10);
            const userToSave = {
                firstName: keys.firstName,
                lastName: keys.lastName,
                email: keys.email,
                password: encryptedPassword,
                role: keys.role,
                isActive: false,
            };
            // const result = await addDoc(visitorsRef, userToSave);
            // console.log(result, "<<<=== Stock user");
            return res
                .status(201)
                .json({ msg: "User created", data: { user: userToSave } });
        }
        catch (e) {
            return res.status(500).json({ msg: "Internal server error" });
        }
    });
}
module.exports = {
    logIn: logIn,
    signUp: signUp,
};
