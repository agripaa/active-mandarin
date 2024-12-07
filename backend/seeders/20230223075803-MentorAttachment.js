'use strict';
const models = require('../models/index');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const mentoranisanur = await models.MstMentor.findAll({
      where:{
        name: "Anisa Nur Hasanah",
        university_name: "Nanjing Polytechnic Institute",
      }
    });
    let mentoranisanurid = mentoranisanur[0].id

    const mentorahmad = await models.MstMentor.findAll({
      where:{
        name: "Ahmad Damanhuri",
        university_name: "Chia Nan University of Pharmasy and Science",
      }
    });
    let mentorahmadid = mentorahmad[0].id

    const mentorputrivinarica = await models.MstMentor.findAll({
      where:{
        name: "Putri Vinarica Ramadhini",
        university_name: "Yangzhou polytechnic institute",
      }
    });
    let mentorputrivinaricaid = mentorputrivinarica[0].id

    const mentorekalistya = await models.MstMentor.findAll({
      where:{
        name: "Eka Listya Febyanti",
        university_name: "Universitas Mataram",
      }
    });
    let mentorekalistyaid = mentorekalistya[0].id

    const mentorsherly = await models.MstMentor.findAll({
      where:{
        name: "Sheryl orlena deasyana rahardjo",
        university_name: "Universitas Huaqiao",
      }
    });
    let mentorsherlyid = mentorsherly[0].id

    const mentorfebrinana = await models.MstMentor.findAll({
      where:{
        name: "Febriana Dwi Nur Fadillah Somantri",
        university_name: "National Kaohsiung University of Science and Technology",
      }
    });
    let mentorfebrinanaid = mentorfebrinana[0].id

    let nama_path = 'storage/assets/mentor';
    return await queryInterface.bulkInsert('MstMentorAttachment', [
      {
        mentor_id: mentoranisanurid,
        file_name: "Anisa Nur Hasanah.jpeg",
        file_path: nama_path+"/"+"Anisa Nur Hasanah.jpeg",
        file_type: "JPG",
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        mentor_id: mentorahmadid,
        file_name: "Ahmad Damanhuri.jpeg",
        file_path: nama_path+"/"+"Ahmad Damanhuri.jpeg",
        file_type: "JPG",
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        mentor_id: mentorputrivinaricaid,
        file_name: "Putri Vinarica Ramadhini.jpeg",
        file_path: nama_path+"/"+"Putri Vinarica Ramadhini.jpeg",
        file_type: "JPG",
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        mentor_id: mentorekalistyaid,
        file_name: "Eka Listya Febyanti.jpeg",
        file_path: nama_path+"/"+"Eka Listya Febyanti.jpeg",
        file_type: "JPG",
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        mentor_id: mentorsherlyid,
        file_name: "Sheryl orlena deasyana rahardjo.jpeg",
        file_path: nama_path+"/"+"Sheryl orlena deasyana rahardjo.jpeg",
        file_type: "JPG",
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        mentor_id: mentorfebrinanaid,
        file_name: "Febriana Dwi N.F.S.(Backup tutor Taiwan).jpeg",
        file_path: nama_path+"/"+"Febriana Dwi N.F.S.(Backup tutor Taiwan).jpeg",
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
