"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const Login_1 = require("../models/Login");
exports.checkLoginParams = (req, res, next) => {
    const keys = req.body;
    const loginData = new Login_1.Login();
    loginData.email = keys.email;
    loginData.password = keys.password;
    //Check if user send the correct parameters
    (0, class_validator_1.validate)(loginData).then((errors) => {
        if (errors.length > 0) {
            return res.status(400).json({ msg: "Bad request", errors: errors });
        }
        next();
    });
};
