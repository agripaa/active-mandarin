'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const table = await queryInterface.describeTable('brands');

    // Jika `variant` sudah ada, hapus dulu sebelum rename
    if (table.variant) {
      await queryInterface.removeColumn('brands', 'variant');
    }

    // Hanya rename jika `name_brand` masih ada
    if (table.name_brand) {
      await queryInterface.renameColumn('brands', 'name_brand', 'variant');
    }

    // Rename `variant` menjadi `turunan`, pastikan sudah ada
    const updatedTable = await queryInterface.describeTable('brands');
    if (updatedTable.variant) {
      await queryInterface.renameColumn('brands', 'variant', 'turunan');
    }
  },

  down: async (queryInterface, Sequelize) => {
    const table = await queryInterface.describeTable('brands');

    // Rollback: Ubah `turunan` kembali ke `variant`
    if (table.turunan) {
      await queryInterface.renameColumn('brands', 'turunan', 'variant');
    }

    // Rollback: Ubah `variant` kembali ke `name_brand`
    const updatedTable = await queryInterface.describeTable('brands');
    if (updatedTable.variant) {
      await queryInterface.renameColumn('brands', 'variant', 'name_brand');
    }
  }
};
