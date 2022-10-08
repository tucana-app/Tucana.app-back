const { authJwt } = require("../middleware");
const controller = require("../controllers").ride;

module.exports = (app) => {
  app.get(
    "/api/ride/driver-new-rides-requests",
    [authJwt.verifyToken],
    controller.getDriverNewRidesRequests
  );

  app.get(
    "/api/ride/passenger-bookings-responses",
    [authJwt.verifyToken],
    controller.getPassengerBookingsResponses
  );

  app.get(
    "/api/ride/driver-rides",
    [authJwt.verifyToken],
    controller.getDriverRides
  );

  app.get(
    "/api/ride/filtered-rides",
    [authJwt.verifyToken],
    controller.getFilteredRides
  );

  app.get("/api/ride/get-eta", [authJwt.verifyToken], controller.getETA);

  app.post("/api/ride/add-ride", [authJwt.verifyToken], controller.addRide);

  app.post("/api/ride/book", [authJwt.verifyToken], controller.bookRide);

  app.put(
    "/api/booking/driver-response",
    [authJwt.verifyToken],
    controller.driverResponseBooking
  );

  app.get(
    "/api/ride/user-bookings-ride",
    [authJwt.verifyToken],
    controller.getUserBookingsRide
  );

  app.get(
    "/api/ride/driver-bookings-ride",
    [authJwt.verifyToken],
    controller.getDriverBookingsRide
  );

  app.get(
    "/api/ride/user-bookings",
    [authJwt.verifyToken],
    controller.getUserBookings
  );

  app.get(
    "/api/ride/driver-bookings",
    [authJwt.verifyToken],
    controller.getDriverBookings
  );

  app.get(
    "/api/ride/passengers",
    [authJwt.verifyToken],
    controller.getPassengers
  );

  app.get(
    "/api/ride/rides-to-complete",
    [authJwt.verifyToken],
    controller.ridesToConfirm
  );

  app.get(
    "/api/ride/ride-to-complete",
    [authJwt.verifyToken],
    controller.rideToConfirm
  );

  app.post(
    "/api/ride/submit-complete-ride",
    [authJwt.verifyToken],
    controller.completeRide
  );

  app.get(
    "/api/ride/nb-rides-online",
    [authJwt.verifyToken],
    controller.nbRidesOnline
  );

  app.get("/api/ride/:rideId", [authJwt.verifyToken], controller.getRide);
};
