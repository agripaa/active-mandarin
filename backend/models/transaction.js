'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    static associate(models) {
      Transaction.belongsTo(models.User, { foreignKey: 'user_id', as: 'User' });
      Transaction.belongsTo(models.User, { foreignKey: 'affiliator_id', as: 'Affiliator' });
      Transaction.belongsTo(models.Brand, { foreignKey: "brand_id", as: "Brand" }); // ✅ Alias HARUS "Brand"
    }
  }

  Transaction.init({
    user_id: DataTypes.INTEGER,
    affiliator_id: DataTypes.INTEGER,
    brand_id: DataTypes.INTEGER,
    status_transaction: DataTypes.STRING,
    payment_method: DataTypes.STRING,
    proof_transaction: DataTypes.STRING,
    summary_cancel: DataTypes.STRING,
    transaction_date: DataTypes.DATE,
    expired_date: DataTypes.DATE,
    isDelete: { type: DataTypes.BOOLEAN, defaultValue: false }
  }, {
    sequelize,
    modelName: 'Transaction',
    tableName: 'transactions',
    timestamps: true 
  });

  return Transaction;
};
