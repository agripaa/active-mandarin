'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('certificates', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      exam_level: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      gender: {
        type: Sequelize.ENUM('男', '女', 'Male', 'Female'),
        allowNull: false
      },
      nationality: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '印度尼西亚'
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      exam_date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      exam_no: {
        type: Sequelize.STRING,
        allowNull: false
      },
      listening_score: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      reading_score: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      writing_score: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      total_score: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      percentile_rank: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      passing_score: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Passed'
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
    await queryInterface.dropTable('certificates');
  }
};
