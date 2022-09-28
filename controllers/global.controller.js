const path = require("path");
const fileName = path.basename(__filename);
require("dotenv").config;

const db = require("../models");
const Constant = db.Constant;

const { consoleError } = require("./helpers");

const errorMessage = { message: "A problem occured with this request" };

module.exports = {
  getContants(req, res) {
    return Constant.findAll()
      .then((response) => {
        // console.log(response);
        res.status(200).send(response);
      })
      .catch((error) => {
        consoleError(fileName, arguments.callee.name, Error().stack, error);
        res.status(400).send({ message: "NOK", flag: "FAIL" });
      });
  },
};
