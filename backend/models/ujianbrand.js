'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UjianBrand extends Model {
    static associate(models) {
      UjianBrand.belongsTo(models.Ujian, { foreignKey: 'ujian_id' });
      UjianBrand.belongsTo(models.Brand, { foreignKey: 'brand_id' });
    }
  }

  UjianBrand.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    ujian_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    brand_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'UjianBrand',
    tableName: 'ujian_brand',
    timestamps: true
  });

  return UjianBrand;
};
