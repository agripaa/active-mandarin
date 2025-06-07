'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('user_ujian_progress', 'is_done', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    });

    await queryInterface.addColumn('user_ujian_progress', 'is_checking', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('user_ujian_progress', 'is_done');
    await queryInterface.removeColumn('user_ujian_progress', 'is_checking');
  }
};
