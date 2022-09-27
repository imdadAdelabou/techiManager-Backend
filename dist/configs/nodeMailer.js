"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const handlebars_1 = __importDefault(require("handlebars"));
const path_1 = __importDefault(require("path"));
const fs = require("fs");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const mailConfigurations = {
    from: process.env.SENDER_MAIL,
};
function dynamicTemplate(pathFile, data) {
    const filePath = path_1.default.join(__dirname, pathFile);
    const source = fs.readFileSync(filePath, "utf-8").toString();
    const template = handlebars_1.default.compile(source);
    return template(data);
}
function sendMail(receiverEmail, subject, data) {
    mailConfigurations["to"] = receiverEmail;
    mailConfigurations["subject"] = subject;
    mailConfigurations["text"] = "Hello";
    mailConfigurations["headers"] = { "x-myheader": "test header" };
    const template = dynamicTemplate("../templates/emails/signUpConfirmationCode.html", data);
    console.log(template, "Template");
    // console.log(mailConfigurations);
}
exports.sendMail = sendMail;
