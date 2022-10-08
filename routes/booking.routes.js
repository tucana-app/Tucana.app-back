const { authJwt } = require("../middleware");
const controller = require("../controllers").booking;

module.exports = function (app) {
  app.put(
    "/api/booking/submit-cancel",
    [authJwt.verifyToken],
    controller.submitCancelBooking
  );

  app.get(
    "/api/booking/:bookingId",
    [authJwt.verifyToken],
    controller.getBooking
  );
};
