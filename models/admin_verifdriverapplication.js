"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class admin_VerifDriverApplication extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      admin_VerifDriverApplication.belongsTo(models.Admin, {
        onDelete: "NO ACTION",
      });
    }
  }
  admin_VerifDriverApplication.init(
    {
      AdminId: DataTypes.INTEGER,
      DriverApplicationId: DataTypes.INTEGER,
      accepted: DataTypes.BOOLEAN,
      comment: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "admin_VerifDriverApplication",
    }
  );
  return admin_VerifDriverApplication;
};
