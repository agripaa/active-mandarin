'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Recruitment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Recruitment.init({
    nama: DataTypes.STRING,
    email: DataTypes.STRING,
    telepon: DataTypes.STRING,
    domisili: DataTypes.STRING,
    posisi: DataTypes.STRING,
    portofolio: DataTypes.STRING,
    cv_file: DataTypes.STRING,
    isDelete: {type: DataTypes.BOOLEAN, defaultValue: false},
  }, {
    sequelize,
    modelName: 'Recruitment',
  });
  return Recruitment;
};