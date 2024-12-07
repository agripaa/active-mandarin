'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MstAbout extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MstAbout.belongsTo(models.MstUser, {
        foreignKey: 'created_by',
        as: 'MstUser',
        onUpdate: 'SET NULL',
        onDelete: 'SET NULL'
      })
    }
  }
  MstAbout.init({
    subject: { type: DataTypes.TEXT,
      get: function() {
        return JSON.parse(this.getDataValue("subject"));
      },
      set: function(value) {
        return this.setDataValue("subject", JSON.stringify(value));
      } 
    },
    description: { type: DataTypes.TEXT,
      get: function() {
        return JSON.parse(this.getDataValue("description"));
      },
      set: function(value) {
        return this.setDataValue("description", JSON.stringify(value));
      } 
    },
    year: DataTypes.INTEGER,
    file_name: DataTypes.STRING,
    file_path: DataTypes.TEXT,
    file_type: DataTypes.STRING,
    created_by:DataTypes.INTEGER
  }, {
    sequelize,
    tableName: 'MstAbout',
    modelName: 'MstAbout',
  });
  return MstAbout;
};