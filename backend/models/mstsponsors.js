'use strict';
const {
  Model
} = require('sequelize');
const models = require('../models/index');

module.exports = (sequelize, DataTypes) => {
  class MstSponsors extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MstSponsors.belongsTo(models.MstUser, {
        foreignKey: 'created_by',
        as: 'MstUser',
        onUpdate: 'SET NULL',
        onDelete: 'SET NULL'
      })

      MstSponsors.hasOne(models.MstSponsorsAttachment, {
        foreignKey: {
          name: 'sponsors_id'
        },
        as: 'MstSponsorsAttachment',
        onUpdate: 'SET NULL',
        onDelete: 'SET NULL'
      })
    }
  }
  MstSponsors.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    created_by:DataTypes.INTEGER
  }, {
    sequelize,
    tableName: 'MstSponsors',
    modelName: 'MstSponsors',
  });
  return MstSponsors;
};