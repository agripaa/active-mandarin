'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AffiliateDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      AffiliateDetail.associate = (models) => {
        AffiliateDetail.hasMany(models.User, { foreignKey: 'detail_affiliate' });
      };
    }
  }
  AffiliateDetail.init({
    type_affiliate: DataTypes.STRING,
    reason: DataTypes.STRING,
    platform: DataTypes.STRING,
    know_program: DataTypes.STRING,
    isDelete: {type: DataTypes.BOOLEAN, defaultValue: false},
  }, {
    sequelize,
    modelName: 'AffiliateDetail',
    tableName: 'affiliate_details'
  });
  return AffiliateDetail;
};