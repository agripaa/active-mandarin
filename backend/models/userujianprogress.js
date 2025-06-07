'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UjianProgress extends Model {
    static associate(models) {
      UjianProgress.belongsTo(models.User, { foreignKey: 'user_id' });
      UjianProgress.belongsTo(models.Ujian, { foreignKey: 'ujian_id' });
    }
  }

  UjianProgress.init({
    user_id: DataTypes.INTEGER,
    ujian_id: DataTypes.INTEGER,
    exam_phase: DataTypes.STRING,
    started_at: DataTypes.DATE,
    is_done: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    is_checking: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'UjianProgress',
    tableName: 'user_ujian_progress',
    timestamps: true
  });

  return UjianProgress;
};
