'use strict';
const models = require('../models/index');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const postqna = await models.MstPosting.findAll({
      where:{
        type: "event",
        title: "Question and Answer",
        content: "Free Trial Class Mandarin & Kelas HSK 1",
      }
    });
    let postqnaid = postqna[0].id
    
    const postfree = await models.MstPosting.findAll({
      where:{
        type: "event",
        title: "Free Trial Class",
        content: "Kelas Bahasa Mandarin & Kelas HSK 1",
      }
    });
    let postfreeid = postfree[0].id

    let nama_path = 'storage/assets/posting';
    return await queryInterface.bulkInsert('MstPostingAttachment', [
      {
        posting_id: postqnaid,
        file_name: "event.jpeg",
        file_path: nama_path+"/"+"event.jpeg",
        file_type: "JPG",
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        posting_id: postfreeid,
        file_name: "free trial.jpeg",
        file_path: nama_path+"/"+"free trial.jpeg",
        file_type: "JPG",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
