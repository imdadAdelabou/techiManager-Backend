import Handlebars from "handlebars";
import path from "path";
const fs = require("fs");

const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const mailConfigurations = {
  from: process.env.SENDER_MAIL,
};

function dynamicTemplate(pathFile: string, data: any) {
  const filePath = path.join(__dirname, pathFile);
  const source = fs.readFileSync(filePath, "utf-8").toString();
  const template = Handlebars.compile(source);

  return template(data);
}

export async function sendMail(receiverEmail: string, subject: string, data) {
  mailConfigurations["to"] = receiverEmail;
  mailConfigurations["subject"] = subject;
  mailConfigurations["text"] = "Hello";

  const template = dynamicTemplate(
    "../templates/emails/signUpConfirmationCode.html",
    data
  );
  mailConfigurations["html"] = template;

  return await sgMail.send(mailConfigurations);
}
