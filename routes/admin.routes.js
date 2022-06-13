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
    "/api/admin/user/all-drivers-application",
    controller.adminAllDriversApplication
  );

  app.get(
    "/api/admin/user/single-driver-application",
    controller.adminSingleDriverApplication
  );

  app.post(
    "/api/admin/user/submit-verif-driver-application",
    controller.submitVerifDriverApplication
  );
};
