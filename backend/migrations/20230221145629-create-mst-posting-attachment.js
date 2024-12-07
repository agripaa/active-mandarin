'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('MstPostingAttachment', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      posting_id: {
        type: Sequelize.INTEGER,
        references: { model: 'MstPosting', key: 'id' },
        onUpdate: 'SET NULL',
        onDelete: 'SET NULL'
      },
      file_name: {
        type: Sequelize.STRING
      },
      file_path: {
        type: Sequelize.TEXT
      },
      file_type: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('MstPostingAttachment');
  }
};