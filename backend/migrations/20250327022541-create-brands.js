'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('brands', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name_brand: Sequelize.STRING(255),
      price: Sequelize.STRING,
      sold_sum: { type: Sequelize.INTEGER, defaultValue: 0 },
      detail_brand: Sequelize.TEXT,
      link_classroom: Sequelize.STRING(255),
      file_product: Sequelize.STRING(255),
      commission: Sequelize.STRING,
      category_brand: Sequelize.STRING,
      brand_img: Sequelize.STRING(255),
      isDelete: {type: Sequelize.BOOLEAN, defaultValue: false},
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('brands');
  },
};