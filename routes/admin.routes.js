const { authJwt } = require("../middleware");
const controller = require("../controllers").admin;

module.exports = (app) => {
  app.post("/api/admin/user/signin", controller.adminSignin);

  app.get(
    "/api/admin/list-users",
    [authJwt.verifyToken],
    controller.adminListUsers
  );

  app.get(
    "/api/admin/list-rides",
    [authJwt.verifyToken],
    controller.adminListRides
  );

  app.get(
    "/api/admin/single-ride",
    [authJwt.verifyToken],
    controller.adminSingleRide
  );

  app.get(
    "/api/admin/single-ride-all-bookings",
    [authJwt.verifyToken],
    controller.adminSingleRideAllBookings
  );

  app.get(
    "/api/admin/get-passengers-ratings",
    [authJwt.verifyToken],
    controller.adminPassengersRatings
  );

  app.get(
    "/api/admin/get-drivers-ratings",
    [authJwt.verifyToken],
    controller.adminDriversRatings
  );

  app.get(
    "/api/admin/all-drivers-applications",
    [authJwt.verifyToken],
    controller.adminAllDriversApplications
  );

  app.get(
    "/api/admin/driver-application",
    [authJwt.verifyToken],
    controller.adminDriverApplication
  );

  app.post(
    "/api/admin/submit-verif-driver-application",
    [authJwt.verifyToken],
    controller.submitVerifDriverApplication
  );

  app.get(
    "/api/admin/passenger-rating",
    [authJwt.verifyToken],
    controller.adminPassengerRating
  );

  app.post(
    "/api/admin/submit-verif-passenger-rating",
    [authJwt.verifyToken],
    controller.submitVerifPassengerRating
  );

  app.get(
    "/api/admin/driver-rating",
    [authJwt.verifyToken],
    controller.adminDriverRating
  );

  app.post(
    "/api/admin/submit-verif-driver-rating",
    [authJwt.verifyToken],
    controller.submitVerifDriverRating
  );
};
