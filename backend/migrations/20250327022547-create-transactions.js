'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('transactions', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
      },
      affiliator_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'users', key: 'id' },
      },
      brand_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'brands', key: 'id' },
      },
      status_transaction: Sequelize.STRING,
      payment_method: Sequelize.STRING,
      transaction_date: Sequelize.DATE,
      isDelete: {type: Sequelize.BOOLEAN, defaultValue: false},
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('transactions');
  },
};