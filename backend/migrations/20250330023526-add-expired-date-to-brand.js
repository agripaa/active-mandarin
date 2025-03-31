'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('brands', 'expired_date', {
      type: Sequelize.DATE,
      allowNull: true
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('brands', 'expired_date');
  }
};
