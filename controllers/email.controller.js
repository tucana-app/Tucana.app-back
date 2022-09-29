const path = require("path");
const fileName = path.basename(__filename);
const nodemailer = require("nodemailer");
require("dotenv").config;

const { consoleError } = require("../helpers");

const transporter = nodemailer.createTransport({
  host: "mail.privateemail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    ciphers: "SSLv3",
  },
});

const transporterAdmin = nodemailer.createTransport({
  host: "mail.privateemail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_ADMIN_ADDRESS,
    pass: process.env.EMAIL_ADMIN_PASSWORD,
  },
  tls: {
    ciphers: "SSLv3",
  },
});

module.exports = {
  sendEmail(user, template) {
    var mailOptions = {
      from: `Tucána <${process.env.EMAIL_ADDRESS}>`,
      to: `${user.firstName} ${user.lastName} <${user.email}>`,
      subject: template.subject,
      text: template.text,
      html: template.html,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        consoleError(fileName, "sendEmail", Error().stack, error);
      } else {
        // console.log("Email sent: ", info.response);
      }
    });
  },

  sendEmailToAdmin(template) {
    var mailOptions = {
      from: `Tucána <${process.env.EMAIL_ADMIN_ADDRESS}>`,
      to: `Tucána <${process.env.EMAIL_ADMIN_ADDRESS}>`,
      subject: template.subject,
      text: template.text,
      html: template.html,
    };

    transporterAdmin.sendMail(mailOptions, function (error, info) {
      if (error) {
        consoleError(fileName, "sendEmailToAdmin", Error().stack, error);
      } else {
        // console.log("Email sent: ", info.response);
      }
    });
  },
};
