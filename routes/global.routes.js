const { authJwt } = require("../middleware");
const controller = require("../controllers").global;

module.exports = function (app) {
  app.get(
    "/api/global/constants",
    [authJwt.verifyToken],
    controller.getContants
  );

  app.get("/api/global/levels", [authJwt.verifyToken], controller.getLevels);
};
