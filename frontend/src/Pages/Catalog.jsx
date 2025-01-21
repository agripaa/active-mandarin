import React, { useState, useEffect } from "react";
import Mainlayouts from "../Layouts/MainLayouts";
import { useDispatch, useSelector } from "react-redux";
import { getClass } from "../Store/Action/getAllDatas";
import CardClasses from "../Components/CardClass";
import CardDegree from "../Components/CardDegree";
import { Col, Modal, Button } from "antd";
import Slider from "react-slick";
import { Rate } from "antd";

const Catalog = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({});
  const { data, langs } = useSelector((state) => state.LangReducer);
  const [activeSlide, setActiveSlide] = React.useState(0);
  const [galleryData, setGalleryData] = useState([]); // State untuk menyimpan data dari API/sumber

  const dummyClasses = {
    indonesia: [
      {
        title: "Mandarin Class Juara Next Level",
        price: "4.499.000",
        image: "/assets/class/1.png",
        banner: "/assets/banner-juara-next.png",
        bnefits: [
          "Simulasi ujian HSK 1 - HSK 4",
          "Kelas Privat (1 Siswa/kelas)",
          "Akses ke materi pembelajaran PDF, PPT, Video, dan Audio",
          "Gratis e-Flashcard HSK 1 - HSK 4 + Buku Latihan Hanzi",
          "Durasi: 5 bulan (40 sesi)",
        ],
        desc: "Kelas ini dirancang untuk memungkinkan siswa menguasai Bahasa Mandarin dalam waktu singkat namun efektif. Kurikulumnya mencakup berbagai aspek pembelajaran dari tingkat dasar, termasuk keterampilan mendengar, berbicara, membaca, dan menulis, yang disusun secara sistematis dari tingkat pemula hingga menengah.",
        free: [
          "1 Buku Tulis Hanzi",
          "Akses ke e-Flashcard HSK 1-4 dengan kosakata, terjemahan, dan contoh kalimat",
          "Sesi tanya jawab di luar kelas dalam grup eksklusif",
          "Daftar Kosakata HSK 1-4",
        ],
        facilities: [
          "Simulasi ujian HSK 1 hingga HSK 4",
          "Silabus pengajaran",
          "Kelas interaktif: Membaca, Berbicara, Menulis, dan Mendengar",
          "Akses ke materi PDF, PPT, dan Audio",
          "Rekaman video kelas tersedia untuk diputar ulang",
        ],
        other: [
          "Informasi lowongan kerja untuk penutur Mandarin",
          "Informasi beasiswa kuliah di Tiongkok",
          "Jaminan kelulusan HSK 4",
        ],
        detail_class: [
          "Level: Pemula - HSK 4",
          "Kuota: 1 siswa",
          "Durasi: 5 bulan (40 pertemuan)",
        ],
      },
      {
        title: "Mandarin Class Juara",
        price: "3.000.000",
        image: "/assets/class/2.png",
        banner: "/assets/banner-juara.png",
        bnefits: [
          "Simulasi ujian HSK 1 - HSK 4",
          "Kelompok Kecil (3 - 5 Siswa)",
          "Akses ke materi pembelajaran PDF, PPT, Video, dan Audio",
          "Gratis e-Flashcard HSK 1 - HSK 4 + Buku Latihan Hanzi",
          "Durasi: 5 bulan (40 sesi)",
        ],
        desc: "Program ini dirancang khusus untuk satu siswa per kelas, memastikan pendekatan pembelajaran yang sangat personal dengan fokus penuh pada kebutuhan individu. Dengan metode intensif namun efektif, siswa dibimbing untuk menguasai Bahasa Mandarin dalam waktu singkat, mencakup semua keterampilan utama: mendengar, berbicara, membaca, dan menulis.",
        free: [
          "1 Buku Tulis Hanzi",
          "Akses ke e-Flashcard HSK 1-4 dengan kosakata, terjemahan, dan contoh kalimat",
          "Sesi tanya jawab di luar kelas dalam grup eksklusif",
          "Daftar Kosakata HSK 1-4",
        ],
        facilities: [
          "Simulasi ujian HSK 1 hingga HSK 4",
          "Silabus pengajaran",
          "Kelas interaktif: Membaca, Berbicara, Menulis, dan Mendengar",
          "Akses ke materi PDF, PPT, dan Audio",
          "Rekaman video kelas tersedia untuk diputar ulang",
        ],
        other: [
          "Informasi lowongan kerja untuk penutur Mandarin",
          "Informasi beasiswa kuliah di Tiongkok",
          "Jaminan kelulusan HSK 4",
        ],
        detail_class: [
          "Level: Pemula - HSK 4",
          "Kuota: 1 siswa",
          "Durasi: 5 bulan (40 pertemuan)",
        ],
      },
      {
        title: "Mandarin General Class - Basic",
        price: "750.000",
        image: "/assets/class/3.png",
        banner: "",
        bnefits: [
          "Gratis 1 Buku Tulis Hanzi",
          "Sesi tanya jawab di luar kelas dalam grup eksklusif",
          "Silabus pengajaran",
          "Kelas interaktif: Membaca, Berbicara, Menulis, dan Mendengar",
          "Akses ke materi PDF, PPT, dan Audio",
          "Rekaman video kelas tersedia untuk diputar ulang",
        ],
        desc: "Kelas dasar ini sangat cocok untuk pemula tanpa pengetahuan sebelumnya tentang Bahasa Mandarin. Siswa akan mempelajari dasar-dasar seperti pinyin, hanzi, nada, pelafalan, dan percakapan sederhana. Kelas ini dirancang untuk memberikan dasar yang kuat, mempersiapkan siswa untuk maju dengan percaya diri ke tingkat pembelajaran berikutnya.",
        free: [],
        facilities: [],
        other: [],
        detail_class: [
          "Level: Pemula",
          "Kuota: 5 - 10 siswa",
          "Durasi: 1 bulan (8 pertemuan)",
        ],
      },
      {
        title: "Mandarin Class Native",
        price: "Segera",
        image: "/assets/class/4.png",
        banner: "",
        bnefits: [
          "Simulasi ujian HSK 1 - HSK 5",
          "Akses ke materi pembelajaran PDF, PPT, Video, dan Audio",
          "Akses gratis e-Flashcard HSK 1 - HSK 4 + Buku Latihan Hanzi",
          "Durasi: Segera",
        ],
        desc: "Program ini dirancang khusus untuk beberapa siswa per kelas, memastikan proses pembelajaran yang menarik. Dengan metode pembelajaran bersama yang intensif namun efektif, siswa akan dibimbing untuk menguasai Bahasa Mandarin dalam waktu singkat, mencakup semua keterampilan utama: mendengar, berbicara, membaca, dan menulis.",
        free: [
          "1 Buku Tulis Hanzi",
          "Akses ke e-Flashcard HSK 1-5 dengan kosakata, terjemahan, dan contoh kalimat",
          "Sesi tanya jawab di luar kelas dalam grup eksklusif",
          "Daftar Kosakata HSK 1-4",
        ],
        facilities: [
          "Simulasi ujian HSK 1 hingga HSK 5",
          "Silabus pengajaran",
          "Kelas interaktif: Membaca, Berbicara, Menulis, dan Mendengar",
          "Akses ke materi PDF, PPT, dan Audio",
          "Rekaman video kelas tersedia untuk diputar ulang",
        ],
        other: [
          "Informasi lowongan kerja untuk penutur Mandarin",
          "Informasi beasiswa kuliah di Tiongkok",
          "Jaminan kelulusan HSK 5",
        ],
        detail_class: [
          "Level: Pemula - HSK 5",
          "Kuota: Segera",
          "Durasi: Segera",
        ],
      },
    ],
    english: [
      {
        title: "Mandarin Class Juara Next Level",
        price: "4.499.000",
        image: "/assets/class/1.png",
        banner: "/assets/banner-juara-next.png",
        bnefits: [
          "HSK 1 - HSK 4 exam simulation",
          "Private Class (1 Student/class)",
          "Access to PDF, PPT, Video and Audio Learning",
          "Free e-Flashcard HSK 1 - HSK 4 + Hanzi Practiced Book",
          "Duration: 5 months (40 sessions)",
        ],
        desc: "This class is designed to enable students to master Mandarin in a short but effective timeframe. The curriculum covers various aspects of learning from the basic level, including listening, speaking, reading, and writing skills, which are systematically arranged from the beginner to intermediate levels.",
        free: [
          "1 Hanzi Writing Notebook",
          "Access to HSK 1-4 e-Flashcards with vocabulary, translations, and example sentences",
          "Q&A sessions outside of class in an exclusive class group",
          "HSK 1-4 Vocabulary List",
        ],
        facilities: [
          "HSK 1 to HSK 4 exam simulations",
          "Teaching syllabus",
          "Interactive classes: Reading, Speaking, Writing, and Listening",
          "Access to PDF, PPT, and Audio materials",
          "Class video recordings available for replay",
        ],
        other: [
          "Job vacancy information Mandarin speakers",
          "Information on college scholarships at China",
          "HSK 4 completion guarantee",
        ],
        detail_class: [
          "Level: Beginner - HSK 4",
          "Quota: 1 student",
          "Duration: 5 months (40 meetings)",
        ],
      },
      {
        title: "Mandarin Class Juara",
        price: "3.000.000",
        image: "/assets/class/2.png",
        banner: "/assets/banner-juara.png",
        bnefits: [
          "HSK 1 - HSK 4 exam simulation",
          "Mini Group (3 - 5 Students)",
          "Access to PDF, PPT, Video and Audio Learning",
          "Free e-Flashcard HSK 1 - HSK 4 + Hanzi Practiced Book",
          "Duration: 5 months (40 sessions)",
        ],
        desc: "This program is specially designed for one student per class, ensuring a highly personalized learning approach with full focus on individual needs. Using an intensive yet effective method, students are guided to master Mandarin in a short time, covering all key skills: listening, speaking, reading, and writing.",
        free: [
          "1 Hanzi Writing Notebook",
          "Access to HSK 1-4 e-Flashcards with vocabulary, translations, and example sentences",
          "Q&A sessions outside of class in an exclusive class group",
          "HSK 1-4 Vocabulary List",
        ],
        facilities: [
          "HSK 1 to HSK 4 exam simulations",
          "Teaching syllabus",
          "Interactive classes: Reading, Speaking, Writing, and Listening",
          "Access to PDF, PPT, and Audio materials",
          "Class video recordings available for replay",
        ],
        other: [
          "Job vacancy information Mandarin speakers",
          "Information on college scholarships at China",
          "HSK 4 completion guarantee",
        ],
        detail_class: [
          "Level: Beginner - HSK 4",
          "Quota: 1 student",
          "Duration: 5 months (40 meetings)",
        ],
      },
      {
        title: "Mandarin General Class - Basic",
        price: "750.000",
        image: "/assets/class/3.png",
        banner: "",
        bnefits: [
          "Free 1 Hanzi Writing Notebook",
          "Q&A sessions outside of class in an exclusive class group",
          "Teaching syllabus",
          "Interactive classes: Reading, Speaking, Writing, and Listening",
          "Access to PDF, PPT, and Audio materials",
          "Class video recordings available for replay",
        ],
        desc: "This foundational class is perfect for beginners with no prior knowledge of Mandarin. Students will learn the essentials such as pinyin, hanzi, tones, pronunciation, and simple conversations. The class is designed to provide a strong foundation, preparing students to advance confidently to the next learning level.",
        free: [],
        facilities: [],
        other: [],
        detail_class: [
          "Level: Beginner",
          "Quota: 5 - 10 students",
          "Duration: 1 month (8 meetings)",
        ],
      },
      {
        title: "Mandarin Class Native",
        price: "Soon",
        image: "/assets/class/4.png",
        banner: "",
        bnefits: [
          "HSK 1 - HSK 5 exam simulation",
          "Access to PDF, PPT, Video and Audio Learning",
          "Free Access e-Flashcard HSK 1 - HSK 4 + Hanzi Practiced Book",
          "Duration: Soon",
        ],
        desc: "This program is specifically designed for multiple students per class, ensuring attractive learning process. With intensive joint learning methods but effectively, students will be guided to master Mandarin in time short, covers all the main skills: listening, speaking, reading, and write.",
        free: [
          "1 Hanzi Writing Notebook",
          "Access to HSK 1-5 e-Flashcards with vocabulary, translations, and example sentences",
          "Q&A sessions outside of class in an exclusive class group",
          "HSK 1-4 Vocabulary List",
        ],
        facilities: [
          "HSK 1 to HSK 5 exam simulations",
          "Teaching syllabus",
          "Interactive classes: Reading, Speaking, Writing, and Listening",
          "Access to PDF, PPT, and Audio materials",
          "Class video recordings available for replay",
        ],
        other: [
          "Job vacancy information Mandarin speakers",
          "Information on college scholarships at China",
          "HSK 5 completion guarantee",
        ],
        detail_class: [
          "Level: Beginner - HSK 5",
          "Quota: Soon",
          "Duration: Soon",
        ],
      },
    ],
  };

  const products = {
    english: [
      {
        title: "Mandarin General Class - HSK 1",
        price: "1.000.000",
        star: 4,
        image: "/assets/kelas-umum/hsk1.png",
        desc: "This class is specially designed for beginners with basic knowledge of Mandarin. Students will learn all HSK 1 vocabulary and the required grammar to strengthen their fundamental Mandarin skills. The material is systematically arranged to ensure students not only recognize vocabulary but also understand its use in daily sentences.",
        free: ["1 Hanzi Writing Notebook", "HSK 1 Vocabulary"],
        facilities: [
          "Free Access HSK 1 e-Flashcard, equipped with vocabulary, translations, and example sentences",
          "Q&A sessions outside of class in an exclusive class group",
          "HSK 1 exam simulation",
          "HSK 1 completion guarantee",
          "Class video recordings available for replay",
          "Access to PDF, PPT, and Audio materials",
        ],
        other: [],
        detail_class: [
          "Level: HSK 1",
          "Quota: 5 - 10 students",
          "Duration: 2 months (16 sessions)",
        ],
      },
      {
        title: "Mandarin General Class - HSK 2",
        price: "1.250.000",
        star: 4,
        image: "/assets/kelas-umum/hsk2.png",
        desc: "This class is designed for students who have mastered HSK 1 and are ready to move to the next level. Students will deepen their knowledge by learning all HSK 2 vocabulary and more complex grammar. The program aims to help students develop comprehensive language skills and prepare them for more advanced challenges.",
        free: ["1 Hanzi Writing Notebook", "HSK 2 Vocabulary"],
        facilities: [
          "Free Access HSK 2 e-Flashcard, equipped with vocabulary, translations, and example sentences",
          "Q&A sessions outside of class in an exclusive class group",
          "HSK 2 exam simulation",
          "HSK 2 completion guarantee",
          "Guarantee to complete HSK 2",
          "Class video recordings available for replay",
          "Access to PDF, PPT, and Audio materials",
        ],
        other: [],
        detail_class: [
          "Level: HSK 2",
          "Quota: 5 - 10 students",
          "Duration: 2 months (16 sessions)",
        ],
      },
      {
        title: "Mandarin General Class - HSK 3",
        price: "1.500.000",
        star: 4,
        image: "/assets/kelas-umum/hsk3.png",
        desc: "This class is ideal for students who have mastered HSK 2 and are ready to move to the next level. Students will learn all HSK 3 vocabulary along with its grammar, expanding their language skills and preparing them for more complex communication. With a deep and systematic approach, this class aims to help students significantly improve their Mandarin proficiency.",
        free: ["1 Hanzi Writing Notebook", "HSK 3 Vocabulary"],
        facilities: [
          "Free Access HSK 3 e-Flashcard, equipped with vocabulary, translations, and example sentences",
          "Q&A sessions outside of class in an exclusive class group",
          "HSK 3 exam simulation",
          "HSK 3 completion guarantee",
          "Class video recordings available for replay",
          "Access to PDF, PPT, and Audio materials",
        ],
        other: [],
        detail_class: [
          "Level: HSK 3",
          "Quota: 5 - 10 students",
          "Duration: 2 months (16 sessions)",
        ],
      },
      {
        title: "Mandarin General Class - HSK 4",
        price: "1.750.000",
        star: 4,
        image: "/assets/kelas-umum/hsk4.png",
        desc: "This class is designed for students who have mastered HSK 3. Here, students will learn HSK 4 vocabulary and more advanced grammar. The class aims to enhance Mandarin understanding and prepare students for more diverse communication scenarios.",
        free: ["1 Hanzi Writing Notebook", "HSK 4 Vocabulary"],
        facilities: [
          "Free Access HSK 4 e-Flashcard, equipped with vocabulary, translations, and example sentences",
          "Q&A sessions outside of class in an exclusive class group",
          "HSK 4 exam simulation",
          "HSK 4 completion guarantee",
          "HSK 4 completion guarantee",
          "Class video recordings available for replay",
          "Access to PDF, PPT, and Audio materials",
        ],
        other: [],
        detail_class: [
          "Level: HSK 4",
          "Quota: 5 - 10 students",
          "Duration: 3 months (24 sessions)",
        ],
      },
      {
        title: "Mandarin General Class - HSK 5",
        price: "2.000.000",
        star: 4,
        image: "/assets/kelas-umum/hsk5.png",
        desc: "This class is ideal for students who have mastered HSK 4. Here, students will learn HSK 5 vocabulary and advanced grammar. The program is designed to further expand Mandarin skills and prepare students for more complex communication situations.",
        free: ["1 Hanzi Writing Notebook", "HSK 5 Vocabulary"],
        facilities: [
          "Free Access HSK 5 e-Flashcard, equipped with vocabulary, translations, and example sentences",
          "Q&A sessions outside of class in an exclusive class group",
          "HSK 5 exam simulation",
          "HSK 5 completion guarantee",
          "HSK 5 completion guarantee",
          "Class video recordings available for replay",
          "Access to PDF, PPT, and Audio materials",
        ],
        other: [],
        detail_class: [
          "Level: HSK 5",
          "Quota: 5 - 10 students",
          "Duration: 2 months (16 sessions)",
        ],
      },
    ],
    indonesia: [
      {
        title: "Kelas Umum Mandarin - HSK 1",
        price: "1.000.000",
        star: 4,
        image: "/assets/kelas-umum/hsk1.png",
        desc: "Kelas ini dirancang khusus untuk pemula dengan pengetahuan dasar Mandarin. Siswa akan mempelajari semua kosakata HSK 1 dan tata bahasa yang diperlukan untuk memperkuat keterampilan dasar Mandarin mereka. Materi disusun secara sistematis agar siswa tidak hanya mengenali kosakata, tetapi juga memahami penggunaannya dalam kalimat sehari-hari.",
        free: ["1 Buku Menulis Hanzi", "Kosakata HSK 1"],
        facilities: [
          "Bebas Akses e-Flashcard HSK 1, dilengkapi kosakata, terjemahan, dan contoh kalimat",
          "Sesi Tanya Jawab di luar kelas dalam grup kelas eksklusif",
          "Simulasi ujian HSK 1",
          "Jaminan kelulusan HSK 1",
          "Rekaman video kelas yang dapat diputar ulang",
          "Akses ke materi PDF, PPT, dan Audio",
        ],
        other: [],
        detail_class: [
          "Tingkat: HSK 1",
          "Kuota: 5 - 10 siswa",
          "Durasi: 2 bulan (16 sesi)",
        ],
      },
      {
        title: "Kelas Umum Mandarin - HSK 2",
        price: "1.250.000",
        star: 4,
        image: "/assets/kelas-umum/hsk2.png",
        desc: "Kelas ini dirancang untuk siswa yang telah menguasai HSK 1 dan siap naik ke tingkat berikutnya. Siswa akan memperdalam pengetahuan mereka dengan mempelajari semua kosakata HSK 2 dan tata bahasa yang lebih kompleks. Program ini bertujuan membantu siswa mengembangkan keterampilan bahasa secara menyeluruh dan mempersiapkan mereka untuk tantangan yang lebih maju.",
        free: ["1 Buku Menulis Hanzi", "Kosakata HSK 2"],
        facilities: [
          "Bebas Akses e-Flashcard HSK 2, dilengkapi kosakata, terjemahan, dan contoh kalimat",
          "Sesi Tanya Jawab di luar kelas dalam grup kelas eksklusif",
          "Simulasi ujian HSK 2",
          "Jaminan kelulusan HSK 2",
          "Rekaman video kelas yang dapat diputar ulang",
          "Akses ke materi PDF, PPT, dan Audio",
        ],
        other: [],
        detail_class: [
          "Tingkat: HSK 2",
          "Kuota: 5 - 10 siswa",
          "Durasi: 2 bulan (16 sesi)",
        ],
      },
      {
        title: "Kelas Umum Mandarin - HSK 3",
        price: "1.500.000",
        star: 4,
        image: "/assets/kelas-umum/hsk3.png",
        desc: "Kelas ini ideal untuk siswa yang telah menguasai HSK 2 dan siap naik ke tingkat berikutnya. Siswa akan mempelajari semua kosakata HSK 3 beserta tata bahasanya, memperluas keterampilan bahasa mereka, dan mempersiapkan diri untuk komunikasi yang lebih kompleks. Dengan pendekatan yang mendalam dan sistematis, kelas ini bertujuan membantu siswa meningkatkan kemampuan Mandarin mereka secara signifikan.",
        free: ["1 Buku Menulis Hanzi", "Kosakata HSK 3"],
        facilities: [
          "Bebas Akses e-Flashcard HSK 3, dilengkapi kosakata, terjemahan, dan contoh kalimat",
          "Sesi Tanya Jawab di luar kelas dalam grup kelas eksklusif",
          "Simulasi ujian HSK 3",
          "Jaminan kelulusan HSK 3",
          "Rekaman video kelas yang dapat diputar ulang",
          "Akses ke materi PDF, PPT, dan Audio",
        ],
        other: [],
        detail_class: [
          "Tingkat: HSK 3",
          "Kuota: 5 - 10 siswa",
          "Durasi: 2 bulan (16 sesi)",
        ],
      },
      {
        title: "Kelas Umum Mandarin - HSK 4",
        price: "1.750.000",
        star: 4,
        image: "/assets/kelas-umum/hsk4.png",
        desc: "Kelas ini dirancang untuk siswa yang telah menguasai HSK 3. Di sini, siswa akan mempelajari kosakata HSK 4 dan tata bahasa yang lebih maju. Kelas ini bertujuan untuk meningkatkan pemahaman Mandarin siswa dan mempersiapkan mereka untuk skenario komunikasi yang lebih beragam.",
        free: ["1 Buku Menulis Hanzi", "Kosakata HSK 4"],
        facilities: [
          "Bebas Akses e-Flashcard HSK 4, dilengkapi kosakata, terjemahan, dan contoh kalimat",
          "Sesi Tanya Jawab di luar kelas dalam grup kelas eksklusif",
          "Simulasi ujian HSK 4",
          "Jaminan kelulusan HSK 4",
          "Rekaman video kelas yang dapat diputar ulang",
          "Akses ke materi PDF, PPT, dan Audio",
        ],
        other: [],
        detail_class: [
          "Tingkat: HSK 4",
          "Kuota: 5 - 10 siswa",
          "Durasi: 3 bulan (24 sesi)",
        ],
      },
      {
        title: "Kelas Umum Mandarin - HSK 5",
        price: "2.000.000",
        star: 4,
        image: "/assets/kelas-umum/hsk5.png",
        desc: "Kelas ini ideal untuk siswa yang telah menguasai HSK 4. Di sini, siswa akan mempelajari kosakata HSK 5 dan tata bahasa tingkat lanjut. Program ini dirancang untuk lebih memperluas keterampilan Mandarin dan mempersiapkan siswa untuk situasi komunikasi yang lebih kompleks.",
        free: ["1 Buku Menulis Hanzi", "Kosakata HSK 5"],
        facilities: [
          "Bebas Akses e-Flashcard HSK 5, dilengkapi kosakata, terjemahan, dan contoh kalimat",
          "Sesi Tanya Jawab di luar kelas dalam grup kelas eksklusif",
          "Simulasi ujian HSK 5",
          "Jaminan kelulusan HSK 5",
          "Rekaman video kelas yang dapat diputar ulang",
          "Akses ke materi PDF, PPT, dan Audio",
        ],
        other: [],
        detail_class: [
          "Tingkat: HSK 5",
          "Kuota: 5 - 10 siswa",
          "Durasi: 2 bulan (16 sesi)",
        ],
      },
    ],
  };

  const scholarship = {
    english: [
      {
        title: "Mentor Scholarship Group",
        price: "3.499.000",
        image: "/assets/scholarship/1.png",
        category: "scholarship",
        bnefits: [
          "Group chat with mentors to share information and experiences.",
          "5 consultations, including 2 meetings via Zoom Meeting.",
          "Personalized guidance on applying for scholarships in China.",
        ],
        desc: "We present the Mentor Scholarship program to help you obtain scholarships in China more easily and systematically. This program is designed to meet various needs, whether through one-on-one sessions, group sessions, or services that directly assist your application process until completion.",
        free: [],
        facilities: [
          "Group chat with mentors to share information and experiences",
          "5 consultation sessions, including 2 Zoom meetings",
          "Direct guidance for scholarship applications",
        ],
        other: [],
        detail_class: [],
      },
      {
        title: "Mentor Scholarship one-on-one",
        price: "4.999.000",
        image: "/assets/scholarship/2.png",
        category: "scholarship",
        bnefits: [
          "Private group chats directly with experienced mentors.",
          "Exclusive one-on-one consultations with a mentor.",
          "8 consultation sessions, including 3 meetings via Zoom.",
          "Direct guidance for applying to targeted scholarships in China.",
        ],
        desc: "We present the Mentor Scholarship program to help you obtain scholarships in China more easily and systematically. This program is designed to meet various needs, whether through one-on-one sessions, group sessions, or services that directly assist your application process until completion.",
        free: [],
        facilities: [
          "Private group chat directly with experienced mentors.",
          "Exclusive one-on-one consultations (8 sessions, including 3 Zoom meetings)",
          "Direct guidance for scholarship applications",
        ],
        other: [],
        detail_class: [],
      },
      {
        title: "One Step Closer to Chinese Scholarship",
        price: "6.500.000",
        image: "/assets/scholarship/3.png",
        category: "scholarship",
        bnefits: [
          "Your scholarship application will be fully supported by Active Mandarin Indonesia's Education Consultant..",
          "Consultation with mentors to develop a study plan or other personal documents.",
          "Complete information and updates on the application process until acceptance.",
        ],
        desc: "We present the Mentor Scholarship program to help you obtain scholarships in China more easily and systematically. This program is designed to meet various needs, whether through one-on-one sessions, group sessions, or services that directly assist your application process until completion.",
        free: [],
        facilities: [
          "Your scholarship application will be fully assisted by Education Consultants from Active Mandarin Indonesia.",
          "Consultations with mentors to prepare a Study Plan or other personal documents.",
          "Complete information and updates on the application process until acceptance.",
        ],
        other: [],
        detail_class: [],
      },
    ],
    indonesia: [
      {
        title: "Kelompok Beasiswa Mentor",
        price: "3.499.000",
        image: "/assets/scholarship/1.png",
        category: "beasiswa",
        bnefits: [
          "Grup chat dengan mentor untuk berbagi informasi dan pengalaman.",
          "5 sesi konsultasi, termasuk 2 pertemuan melalui Zoom Meeting.",
          "Panduan pribadi untuk mendaftar beasiswa di China.",
        ],
        desc: "Kami menghadirkan program Beasiswa Mentor untuk membantu Anda mendapatkan beasiswa di China dengan lebih mudah dan sistematis. Program ini dirancang untuk memenuhi berbagai kebutuhan, baik melalui sesi pribadi, sesi kelompok, atau layanan yang langsung membantu proses aplikasi Anda hingga selesai.",
        free: [],
        facilities: [
          "Grup chat dengan mentor untuk berbagi informasi dan pengalaman",
          "5 sesi konsultasi, termasuk 2 pertemuan Zoom",
          "Panduan langsung untuk aplikasi beasiswa",
        ],
        other: [],
        detail_class: [],
      },
      {
        title: "Beasiswa Mentor 1 on 1",
        price: "4.999.000",
        image: "/assets/scholarship/2.png",
        category: "beasiswa",
        bnefits: [
          "Grup chat pribadi langsung dengan mentor berpengalaman.",
          "Konsultasi eksklusif satu lawan satu dengan mentor.",
          "8 sesi konsultasi, termasuk 3 pertemuan melalui Zoom.",
          "Panduan langsung untuk mendaftar beasiswa yang ditargetkan di China.",
        ],
        desc: "Kami menghadirkan program Beasiswa Mentor untuk membantu Anda mendapatkan beasiswa di China dengan lebih mudah dan sistematis. Program ini dirancang untuk memenuhi berbagai kebutuhan, baik melalui sesi pribadi, sesi kelompok, atau layanan yang langsung membantu proses aplikasi Anda hingga selesai.",
        free: [],
        facilities: [
          "Grup chat pribadi dengan mentor berpengalaman",
          "Konsultasi eksklusif satu lawan satu (8 sesi, termasuk 3 pertemuan Zoom)",
          "Panduan langsung untuk aplikasi beasiswa",
        ],
        other: [],
        detail_class: [],
      },
      {
        title: "Selangkah Lebih Dekat ke Beasiswa China",
        price: "6.500.000",
        image: "/assets/scholarship/3.png",
        category: "beasiswa",
        bnefits: [
          "Aplikasi beasiswa Anda akan sepenuhnya didukung oleh Konsultan Pendidikan Active Mandarin Indonesia.",
          "Konsultasi dengan mentor untuk menyusun rencana studi atau dokumen pribadi lainnya.",
          "Informasi lengkap dan pembaruan proses aplikasi hingga diterima.",
        ],
        desc: "Kami menghadirkan program Beasiswa Mentor untuk membantu Anda mendapatkan beasiswa di China dengan lebih mudah dan sistematis. Program ini dirancang untuk memenuhi berbagai kebutuhan, baik melalui sesi pribadi, sesi kelompok, atau layanan yang langsung membantu proses aplikasi Anda hingga selesai.",
        free: [],
        facilities: [
          "Aplikasi beasiswa sepenuhnya dibantu oleh Konsultan Pendidikan dari Active Mandarin Indonesia.",
          "Konsultasi dengan mentor untuk menyusun Rencana Studi atau dokumen pribadi lainnya.",
          "Informasi lengkap dan pembaruan proses aplikasi hingga diterima.",
        ],
        other: [],
        detail_class: [],
      },
    ],
  };

  const degree = {
    english: [
      {
        title: "Non-Degree Program",
        price: "6.999.000",
        image: "/assets/degree/1.png",
        bnefits: [
          "Enjoy a hands-on Mandarin learning experience in Nanjing while exploring the unique Chinese culture. Sample must-try street food specialties and experience the authentic atmosphere of this historic city! In addition to learning the language, you'll make valuable international connections and expand your future opportunities. Only this program combines intensive learning with exciting adventure!",
        ],
        desc: "Enjoy the experience of learning Mandarin directly in Nanjing while exploring the unique culture of China. Taste must-try local street food and immerse yourself in the authentic atmosphere of this historic city! Beyond learning the language, you’ll build valuable international connections and expand future opportunities. Combine intensive learning with exciting adventures—only in this program!",
        free: [],
        facilities: [],
        other: "",
        detail_class: [
          "Location: Nanjing, China",
          "Participants: General (18-25 years old)",
        ],
        program_start: ["March 2025 & September 2025"],
      },
      {
        title: "Degree Program D3-S3",
        price: "Chat Admin",
        image: "/assets/degree/2.png",
        bnefits: [
          "Private group chat for exclusive information and advice.",
          "1 on 1 consultation for personalized guidance on your academic and scholarship needs.",
          "Guide your entire university application process in China to meet the target university's standards.",
        ],
        desc: "A golden opportunity to pursue higher education in China with full scholarship support. Through this program, you can earn formal academic degrees ranging from Bachelor’s (S1), Master’s (S2), to Doctorate (S3) levels at leading universities in your chosen field of study. With Active Mandarin Indonesia Education Consultants, your academic journey will be more focused, from the registration process to assistance in preparing important documents such as a study plan. Supported by scholarships that cover tuition fees, research, and academic development, this program is designed to prepare you to become a competent graduate ready to compete both nationally and internationally.",
        facilities: [
          {
            mentor: [
              "Private group chat with Education Consultants from Active Mandarin for exclusive information and consultations.",
              "One-on-one consultations for personalized guidance tailored to your academic and scholarship needs.",
              "In-depth consultations to prepare a study plan, research proposal, or other personal documents.",
            ],
            assistance: [
              "The entire university application process in China will be assisted by Education Consultants from Active Mandarin Indonesia, ensuring your application meets the standards of your target universities.",
            ],
          },
        ],
        other:
          "This program is a strategic step to fulfill your dream of pursuing higher education at top universities in China. With guidance from Active Mandarin Indonesia, you are not only working toward an academic degree but also building a bright future!",
        free: [
          "Comprehensive Scholarship Access: Financial support covering tuition fees, research expenses, and academic career development.",
          "Expert Guidance: A professional team experienced in helping international students achieve higher education in China.",
          "International Career Path: A great opportunity to join the global academic community with extensive networks and promising career prospects.",
        ],
        detail_class: [],
        program_start: [],
      },
    ],
    indonesia: [
      {
        title: "Program Non-Gelar",
        price: "6.999.000",
        image: "/assets/degree/1.png",
        bnefits: [
          "Nikmati pengalaman belajar langsung bahasa Mandarin di Nanjing sambil menjelajahi keunikan budaya Tiongkok. Cicipi makanan khas street food yang wajib dicoba dan rasakan suasana autentik dari kota bersejarah ini! Selain belajar bahasa, Anda akan membangun koneksi internasional yang berharga dan memperluas peluang masa depan Anda. Program ini menggabungkan pembelajaran intensif dengan petualangan yang seru!",
        ],
        desc: "Rasakan pengalaman belajar bahasa Mandarin langsung di Nanjing sambil menjelajahi keunikan budaya Tiongkok. Cicipi makanan khas lokal dan nikmati suasana autentik kota bersejarah ini! Selain belajar bahasa, Anda akan membangun koneksi internasional yang bernilai dan memperluas peluang di masa depan. Gabungkan pembelajaran intensif dengan petualangan seru—hanya di program ini!",
        free: [],
        facilities: [],
        other: "",
        detail_class: ["Lokasi: Nanjing, China", "Peserta: Umum (18-25 tahun)"],
        program_start: ["Maret 2025 & September 2025"],
      },
      {
        title: "Program Gelar D3-S3",
        price: "Hubungi Admin",
        image: "/assets/degree/2.png",
        bnefits: [
          "Grup chat pribadi untuk informasi dan saran eksklusif.",
          "Konsultasi 1-on-1 untuk panduan pribadi terkait kebutuhan akademik dan beasiswa Anda.",
          "Panduan lengkap untuk seluruh proses aplikasi universitas di Tiongkok agar memenuhi standar universitas tujuan.",
        ],
        desc: "Peluang emas untuk melanjutkan pendidikan tinggi di Tiongkok dengan dukungan beasiswa penuh. Melalui program ini, Anda dapat meraih gelar akademik formal mulai dari Sarjana (S1), Magister (S2), hingga Doktor (S3) di universitas terkemuka sesuai bidang studi pilihan Anda. Bersama Konsultan Pendidikan Active Mandarin Indonesia, perjalanan akademik Anda akan lebih terarah, mulai dari proses pendaftaran hingga bantuan dalam menyusun dokumen penting seperti rencana studi. Didukung beasiswa yang mencakup biaya kuliah, penelitian, dan pengembangan akademik, program ini dirancang untuk mempersiapkan Anda menjadi lulusan kompeten yang siap bersaing secara nasional dan internasional.",
        facilities: [
          {
            mentor: [
              "Grup chat pribadi dengan Konsultan Pendidikan Active Mandarin untuk informasi eksklusif dan konsultasi.",
              "Konsultasi satu lawan satu untuk panduan pribadi sesuai kebutuhan akademik dan beasiswa Anda.",
              "Konsultasi mendalam untuk menyusun rencana studi, proposal penelitian, atau dokumen pribadi lainnya.",
            ],
            assistance: [
              "Proses aplikasi universitas di Tiongkok akan sepenuhnya dibantu oleh Konsultan Pendidikan Active Mandarin Indonesia untuk memastikan aplikasi Anda sesuai dengan standar universitas tujuan.",
            ],
          },
        ],
        other:
          "Program ini adalah langkah strategis untuk mewujudkan impian melanjutkan pendidikan tinggi di universitas terkemuka di Tiongkok. Dengan bimbingan dari Active Mandarin Indonesia, Anda tidak hanya mengejar gelar akademik, tetapi juga membangun masa depan yang cerah!",
        free: [
          "Akses Beasiswa Lengkap: Dukungan finansial mencakup biaya kuliah, penelitian, dan pengembangan karier akademik.",
          "Panduan Ahli: Tim profesional berpengalaman membantu siswa internasional mencapai pendidikan tinggi di Tiongkok.",
          "Jalur Karier Internasional: Kesempatan besar untuk bergabung dalam komunitas akademik global dengan jaringan luas dan prospek karier yang menjanjikan.",
        ],
        detail_class: [],
        program_start: [],
      },
    ],
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    const fetchData = () => {
      const images = [
        {
          image: "/assets/banner/Web Banne Act CTA-1.png",
          link: "#start",
        },
        {
          image: "/assets/banner/Web Banne Act CTA-2.png",
          link: "https://wa.me/+6282223369246",
        },
        {
          image: "/assets/banner/Web Banne Act CTA-3.png",
          link: "https://wa.me/+6282223369246",
        },
        {
          image: "/assets/banner/Web Banne Act CTA-4.png",
          link: "https://wa.me/+6282223369246",
        },
        {
          image: "/assets/banner/Web Banne Act CTA-5.png",
          link: "https://wa.me/+6282223369246",
        },
        {
          image: "/assets/banner/Web Banne Act CTA-6.png",
          link: "https://wa.me/+6282223369246",
        },
        {
          image: "/assets/banner/Web Banne Act CTA-7.png",
          link: "https://wa.me/+6282223369246",
        },
      ];
      setGalleryData(images);
    };

    fetchData();
  }, []);

  const settingsCarousel = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    centerMode: true,
    centerPadding: "20%",
    beforeChange: (current, next) => setActiveSlide(next),
    responsive: [
      {
        breakpoint: 768,
        settings: {
          centerMode: false,
          centerPadding: 0,
        },
      },
    ],
  };

  const { classes = [] } = useSelector((state) => state.classReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getClass());
  }, [dispatch]);

  const showModal = (product) => {
    setCurrentProduct(product);
    setIsModalVisible(true);
  };

  const translateClass = langs
    ? dummyClasses?.english
    : dummyClasses?.indonesia;
  const translateProduct = langs ? products?.english : products?.indonesia;
  const translateScholarship = langs
    ? scholarship?.english
    : scholarship?.indonesia;
  const translateDegree = langs ? degree?.english : degree?.indonesia;

  const handleCancel = () => setIsModalVisible(false);

  return (
    <Mainlayouts>
      <div className="container mx-auto px-5">
        <div className="h-auto">
          <Slider
            {...settingsCarousel}
            className="rounded-xl overflow-visible h-full"
          >
            {galleryData.map((item, index) => (
              <div
                key={index}
                className={`relative transition-transform duration-[1500ms] px-2 sm:px-8 my-8 md:my-12 md:px-10 lg:px-14 xl:px-16 ${
                  activeSlide === index
                    ? "md:z-10 md:scale-125"
                    : "md:z-0 md:scale-105"
                }`}
              >
                <a
                  href={item.link}
                  target={item.link.startsWith("http") ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                >
                  <img
                    src={item.image}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-auto object-contain rounded-xl cursor-pointer"
                    draggable="false"
                  />
                </a>
              </div>
            ))}
          </Slider>
        </div>
        <div className="md:py-10" id="start">
          <div className="w-full mx-auto mb-6 lg:w-9/12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#02264A] mb-2">
              {langs
                ? "Premium Mandarin Learning"
                : "Pembelajaran Mandarin Premium"}
            </h2>
            <span className="font-semibold text-[#8493AC] text-lg">
              {langs
                ? "For your bright future starts here"
                : "Untuk masa depan cerah Anda dimulai di sini"}
            </span>
          </div>
          <div className="w-full flex flex-col justify-center items-center">
            {translateClass.map((item, index) => (
              <div key={index} className="w-full flex flex-col mb-6 lg:w-9/12">
                <CardClasses data={item} />
              </div>
            ))}
          </div>
        </div>

        <div className="pt-10 pb-1">
          <div>
            <div className="w-full mx-auto mb-6 lg:w-9/12">
              <h2 className="text-2xl md:text-3xl font-bold text-[#02264A] mb-2">
                {langs ? "From Zero To Hero" : "Dari Nol Menjadi Pahlawan"}
              </h2>
              <span className="font-semibold text-[#8493AC] text-lg">
                {langs
                  ? "Find the premium class and opportunities along the way "
                  : "Temukan kelas premium dan peluang di sepanjang prosesnya"}
              </span>
            </div>
            <div className="my-8 flex justify-center">
              <div className="w-full lg:w-9/12">
                <Slider {...settings}>
                  {translateProduct.map((item, index) => (
                    <div
                      key={index}
                      className="p-0 m-4"
                      onClick={() => showModal(item)}
                    >
                      <div className="bg-white rounded-2xl shadow flex flex-col w-11/12 h-full">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-56 object-cover rounded-t-2xl"
                        />
                        <div className="flex flex-col justify-between items-start px-4 py-5">
                          <h2 className="text-lg font-semibold text-gray-800 mb-2">
                            {item.title}
                          </h2>
                          <p className="font-semibold text-lg mb-2">
                            Rp {item.price}
                            <span className="font-light text-sm ml-1">
                              /Item
                            </span>
                          </p>
                          <div className="flex items-center">
                            <Rate disabled defaultValue={item.star} />
                            <span className="ml-3 text-base">(138)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
              {/* Modal */}
              <Modal
                title={currentProduct.title}
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
                centered
              >
                <img
                  src={currentProduct.image}
                  alt={currentProduct.title}
                  className="w-full h-48 object-contain mb-4 rounded-lg"
                />
                <p className="text-gray-700 mb-4">{currentProduct.desc}</p>
                <h3 className="font-semibold text-lg mb-2">Facilities:</h3>
                <ul className="list-disc ml-5 text-gray-600">
                  {currentProduct.facilities?.map((facility, index) => (
                    <li key={index}>{facility}</li>
                  ))}
                </ul>
                <h3 className="font-semibold text-lg mt-4 mb-2">Details:</h3>
                <ul className="list-disc ml-5 text-gray-600">
                  {currentProduct.detail_class?.map((detail, index) => (
                    <li key={index}>{detail}</li>
                  ))}
                </ul>
                <div className="flex justify-between items-center mt-6">
                  <p className="font-semibold text-lg">
                    Rp {currentProduct.price}
                    <span className="font-light text-sm ml-1">/Item</span>
                  </p>
                  <Button
                    type="primary"
                    href="https://wa.me/+6282223369246"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#FFCC00] text-black font-semibold"
                  >
                    Chat Admin
                  </Button>
                </div>
              </Modal>
            </div>
          </div>

          <div className="py-10">
            <div className="w-full mx-auto mb-6 lg:w-9/12">
              <h2 className="text-2xl md:text-3xl font-bold text-[#02264A] mb-2">
                {langs
                  ? "Mentor Scholarship Program"
                  : "Program Beasiswa Mentor"}
              </h2>
              <span className="font-semibold text-[#8493AC] text-lg">
                {langs
                  ? "Find the programs and opportunities along the way "
                  : "Temukan program dan peluang di sepanjang jalan"}
              </span>
            </div>

            <div className="w-full flex flex-col justify-center items-center">
              {translateScholarship.map((item, index) => (
                <div
                  key={index}
                  className="w-full flex flex-col mb-6 lg:w-9/12"
                >
                  <CardClasses data={item} />
                </div>
              ))}
            </div>
          </div>

          <div className="py-10">
            <div className="w-full mx-auto mb-6 lg:w-9/12">
              <h2 className="text-2xl md:text-3xl font-bold text-[#02264A] mb-2">
                {langs
                  ? "Non Degree / Degree Program"
                  : "Program Non Gelar/Gelar"}
              </h2>
              <span className="font-semibold text-[#8493AC] text-lg">
                {langs
                  ? "To secure your future, seek knowledge even as far as China."
                  : "Untuk menjamin masa depanmu, carilah ilmu sampai ke Tiongkok."}
              </span>
            </div>
            <div className="w-full flex flex-col justify-center items-center">
              {translateDegree.map((item, index) => (
                <div
                  key={index}
                  className="w-full flex flex-col mb-6 lg:w-9/12"
                >
                  <CardDegree data={item} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Mainlayouts>
  );
};

export default Catalog;
