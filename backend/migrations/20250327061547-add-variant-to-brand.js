'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('brands', 'variant', {
      type: Sequelize.STRING,
      allowNull: false
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('brands', 'variant');
  }
};
