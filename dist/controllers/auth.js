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
const jwt = require("jsonwebtoken");
const bcrypt_1 = require("bcrypt");
const checkIfUserExist_1 = require("../middlewares/checkIfUserExist");
const configFirebase = require("../configs/firebase");
const db = configFirebase.db;
const visitorsRef = (0, firestore_1.collection)(db, "users");
function logIn(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        const user = yield (0, checkIfUserExist_1.checkIfUserExist)(email);
        if (typeof user === "boolean")
            return res
                .status(404)
                .json({ msg: "No user with this e-mail address exists" });
        const isSame = yield (0, bcrypt_1.compare)(password, user.password);
        if (!isSame)
            return res
                .status(401)
                .json({ msg: "Wrong password", erros: { keys: ["wrong-password"] } });
        if (!user.isActive)
            return res.status(401).json({
                msg: "You must verify your account before logging in with account",
            });
        const token = jwt.sign({ userId: user.id, email: user.email }, process.env.TOKEN_KEY, { expiresIn: "2h" });
        return res.status(200).json({ data: "User is logged", token: token });
    });
}
function signUp(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const keys = req.body;
        try {
            // if user hav'nt not account hash the password using bcrypt
            const encryptedPassword = yield (0, bcrypt_1.hash)(keys.password, 10);
            const userToSave = {
                firstName: keys.firstName,
                lastName: keys.lastName,
                email: keys.email,
                password: encryptedPassword,
                role: keys.role,
                isActive: false,
            };
            //Add User Information on firebase
            const result = yield (0, firestore_1.addDoc)(visitorsRef, userToSave);
            yield (0, firestore_1.updateDoc)((0, firestore_1.doc)(db, "users", result.id), {
                id: result.id,
            });
            userToSave["id"] = result.id;
            //Return a response
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
