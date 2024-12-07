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
    return await queryInterface.bulkInsert('MstMentor', [
      {
      created_by: useradminid,
      name: "Anisa Nur Hasanah",
      university_name: "Nanjing Polytechnic Institute",
      status: "Mahasiwa jurusan International Business",
      createdAt: new Date(),
      updatedAt: new Date()
      },{
        created_by: useradminid,
        name: "Ahmad Damanhuri",
        university_name: "Chia Nan University of Pharmasy and Science",
        status: "Alumni Jurusan Management Information System",
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        created_by: useradminid,
        name: "Putri Vinarica Ramadhini",
        university_name: "Yangzhou polytechnic institute",
        status: "Alumni jurusan teknik arsitek",
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        created_by: useradminid,
        name: "Eka Listya Febyanti",
        university_name: "Universitas Mataram",
        status: "Mahasiswa hububgan internasional",
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        created_by: useradminid,
        name: "Sheryl orlena deasyana rahardjo",
        university_name: "Universitas Huaqiao",
        status: "Alumni jurusan pandidikan sastra china",
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        created_by: useradminid,
        name: "Febriana Dwi Nur Fadillah Somantri",
        university_name: "National Kaohsiung University of Science and Technology",
        status: "rsity of Science and Technology Mahasiswa Master jurusan Supply Chain Management",
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
