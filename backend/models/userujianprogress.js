'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserUjianProgress extends Model {
    static associate(models) {
      UserUjianProgress.belongsTo(models.User, { foreignKey: 'user_id' });
      UserUjianProgress.belongsTo(models.Ujian, { foreignKey: 'ujian_id' });
    }
  }

  UserUjianProgress.init({
    user_id: DataTypes.INTEGER,
    ujian_id: DataTypes.INTEGER,
    exam_phase: DataTypes.STRING,
    started_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'UserUjianProgress',
    tableName: 'user_ujian_progress'
  });

  return UserUjianProgress;
};
