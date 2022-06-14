"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Ride extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Ride.belongsTo(models.Driver, {
        onDelete: "NO ACTION",
      });

      Ride.belongsTo(models.RideStatus, {
        onDelete: "NO ACTION",
      });

      Ride.hasOne(models.Booking, {
        onDelete: "NO ACTION",
      });

      Ride.hasMany(models.Conversation, {
        onDelete: "NO ACTION",
      });
    }
  }
  Ride.init(
    {
      DriverId: DataTypes.INTEGER,
      origin: DataTypes.JSONB,
      destination: DataTypes.JSONB,
      dateTimeOrigin: DataTypes.DATE,
      dateTimeDestination: DataTypes.DATE,
      ETA: DataTypes.JSONB,
      price: DataTypes.INTEGER,
      seatsAvailable: DataTypes.INTEGER,
      seatsLeft: DataTypes.INTEGER,
      comment: DataTypes.STRING,
      RideStatusId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Ride",
    }
  );
  return Ride;
};
