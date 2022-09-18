"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Booking, {
        onDelete: "NO ACTION",
      });

      User.hasOne(models.Driver, {
        onDelete: "CASCADE",
      });

      User.hasMany(models.Conversation, {
        onDelete: "NO ACTION",
      });

      User.hasMany(models.Message, {
        foreignKey: "SenderId",
        onDelete: "NO ACTION",
      });

      User.hasMany(models.DriverApplication, {
        onDelete: "NO ACTION",
      });

      User.hasMany(models.PassengerRating, {
        onDelete: "CASCADE",
      });

      User.hasMany(models.DriverRating, {
        onDelete: "CASCADE",
      });

      User.hasOne(models.Rating, {
        onDelete: "CASCADE",
      });
    }
  }
  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      username: DataTypes.STRING,
      biography: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      emailConfirmed: DataTypes.BOOLEAN,
      phoneConfirmed: DataTypes.BOOLEAN,
      firstSetUp: DataTypes.BOOLEAN,
      avatar: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
