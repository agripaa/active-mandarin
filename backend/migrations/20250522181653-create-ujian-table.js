'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ujian', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama_ujian: {
        type: Sequelize.STRING(255)
      },
      level: {
        type: Sequelize.STRING(255)
      },
      harga_normal: {
        type: Sequelize.STRING
      },
      harga_diskon: {
        type: Sequelize.STRING
      },
      harga_certif: {
        type: Sequelize.STRING
      },
      ujian_img: {
        type: Sequelize.STRING(225)
      },
      sold_sum: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      commission: {
        type: Sequelize.STRING
      },
      total_skor: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      desc: {
        type: Sequelize.TEXT
      },
      isProgres: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      isDone: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      isCheck: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ujian');
  }
};
