const { authJwt } = require("../middleware");
const controller = require("../controllers").rating;

module.exports = (app) => {
  app.get(
    "/api/rating/get-ratings-received-passenger",
    [authJwt.verifyToken],
    controller.getRatingsReceivedPassenger
  );

  app.get(
    "/api/rating/get-ratings-given-passenger",
    [authJwt.verifyToken],
    controller.getRatingsGivenPassenger
  );

  app.get(
    "/api/rating/get-ratings-received-driver",
    [authJwt.verifyToken],
    controller.getRatingsReceivedDriver
  );

  app.get(
    "/api/rating/get-ratings-given-driver",
    [authJwt.verifyToken],
    controller.getRatingsGivenDriver
  );

  app.get(
    "/api/rating/get-rating-to-do",
    [authJwt.verifyToken],
    controller.getRatingToDo
  );

  app.get(
    "/api/rating/get-ratings-to-do-passenger",
    [authJwt.verifyToken],
    controller.getRatingsToDoAsPassenger
  );

  app.get(
    "/api/rating/get-ratings-to-do-driver",
    [authJwt.verifyToken],
    controller.getRatingsToDoAsDriver
  );

  app.post(
    "/api/rating/submit-rating-form",
    [authJwt.verifyToken],
    controller.submitRating
  );

  app.get(
    "/api/driver/:username/ratings",
    [authJwt.verifyToken],
    controller.getDriverRatings
  );

  app.get(
    "/api/passenger/:username/ratings",
    [authJwt.verifyToken],
    controller.getPassengerRatings
  );
};
