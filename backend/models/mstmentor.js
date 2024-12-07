'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MstMentor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MstMentor.hasOne(models.MstMentorAttachment, {
        foreignKey: {
          name: 'mentor_id'
        },
        as: 'MstMentorAttachment',
        onUpdate: 'SET NULL',
        onDelete: 'SET NULL'
      })
    }
  }
  MstMentor.init({
    name: DataTypes.STRING,
    university_name: DataTypes.STRING,
    status: DataTypes.STRING,
    created_by:DataTypes.INTEGER
  }, {
    sequelize,
    tableName: 'MstMentor',
    modelName: 'MstMentor',
  });
  return MstMentor;
};