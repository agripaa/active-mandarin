'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TipeUjian extends Model {
    static associate(models) {
      TipeUjian.belongsTo(models.Ujian, { foreignKey: 'ujian_id' });
      TipeUjian.hasMany(models.Soal, { foreignKey: 'tipe_ujian_id' });
    }
  }

  TipeUjian.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    category_ujian: {
      type: DataTypes.STRING(255)
    },
    time: {
      type: DataTypes.STRING
    },
    total_soal: {
      type: DataTypes.INTEGER
    },
    ujian_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total_skor_tipe: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'TipeUjian',
    tableName: 'tipe_ujian',
    timestamps: true
  });

  return TipeUjian;
};
