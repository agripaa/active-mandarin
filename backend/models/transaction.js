'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    static associate(models) {
      Transaction.belongsTo(models.User, { foreignKey: 'user_id', as: 'User' });
      Transaction.belongsTo(models.User, { foreignKey: 'affiliator_id', as: 'Affiliator' });
      Transaction.belongsTo(models.Brand, { foreignKey: "brand_id", as: "Brand" });
      Transaction.belongsTo(models.Ujian, { foreignKey: 'ujian_id', as: 'Ujian' });
      Transaction.belongsTo(models.Transaction, { foreignKey: 'program_transaction_id', as: 'ProgramTransaction' });
    }
  }

  Transaction.init({
    user_id: DataTypes.INTEGER,
    affiliator_id: DataTypes.INTEGER,
    brand_id: DataTypes.INTEGER,
    ujian_id: DataTypes.INTEGER, // ✅ Tambahan untuk transaksi ujian
    type_transaction: DataTypes.STRING, // optional: "brand" atau "ujian"
    include_certif: { type: DataTypes.BOOLEAN, defaultValue: false },
    status_transaction: DataTypes.STRING,
    payment_method: DataTypes.STRING,
    proof_transaction: DataTypes.STRING,
    summary_cancel: DataTypes.STRING,
    program_transaction_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
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
