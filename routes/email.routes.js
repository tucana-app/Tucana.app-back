const controller = require("../controllers").email;

module.exports = (app) => {
  app.post("/api/email/send-email", controller.sendEmail);
};
