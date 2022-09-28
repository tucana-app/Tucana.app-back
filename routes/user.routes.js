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

  app.post("/api/user/set-user-avatar", controller.setUserAvatar);

  app.post("/api/user/set-user-first-setup", controller.setUserFirstSetup);

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
    "/api/user/applications-become-driver",
    controller.getApplicationsBecomeDriver
  );

  app.get(
    "/api/user/application-become-driver",
    controller.getApplicationBecomeDriver
  );

  app.post("/api/user/submit-become-driver", controller.submitBecomeDriver);

  app.get("/api/user/driver-state", controller.updateDriverState);

  app.get("/api/user/update-ratings", controller.updateUserRatings);

  app.get("/api/user/update-experience", controller.updateUserExperience);

  app.get("/api/user/update", controller.updateUser);

  app.post("/api/user/submit-contact-form", controller.submitContactForm);

  app.post("/api/user/submit-edit-bio", controller.submitEditBio);

  app.post("/api/user/submit-edit-password", controller.submitEditPassword);

  app.post("/api/user/submit-close-account", controller.submitCloseAccount);

  app.get("/api/user/is-account-closed", controller.isAccountClosed);
};
