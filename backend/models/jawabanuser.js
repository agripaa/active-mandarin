'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class JawabanUser extends Model {
    static associate(models) {
      JawabanUser.belongsTo(models.Soal, { foreignKey: 'soal_id'});
      JawabanUser.belongsTo(models.User, { foreignKey: 'user_id' });
      JawabanUser.belongsTo(models.ListJawaban, { foreignKey: 'list_jawaban_id' });
    }
  }

  JawabanUser.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    soal_id: {
      type: DataTypes.INTEGER
    },
    user_id: {
      type: DataTypes.INTEGER
    },
    input_jawaban: {
      type: DataTypes.STRING
    },
    list_jawaban_id: {
      type: DataTypes.INTEGER
    },
    poing: { 
      type: DataTypes.INTEGER
    },
    isTrue: {
      type: DataTypes.BOOLEAN
    }
  }, {
    sequelize,
    modelName: 'JawabanUser',
    tableName: 'jawaban_user',
    timestamps: true
  });

  return JawabanUser;
};
