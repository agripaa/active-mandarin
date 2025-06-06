'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Soal extends Model {
    static associate(models) {
      Soal.belongsTo(models.TipeUjian, { foreignKey: 'tipe_ujian_id' });
      Soal.belongsTo(models.ListJawaban, { foreignKey: 'list_jawaban_id' });
      Soal.hasMany(models.JawabanUser, { foreignKey: 'soal_id' });
    }
  }

  Soal.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    tipe_ujian_id: {
      type: DataTypes.INTEGER
    },
    index_soal: {
      type: DataTypes.INTEGER
    },
    pertanyaan: {
      type: DataTypes.TEXT
    },
    file_soal: {
      type: DataTypes.STRING
    },
    skor_soal: {
      type: DataTypes.INTEGER
    },
    tipe_soal: {
      type: DataTypes.STRING
    },
    penjelasan: {
      type: DataTypes.TEXT
    },
    list_jawaban_id: {
      type: DataTypes.INTEGER
    },
    mutiple: {
      type: DataTypes.BOOLEAN
    },
    point_soal: {
      type: DataTypes.INTEGER
    },
    jawaban_benar: {
      type: DataTypes.STRING
    },
    soal_awal: {
      type: DataTypes.STRING
    },
    soal_akhir: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Soal',
    tableName: 'soal',
    timestamps: true
  });

  return Soal;
};
