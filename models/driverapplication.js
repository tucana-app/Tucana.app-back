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
      idType: DataTypes.STRING,
      idNumber: DataTypes.STRING,
      idCountry: DataTypes.STRING,
      licenseNumber: DataTypes.STRING,
      licenseCountry: DataTypes.STRING,
      carMaker: DataTypes.STRING,
      carModel: DataTypes.STRING,
      numberPlate: DataTypes.STRING,
      carYear: DataTypes.INTEGER,
      carColor: DataTypes.STRING,
      carMarchamo: DataTypes.INTEGER,
      carRiteve: DataTypes.JSONB,
    },
    {
      sequelize,
      modelName: "DriverApplication",
    }
  );
  return DriverApplication;
};
