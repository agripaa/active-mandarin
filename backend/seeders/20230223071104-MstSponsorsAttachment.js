'use strict';
const models = require('../models/index');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const sponsorskirimantarindoensia = await models.MstSponsors.findAll({
      where:{
        name: "Kirim Antar Indonesia",
        description: "Kirim Antar Indonesia",
      }
    });
    let sponsorskirimantarindoensiaid = sponsorskirimantarindoensia[0].id

    const sponsorskeluargaindonesianjpi = await models.MstSponsors.findAll({
      where:{
        name: "Keluarga Indonesia NJPI",
        description: "Keluarga Indonesia NJPI",
      }
    });
    let sponsorskeluargaindonesianjpiid = sponsorskeluargaindonesianjpi[0].id

    const sponsorscariboss = await models.MstSponsors.findAll({
      where:{
        name: "Cari Boss",
        description: "Cari Boss",
      }
    });
    let sponsorscaribossid = sponsorscariboss[0].id

    const sponsorsppidkasia = await models.MstSponsors.findAll({
      where:{
        name: "PPIDK ASIA",
        description: "PPIDK ASIA",
      }
    });
    let sponsorsppidkasiaid = sponsorsppidkasia[0].id

    const sponsorskaryageomandiri = await models.MstSponsors.findAll({
      where:{
        name: "PT Karya Geo Mandiri",
        description: "PT Karya Geo Mandiri",
      }
    });
    let sponsorskaryageomandiriid = sponsorskaryageomandiri[0].id

    const sponsorskinruinewenergy = await models.MstSponsors.findAll({
      where:{
        name: "PT Kinrui New Energy",
        description: "PT Kinrui New Energy",
      }
    });
    let sponsorskinruinewenergyid = sponsorskinruinewenergy[0].id

    const sponsorsgerakan1000 = await models.MstSponsors.findAll({
      where:{
        name: "Gerakan 1000 Stratup Nasional",
        description: "Gerakan 1000 Stratup Nasional",
      }
    });
    let sponsorsgerakan1000id = sponsorsgerakan1000[0].id
    let nama_path = 'storage/assets/sponsors';
    return await queryInterface.bulkInsert('MstSponsorsAttachment', [
      {
        sponsors_id: sponsorskirimantarindoensiaid,
        file_name: "Kirim Antar Indonesia.png",
        file_path: nama_path+"/"+"Kirim Antar Indonesia.png",
        file_type: "PNG",
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        sponsors_id: sponsorskeluargaindonesianjpiid,
        file_name: "Keluarga Indonesia NJPI.png",
        file_path: nama_path+"/"+"Keluarga Indonesia NJPI.png",
        file_type: "PNG",
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        sponsors_id: sponsorscaribossid,
        file_name: "cari boss.png",
        file_path: nama_path+"/"+"cari boss.png",
        file_type: "PNG",
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        sponsors_id: sponsorsppidkasiaid,
        file_name: "Logo Asiania (Black).png",
        file_path: nama_path+"/"+"Logo Asiania (Black).png",
        file_type: "PNG",
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        sponsors_id: sponsorskaryageomandiriid,
        file_name: "PT Karya Geo Mandiri.png",
        file_path: nama_path+"/"+"PT Karya Geo Mandiri.png",
        file_type: "PNG",
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        sponsors_id: sponsorskinruinewenergyid,
        file_name: "Kinrui New Energy.png",
        file_path: nama_path+"/"+"Kinrui New Energy.png",
        file_type: "PNG",
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        sponsors_id: sponsorsgerakan1000id,
        file_name: "1000 Startup Digital.png",
        file_path: nama_path+"/"+"1000 Startup Digital.png",
        file_type: "PNG",
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
