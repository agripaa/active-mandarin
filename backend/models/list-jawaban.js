'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ListJawaban extends Model {
    static associate(models) {
        ListJawaban.hasMany(models.Soal, {foreignKey: 'list_jawaban_id'})
        ListJawaban.hasMany(models.JawabanUser, { foreignKey: 'list_jawaban_id' });
    }
  }

  ListJawaban.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    jawaban: {
      type: DataTypes.STRING
    },
    isTrue: {
      type: DataTypes.BOOLEAN
    },
    position: {
      type: DataTypes.CHAR(2)
    }
  }, {
    sequelize,
    modelName: 'ListJawaban',
    tableName: 'list_jawaban',
    timestamps: true
  });

  return ListJawaban;
};
