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
    return await queryInterface.bulkInsert('MstLanguage', [
      {
        code: 'Compro',
        indonesia: `{"navbar": ["Beranda", "Tentang", "Kelas", "Acara", "Flash Card"],"getStarted": "Mulai","herosTitle": "Belajar Minimal, Hasil Optimal","herosDesc": "Mau mandarinmu makin hebat? belajar di Active pasti tepat!","sponsorsTags": "Dipercaya oleh","sponsorsCTA": "Informasi kerja sama","workflowTitle": "Kenapa Harus Active Mandarin?","workflowCards": [{"title": "Tutor Berkualitas","shorts": "Tutor kami telah tersertifikasi HSK dan TOCFL"},{"title": "Kurikulum Ajar Mudah Dipahami","shorts": "Kami telah mendesain kurikulum ajar yang komprehensif dan proporsional"},{"title": "Termurah","shorts": "Harga murah, kualitas wah!"},{"title": "Langsung Kerja","shorts": "Kami telah memiliki 50+ akses ke perusahaan ternama"}],"productsTitle": "Produk Active Mandarin ID","productsTags": "Dapatkan layanan gratis yang bisa diakses kapanpun dan dimanapun","productsDesc": "Bersama Active Mandarin ID wujudkan mimpimu untuk raih beasiswa luar negeri di kampus impianmu di China, Hong Kong, dan Taiwan.","productItem": ["Career Center Program akan bantu wujudkan mimpimu mendapatkan prospek kerja yang lebih terjamin.","Flashcard Mandarin simplified and traditional."],"classTitle": "Pilih paket kelas yang kamu inginkan","classButton": "Kelas lainnya","classPageTitle": "Katalog Kelas","classPageDesc": "Ilmu yang dipersiapkan untuk persiapan studi dan kerja impian di masa depan","lectureTitle": " Kenalan, yuk!","lectureTags": "Tutor Active Mandarin ID","momentsTitle": "Momen","momentsTags": "Memori kegiatan program Active","testimonyTitle": "Ulasan","testimonyTags": "Simak kata mereka tentang Active Mandarin ID, yuk!","eventTitle": "Program Mendatang","eventTags": "Gabung","eventDesc": "Ikuti rangkaian acara yang dapat membantumu mengenal lebih jauh tentang Active Mandarin ID","viewButton": "Selengkapnya","faqTitle": "Semangat Belajar, 加油!","faqTags": "Tanya Jawab","donateTitle": "Mari Berdonasi","donateDesc": "100% donasi digunakan untuk keperluan beasiswa","donateButton": "Donasi sekarang","footerDesc": "Active Mandarin ID adalah sebuah platform yang berfokus pada pendidikan, bimbingan, dan pusat karir","addressTitle": "Alamat","phoneTitle": "Nomor Telepon","socmed": "Media Sosial","general": "Umum","generalItem": ["Tentang Kami", "Karir"],"help": "Pusat Bantuan","chatAdmin": "Hubungi Admin","flashCardDesc": "Belajar bahasa mandarin semakin seru dengan menggunakan bantuan flashcard Mandarin simplified and traditional sebagai metode belajar alternatif untuk mengingat dan mengkaji ulang kosakata. Active Mandarin ID mengeluarkan beberapa produk baru untuk menunjang belajar kamu dalam memahami bahasa mandarin. Beli sekarang!","aboutTitle": "Cerita Dibalik Active Mandarin ID","aboutDesc": "Latar belakang terbentuknya Active Mandarin sebagai tempat berkembang bersama"}`,
        english: `{"navbar": ["Home", "About", "Class", "Events", "Flash Card"],"getStarted": "Get Started","herosTitle": "Be Active With Active Mandarin","herosDesc": "More practice more result","sponsorsTags": "Trusted by several companies","sponsorsCTA": "Become a partner","workflowTitle": "HOW IT WORKS","workflowCards": [{"title": "Highly Qualified Tutors","shorts": "Our tutors has HSK and TOCFL certification"},{"title": "Easy-To-Understand Teaching Materials","shorts": "We have made our curriculum easy-to-understand"},{"title": "Don’t worry about the price as we have","shorts": "Lower price with high, quality teaching materials"},{"title": "Ready to Work","shorts": "We have 50+ access with top companies, just only for you to work in the Mandarin industry"}],"productsTitle": "Active Mandarin ID Products","productsTags": "Get your free service wherever you go, whatever you want","productsDesc": "With Active Mandarin ID, achieve your dream to study at the Top Universities in China, Hong Kong, and Taiwan.","productItem": ["Our career center will give you a lot of insight about working in the mandarin industry in any fields.","Flashcard Mandarin simplified and traditional"],"classTitle": "Choose your package","classButton": "View more","classPageTitle": "Catalog Class","classPageDesc": "Let’s do the placement test","lectureTitle": "GET TO KNOW","lectureTags": "Our experience and professional mentor in Active","momentsTitle": "Moments","momentsTags": "Our memory during the program","testimonyTitle": "TESTIMONY","testimonyTags": "What did the students say to us?","eventTitle": "Upcoming Event","eventTags": "Join with Us","eventDesc": "Follow our social media to get know more about the program we have","viewButton": "View More","faqTitle": "Happy Learning, 加油!","faqTags": "Frequently Asked Questions","donateTitle": "Give","donateDesc": "100% of the donations go towards to our program for the scholarship","donateButton": "Donate now","footerDesc": "Active Mandarin ID is a platform focused on education, mentorship and career center","addressTitle": "Address","phoneTitle": "Phone Number","socmed": "Social Media","general": "General","generalItem": ["About Us", "Careers"],"help": "FAQ","chatAdmin": "Chat Admin","flashCardDesc": "Play everywhere, Study anywhere. Our learning will be have a lot of fun with our flashcard. Our products are the best in the market and special for you, to have fun while you learn. Grab it fast!","aboutTitle": "The Story Behind Active Mandarin ID","aboutDesc": "The reason why we made Active Mandarin ID"}`,
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
