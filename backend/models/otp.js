'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class OTP extends Model {
    static associate(models) {
      OTP.belongsTo(models.User, { foreignKey: 'user_id' });
    }
  }

  OTP.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    otp_code: {
      type: DataTypes.STRING(6),
      allowNull: false,
    },
    expires_at: {
      type: DataTypes.DATE,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'OTP',
    tableName: 'otps',
    freezeTableName: true,
    timestamps: true,
  });

  return OTP;
};
