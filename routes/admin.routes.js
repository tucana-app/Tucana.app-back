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

  app.get(
    "/api/admin/cron/after-ride",
    [authJwt.verifyToken],
    controller.cronAfterRide
  );

  app.get(
    "/api/admin/cron/before-ride",
    [authJwt.verifyToken],
    controller.cronBeforeRide
  );

  app.get(
    "/api/admin/list-conversations",
    [authJwt.verifyToken],
    controller.adminListConversations
  );

  app.get(
    "/api/admin/single-conversation",
    [authJwt.verifyToken],
    controller.adminSingleConversation
  );

  app.get(
    "/api/admin/list-bookings",
    [authJwt.verifyToken],
    controller.adminListBookings
  );

  app.get(
    "/api/admin/single-booking",
    [authJwt.verifyToken],
    controller.adminSingleBooking
  );

  app.get(
    "/api/admin/single-user",
    [authJwt.verifyToken],
    controller.adminSingleUser
  );

  app.get(
    "/api/admin/single-user-all-bookings-made",
    [authJwt.verifyToken],
    controller.adminSingleUserAllBookingsMade
  );

  app.get(
    "/api/admin/single-driver-all-rides-published",
    [authJwt.verifyToken],
    controller.adminSingleDriverAllRidesPublished
  );

  app.get(
    "/api/admin/single-driver-all-bookings-received",
    [authJwt.verifyToken],
    controller.adminSingleDriverAllBookingsReceived
  );

  app.get(
    "/api/admin/list-feedbacks",
    [authJwt.verifyToken],
    controller.adminListFeedbacks
  );
};
