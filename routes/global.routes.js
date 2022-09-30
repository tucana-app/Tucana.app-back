const { verifySignUp } = require("../middleware");
const controller = require("../controllers").global;

module.exports = function (app) {
  app.get("/api/global/constants", controller.getContants);

  app.get("/api/global/levels", controller.getLevels);
};
