'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Transaction.associate = (models) => {
        Transaction.belongsTo(models.User, { foreignKey: 'user_id' });
        Transaction.belongsTo(models.User, { foreignKey: 'affiliator_id' });
        Transaction.belongsTo(models.Brand, { foreignKey: 'brand_id' });
      };    
    }
  }
  Transaction.init({
    user_id: DataTypes.INTEGER,
    affiliator_id: DataTypes.INTEGER,
    brand_id: DataTypes.INTEGER,
    status_transaction: DataTypes.STRING,
    payment_method: DataTypes.STRING,
    transaction_date: DataTypes.DATE,
    isDelete: {type: DataTypes.BOOLEAN, defaultValue: false},
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};