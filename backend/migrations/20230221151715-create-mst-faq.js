'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('MstFaq', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      question: {
        type: Sequelize.TEXT,
        get: function() {
          return JSON.parse(this.getDataValue("question"));
        },
        set: function(value) {
          return this.setDataValue("question", JSON.stringify(value));
        }
      },
      answer: {
        type: Sequelize.TEXT,
        get: function() {
          return JSON.parse(this.getDataValue("answer"));
        },
        set: function(value) {
          return this.setDataValue("answer", JSON.stringify(value));
        }
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
    await queryInterface.dropTable('MstFaq');
  }
};