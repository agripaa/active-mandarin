'use strict';
const {
  Model
} = require('sequelize');
const models = require('../models/index');
module.exports = (sequelize, DataTypes) => {
  class MstUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MstUser.belongsTo(models.MstRole, {
        foreignKey: 'role_id',
        onUpdate: 'SET NULL',
        onDelete: 'SET NULL'
      })
    }
  }
  MstUser.init({
    role_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    refresh_token: DataTypes.TEXT
  }, {
    sequelize,
    tableName: 'MstUser',
    modelName: 'MstUser',
  });
  return MstUser;
};