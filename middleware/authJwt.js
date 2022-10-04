const jwt = require("jsonwebtoken");
const config = require("../config/user.config.js");

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(401).send({
      message: "Unauthorized",
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized",
      });
    }
    // Verify the expiracy of the token here

    // console.log(decoded);

    // const d1 = new Date(decoded.iat * 1000);
    // const d2 = new Date(decoded.exp * 1000);
    // const options = {
    //   timeZone: "America/Costa_Rica",
    // };

    // console.log(
    //   d1.toLocaleDateString("es-CR", options),
    //   d1.toLocaleTimeString("es-CR", options)
    // );
    // console.log(
    //   d2.toLocaleDateString("es-CR", options),
    //   d1.toLocaleTimeString("es-CR", options)
    // );

    // req.userId = decoded.id;
    next();
  });
};

const authJwt = {
  verifyToken,
};
module.exports = authJwt;
