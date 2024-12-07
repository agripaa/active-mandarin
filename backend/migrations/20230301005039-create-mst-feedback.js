'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('MstFeedback', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      courses_id: {
        type: Sequelize.INTEGER,
        references: { model: 'MstCourses', key: 'id' },
        onUpdate: 'SET NULL',
        onDelete: 'SET NULL'
      },
      name: {
        type: Sequelize.STRING
      },
      school: {
        type: Sequelize.STRING
      },
      message: {
        type: Sequelize.TEXT
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
    await queryInterface.dropTable('MstFeedback');
  }
};