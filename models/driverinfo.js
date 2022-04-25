"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DriverInfo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      DriverInfo.belongsTo(models.User, {
        onDelete: "NO ACTION",
      });

      DriverInfo.hasMany(models.admin_VerifDriverInfo, {
        onDelete: "NO ACTION",
      });
    }
  }
  DriverInfo.init(
    {
      UserId: DataTypes.INTEGER,
      document: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "DriverInfo",
    }
  );
  return DriverInfo;
};
