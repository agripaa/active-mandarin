'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MstPosting extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MstPosting.belongsTo(models.MstUser, {
        foreignKey: 'created_by',
        as: 'MstUser',
        onUpdate: 'SET NULL',
        onDelete: 'SET NULL'
      })

      MstPosting.hasOne(models.MstPostingAttachment, {
        foreignKey: {
          name: 'posting_id'
        },
        as: 'MstPostingAttachment',
        onUpdate: 'SET NULL',
        onDelete: 'SET NULL'
      })
    }
  }
  MstPosting.init({
    type: DataTypes.STRING,
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    link: DataTypes.TEXT,
    created_by:DataTypes.INTEGER
  }, {
    sequelize,
    tableName: 'MstPosting',
    modelName: 'MstPosting',
  });
  return MstPosting;
};