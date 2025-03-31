'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 1. Tambahkan kolom baru dengan tipe data FLOAT
    await queryInterface.addColumn('brands', 'commission_temp', {
      type: Sequelize.FLOAT,
      allowNull: false,
      defaultValue: 0.0,
    });

    // 2. Copy data dari kolom lama (jika bisa dikonversi)
    await queryInterface.sequelize.query(`
      UPDATE brands 
      SET commission_temp = CAST(commission AS FLOAT) 
      WHERE commission ~ '^\\d+(\\.\\d+)?$'  -- Hanya ubah data yang numerik
    `);

    // 3. Hapus kolom lama
    await queryInterface.removeColumn('brands', 'commission');

    // 4. Ubah nama kolom baru ke 'commission'
    await queryInterface.renameColumn('brands', 'commission_temp', 'commission');
  },

  down: async (queryInterface, Sequelize) => {
    // Jika rollback, ubah kembali ke STRING
    await queryInterface.addColumn('brands', 'commission_temp', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.sequelize.query(`
      UPDATE brands 
      SET commission_temp = CAST(commission AS TEXT)
    `);

    await queryInterface.removeColumn('brands', 'commission');
    await queryInterface.renameColumn('brands', 'commission_temp', 'commission');
  }
};
