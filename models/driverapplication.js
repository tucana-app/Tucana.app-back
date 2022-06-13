"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DriverApplication extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      DriverApplication.belongsTo(models.User, {
        onDelete: "NO ACTION",
      });

      DriverApplication.hasMany(models.admin_VerifDriverApplication, {
        onDelete: "NO ACTION",
      });
    }
  }
  DriverApplication.init(
    {
      UserId: DataTypes.INTEGER,
      document: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "DriverApplication",
    }
  );
  return DriverApplication;
};
