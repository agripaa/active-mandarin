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
    return await queryInterface.bulkInsert('MstSponsors', [
      {
        name: "Kirim Antar Indonesia",
        description: "Kirim Antar Indonesia",
        created_by: useradminid,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: "Keluarga Indonesia NJPI",
        description: "Keluarga Indonesia NJPI",
        created_by: useradminid,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: "Cari Boss",
        description: "Cari Boss",
        created_by: useradminid,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: "PPIDK ASIA",
        description: "PPIDK ASIA",
        created_by: useradminid,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: "PT Karya Geo Mandiri",
        description: "PT Karya Geo Mandiri",
        created_by: useradminid,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: "PT Kinrui New Energy",
        description: "PT Kinrui New Energy",
        created_by: useradminid,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: "Gerakan 1000 Stratup Nasional",
        description: "Gerakan 1000 Stratup Nasional",
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
