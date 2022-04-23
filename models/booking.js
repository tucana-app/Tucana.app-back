"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Booking.belongsTo(models.User, {
        onDelete: "NO ACTION",
      });

      Booking.belongsTo(models.Driver, {
        onDelete: "NO ACTION",
      });

      Booking.belongsTo(models.Ride, {
        onDelete: "NO ACTION",
      });

      Booking.belongsTo(models.BookingStatus, {
        onDelete: "NO ACTION",
      });
    }
  }
  Booking.init(
    {
      UserId: DataTypes.INTEGER,
      DriverId: DataTypes.INTEGER,
      RideId: DataTypes.INTEGER,
      BookingStatusId: DataTypes.INTEGER,
      seatsBooked: DataTypes.INTEGER,
      commentPassenger: DataTypes.STRING,
      commentDriver: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Booking",
    }
  );
  return Booking;
};
