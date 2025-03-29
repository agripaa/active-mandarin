'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('affiliate_details', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      type_affiliate: Sequelize.STRING,
      reason: Sequelize.STRING,
      platform: Sequelize.STRING,
      know_program: Sequelize.STRING,
      isDelete: {type: Sequelize.BOOLEAN, defaultValue: false},
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('affiliate_details');
  },
};