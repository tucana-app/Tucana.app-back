"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ExperienceUserLevel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ExperienceUserLevel.hasOne(models.ExperienceUser);
    }
  }
  ExperienceUserLevel.init(
    {
      min: DataTypes.INTEGER,
      max: DataTypes.INTEGER,
      multiplier: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "ExperienceUserLevel",
    }
  );
  return ExperienceUserLevel;
};
