"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Rating extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Rating.belongsTo(models.User, {
        onDelete: "NO ACTION",
      });
    }
  }
  Rating.init(
    {
      UserId: DataTypes.INTEGER,
      passengerRating: DataTypes.FLOAT,
      driverRating: DataTypes.FLOAT,
      nbPassengerRating: DataTypes.INTEGER,
      nbDriverRating: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Rating",
    }
  );
  return Rating;
};
