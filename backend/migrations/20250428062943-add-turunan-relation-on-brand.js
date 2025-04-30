'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('brands', 'turunan_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: { model: 'turunan_brand', key: 'id' }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.addColumn('brands');
  },
};