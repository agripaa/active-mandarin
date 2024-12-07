'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('MstLanguage', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      code: {
        type: Sequelize.STRING
      },
      indonesia: {
        type: Sequelize.TEXT,
        get: function() {
          return JSON.parse(this.getDataValue("indonesia"));
        },
        set: function(value) {
          return this.setDataValue("indonesia", JSON.stringify(value));
        }
      },
      english: {
        type: Sequelize.TEXT,
        get: function() {
          return JSON.parse(this.getDataValue("english"));
        },
        set: function(value) {
          return this.setDataValue("english", JSON.stringify(value));
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
    await queryInterface.dropTable('MstLanguage');
  }
};