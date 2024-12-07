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
    return await queryInterface.bulkInsert('MstFaq', [
      {
      created_by: useradminid,
      question: `{"indonesia":"Program kelas apa yang ada di Active Mandarin ID?","english":"What programs are there in Active Mandarin ID?"}`,
      answer: `{"indonesia":"Program kelas mandarin tradisional (Active Taiwan) dan program kelas mandarin sederhana (Active Mandarin).","english":"Traditional Mandarin class program (Active Taiwan) and Simplified Mandarin class program (Active Mandarin)."}`,
      createdAt: new Date(),
      updatedAt: new Date()
      },{
        created_by: useradminid,
        question: `{"indonesia":"Apa perbedaan Active Taiwan dan Active Mandarin?","english":"What is the difference between Active Taiwan and Active Mandarin?"}`,
        answer: `{"indonesia":"Active Taiwan berfokus pada pengajaran karakter mandarin tradisional guna membantu persiapan siswa yang ingin melanjutkan studi ke Taiwan maupun switch career ke perusahaan Taiwan. Active Mandarin berfokus pada pengajaran karakter mandarin sederhana guna membantu persiapan siswa yang ingin melanjutkan studi ke Tiongkok maupun switch career ke perusahaan Tiongkok.","english":"Active Taiwan focuses on teaching traditional Chinese characters to help prepare students who wish to continue their studies in Taiwan or switch careers to Taiwanese companies.Active Mandarin focuses on teaching simple Chinese characters to help prepare students who wish to continue their studies in China or switch careers to Chinese companies."}`,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        created_by: useradminid,
        question: `{"indonesia":"Apa perbedaan Basic Class dan HSK Class?","english":"What is the difference between Basic Class and HSK Class?"}`,
        answer: `{"indonesia":"Basic Class adalah kelas yang dikhususkan bagi yang belum mengetahui materi dasar bahasa mandarin. Di kelas ini akan mempelajari materi dasar yang akan mempermudah untuk mempelajari kosakata dan grammar di kelas HSK. - HSK Class dikhususkan bagi yang sudah menguasai materi dasar dan siap untuk mempelajari berbagai kosakata dan grammar tingkat lanjut.","english":"Basic Class is a class specifically for those who don't know the basic material of Mandarin, in this class you will learn basic material which will make it easier to learn vocabulary and grammar in HSK class.- HSK Class is specifically for those who have mastered basic material and are ready to learn various advanced vocabulary and grammar."}`,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        created_by: useradminid,
        question: `{"indonesia":"Benefit apa yang akan didapatkan selama berlangganan kelas?","english":"What benefits will you get while subscribing to the class?"}`,
        answer: `{"indonesia":"- Dari setiap kelas HSK yang dibeli, siswa akan mendapatkan 'Speaking Session' bersama Native Speaker. Melalui sesi ini, siswa dapat meningkatkan kemampuan bahasa mandarin secara langsung. - Mendapatkan fasilitas ruang diskusi, sehingga bisa mengobrol dengan siswa lainnya. - Sebelum/sesudah membeli kelas, siswa akan diberikan placement test untuk mengetahui kelas yang sesuai dengan kemampuan siswa.","english":"- From every HSK class purchased, students will get a 'Speaking Session' with Native Speakers. Through this session, students can directly improve their Mandarin language skills.- Get discussion room facilities, so you can chat with other students via WhatsApp.- Before and after buying a class, students will be given a placement test to find out which class suits the student's abilities."}`,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        created_by: useradminid,
        question: `{"indonesia":"Durasi kelas berapa lama?","english":"How long is the class duration?"}`,
        answer: `{"indonesia":"Setiap kelas memiliki durasi 90 menit setiap pertemuan.","english":"Each class has a duration of 90 minutes at each meeting."}`,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        created_by: useradminid,
        question: `{"indonesia":"Siapa yang menjadi tutor di kelas Active?","english":"Who is the tutor at Active Mandarin ID?"}`,
        answer: `{"indonesia":"Siswa akan diajar oleh para tutor Active Mandarin Indonesia yang sudah diseleksi. Para tutor merupakan  undergraduate dan fresh graduate dari beberapa universitas di Tiongkok dengan skill berbahasa mandarin yang sudah tersertifikasi.","english":"Students will be taught by selected Active Mandarin Indonesian tutors. The tutors are undergraduates and recent graduates from several universities in China with certified Mandarin language skills."}`,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        created_by: useradminid,
        question: `{"indonesia":"Media pembelajaran apa yang digunakan saat kelas berlangsung?","english":"What learning media is used during class?"}`,
        answer: `{"indonesia":"Menggunakan aplikasi Google Meet.","english":"Using the Google Meet application."}`,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        created_by: useradminid,
        question: `{"indonesia":"Apakah boleh mengajukan pertanyaan di luar pertemuan kelas?","english":"Is it okay to ask questions outside of class meetings?"}`,
        answer: `{"indonesia":"Tentu saja boleh. Pertanyaan diajukan di WhatsApp Group yang akan disediakan saat kelas sudah dimulai. Tidak ada tambahan waktu kelas di luar jam kelas yang sudah berlaku.","english":"Definitely, Yes! Questions are asked in the WhatsApp Group which will be provided when the class has started. There is no additional class time outside the applicable class hours."}`,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        created_by: useradminid,
        question: `{"indonesia":"Bagaimana metode pembayaran kelas?","english":"What are the class payment methods?"}`,
        answer: `{"indonesia":"1. Memilih kelas pada katalog website (https://activemandarin.id/) atau katalog whatsapp admin (0821-8180-0104) 2. Melakukan pembayaran kelas ke [BNI 1446724452 an. SURYA PRATAMA JANUARVI] 3. Melakukan konfirmasi pembayaran ke whatsapp admin (0821-8180-0104)","english":"1. Choose a class on the website catalog (https://activemandarin.id/) or whatsapp admin catalog (+62821-8180-0104) 2. Make class payments to [BNI 1446724452 an. SURYA PRATAMA JANUARVI] 3. Confirm payment to whatsapp admin (+62821-8180-0104)"}`,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        created_by: useradminid,
        question: `{"indonesia":"Apakah pembayaran bisa dibatalkan?","english":"Can payments be canceled?"}`,
        answer: `{"indonesia":"Apabila sudah melakukan pembayaran bisa mengajukan refund dalam waktu 1 × 24 jam. Namun, jika sudah melewati batas waktu yang berlaku maka dana yang sudah dibayarkan tidak bisa dikembalikan dalam bentuk apapun.","english":"If you have made a payment, you can submit a refund within 1 × 24 hours. However, if it has passed the applicable time limit, the funds that have been paid cannot be returned in any conditions without approval and specific reasons."}`,
        createdAt: new Date(),
        updatedAt: new Date()
      },
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
