'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('brands', 'variant', {
      type: Sequelize.STRING,
      allowNull: true, 
      defaultValue: null,
      after: 'turunan' 
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Rollback: Hapus kolom `variant` jika undo migration
    await queryInterface.removeColumn('brands', 'variant');
  }
};
