'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Soal extends Model {
    static associate(models) {
      Soal.belongsTo(models.TipeUjian, {
      foreignKey: 'tipe_ujian_id',
      as: 'TipeUjian' // ← pakai alias
    });



      Soal.hasMany(models.ListJawaban, {
        foreignKey: 'soal_id',
        as: 'ListJawabans'
      });
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
      type: DataTypes.INTEGER,
      allowNull: false
    },
    index_soal: DataTypes.INTEGER,
    pertanyaan: DataTypes.TEXT,
    file_soal: DataTypes.STRING,
    skor_soal: DataTypes.INTEGER,
    tipe_soal: DataTypes.STRING,
    penjelasan: DataTypes.TEXT,
    mutiple: DataTypes.BOOLEAN,
    point_soal: DataTypes.INTEGER,
    jawaban_benar: DataTypes.STRING,
    soal_awal: DataTypes.STRING,
    soal_akhir: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Soal',
    tableName: 'soal',
    timestamps: true
  });

  return Soal;
};
