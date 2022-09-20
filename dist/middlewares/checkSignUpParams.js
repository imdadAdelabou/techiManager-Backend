"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const SignUp_1 = require("../models/SignUp");
exports.checkSignUpParams = (req, res, next) => {
    const keys = req.body;
    const signUpData = new SignUp_1.SignUp();
    signUpData.email = keys.email;
    signUpData.firstName = keys.firstName;
    signUpData.lastName = keys.lastName;
    signUpData.password = keys.password;
    signUpData.role = keys.role;
    (0, class_validator_1.validate)(signUpData).then((errors) => {
        if (errors.length > 0)
            return res.status(400).json({ msg: "Bad request", errors: errors });
        next();
    });
};
