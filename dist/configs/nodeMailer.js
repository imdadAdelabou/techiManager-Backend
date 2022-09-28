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
    return __awaiter(this, void 0, void 0, function* () {
        mailConfigurations["to"] = receiverEmail;
        mailConfigurations["subject"] = subject;
        mailConfigurations["text"] = "Hello";
        const template = dynamicTemplate("../templates/emails/signUpConfirmationCode.html", data);
        mailConfigurations["html"] = template;
        return yield sgMail.send(mailConfigurations);
    });
}
exports.sendMail = sendMail;
