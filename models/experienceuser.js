"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ExperienceUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ExperienceUser.belongsTo(models.User, {
        onDelete: "NO ACTION",
      });

      ExperienceUser.belongsTo(models.ExperienceUserLevel, {
        onDelete: "NO ACTION",
      });
    }
  }
  ExperienceUser.init(
    {
      UserId: DataTypes.INTEGER,
      ExperienceUserLevelId: DataTypes.INTEGER,
      points: DataTypes.INTEGER,
      currentFilter: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ExperienceUser",
    }
  );
  return ExperienceUser;
};
