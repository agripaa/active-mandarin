'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MstCourses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MstCourses.belongsTo(models.MstGroupClass, {
        foreignKey: 'group_class_id',
        as: 'MstGroupClass',
        onUpdate: 'SET NULL',
        onDelete: 'SET NULL'
      })
    }
  }
  MstCourses.init({
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    level: DataTypes.STRING,
    link: DataTypes.TEXT,
    price: DataTypes.FLOAT,
    rating: DataTypes.FLOAT,
    student: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    group_class_id: DataTypes.INTEGER,
    file_name: DataTypes.STRING,
    file_path: DataTypes.TEXT,
    file_type: DataTypes.STRING,
    created_by: DataTypes.INTEGER
  }, {
    sequelize,
    tableName: 'MstCourses',
    modelName: 'MstCourses',
  });
  return MstCourses;
};