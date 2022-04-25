"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class admin_VerifDriverInfo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      admin_VerifDriverInfo.belongsTo(models.Admin, {
        onDelete: "NO ACTION",
      });
    }
  }
  admin_VerifDriverInfo.init(
    {
      AdminId: DataTypes.INTEGER,
      DriverInfoId: DataTypes.INTEGER,
      accepted: DataTypes.BOOLEAN,
      comment: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "admin_VerifDriverInfo",
    }
  );
  return admin_VerifDriverInfo;
};
