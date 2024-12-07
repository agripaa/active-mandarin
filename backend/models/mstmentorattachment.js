'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MstMentorAttachment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MstMentorAttachment.belongsTo(models.MstMentor, {
        foreignKey: 'mentor_id',
        as: 'MstMentor',
        onUpdate: 'SET NULL',
        onDelete: 'SET NULL'
      })
    }
  }
  MstMentorAttachment.init({
    mentor_id: DataTypes.INTEGER,
    file_name: DataTypes.STRING,
    file_path: DataTypes.TEXT,
    file_type: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'MstMentorAttachment',
    modelName: 'MstMentorAttachment',
  });
  return MstMentorAttachment;
};