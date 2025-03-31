'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Brand extends Model {
    static associate(models) {
      Brand.hasMany(models.Transaction, { foreignKey: 'brand_id', as: 'Transactions'  });
    }
  }

  Brand.init({
    variant: DataTypes.STRING, 
    turunan: DataTypes.STRING,
    price: DataTypes.STRING,
    sold_sum: DataTypes.INTEGER,
    detail_brand: DataTypes.TEXT,
    link_classroom: DataTypes.STRING,
    file_product: DataTypes.STRING,
    commission: DataTypes.FLOAT,  
    category_brand: DataTypes.STRING,
    brand_img: DataTypes.STRING,
    isDelete: { type: DataTypes.BOOLEAN, defaultValue: false },
    expired_date: DataTypes.DATE, 
    discount_price: DataTypes.STRING 
  }, {
    sequelize,
    modelName: 'Brand',
    tableName: 'brands'
  });

  return Brand;
};
