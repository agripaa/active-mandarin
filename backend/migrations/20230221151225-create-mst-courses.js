'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('MstCourses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      content: {
        type: Sequelize.TEXT
      },
      level: {
        type: Sequelize.STRING
      },
      link: {
        type: Sequelize.TEXT,
        get: function() {
          return JSON.parse(this.getDataValue("link"));
        },
        set: function(value) {
          return this.setDataValue("link", JSON.stringify(value));
        }
      },
      price: {
        type: Sequelize.FLOAT
      },
      rating: {
        type: Sequelize.FLOAT
      },
      student: {
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.TEXT
      },
      group_class_id: {
        type: Sequelize.INTEGER,
        references: { model: 'MstGroupClass', key: 'id' },
        onUpdate: 'SET NULL',
        onDelete: 'SET NULL'
      },
      file_name: {
        allowNull: true,
        type: Sequelize.STRING
      },
      file_path: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      file_type: {
        allowNull: true,
        type: Sequelize.STRING
      },
      created_by: {
        type: Sequelize.INTEGER,
        references: { model: 'MstUser', key: 'id' },
        onUpdate: 'SET NULL',
        onDelete: 'SET NULL'
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
    await queryInterface.dropTable('MstCourses');
  }
};