'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TurunanBrand extends Model {
    static associate(models) {
      TurunanBrand.hasMany(models.Brand, { foreignKey: 'turunan_id', as: 'TurunanBrand'  });
    }
  }

  TurunanBrand.init({
    title: DataTypes.STRING,
    sub_title: DataTypes.STRING,
    turunan: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TurunanBrand',
    tableName: 'turunan_brand'
  });

  return TurunanBrand;
};
