"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Admin.belongsToMany(models.Role, {
        through: models.admins_roles,
      });

      Admin.hasMany(models.admin_VerifDriverApplication, {
        onDelete: "NO ACTION",
      });

      Admin.hasMany(models.admin_VerifDriverRating, {
        onDelete: "NO ACTION",
      });

      Admin.hasMany(models.admin_VerifPassengerRating, {
        onDelete: "NO ACTION",
      });
    }
  }
  Admin.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Admin",
    }
  );
  return Admin;
};
