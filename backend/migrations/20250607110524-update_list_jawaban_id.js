'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Remove the wrong relation from 'soal'
    await queryInterface.removeColumn('soal', 'list_jawaban_id');

    // 2. Add proper foreign key 'soal_id' to 'list_jawaban'
    await queryInterface.addColumn('list_jawaban', 'soal_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'soal',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    // Revert the changes
    await queryInterface.removeColumn('list_jawaban', 'soal_id');

    await queryInterface.addColumn('soal', 'list_jawaban_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'list_jawaban',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  }
};
