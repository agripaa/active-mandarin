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
    let nama_path = 'storage/assets/about';
    return await queryInterface.bulkInsert('MstAbout', [
      {
        subject: '{"indonesia":"Mewakili Negara Indonesia Untuk Mengikuti Lomba Bahasa Mandarin","english":"Representing the State of Indonesia to Participate in the Mandarin Language Competition"}',
        description: '{"indonesia":"Surya Pratama Januarvi, Founder dari Active Mandarin Indonesia, ia adalah seorang yang memiliki ketertarikan dalam dunia bahasa dan sering mengikuti perlombaan bahasa asing untuk mewakili Indonesia. Pada tahun 2019, Surya Pratama Januarvi berhasil meraih juara dalam ajang lomba menulis karakter bahasa mandarin dan lomba pidato dalam bahasa mandarin. Tidak hanya aktif dalam bidang akademis, akan tetapi ia juga aktif dalam organisasi kepemudaan yang banyak ia ikuti. Melalui organisasi, ia juga mengajarkan ilmu bahasa mandarin yang ia punya kepada adik-adik tingkatnya.","english":"Surya Pratama Januarvi, Founder of Active Mandarin Indonesia, is someone who has an interest in the world of languages and often takes part in foreign language competitions to represent Indonesia. In 2019, Surya Pratama Januarvi won the championship in a Chinese character writing competition and a Chinese speech competition. Not only active in the academic field, but he is also active in youth organizations which he has been involved in a lot. Through the organization, he also taught his Mandarin language skills to his juniors."}',
        year: 2019,
        file_name: "about 1.png",
        file_path: nama_path+"/"+"about 1.png",
        file_type: "PNG",
        created_by: useradminid,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        subject: '{"indonesia":"Rapat Koordinasi Perihal Organisasi Dan Penipuan Agen Bodong Beasiswa","english":"Coordination Meeting Regarding Organization and Fraudulent Scholarship Agent Fraud"}',
        description: '{"indonesia":"Surya mewakili Perhimpuan Pelajar Indonesia Kota Nanjing untuk ikut serta dalam rapat di KJRI Shanghai dengan bahasan agenda koordinasi region timur.  Di sana, ia bersama teman lainnya membahas beberapa isu serius salah satunya mengenai agen-agen bodong yang saat ini banyak sekali melalukan penipuan terhadap pelajar Indonesia yang ingin berkuliah di luar negeri, khususnya ke Tiongkok & Taiwan.","english":"Surya represented the Nanjing City Indonesian Student Association to take part in a meeting at the Indonesian Consulate in Shanghai to discuss the coordination agenda for the eastern region. There, he and other friends discussed several serious issues, one of which was fraudulent agents who are currently committing a lot of fraud against Indonesian students who wish to study abroad, especially in China & Taiwan."}',
        year: 2020,
        file_name: "about 2.png",
        file_path: nama_path+"/"+"about 2.png",
        file_type: "PNG",
        created_by: useradminid,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        subject: '{"indonesia":"Pandemi dan Secercah Mimpi","english":"The Pandemic and the Glimmer of a Dream"}',
        description: '{"indonesia":"Pandemi Covid 19 mengharuskan mahasiswa asing yang bersekolah di Tiongkok kembali ke tanah air. Perkuliahan dilanjutkan dengan metode daring. Oleh karena itu, banyak kegiatan-kegiatan yang tidak bisa dilakukan seperti sebelumnya. Surya mengisi waktu luang selama di Indonesia dengan membuka kelas bahasa mandarin. Antusias yang cukup baik dari beberapa murid yang ia ajar, terutama dari teman-teman Indonesia itu sendiri bahkan dari teman-teman luar negeri yang juga ikut dalam kelas belajarnya. Ia juga bergabung dengan beberapa platform bahasa untuk mengasah kemampuan mengajarnya sebagai tutor. Hal inilah yang menjadi awal mula terbentuknya Active Mandarin Indonesia.","english":"The Covid 19 pandemic requires foreign students studying in China to return to their homeland. Lectures continued with the online method. Therefore, many activities cannot be carried out as before. Surya filled his free time while in Indonesia by opening Mandarin classes. Enthusiasm was quite good from some of the students he taught, especially from Indonesian friends themselves and even from foreign friends who also took part in his study class. He also joined several language platforms to hone his teaching skills as a tutor. This is the beginning of the establishment of Active Mandarin Indonesia."}',
        year: 2021,
        file_name: "about 3.png",
        file_path: nama_path+"/"+"about 3.png",
        file_type: "PNG",
        created_by: useradminid,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        subject: '{"indonesia":"Tergabung Dalam Gerakan 1000 Startup Nasional KOMINFO","english":"Joined KOMINFO National 1000 Startup Movement"}',
        description: '{"indonesia":"Dengan kegigihan dan kerja keras, Active Mandarin Indonesia berhasil menjadi perwakilan Provinsi Bangka Belitung dalam program Gerakan 1000 Startup Hub 4 yang diadakan oleh KOMINFO. Hal ini tentunya tidak terlepas dari semangat yang luar biasa dari tim Active Mandarin Indonesia.","english":"With persistence and hard work, Active Mandarin Indonesia succeeded in becoming a representative for the Bangka Belitung Province in the 1000 Startup Hub 4 Movement program held by KOMINFO. This is of course inseparable from the extraordinary enthusiasm of the Active Mandarin Indonesia team."}',
        year: 2022,
        file_name: "about 4.png",
        file_path: nama_path+"/"+"about 4.png",
        file_type: "PNG",
        created_by: useradminid,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        subject: '{"indonesia":"Menembus Batas Dunia Bersama Active Mandarin Indonesia","english":"Breaking the World'+"'"+'s Limits with Active Mandarin Indonesia"}',
        description: '{"indonesia":"Rencana Active Mandarin Indonesia di tahun ini akan fokus menciptakan produk serta program yang bermanfaat bagi orang banyak. Dukungan dan kerja sama dari para tutor Active Mandarin Indonesia, perusahaan dan kampus dalam maupun luar negeri terus mengiringi langkah Active Mandarin Indonesia untuk tumbuh menjadi platform bahasa yang lebih besar lagi.","english":"Active Mandarin Indonesia plans this year to focus on creating products and programs that benefit many people. Support and cooperation from Active Mandarin Indonesia tutors, companies and campuses at home and abroad continue to accompany Active Mandarin Indonesia'+"'"+'s steps to grow into an even bigger language platform."}',
        year: 2023,
        file_name: "about 5.png",
        file_path: nama_path+"/"+"about 5.png",
        file_type: "PNG",
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
