'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('transactions', 'expired_date', {
      type: Sequelize.DATE,
      allowNull: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Rollback: Hapus kolom `expired_date` jika undo migration
    await queryInterface.removeColumn('transactions', 'expired_date');
  }
};
