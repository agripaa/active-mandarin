'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MstGroupClass extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      MstGroupClass.hasMany(models.MstCourses, {
        foreignKey: {
          name: 'group_class_id'
        },
        as: 'MstCourses',
        onUpdate: 'SET NULL',
        onDelete: 'SET NULL'
      })
    }
  }
  MstGroupClass.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    sequelize,
    tableName: 'MstGroupClass',
    modelName: 'MstGroupClass',
  });
  return MstGroupClass;
};