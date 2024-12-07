'use strict';
const {
  Model
} = require('sequelize');
const models = require('../models/index');

module.exports = (sequelize, DataTypes) => {
  class MstFaq extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MstFaq.belongsTo(models.MstUser, {
        foreignKey: 'created_by',
        as: 'MstUser',
        onUpdate: 'SET NULL',
        onDelete: 'SET NULL'
      })
    }
  }
  MstFaq.init({
    question: { type: DataTypes.TEXT,
      get: function() {
        return JSON.parse(this.getDataValue("question"));
      },
      set: function(value) {
        return this.setDataValue("question", JSON.stringify(value));
      } 
    },
    answer: { type: DataTypes.TEXT,
      get: function() {
        return JSON.parse(this.getDataValue("answer"));
      },
      set: function(value) {
        return this.setDataValue("answer", JSON.stringify(value));
      } 
    },
    created_by: DataTypes.INTEGER
  }, {
    sequelize,
    tableName: 'MstFaq',
    modelName: 'MstFaq',
  });
  return MstFaq;
};