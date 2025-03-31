'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Donation extends Model {}

  Donation.init({
    nama: DataTypes.STRING,
    email: DataTypes.STRING,
    payment_method: DataTypes.STRING,
    proof_payment: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Donation',
    tableName: 'donation'
  });

  return Donation;
};
