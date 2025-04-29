'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('turunan_brand', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: Sequelize.STRING,
      sub_title: Sequelize.STRING,
      turunan: Sequelize.STRING,
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('turunan_brand');
  },
};