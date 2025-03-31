'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.addColumn('transactions', 'commission', {
          type: Sequelize.DECIMAL(10,2),
          allowNull: true
      });
  },
  down: async (queryInterface, Sequelize) => {
      await queryInterface.removeColumn('transactions', 'commission');
  }
};

