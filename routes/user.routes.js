const { verifySignUp } = require("../middleware");
const controller = require("../controllers").user;

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/user/signup",
    [verifySignUp.checkDuplicate],
    controller.signup
  );

  app.put("/api/user/confirm", controller.confirmEmail);

  app.post("/api/user/signin", controller.signin);

  app.get(
    "/api/user/send-email-forgot-password",
    controller.sendForgotPasswordEmail
  );

  app.get(
    "/api/user/check-deprecated-link-reset-password",
    controller.checkDeprecatedLinkResetPassword
  );

  app.put("/api/user/reset-password", controller.resetPassword);

  app.post(
    "/api/user/resend-confirmation-link",
    controller.resendConfirmationLink
  );

  app.get(
    "/api/user/submissions-become-driver",
    controller.submissionsBecomeDriver
  );

  app.post("/api/user/submit-become-driver", controller.submitBecomeDriver);

  app.get("/api/user/driver-state", controller.updateDriverState);

  app.post("/api/user/submit-contact-form", controller.submitFormContact);
};
