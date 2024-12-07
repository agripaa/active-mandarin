'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MstFeedback extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MstFeedback.belongsTo(models.MstCourses, {
        foreignKey: 'courses_id',
        as: 'MstCourses',
        onUpdate: 'SET NULL',
        onDelete: 'SET NULL'
      })
    }
  }
  MstFeedback.init({
    courses_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    school: DataTypes.STRING,
    message: DataTypes.TEXT,
    file_name: DataTypes.STRING,
    file_path: DataTypes.TEXT,
    file_type: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'MstFeedback',
    modelName: 'MstFeedback',
  });
  return MstFeedback;
};