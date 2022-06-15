const controller = require("../controllers").admin;

module.exports = (app) => {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/admin/user/signin", controller.adminSignin);

  app.get("/api/admin/list-users", controller.adminListUsers);

  app.get("/api/admin/list-rides", controller.adminListRides);

  app.get("/api/admin/single-ride", controller.adminSingleRide);

  app.get(
    "/api/admin/single-ride-all-bookings",
    controller.adminSingleRideAllBookings
  );

  app.get(
    "/api/admin/get-passengers-ratings",
    controller.adminPassengersRatings
  );

  app.get("/api/admin/get-drivers-ratings", controller.adminDriversRatings);

  app.get(
    "/api/admin/all-drivers-applications",
    controller.adminAllDriversApplications
  );

  app.get("/api/admin/driver-application", controller.adminDriverApplication);

  app.post(
    "/api/admin/submit-verif-driver-application",
    controller.submitVerifDriverApplication
  );

  app.get("/api/admin/passenger-rating", controller.adminGetPassengerRating);

  app.post(
    "/api/admin/submit-verif-passenger-rating",
    controller.submitVerifPassengerRating
  );
};
