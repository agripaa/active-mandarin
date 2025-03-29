'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Brand extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Brand.associate = (models) => {
        Brand.hasMany(models.Transaction, { foreignKey: 'brand_id' });
      };
    }
  }
  Brand.init({
    name_brand: DataTypes.STRING,
    price: DataTypes.STRING,
    sold_sum: DataTypes.INTEGER,
    detail_brand: DataTypes.TEXT,
    link_classroom: DataTypes.STRING,
    file_product: DataTypes.STRING,
    commission: DataTypes.STRING,
    category_brand: DataTypes.STRING,
    brand_img: DataTypes.STRING,
    variant: DataTypes.STRING,
    isDelete: {type: DataTypes.BOOLEAN, defaultValue: false},
  }, {
    sequelize,
    modelName: 'Brand',
    tableName: 'brands'
  });
  return Brand;
};