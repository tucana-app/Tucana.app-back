const controller = require("../controllers").rating;

module.exports = (app) => {
  app.get(
    "/api/rating/get-ratings-received-passenger",
    controller.getRatingsReceivedPassenger
  );

  app.get(
    "/api/rating/get-ratings-given-passenger",
    controller.getRatingsGivenPassenger
  );

  app.get(
    "/api/rating/get-ratings-received-driver",
    controller.getRatingsReceivedDriver
  );

  app.get(
    "/api/rating/get-ratings-given-driver",
    controller.getRatingsGivenDriver
  );

  app.get(
    "/api/rating/get-ratings-to-do-passenger",
    controller.getRatingsToDoAsPassenger
  );

  app.get(
    "/api/rating/get-ratings-to-do-driver",
    controller.getRatingsToDoAsDriver
  );

  app.post(
    "/api/rating/submit-passenger-rating-form",
    controller.addRatingFromPassenger
  );

  app.post(
    "/api/rating/submit-driver-rating-form",
    controller.addRatingFromDriver
  );
};
