'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MstLanguage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MstLanguage.belongsTo(models.MstUser, {
        foreignKey: 'created_by',
        as: 'MstUser',
        onUpdate: 'SET NULL',
        onDelete: 'SET NULL'
      })
    }
  }
  MstLanguage.init({
    code: DataTypes.STRING,
    indonesia: { type: DataTypes.TEXT,
      get: function() {
        return JSON.parse(this.getDataValue("indonesia"));
      },
      set: function(value) {
        return this.setDataValue("indonesia", JSON.stringify(value));
      } 
    },
    english: { type: DataTypes.TEXT,
      get: function() {
        return JSON.parse(this.getDataValue("english"));
      },
      set: function(value) {
        return this.setDataValue("english", JSON.stringify(value));
      } 
    },
    created_by: DataTypes.INTEGER
  }, {
    sequelize,
    tableName: 'MstLanguage',
    modelName: 'MstLanguage',
  });
  return MstLanguage;
};