"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Constant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  Constant.init(
    {
      key: DataTypes.STRING,
      value: DataTypes.STRING(9999),
    },
    {
      sequelize,
      modelName: "Constant",
    }
  );
  return Constant;
};
