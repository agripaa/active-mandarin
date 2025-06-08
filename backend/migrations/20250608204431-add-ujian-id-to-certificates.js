'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('certificates', 'ujian_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'ujian',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('certificates', 'ujian_id');
  }
};
