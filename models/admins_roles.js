"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class admins_roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      admins_roles.belongsTo(models.Admin, {
        onDelete: "NO ACTION",
      });

      admins_roles.belongsTo(models.Role, {
        onDelete: "NO ACTION",
      });
    }
  }
  admins_roles.init(
    {
      AdminId: DataTypes.INTEGER,
      RoleId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "admins_roles",
    }
  );
  return admins_roles;
};
