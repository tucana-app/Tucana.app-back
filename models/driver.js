"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Driver extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Driver.belongsTo(models.User, {
        onDelete: "NO ACTION",
      });

      Driver.hasMany(models.Ride, {
        onDelete: "NO ACTION",
      });

      Driver.hasMany(models.Booking, {
        onDelete: "NO ACTION",
      });

      Driver.hasMany(models.Conversation, {
        onDelete: "NO ACTION",
      });

      Driver.hasOne(models.Car, {
        onDelete: "CASCADE",
      });

      Driver.hasMany(models.PassengerRating, {
        onDelete: "CASCADE",
      });

      Driver.hasMany(models.DriverRating, {
        onDelete: "CASCADE",
      });
    }
  }
  Driver.init(
    {
      UserId: DataTypes.INTEGER,
      idType: DataTypes.STRING,
      idNumber: DataTypes.STRING,
      idCountry: DataTypes.STRING,
      licenseNumber: DataTypes.STRING,
      licenseCountry: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Driver",
    }
  );
  return Driver;
};
