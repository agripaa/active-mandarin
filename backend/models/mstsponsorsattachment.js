'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MstSponsorsAttachment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MstSponsorsAttachment.belongsTo(models.MstSponsors, {
        foreignKey: 'sponsors_id',
        as: 'MstSponsors',
        onUpdate: 'SET NULL',
        onDelete: 'SET NULL'
      })
    }
  }
  MstSponsorsAttachment.init({
    sponsors_id: DataTypes.INTEGER,
    file_name: DataTypes.STRING,
    file_path: DataTypes.TEXT,
    file_type: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'MstSponsorsAttachment',
    modelName: 'MstSponsorsAttachment',
  });
  return MstSponsorsAttachment;
};