"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RideFeedback extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      RideFeedback.belongsTo(models.User, {
        onDelete: "NO ACTION",
      });

      RideFeedback.belongsTo(models.Ride, {
        onDelete: "NO ACTION",
      });

      RideFeedback.belongsTo(models.Booking, {
        onDelete: "NO ACTION",
      });
    }
  }
  RideFeedback.init(
    {
      UserId: DataTypes.INTEGER,
      RideId: DataTypes.INTEGER,
      BookingId: DataTypes.INTEGER,
      isConfirmed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "RideFeedback",
    }
  );
  return RideFeedback;
};
