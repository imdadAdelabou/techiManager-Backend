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
const class_validator_1 = require("class-validator");
const types_1 = require("../helpers/types");
const SignUp_1 = require("../models/SignUp");
const checkIfUserExist_1 = require("./checkIfUserExist");
const isAdminOrGarden_1 = require("./isAdminOrGarden");
exports.checkSignUpParams = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const keys = req.body;
    const signUpData = new SignUp_1.SignUp();
    signUpData.email = keys.email;
    signUpData.firstName = keys.firstName;
    signUpData.lastName = keys.lastName;
    signUpData.password = keys.password;
    signUpData.role = keys.role;
    (0, class_validator_1.validate)(signUpData).then((errors) => __awaiter(void 0, void 0, void 0, function* () {
        if (errors.length > 0)
            return res.status(400).json({ msg: "Bad request", errors: errors });
        const result = yield (0, checkIfUserExist_1.checkIfUserExist)(signUpData.email);
        if (typeof result != "boolean")
            return res.status(400).json({
                msg: "Account already exists",
                errors: { keys: "user-exist" },
            });
        if (isAdminOrGarden_1.matching[signUpData.role] != types_1.RoleType.user) {
            let codeAdmin = req.body.code;
            if (!codeAdmin)
                return res.status(401).json({
                    msg: "Admin code is required",
                    errors: { keys: ["admin-code-required"] },
                });
            if (codeAdmin != process.env.ADMIN_CODE)
                return res.status(401).json({
                    msg: "Wrong admin code",
                    errors: { keys: ["wrong-admin-code"] },
                });
        }
        next();
    }));
});
