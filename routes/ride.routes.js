const controller = require("../controllers").ride;

module.exports = (app) => {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/ride/driver-new-rides-requests",
    controller.getDriverNewRidesRequests
  );

  app.get(
    "/api/ride/passenger-bookings-responses",
    controller.getPassengerBookingsResponses
  );

  app.get("/api/ride/user-rides", controller.getDriverRides);

  app.get("/api/ride/filtered-rides", controller.getFilteredRides);

  app.get("/api/ride/get-eta", controller.getETA);

  app.post("/api/ride/add-ride", controller.addRide);

  app.post("/api/ride/book", controller.bookRide);

  app.put("/api/booking/driver-response", controller.driverResponseBooking);

  app.get("/api/ride/user-bookings-ride", controller.getUserBookingsRide);

  app.get("/api/ride/driver-bookings-ride", controller.getDriverBookingsRide);

  app.get("/api/ride/user-bookings", controller.getUserBookings);

  app.get("/api/ride/driver-bookings", controller.getDriverBookings);

  app.get("/api/ride/passengers", controller.getPassengers);

  app.get("/api/ride/rides-to-confirm", controller.getRidesToConfirm);

  app.post("/api/ride/form-confirm-ride", controller.confirmRide);

  app.get("/api/ride/:rideId", controller.getRide);

  app.get("/api/driver/:username", controller.getDriverProfile);

  app.get("/api/booking/:bookingId", controller.getBooking);
};
