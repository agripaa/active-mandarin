'use strict';
const models = require('../models/index');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  
  async up (queryInterface, Sequelize) {
    const mstcourses1 = await models.MstCourses.findAll({
      where:{
        title: "Tradisional Basic",
        content: "character ZhuYin, icon bernuansa chinese",
      }
    });
    let mstcourses1id = mstcourses1[0].id

    const mstcourses2 = await models.MstCourses.findAll({
      where:{
        title: "TOCFL Level 2",
        content: "Taipei 101, bendera Taiwan",
      }
    });
    let mstcourses2id = mstcourses2[0].id
    let nama_path = 'storage/assets/user';

    return await queryInterface.bulkInsert('MstFeedback', [
      {
        courses_id: mstcourses1id,
        name: "DILYANTI MAYA PUTRI",
        school: "-",
        message: "Penjelasan mudah dimengerti dan kelasnya menyenangkan",
        file_name: "user 1.jpg",
        file_path: nama_path+"/"+"user 1.jpg",
        file_type: "JPG",
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        courses_id: mstcourses2id,
        name: "Vieka Maharani Firdaus",
        school: "-",
        message: "Sangat bermanfaat dan menyenangkan. Selain itu penjelasan Uni Laoshi mengenai materi mudah dipahami sehingga membantu sekali bagi saya yang merupakan beginner dalam bahasa mandarin.",
        file_name: "user 2.png",
        file_path: nama_path+"/"+"user 2.png",
        file_type: "PNG",
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        courses_id: mstcourses1id,
        name: "Lestari Shut",
        school: "-",
        message: "Huhuuu seru bnget lah pokokny klo ad trial hsk 2 kekny bklan ikut lagi ",
        file_name: "IMG_20210714_210643 - Lestari SHut.jpg",
        file_path: nama_path+"/"+"IMG_20210714_210643 - Lestari SHut.jpg",
        file_type: "JPG",
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        courses_id: mstcourses1id,
        name: "Vieka Maharani Firdaus",
        school: "-",
        message: "Sangat bermanfaat dan menyenangkan. Selain itu penjelasan Uni Laoshi mengenai materi mudah dipahami sehingga membantu sekali bagi saya yang merupakan beginner dalam bahasa mandarin.",
        file_name: "IMG-20221207-WA0022 - Saefi Bajang Pratama.jpg",
        file_path: nama_path+"/"+"IMG-20221207-WA0022 - Saefi Bajang Pratama.jpg",
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
