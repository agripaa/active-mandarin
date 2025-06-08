'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Certificate extends Model {
    static associate(models) {
      Certificate.belongsTo(models.User, { foreignKey: 'user_id' });
      Certificate.belongsTo(models.Ujian, { foreignKey: 'ujian_id' });
    }
  }

  Certificate.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ujian_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    exam_level: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    gender: {
      type: DataTypes.ENUM('男', '女', 'Male', 'Female'),
      allowNull: false
    },
    nationality: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '印度尼西亚' // Indonesia
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    exam_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    exam_no: {
      type: DataTypes.STRING,
      allowNull: false
    },
    listening_score: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    reading_score: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    writing_score: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    total_score: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    percentile_rank: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    passing_score: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('Passed', 'Not Passed'),
      allowNull: false,
      defaultValue: 'Passed'
    },
  }, {
    sequelize,
    modelName: 'Certificate',
    tableName: 'certificates',
    freezeTableName: true,
    timestamps: true
  });

  return Certificate;
};
