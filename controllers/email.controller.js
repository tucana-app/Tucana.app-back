var nodemailer = require("nodemailer");
require("dotenv").config;

const { findEmails, findPhones, findLinks } = require("./helpers");
const { convert } = require("html-to-text");

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

module.exports = {
  sendEmail(user, template) {
    var mailOptions = {
      from: `Ride.CR <${process.env.EMAIL_ADDRESS}>`,
      to: `${user.firstName} ${user.lastName} <${user.email}>`,
      subject: template.subject,
      text: template.text,
      html: template.html,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        // console.log("Error:", error);
      } else {
        // console.log("Email sent: ", info.response);
      }
    });
  },
};
