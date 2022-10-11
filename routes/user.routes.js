const { verifySignUp, authJwt } = require("../middleware");
const controller = require("../controllers").user;

module.exports = function (app) {
  app.post(
    "/api/user/signup",
    [verifySignUp.checkDuplicate],
    controller.signup
  );

  app.put("/api/user/confirm", controller.confirmEmail);

  app.post("/api/user/signin", controller.signin);

  app.post(
    "/api/user/set-user-avatar",
    [authJwt.verifyToken],
    controller.setUserAvatar
  );

  app.post(
    "/api/user/set-user-first-setup",
    [authJwt.verifyToken],
    controller.setUserFirstSetup
  );

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
    [authJwt.verifyToken],
    controller.getApplicationsBecomeDriver
  );

  app.get(
    "/api/user/application-become-driver",
    [authJwt.verifyToken],
    controller.getApplicationBecomeDriver
  );

  app.post(
    "/api/user/submit-become-driver",
    [authJwt.verifyToken],
    controller.submitBecomeDriver
  );

  app.get(
    "/api/user/driver-state",
    [authJwt.verifyToken],
    controller.updateDriverState
  );

  app.get(
    "/api/user/update-ratings",
    [authJwt.verifyToken],
    controller.updateUserRatings
  );

  app.get(
    "/api/user/update-experience",
    [authJwt.verifyToken],
    controller.updateUserExperience
  );

  app.get("/api/user/update", [authJwt.verifyToken], controller.updateUser);

  app.post(
    "/api/user/submit-contact-form",
    [authJwt.verifyToken],
    controller.submitContactForm
  );

  app.put(
    "/api/user/submit-edit-bio",
    [authJwt.verifyToken],
    controller.submitEditBio
  );

  app.put(
    "/api/user/submit-edit-password",
    [authJwt.verifyToken],
    controller.submitEditPassword
  );

  app.put(
    "/api/user/submit-edit-date-of-birth",
    [authJwt.verifyToken],
    controller.submitEditDateOfBirth
  );

  app.post(
    "/api/user/submit-close-account",
    [authJwt.verifyToken],
    controller.submitCloseAccount
  );

  app.get(
    "/api/user/is-account-closed",
    [authJwt.verifyToken],
    controller.isAccountClosed
  );

  app.get(
    "/api/profile/:username",
    [authJwt.verifyToken],
    controller.getPublicProfile
  );

  app.get(
    "/api/driver/get-earnings",
    [authJwt.verifyToken],
    controller.driverEarnings
  );

  app.get(
    "/api/driver/:username",
    [authJwt.verifyToken],
    controller.getDriverProfile
  );
};
