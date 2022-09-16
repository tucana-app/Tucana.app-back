"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Car.belongsTo(models.Driver, {
        onDelete: "NO ACTION",
      });
    }
  }
  Car.init(
    {
      DriverId: DataTypes.STRING,
      maker: DataTypes.STRING,
      model: DataTypes.STRING,
      numberPlate: DataTypes.STRING,
      year: DataTypes.INTEGER,
      color: DataTypes.STRING,
      marchamo: DataTypes.INTEGER,
      riteve: DataTypes.JSONB,
      photo: DataTypes.STRING,
      seats: DataTypes.INTEGER,
      fuelType: DataTypes.STRING,
      comment: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Car",
    }
  );
  return Car;
};
