'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Recruitment extends Model {
    static associate(models) {
      // Jika ada relasi, tambahkan di sini
    }
  }

  Recruitment.init(
    {
      nama: {
        type: DataTypes.STRING(125),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(125),
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      telepon: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      domisili: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      posisi: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      portofolio: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      cv_file: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          is: /(\.pdf)$/i, // Pastikan hanya file PDF
        },
      },
      isDelete: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: 'Recruitment',
      tableName: 'recruitments',
      timestamps: true,
    }
  );

  return Recruitment;
};
