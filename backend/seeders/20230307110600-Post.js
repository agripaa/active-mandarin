'use strict';
const models = require('../models/index');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const useradmin = await models.MstUser.findAll({
      where:{
        name: "Administrator",
        email: "administrator@administrator.com",
      }
    });
    let useradminid = useradmin[0].id
    return await queryInterface.bulkInsert('MstPosting', [
      {
        type: "event",
        title: "Question and Answer",
        content: "Free Trial Class Mandarin & Kelas HSK 1",
        link: "https://www.instagram.com/p/Ck8Gk3xJ_wB/?utm_source=ig_web_copy_link",
        created_by: useradminid,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        type: "event",
        title: "Free Trial Class",
        content: "Kelas Bahasa Mandarin & Kelas HSK 1",
        link: "https://www.instagram.com/p/CkdcVy5pPuO/?utm_source=ig_web_copy_link",
        created_by: useradminid,
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
