'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('list_jawaban', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      jawaban: {
        type: Sequelize.STRING
      },
      isTrue: {
        type: Sequelize.BOOLEAN
      },
      position: {
        type: Sequelize.CHAR(2)
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
    await queryInterface.dropTable('list_jawaban');
  }
};
