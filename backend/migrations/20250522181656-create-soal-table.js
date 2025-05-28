'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('soal', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tipe_ujian_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'tipe_ujian',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      index_soal: {
        type: Sequelize.INTEGER
      },
      pertanyaan: {
        type: Sequelize.TEXT
      },
      file_soal: {
        type: Sequelize.STRING
      },
      skor_soal: {
        type: Sequelize.INTEGER
      },
      tipe_soal: {
        type: Sequelize.STRING
      },
      penjelasan: {
        type: Sequelize.TEXT
      },
      list_jawaban_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'list_jawaban',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      mutiple: {
        type: Sequelize.BOOLEAN
      },
      point_soal: {
        type: Sequelize.INTEGER
      },
      jawaban_benar: {
        type: Sequelize.STRING
      },
      soal_awal: {
        type: Sequelize.STRING
      },
      soal_akhir: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('soal');
  }
};
