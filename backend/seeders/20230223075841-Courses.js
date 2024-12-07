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
    const groupclass1 = await models.MstGroupClass.findAll({
      where:{
        name: "Taiwan",
      }
    });
    let groupclasstaiwanid = groupclass1[0].id
    const groupclass2 = await models.MstGroupClass.findAll({
      where:{
        name: "Mandarin",
      }
    });
    let groupclassmandarinid = groupclass2[0].id
    let nama_path = 'storage/assets/courses';
    return await queryInterface.bulkInsert('MstCourses', [
      {
      created_by: useradminid,
      group_class_id: groupclasstaiwanid,
      title: "Tradisional Basic",
      content: "character ZhuYin, icon bernuansa chinese",
      level: "Basic",
      link: "'tokopedia':''",
      price: 400000,
      rating: 0,
      student: 10,
      description: "Mempelajari mandarin tradisional. Belajar mengenal ZhuYin, PinYin, nada dan pelafalan hingga dasar penulisan karakter mandarin",
      file_name: "basic mandarin.png",
      file_path: nama_path+"/"+"basic mandarin.png",
      file_type: "PNG",
      createdAt: new Date(),
      updatedAt: new Date()
      },{
        created_by: useradminid,
        group_class_id: groupclasstaiwanid,
        title: "TOCFL Level 1",
        content: "Karakter traditional Chinese vs simplified, icon bernuansa chinese",
        level: "Level 1",
        link: "'tokopedia':''",
        price: 399000,
        rating: 0,
        student: 10,
        description: "Kelas yang cocok bagi pemula yang sudah memiliki pengetahuan basic tentang mandarin dan ingin belajar lebih lanjut mengenai Bahasa mandarin",
        file_name: "basic mandarin.png",
        file_path: nama_path+"/"+"basic mandarin.png",
        file_type: "PNG",
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        created_by: useradminid,
        group_class_id: groupclasstaiwanid,
        title: "TOCFL Level 2",
        content: "Taipei 101, bendera Taiwan",
        level: "Level 2",
        link: "'tokopedia':''",
        price: 450000,
        rating: 0,
        student: 10,
        description: "Kelas lanjutan yang cocok bagi yang ingin mempelajari bahasa mandarin lebih lanjut ataupun untuk melanjutkan study ke Taiwan. Mempelajari kosa-kata untuk persiapan tes TOCFL level 2",
        file_name: "basic mandarin.png",
        file_path: nama_path+"/"+"basic mandarin.png",
        file_type: "PNG",
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        created_by: useradminid,
        group_class_id: groupclasstaiwanid,
        title: "TOCFL Level 3",
        content: "Taipei 101, bendera Taiwan",
        level: "Level 3",
        link: "'tokopedia':''",
        price: 500000,
        rating: 0,
        student: 10,
        description: "kelas persiapan tes TOCFL level 3, cocok untuk yang ingin mendaftar beasiswa di Taiwan ataupun yang ingin switch career",
        file_name: "basic mandarin.png",
        file_path: nama_path+"/"+"basic mandarin.png",
        file_type: "PNG",
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        created_by: useradminid,
        group_class_id: groupclassmandarinid,
        title: "Kelas Mandarin Basic",
        content: "karakter Chinese (hanzi) ---> 学，习，中，文; simbol yang bernuansa Chinese",
        level: "Basic",
        link: "'tokopedia':''",
        price: 399000,
        rating: 0,
        student: 10,
        description: "Kelas dasar yang cocok bagi pemula yang memiliki pengetahuan 0 tentang Bahasa Mandarin. Dalam kelas ini akan dipelajari materi-materi terkait PinYi, Hanzi, nada dan pelafalan hingga dasar penulisan karakter mandarin.",
        file_name: "basic mandarin.png",
        file_path: nama_path+"/"+"basic mandarin.png",
        file_type: "PNG",
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        created_by: useradminid,
        group_class_id: groupclassmandarinid,
        title: "Kelas HSK 1",
        content: "Bendera Tiongkok dan simbol-simbol yang bernuansa Chinese",
        level: "Level 1",
        link: "'tokopedia':''",
        price: 450000,
        rating: 0,
        student: 10,
        description: "Kelas yang cocok bagi pemula yang sudah memiliki pengetahuan basic tentang mandarin dan ingin belajar secara lebih komprehensif.",
        file_name: "basic mandarin.png",
        file_path: nama_path+"/"+"basic mandarin.png",
        file_type: "PNG",
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        created_by: useradminid,
        group_class_id: groupclassmandarinid,
        title: "Kelas HSK 2",
        content: "Bendera Tiongkok dan simbol-simbol yang bernuansa Chinese",
        level: "Level 2",
        link: "'tokopedia':''",
        price: 500000,
        rating: 0,
        student: 10,
        description: "Kelas yang cocok bagi pemula yang sudah menguasai HSK 1 dan ingin lanjut ke HSK 3 untuk belajar Bahasa Mandarin secara lebih komprehensif.",
        file_name: "basic mandarin.png",
        file_path: nama_path+"/"+"basic mandarin.png",
        file_type: "PNG",
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        created_by: useradminid,
        group_class_id: groupclassmandarinid,
        title: "Kelas HSK 3",
        content: "Bendera Tiongkok dan simbol-simbol yang bernuansa Chinese",
        level: "Level 3",
        link: "'tokopedia':''",
        price: 659000,
        rating: 0,
        student: 10,
        description: "Kelas yang cocok bagi pemula yang sudah menguasai HSK 2 dan ingin lanjut ke HSK 3 untuk belajar Bahasa Mandarin secara lebih komprehensif.",
        file_name: "basic mandarin.png",
        file_path: nama_path+"/"+"basic mandarin.png",
        file_type: "PNG",
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        created_by: useradminid,
        group_class_id: groupclassmandarinid,
        title: "Kelas HSK 4",
        content: "Bendera Tiongkok dan simbol-simbol yang bernuansa Chinese",
        level: "Level 4",
        link: "'tokopedia':''",
        price: 799000,
        rating: 0,
        student: 10,
        description: "Kelas yang cocok bagi pemula yang sudah menguasai HSK 3 dan ingin lanjut ke HSK 4 untuk belajar Bahasa Mandarin secara lebih komprehensif.",
        file_name: "basic mandarin.png",
        file_path: nama_path+"/"+"basic mandarin.png",
        file_type: "PNG",
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        created_by: useradminid,
        group_class_id: groupclassmandarinid,
        title: "Kelas HSK 5",
        content: "Bendera Tiongkok dan simbol-simbol yang bernuansa Chinese",
        level: "Level 5",
        link: "'tokopedia':''",
        price: 999000,
        rating: 0,
        student: 10,
        description: "Kelas yang cocok bagi pemula yang sudah menguasai HSK 4 dan ingin lanjut ke HSK 5 untuk belajar Bahasa Mandarin secara lebih komprehensif.",
        file_name: "basic mandarin.png",
        file_path: nama_path+"/"+"basic mandarin.png",
        file_type: "PNG",
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        created_by: useradminid,
        group_class_id: groupclassmandarinid,
        title: "Speaking Class (HSKK) Basic",
        content: "Aksara cina (hanzi) ---> 听，力，口，语; gambar ilustrasi mulut dan telinga",
        level: "Basic",
        link: "'tokopedia':''",
        price: 500000,
        rating: 0,
        student: 5,
        description: "Kelas yang cocok bagi pemula yang khusus ingin melatih kemampuan speaking dalam Bahasa Mandarin, dengan syarat sudah menguasai Mandarin Basic, HSK 1 dan HSK 2.",
        file_name: "basic mandarin.png",
        file_path: nama_path+"/"+"basic mandarin.png",
        file_type: "PNG",
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        created_by: useradminid,
        group_class_id: groupclassmandarinid,
        title: "Speaking Class (HSKK) Intermediate",
        content: "Aksara cina (hanzi) ---> 听，力，口，语; gambar ilustrasi mulut dan telinga",
        level: "Intermediate",
        link: "'tokopedia':''",
        price: 599000,
        rating: 0,
        student: 5,
        description: "Kelas yang cocok bagi pemula yang khusus ingin melatih kemampuan speaking dalam Bahasa Mandarin, dengan syarat sudah menguasai HSK 3 dan HSK 4.",
        file_name: "basic mandarin.png",
        file_path: nama_path+"/"+"basic mandarin.png",
        file_type: "PNG",
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        created_by: useradminid,
        group_class_id: groupclassmandarinid,
        title: "Speaking Class (HSKK) Advanced",
        content: "Aksara cina (hanzi) ---> 听，力，口，语; gambar ilustrasi mulut dan telinga",
        level: "Advanced",
        link: "'tokopedia':''",
        price: 799000,
        rating: 0,
        student: 5,
        description: "Kelas yang cocok bagi pemula yang khusus ingin melatih kemampuan speaking dalam Bahasa Mandarin, dengan syarat sudah menguasai HSK 5 dan HSK 6.",
        file_name: "basic mandarin.png",
        file_path: nama_path+"/"+"basic mandarin.png",
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
