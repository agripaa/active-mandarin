'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('recruitments', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nama: Sequelize.STRING(125),
      email: Sequelize.STRING(125),
      telepon: Sequelize.STRING(50),
      domisili: Sequelize.STRING(50),
      posisi: Sequelize.STRING,
      portofolio: Sequelize.STRING,
      cv_file: Sequelize.STRING(255),
      isDelete: {type: Sequelize.BOOLEAN, defaultValue: false},
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('recruitments');
  },
};
