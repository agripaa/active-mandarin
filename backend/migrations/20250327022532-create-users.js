'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: Sequelize.STRING(50),
      username: Sequelize.STRING(25),
      email: {
        type: Sequelize.STRING(80),
        allowNull: false,
        unique: true,
      },
      number: Sequelize.STRING(50),
      address: Sequelize.TEXT,
      profile_img: Sequelize.STRING(255),
      role_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'roles', key: 'id' },
      },
      affiliator_status: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      reveral_code: Sequelize.STRING(6),
      detail_affiliate: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'affiliate_details', key: 'id' },
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('users');
  },
};