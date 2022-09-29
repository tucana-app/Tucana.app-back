const { verifySignUp } = require("../middleware");
const controller = require("../controllers").global;

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/global/constants", controller.getContants);

  app.get("/api/global/levels", controller.getLevels);
};
