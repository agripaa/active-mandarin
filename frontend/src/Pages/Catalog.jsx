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
  const { _, langs } = useSelector((state) => state.LangReducer);
  const [activeSlide, setActiveSlide] = React.useState(0);
  const [galleryData, setGalleryData] = useState([]); // State untuk menyimpan data dari API/sumber

  const dummyClasses = {
    indonesia: [
      {
        title: "Mandarin Juara Next Level ",
        price: "4.499.000",
        image: "/assets/class/1.png",
        banner: "/assets/banner-juara-next.png",
        bnefits: [
          "Simulasi ujian HSK 1 - HSK 4",
          "Kelas Privat (1 Siswa/kelas)",
          "Akses PDF, PPT, dan Audio",
          "Akses e-Flashcard HSK 1 - HSK 4 + Gratis Buku Tulis Hanzi",
          "Durasi: 5 bulan (40 sesi)",
        ],
        desc: "Program ini dirancang secara khusus untuk satu siswa per kelas, memastikan pendekatan pembelajaran yang sangat personal dan fokus penuh pada kebutuhan individu. Dengan metode yang intensif namun efektif, siswa akan dibimbing untuk menguasai Bahasa Mandarin dalam waktu singkat, mencakup semua keterampilan utama: mendengarkan, berbicara, membaca, dan menulis.\n Materi pembelajaran disusun secara sistematis dari level dasar hingga menengah, sehingga siswa dapat memahami dan menguasai Bahasa Mandarin dengan fondasi yang kuat dan aplikasi praktis dalam kehidupan sehari-hari maupun dunia profesional. \n Pendekatan personal ini memungkinkan fleksibilitas dalam gaya belajar, kecepatan, dan fokus materi, menjadikannya solusi ideal bagi mereka yang ingin mendapatkan hasil maksimal dalam waktu yang lebih singkat.",
        free: [
          "1 Buku Tulis Hanzi",
          "Akses e-Flashcard HSK 1 - HSK 4, dilengkapi dengan kosakata, terjemahan, dan contoh kalimat",
          "Sesi tanya jawab di luar kelas dalam grup kelas eksklusif",
          "HSK Kosakata 1-4 ",
        ],
        facilities: [
          "Simulasi ujian HSK 1 - HSK 4",
          "Silabus materi ajar",
          "Kelas interaktif: Reading, Speaking, Writing, dan Listening ",
          "Akses PDF, PPT, dan Audio",
          "Recording video kelas yang dapat diputar ulang",
        ],
        other: [
          "Informasi lowongan pekerjaan Mandarin speaker",
          "Informasi beasiswa kuliah di Tiongkok",
          "Jaminan selesai HSK 4",
        ],
        detail_class: [
          "Level: Pemula - HSK 4",
          "Kuota: 1 siswa",
          "Durasi: 5 bulan (40 pertemuan)",
        ],
      },
      {
        title: "Mandarin Juara",
        price: "3.000.000",
        image: "/assets/class/2.png",
        banner: "/assets/banner-juara.png",
        bnefits: [
          "Simulasi ujian HSK 1 - HSK 4",
          "Kelompok Kecil (3 - 5 Siswa)",
          "Akses PDF, PPT, dan Audio",
          "Akses e-Flashcard HSK 1 - HSK 4 + Gratis Buku Tulis Hanzi",
          "Durasi: 5 bulan (40 sesi)",
        ],
        desc: "Kelas ini dirancang untuk memungkinkan siswa menguasai Bahasa Mandarin dalam waktu singkat namun efektif. Materi pelajaran mencakup berbagai aspek pembelajaran dari level dasar, termasuk keterampilan mendengarkan, berbicara, membaca, dan menulis, yang disusun secara sistematis dari tingkat dasar hingga tingkat menengah.",
        free: [
          "1 Buku Tulis Hanzi",
          "Akses e-Flashcard HSK 1 - HSK 4, dilengkapi dengan kosakata, terjemahan, dan contoh kalimat",
          "Sesi tanya jawab di luar kelas dalam grup kelas eksklusif ",
          "HSK Kosakata 1-4",
        ],
        facilities: [
          "Simulasi ujian HSK 1 - HSK 4",
          "Silabus materi ajar",
          "Kelas interaktif: Reading, Speaking, Writing, dan Listening",
          "Akses PDF, PPT, dan Audio ",
          "Recording video kelas yang dapat diputar ulang",
        ],
        other: [
          "Informasi lowongan pekerjaan Mandarin speaker",
          "Informasi beasiswa kuliah di Tiongkok",
          "Jaminan selesai HSK 4",
        ],
        detail_class: [
          "Level: Pemula - HSK 4",
          "Kuota:  3 - 5 siswa",
          "Durasi: 5 bulan (40 pertemuan)",
        ],
      },
      {
        title: "Kelas Bahasa Umum - Basic Mandarin",
        price: "750.000",
        image: "/assets/class/3.png",
        banner: "",
        bnefits: [
          "Gratis 1 Buku Tulis Hanzi",
          "Sesi tanya jawab di luar kelas dalam grup kelas eksklusif",
          "Silabus Materi Ajar",
          "Kelas interaktif: Reading, Speaking, Writing, dan Listening",
          "Akses PDF, PPT, dan Audio",
          "Recording video kelas yang dapat diputar ulang",
        ],
        desc: "Kelas dasar ini sangat cocok bagi pemula yang belum memiliki pengetahuan sebelumnya tentang Bahasa Mandarin. Di dalam kelas ini, siswa akan mempelajari dasar-dasar penting seperti pinyin, hanzi, nada, pelafalan, dan beberapa percakapan sederhana. Kelas ini dirancang untuk memberikan fondasi yang kuat, mempersiapkan siswa untuk melanjutkan ke tingkat pembelajaran berikutnya dengan percaya diri.",
        free: [],
        facilities: [
          "Sesi tanya jawab di luar kelas dalam grup kelas eksklusif ",
          "Silabus materi ajar",
          "Kelas interaktif: Reading, Speaking, Writing, dan Listening",
          "Recording video kelas yang dapat diputar ulang",
          "Akses PDF, PPT, dan Audio",
        ],
        other: [],
        detail_class: [
          "Level: Pemula",
          "Kuota: 5 - 10 siswa",
          "Durasi: 1 bulan (8 pertemuan)",
        ],
      },
      {
        title: "Mandarin Native",
        price: "Segera",
        image: "/assets/class/4.png",
        banner: "",
        bnefits: [
          "Simulasi ujian HSK 1 - HSK 5",
          "Akses PDF, PPT, dan Audio",
          "Akses e-Flashcard HSK 1 - HSK 5 + Gratis Buku Tulis Hanzi",
          "Durasi: Segera",
        ],
        desc: "Program ini dirancang secara khusus untuk beberapa siswa per kelas, memastikan proses pembelajaran yang atraktif. Dengan metode belajar bersama yang intensif namun efektif, siswa akan dibimbing untuk menguasai Bahasa Mandarin dalam waktu singkat, mencakup semua keterampilan utama: mendengarkan, berbicara, membaca, dan menulis. \n Materi pembelajaran disusun secara sistematis dari level dasar hingga tingkat lanjut, sehingga siswa dapat memahami dan menguasai Bahasa Mandarin dengan fondasi yang kuat dan aplikasi praktis dalam kehidupan sehari-hari maupun dunia profesional. \n Proses pembelajaran yang langsung diajarkan oleh orang china langsungl ini memungkinkan kemudahan dalam gaya belajar, kecepatan, dan fokus materi, menjadikannya solusi bagi mereka yang ingin mendapatkan hasil maksimal dalam waktu yang lebih singkat.",
        free: [
          "1 Buku Tulis Hanzi",
          "Akses e-Flashcard HSK 1 - HSK 5, dilengkapi dengan kosakata, terjemahan, dan contoh kalimat",
          "Sesi tanya jawab di luar kelas dalam grup kelas eksklusif",
          "HSK Kosakata 1-5",
        ],
        facilities: [
          "Simulasi ujian HSK 1 - HSK 5 ",
          "Silabus Materi Ajar",
          "Kelas interaktif: Reading, Speaking, Writing, dan Listening",
          "Akses PDF, PPT, dan Audio",
          "Recording video kelas yang dapat diputar ulang ",
        ],
        other: [
          "Informasi lowongan pekerjaan Mandarin speaker",
          "Informasi beasiswa kuliah di Tiongkok",
          "Jaminan selesai HSK 5 ",
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
        title: "Mandarin Juara Next Level",
        price: "4,499,000",
        image: "/assets/class/1.png",
        banner: "/assets/banner-juara-next.png",
        bnefits: [
          "HSK 1 - HSK 4 exam simulation",
          "Private Class (1 Student/class)",
          "Access to PDF, PPT, and Audio",
          "Access HSK 1 - HSK 4 e-Flashcard + Free Hanzi Notebook",
          "Duration: 5 months (40 sessions)",
        ],
        desc: "This program is specifically designed for one student per class, ensuring a highly personal learning approach with full focus on individual needs. With an intensive yet effective method, students will be guided to master Mandarin in a short time, covering all major skills: listening, speaking, reading, and writing.\nThe learning materials are systematically arranged from basic to intermediate levels, allowing students to understand and master Mandarin with a strong foundation and practical application in daily life and the professional world.\nThis personal approach allows flexibility in learning styles, speed, and focus on materials, making it an ideal solution for those who want to get the most out of their time.",
        free: [
          "1 Hanzi Notebook",
          "Access to HSK 1 - HSK 4 e-Flashcards, complete with vocabulary, translations, and example sentences",
          "Q&A sessions outside class in an exclusive class group",
          "HSK Vocabulary 1-4",
        ],
        facilities: [
          "HSK 1 - HSK 4 exam simulation",
          "Teaching materials syllabus",
          "Interactive classes: Reading, Speaking, Writing, and Listening",
          "Access to PDF, PPT, and Audio materials",
          "Class video recordings that can be replayed",
        ],
        other: [
          "Job information for Mandarin speakers",
          "Scholarship information for studying in China",
          "HSK 4 completion guarantee",
        ],
        detail_class: [
          "Level: Beginner - HSK 4",
          "Quota: 1 student",
          "Duration: 5 months (40 sessions)",
        ],
      },
      {
        title: "Mandarin Juara",
        price: "3,000,000",
        image: "/assets/class/2.png",
        banner: "/assets/banner-juara.png",
        bnefits: [
          "HSK 1 - HSK 4 exam simulation",
          "Small Group (3 - 5 Students)",
          "Access to PDF, PPT, and Audio",
          "Access to HSK 1 - HSK 4 e-Flashcards + Free Hanzi Notebook",
          "Duration: 5 months (40 sessions)",
        ],
        desc: "This class is designed to enable students to master Mandarin in a short but effective time. The lesson materials cover various aspects of learning from the basic level, including listening, speaking, reading, and writing skills, which are systematically arranged from basic to intermediate levels.",
        free: [
          "1 Hanzi Notebook",
          "Access to HSK 1 - HSK 4 e-Flashcards, complete with vocabulary, translations, and example sentences",
          "Q&A sessions outside class in an exclusive class group",
          "HSK Vocabulary 1-4",
        ],
        facilities: [
          "HSK 1 - HSK 4 exam simulation",
          "Teaching materials syllabus",
          "Interactive classes: Reading, Speaking, Writing, and Listening",
          "Access to PDF, PPT, and Audio",
          "Class video recordings that can be replayed",
        ],
        other: [
          "Job information for Mandarin speakers",
          "Scholarship information for studying in China",
          "HSK 4 completion guarantee",
        ],
        detail_class: [
          "Level: Beginner - HSK 4",
          "Quota: 3 - 5 students",
          "Duration: 5 months (40 sessions)",
        ],
      },
      {
        title: "General Language Class - Basic Mandarin",
        price: "750,000",
        image: "/assets/class/3.png",
        banner: "",
        bnefits: [
          "Free 1 Hanzi Notebook",
          "Q&A sessions outside of class in an exclusive class group",
          "Teaching Material Syllabus",
          "Interactive classes: Reading, Speaking, Writing, and Listening",
          "Access to PDFs, PPTs, and Audio",
          "Class video recordings that can be replayed",
        ],
        desc: "This basic class is perfect for beginners who have no prior knowledge of Mandarin. In this class, students will learn essential basics such as pinyin, hanzi, tones, pronunciation, and some simple conversations. This class is designed to provide a strong foundation, preparing students to confidently move on to the next level of learning.",
        free: [],
        facilities: [
          "Q&A sessions outside of class in an exclusive class group",
          "Teaching Material Syllabus",
          "Interactive classes: Reading, Speaking, Writing, and Listening",
          "Class video recordings that can be replayed",
          "Access to PDFs, PPTs, and Audio",
        ],
        other: [],
        detail_class: [
          "Level: Beginner",
          "Quota: 5 - 10 students",
          "Duration: 1 month (8 sessions)",
        ],
      },
      {
        title: "Mandarin Native",
        price: "Soon",
        image: "/assets/class/4.png",
        banner: "",
        bnefits: [
          "HSK 1 - HSK 5 exam simulation",
          "Access to PDF, PPT, and Audio",
          "Access to HSK 1 - HSK 5 e-Flashcards + Free Hanzi Notebook",
          "Duration: Soon",
        ],
        desc: "This program is specifically designed for several students per class, ensuring an engaging learning process. With an intensive yet effective learning method, students will be guided to master Mandarin in a short time, covering all major skills: listening, speaking, reading, and writing.\nThe learning materials are systematically arranged from basic to advanced levels, allowing students to understand and master Mandarin with a strong foundation and practical application in daily life and the professional world.\nThe learning process directly taught by native Chinese speakers allows for ease in learning style, speed, and material focus, making it a solution for those who want to achieve maximum results in a shorter time.",
        free: [
          "1 Hanzi Notebook",
          "Access to HSK 1 - HSK 5 e-Flashcards, complete with vocabulary, translations, and example sentences",
          "Q&A sessions outside class in an exclusive class group",
          "HSK Vocabulary 1-5",
        ],
        facilities: [
          "HSK 1 - HSK 5 exam simulation",
          "Teaching Materials Syllabus",
          "Interactive classes: Reading, Speaking, Writing, and Listening",
          "Access to PDF, PPT, and Audio",
          "Class video recordings that can be replayed",
        ],
        other: [
          "Job information for Mandarin speakers",
          "Scholarship information for studying in China",
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
          title: "General Language Class - HSK 1",
          price: "1.000.000",
          star: 4,
          image: "/assets/kelas-umum/hsk1.png",
          desc: "This class is specially designed for beginners who already have basic knowledge of Mandarin. In this class, students will learn all HSK 1 vocabulary along with the necessary grammar to strengthen their foundational Mandarin skills. The material is structured systematically to ensure that students not only recognize vocabulary but also understand how to use it in everyday sentences.",
          free: ["1 Hanzi Notebook", "HSK 1 Vocabulary"],
          facilities: [
            "Access to HSK 1 e-Flashcards, complete with vocabulary, translations, and example sentences",
            "Q&A sessions outside of class in an exclusive class group",
            "HSK 1 exam simulation",
            "Teaching material syllabus",
            "Guaranteed completion of HSK 1",
            "Class video recordings that can be replayed",
            "Access to PDFs, PPTs, and Audio files",
          ],
          other: [],
          detail_class: [
            "Level: HSK 1",
            "Quota: 5 - 10 students",
            "Duration: 2 months (16 sessions)",
          ],
        },
        {
          title: "General Language Class - HSK 2",
          price: "1.250.000",
          star: 4,
          image: "/assets/kelas-umum/hsk2.png",
          desc: "This class is designed for students who have mastered HSK 1 and are ready to advance to the next level. In this class, students will deepen their knowledge by learning all HSK 2 vocabulary and more complex grammar. The program aims to help students develop their language skills comprehensively and prepare them for higher linguistic challenges.",
          free: ["1 Hanzi Notebook", "HSK 2 Vocabulary"],
          facilities: [
            "Access to HSK 2 e-Flashcards, complete with vocabulary, translations, and example sentences",
            "Q&A sessions outside of class in an exclusive class group",
            "HSK 2 exam simulation",
            "Teaching material syllabus",
            "Guaranteed completion of HSK 2",
            "Class video recordings that can be replayed",
            "Access to PDFs, PPTs, and Audio files",
          ],
          other: [],
          detail_class: [
            "Level: HSK 2",
            "Quota: 5 - 10 students",
            "Duration: 2 months (16 sessions)",
          ],
        },
        {
          title: "General Language Class - HSK 3",
          price: "1.500.000",
          star: 4,
          image: "/assets/kelas-umum/hsk3.png",
          desc: "This class is ideal for students who have mastered HSK 2 materials and want to move to the next level. In this class, students will learn all HSK 3 vocabulary along with its grammar, which will expand their language skills and prepare them for more complex communication. With a deep and systematic approach, this class aims to help students significantly improve their language proficiency.",
          free: ["1 Hanzi Notebook", "HSK 3 Vocabulary"],
          facilities: [
            "Access to HSK 3 e-Flashcards, complete with vocabulary, translations, and example sentences",
            "Q&A sessions outside of class in an exclusive class group",
            "HSK 3 exam simulation",
            "Teaching material syllabus",
            "Guaranteed completion of HSK 3",
            "Class video recordings that can be replayed",
            "Access to PDFs, PPTs, and Audio files",
          ],
          other: [],
          detail_class: [
            "Level: HSK 3",
            "Quota: 5 - 10 students",
            "Duration: 2 months (16 sessions)",
          ],
        },
        {
          title: "General Language Class - HSK 4",
          price: "1.750.000",
          star: 4,
          image: "/assets/kelas-umum/hsk4.png",
          desc: "This class is suitable for students who have mastered HSK 3 materials. Here, students will learn HSK 4 vocabulary and more complex grammar. This class aims to enhance Mandarin comprehension and prepare students for a wider range of communication situations.",
          free: ["1 Hanzi Notebook", "HSK 4 Vocabulary"],
          facilities: [
            "Access to HSK 4 e-Flashcards, complete with vocabulary, translations, and example sentences",
            "Q&A sessions outside of class in an exclusive class group",
            "HSK 4 exam simulation",
            "Teaching material syllabus",
            "Guaranteed completion of HSK 4",
            "Class video recordings that can be replayed",
            "Access to PDFs, PPTs, and Audio files",
          ],
          other: [],
          detail_class: [
            "Level: HSK 4",
            "Quota: 5 - 10 students",
            "Duration: 3 months (24 sessions)",
          ],
        },
        {
          title: "General Language Class - HSK 5",
          price: "2.000.000",
          star: 4,
          image: "/assets/kelas-umum/hsk5.png",
          desc: "This class is ideal for students who have mastered HSK 4 materials. Here, students will learn HSK 5 vocabulary and more advanced grammar. This program is designed to expand Mandarin proficiency and prepare students for more complex communication situations.",
          free: ["1 Hanzi Notebook", "HSK 5 Vocabulary"],
          facilities: [
            "Access to HSK 5 e-Flashcards, complete with vocabulary, translations, and example sentences",
            "Q&A sessions outside of class in an exclusive class group",
            "HSK 5 exam simulation",
            "Teaching material syllabus",
            "Guaranteed completion of HSK 5",
            "Class video recordings that can be replayed",
            "Access to PDFs, PPTs, and Audio files",
          ],
          other: [],
          detail_class: [
            "Level: HSK 5",
            "Quota: 5 - 10 students",
            "Duration: 3 months (24 sessions)",
          ],
        },
    ],
    indonesia: [
      {
        title: "Kelas Bahasa Umum - HSK 1",
        price: "1.000.000",
        star: 4,
        image: "/assets/kelas-umum/hsk1.png",
        desc: "Kelas ini dirancang khusus untuk pemula yang sudah memiliki pengetahuan dasar tentang Bahasa Mandarin. Dalam kelas ini, siswa akan mempelajari semua kosakata HSK 1 beserta tata bahasa yang diperlukan untuk memperkuat dasar kemampuan berbahasa Mandarin. Materi disusun secara sistematis untuk memastikan siswa tidak hanya mengenal kosakata, tetapi juga memahami cara penggunaannya dalam kalimat sehari-hari.",
        free: ["1 Buku Tulis Hanzi", "HSK Kosakata 1"],
        facilities: [
          "Akses e-Flashcard HSK 1, dilengkapi dengan kosakata, terjemahan, dan contoh kalimat",
          "Sesi tanya jawab di luar kelas dalam grup kelas eksklusif",
          "Simulasi ujian HSK 1",
          "Silabus materi ajar",
          "Jaminan selesai HSK 1",
          "Recording video kelas yang dapat diputar ulang",
          "Akses PDF, PPT, dan Audio",
        ],
        other: [],
        detail_class: [
          "Level: HSK 1",
          "Kuota: 5 - 10 siswa",
          "Durasi: 2 bulan (16 pertemuan)",
        ],
      },
      {
        title: "Kelas Bahasa Umum - HSK 2",
        price: "1.250.000",
        star: 4,
        image: "/assets/kelas-umum/hsk2.png",
        desc: "Kelas ini dirancang khusus untuk siswa yang telah menguasai HSK 1 dan siap melanjutkan ke tingkat berikutnya. Dalam kelas ini, siswa akan memperdalam pengetahuan mereka dengan mempelajari semua kosakata HSK 2 dan tata bahasa yang lebih kompleks. Program ini bertujuan untuk membantu siswa mengembangkan keterampilan berbahasa mereka secara menyeluruh dan mempersiapkan mereka untuk menghadapi tantangan bahasa yang lebih tinggi.",
        free: ["1 Buku Tulis Hanzi", "HSK Kosakata 2"],
        facilities: [
          "Akses e-Flashcard HSK 2, dilengkapi dengan kosakata, terjemahan, dan contoh kalimat",
          "Sesi tanya jawab di luar kelas dalam grup kelas eksklusif",
          "Simulasi ujian HSK 2",
          "Silabus materi ajar",
          "Jaminan selesai HSK 2",
          "Recording video kelas yang dapat diputar ulang",
          "Akses PDF, PPT, dan Audio",
        ],
        other: [],
        detail_class: [
          "Level: HSK 2",
          "Kuota: 5 - 10 siswa",
          "Durasi: 2 bulan (16 pertemuan)",
        ],
      },
      {
        title: "Kelas Bahasa Umum - HSK 3",
        price: "1.500.000",
        star: 4,
        image: "/assets/kelas-umum/hsk3.png",
        desc: "Kelas ini ideal bagi siswa yang telah menguasai materi HSK 2 dan ingin melanjutkan ke tingkat berikutnya. Dalam kelas ini, siswa akan mempelajari semua kosakata HSK 3 beserta tata bahasanya, yang akan memperluas kemampuan bahasa mereka dan mempersiapkan mereka untuk komunikasi yang lebih kompleks. Dengan pendekatan yang mendalam dan sistematis, kelas ini bertujuan untuk membantu siswa meningkatkan keterampilan bahasa mereka secara signifikan.",
        free: ["1 Buku Tulis Hanzi", "HSK Kosakata 3"],
        facilities: [
          "Akses e-Flashcard HSK 3, dilengkapi dengan kosakata, terjemahan, dan contoh kalimat",
          "Sesi tanya jawab di luar kelas dalam grup kelas eksklusif",
          "Simulasi ujian HSK 3",
          "Silabus materi ajar",
          "Jaminan selesai HSK 3",
          "Recording video kelas yang dapat diputar ulang",
          "Akses PDF, PPT, dan Audio",
        ],
        other: [],
        detail_class: [
          "Level: HSK 3",
          "Kuota: 5 - 10 siswa",
          "Durasi: 2 bulan (16 pertemuan)",
        ],
      },
      {
        title: "Kelas Bahasa Umum - HSK 4",
        price: "1.750.000",
        star: 4,
        image: "/assets/kelas-umum/hsk4.png",
        desc: "Kelas ini cocok untuk siswa yang telah menguasai materi HSK 3. Di sini, siswa akan mempelajari kosakata HSK 4 dan tata bahasa yang lebih kompleks. Kelas ini bertujuan untuk meningkatkan pemahaman bahasa Mandarin dan mempersiapkan siswa untuk menghadapi situasi komunikasi yang lebih beragam.",
        free: ["1 Buku Tulis Hanzi", "HSK Kosakata 4"],
        facilities: [
          "Akses e-Flashcard HSK 4, dilengkapi dengan kosakata, terjemahan, dan contoh kalimat",
          "Sesi tanya jawab di luar kelas dalam grup kelas eksklusif",
          "Simulasi ujian HSK 4",
          "Silabus materi ajar",
          "Jaminan selesai HSK 4",
          "Recording video kelas yang dapat diputar ulang",
          "Akses PDF, PPT, dan Audio",
        ],
        other: [],
        detail_class: [
          "Level: HSK 4",
          "Kuota: 5 - 10 siswa",
          "Durasi: 3 bulan (24 pertemuan)",
        ],
      },
      {
        title: "Kelas Bahasa Umum - HSK 5",
        price: "2.000.000",
        star: 4,
        image: "/assets/kelas-umum/hsk5.png",
        desc: "Kelas ini ideal untuk siswa yang telah menguasai materi HSK 4. Di sini, siswa akan mempelajari kosakata HSK 5 dan tata bahasa yang lebih canggih. Program ini dirancang untuk memperluas kemampuan bahasa Mandarin dan mempersiapkan siswa untuk situasi komunikasi yang lebih kompleks.",
        free: ["1 Buku Tulis Hanzi", "HSK Kosakata 5"],
        facilities: [
          "Akses e-Flashcard HSK 5, dilengkapi dengan kosakata, terjemahan, dan contoh kalimat",
          "Sesi tanya jawab di luar kelas dalam grup kelas eksklusif",
          "Simulasi ujian HSK 5",
          "Silabus materi ajar",
          "Jaminan selesai HSK 5",
          "Recording video kelas yang dapat diputar ulang",
          "Akses PDF, PPT, dan Audio",
        ],
        other: [],
        detail_class: [
          "Level: HSK 5",
          "Kuota: 5 - 10 siswa",
          "Durasi: 3 bulan (24 pertemuan)",
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
        banner: "/assets/banner/scholarship.png",
        category: "scholarship",
        bnefits: [
          "Group chat with mentors to share information and experiences.",
          "5 consultation sessions, including 2 meetings via Zoom Meeting.",
          "Direct guidance for scholarship applications to China.",
        ],
        desc: "We present the Mentor Scholarship to help you obtain a scholarship in China more easily and in a more structured way. This program is designed for various needs, whether through one-on-one sessions, group sessions, or direct assistance in the application process until completion.",
        free: [],
        facilities: [
          "Group chat with mentors to share information and experiences.",
          "5 consultation sessions, including 2 meetings via Zoom Meeting.",
          "Direct guidance for scholarship applications to China.",
        ],
        other: [],
        detail_class: [],
      },
      {
        title: "Mentor Scholarship One-on-One",
        price: "4.999.000",
        image: "/assets/scholarship/2.png",
        category: "scholarship",
        bnefits: [
          "Private group chat directly with an experienced mentor.",
          "Exclusive one-on-one consultation with a mentor.",
          "8 consultation sessions, including 3 meetings via Zoom Meeting.",
          "Direct guidance for applying to the targeted scholarship in China.",
        ],
        desc: "We present the Mentor Scholarship to help you obtain a scholarship in China more easily and in a more structured way. This program is designed for various needs, whether through one-on-one sessions, group sessions, or direct assistance in the application process until completion.",
        free: [],
        facilities: [
          "Private group chat directly with an experienced mentor.",
          "Exclusive one-on-one consultation with a mentor.",
          "8 consultation sessions, including 3 meetings via Zoom Meeting.",
          "Direct guidance for applying to the targeted scholarship in China.",
        ],
        other: [],
        detail_class: [],
      },
      {
        title: "One Step Closer to Chinese Scholarship",
        price: "6.499.000",
        image: "/assets/scholarship/3.png",
        banner: "/assets/banner/scholarship.png",
        category: "scholarship",
        bnefits: [
          "Your scholarship application is fully assisted by Education Consultant Active Mandarin Indonesia.",
          "Consultation with a mentor to prepare a Study Plan or other personal documents.",
          "Complete information and updates on the application process until acceptance.",
        ],
        desc: "We present the Mentor Scholarship to help you obtain a scholarship in China more easily and in a more structured way. This program is designed for various needs, whether through one-on-one sessions, group sessions, or direct assistance in the application process until completion.",
        free: [],
        facilities: [
          "Your scholarship application is fully assisted by Education Consultant Active Mandarin Indonesia.",
          "Consultation with a mentor to prepare a Study Plan or other personal documents.",
          "Complete information and updates on the application process until acceptance.",
        ],
        other: [],
        detail_class: [],
      },
    ],
    indonesia: [
      {
        title: "Mentor Scholarship Group",
        price: "3.499.000",
        image: "/assets/scholarship/1.png",
        banner: "/assets/banner/scholarship.png",
        category: "beasiswa",
        bnefits: [
          "Group chat bersama mentor untuk berbagi informasi dan pengalaman",
          "5 sesi konsultasi, termasuk 2 pertemuan via Zoom Meeting.",
          "Bimbingan langsung untuk pendaftaran beasiswa ke Tiongkok.",
        ],
        desc: "Kami menghadirkan Mentor Scholarship untuk membantu Anda mendapatkan beasiswa di Tiongkok dengan lebih mudah dan terarah. Program ini dirancang untuk berbagai kebutuhan, baik melalui sesi one-on-one, kelompok, maupun layanan yang langsung membantu proses pendaftaran anda sampai akhir.",
        free: [],
        facilities: [
          "Group chat bersama mentor untuk berbagi informasi dan pengalaman",
          "5 sesi konsultasi, termasuk 2 pertemuan via Zoom Meeting.",
          "Bimbingan langsung untuk pendaftaran beasiswa ke Tiongkok.",
        ],
        other: [],
        detail_class: [],
      },
      {
        title: "Mentor Scholarship One-on-One",
        price: "4.999.000",
        image: "/assets/scholarship/2.png",
        category: "beasiswa",
        bnefits: [
          "Private group chat langsung dengan mentor berpengalaman.",
          "Konsultasi eksklusif one-on-one dengan mentor",
          "8 sesi konsultasi, termasuk 3 pertemuan via Zoom Meeting.",
          "Bimbingan langsung untuk mendaftar ke beasiswa tujuan di Tiongkok.",
        ],
        desc: "Kami menghadirkan Mentor Scholarship untuk membantu Anda mendapatkan beasiswa di Tiongkok dengan lebih mudah dan terarah. Program ini dirancang untuk berbagai kebutuhan, baik melalui sesi one-on-one, kelompok, maupun layanan yang langsung membantu proses pendaftaran anda sampai akhir.",
        free: [],
        facilities: [
          "Private group chat langsung dengan mentor berpengalaman.",
          "Konsultasi eksklusif one-on-one dengan mentor",
          "8 sesi konsultasi, termasuk 3 pertemuan via Zoom Meeting.",
          "Bimbingan langsung untuk mendaftar ke beasiswa tujuan di Tiongkok.",
        ],
        other: [],
        detail_class: [],
      },
      {
        title: "One Step Closer to Chinese Scholarship",
        price: "6.499.000",
        image: "/assets/scholarship/3.png",
        banner: "/assets/banner/scholarship.png",
        category: "beasiswa",
        bnefits: [
          "⁠Pendaftaran beasiswa Anda sepenuhnya dibantu oleh Education Consultant Active Mandarin Indonesia",
          "Konsultasi bersama mentor untuk menyusun Study Plan atau berkas personal lainnya.",
          "Informasi dan pembaruan lengkap tentang proses pendaftaran hingga penerimaan.",
        ],
        desc: "Kami menghadirkan Mentor Scholarship untuk membantu Anda mendapatkan beasiswa di Tiongkok dengan lebih mudah dan terarah. Program ini dirancang untuk berbagai kebutuhan, baik melalui sesi one-on-one, kelompok, maupun layanan yang langsung membantu proses pendaftaran anda sampai akhir.",
        free: [],
        facilities: [
          "⁠Pendaftaran beasiswa Anda sepenuhnya dibantu oleh Education Consultant Active Mandarin Indonesia",
          "Konsultasi bersama mentor untuk menyusun Study Plan atau berkas personal lainnya.",
          "Informasi dan pembaruan lengkap tentang proses pendaftaran hingga penerimaan.",
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
        desc: "The Non-Degree Program (Mandarin Language) is a short-term educational program designed to deepen understanding and proficiency in the Mandarin language directly in China, guided by competent and experienced instructors. This program typically includes intensive language learning, cultural studies, and practical communication training. It is often offered through scholarship schemes supported by Education Consultant Active Mandarin Indonesia to enhance participants' competence in Mandarin for both professional and academic purposes.",
        free: [
          "Private group chat with an Active Mandarin Education Consultant",
          "One-on-one consultation",
          "Consultation with an education consultant regarding study plans or other personal documents",
          "Application registration processing for universities in China",
        ],
        facilities: [],
        other: "",
        detail_class: [
          "Location: Nanjing, China",
          "Participants: General (18-25 years old)",
        ],
        program_start: ["March 2025 & September 2025"],
      },
      {
        title: "Program Associate Degree - PhD Program",
        price: "Chat Admin",
        image: "/assets/degree/2.png",
        bnefits: [
          "Private group chat with Education Consultant Active Mandarin for exclusive information and consultation.",
          "One-on-one consultation for personalized guidance tailored to your academic and scholarship needs.",
          "In-depth consultation to develop a study plan, research proposal, or other personal documents.",
          "The entire university application process in China will be assisted by Education Consultant Active Mandarin Indonesia, ensuring your application meets the standards of your target university.",
        ],
        desc: "A golden opportunity to pursue higher education in China with full scholarship support. Through this program, you can earn formal academic degrees ranging from Bachelor’s (S1), Master’s (S2), to Doctorate (S3) levels at leading universities in your chosen field of study. \n With Active Mandarin Indonesia Education Consultants, your academic journey will be more focused, from the registration process to assistance in preparing important documents such as a study plan. Supported by scholarships that cover tuition fees, research, and academic development, this program is designed to prepare you to become a competent graduate ready to compete both nationally and internationally.",
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
        title: "Non-Degree Program",
        price: "6.999.000",
        image: "/assets/degree/1.png",
        bnefits: [
          "Nikmati pengalaman belajar Bahasa Mandarin langsung di Nanjing, sambil menjelajahi keunikan budaya Tiongkok. Cicipi street food khas yang wajib dicoba dan rasakan suasana autentik kota bersejarah ini! Selain belajar bahasa, Anda juga akan membangun koneksi internasional yang berharga dan memperluas peluang untuk masa depan Anda. Gabungkan pembelajaran intensif dengan petualangan seru hanya di program ini!",
        ],
        desc: "Non Degree Program (Bahasa Mandarin) adalah program pendidikan jangka pendek yang dirancang untuk memperdalam pemahaman dan keterampilan bahasa Mandarin langsung di negara China dengan dibimbing langsung oleh guru yang kompeten dan berpengalaman. Program ini biasanya mencakup pembelajaran intensif bahasa, budaya, serta komunikasi praktis, dan sering ditawarkan melalui skema beasiswa yang didukung oleh Education Consultant Active Mandarin Indonesia untuk meningkatkan kompetensi peserta dalam berbahasa Mandarin secara profesional maupun akademis",
        free: [
          "Private group chat bersama Education Consultant Active Mandarin",
          "One-on-one konsultasi",
          "Konsultasi bersama education consultant, mengenai study plan atau berkas personal lainnya",
          "Pengurusan pendaftaran aplikasi ke universitas di china",
        ],
        facilities: [],
        other: "",
        detail_class: ["Lokasi: Nanjing, China", "Peserta: Umum (18-25 tahun)"],
        program_start: ["Tanggal: Maret 2025 dan September 2025"],
      },
      {
        title: "Program Gelar Ahli Madya - Program PhD",
        price: "Hubungi Admin",
        image: "/assets/degree/2.png",
        bnefits: [
          "Private group chat bersama Education Consultant Active Mandarin untuk informasi dan konsultasi eksklusif.",
          "One-on-one konsultasi untuk bimbingan personal sesuai kebutuhan akademik dan beasiswa Anda.",
          "Konsultasi mendalam untuk menyusun study plan, proposal penelitian, atau dokumen personal lainnya.",
          "Seluruh proses pendaftaran ke universitas di Tiongkok akan dibantu oleh Education Consultant Active Mandarin Indonesia, memastikan aplikasi Anda sesuai standar universitas tujuan.",
        ],
        desc: "Program Degree S1-S3 adalah kesempatan emas untuk menempuh pendidikan tinggi di Tiongkok dengan dukungan beasiswa penuh. Melalui program ini, Anda bisa mendapatkan gelar akademik formal dari jenjang Sarjana (S1), Magister (S2), hingga Doktor (S3) di universitas terkemuka sesuai bidang studi yang dipilih.\n Bersama Education Consultant Active Mandarin Indonesia, perjalanan akademik Anda akan lebih terarah, mulai dari pendaftaran hingga pendampingan menyusun dokumen penting seperti study plan. Dengan dukungan beasiswa yang meliputi biaya kuliah, penelitian, hingga pengembangan akademik, program ini dirancang untuk mempersiapkan Anda menjadi lulusan kompeten dan siap bersaing di tingkat nasional maupun internasional.",
        facilities: [
          {
            mentor: [
              "Private group chat bersama Education Consultant Active Mandarin untuk informasi dan konsultasi eksklusif.",
              "One-on-one konsultasi untuk bimbingan personal sesuai kebutuhan akademik dan beasiswa Anda.",
              "Konsultasi mendalam untuk menyusun study plan, proposal penelitian, atau dokumen personal lainnya.",
            ],
            assistance: [
              "Seluruh proses pendaftaran ke universitas di Tiongkok akan dibantu oleh Education Consultant Active Mandarin Indonesia, memastikan aplikasi Anda sesuai standar universitas tujuan.",
            ],
          },
        ],
        other:
          "Program ini adalah langkah strategis untuk mewujudkan impian pendidikan tinggi Anda di universitas terbaik di Tiongkok. Dengan panduan dari Active Mandarin Indonesia, Anda tidak hanya melangkah menuju gelar akademik, tetapi juga membangun masa depan yang cemerlang! Jangan lewatkan peluang ini! Daftar sekarang dan raih kesuksesan akademik Anda di Tiongkok.",
        free: [
          "Akses Beasiswa Lengkap: Dukungan finansial untuk biaya kuliah, penelitian, hingga pengembangan karier akademik.",
          "Pendampingan Ahli: Tim profesional yang berpengalaman dalam membantu siswa internasional meraih pendidikan tinggi di Tiongkok.",
          "Jalur Karier Internasional: Peluang besar untuk menjadi bagian dari komunitas akademik global dengan jaringan luas dan prospek karier menjanjikan.",
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
          link: "https://wa.me/+6282279506450",
        },
        {
          image: "/assets/banner/Web Banne Act CTA-3.png",
          link: "https://wa.me/+6282279506450",
        },
        {
          image: "/assets/banner/Web Banne Act CTA-4.png",
          link: "#Mentor",
        },
        {
          image: "/assets/banner/Web Banne Act CTA-5.png",
          link: "https://wa.me/+6282279506450",
        },
        {
          image: "/assets/banner/Web Banne Act CTA-6.png",
          link: "https://wa.me/+6282279506450",
        },
        {
          image: "/assets/banner/Web Banne Act CTA-7.png",
          link: "https://wa.me/+6282279506450",
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
      <div className="container mx-auto px-5 lg:px-0">
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
                              {langs
                                ? "/Month"
                                : "/Bulan"}
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
                width={600}
              >
                <img
                  src={currentProduct.image}
                  alt={currentProduct.title}
                  className="w-full h-48 object-contain mb-4 rounded-lg my-6"
                />
                <p className="text-gray-900 mb-4">{currentProduct.desc}</p>
                <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    {
                      title: "Reading",
                      judul: "Membaca",
                      iconPath:
                        "M2 3.9934C2 3.44476 2.45531 3 2.9918 3H21.0082C21.556 3 22 3.44495 22 3.9934V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5551 2 20.0066V3.9934ZM11 5H4V19H11V5ZM13 5V19H20V5H13ZM14 7H19V9H14V7ZM14 10H19V12H14V10Z",
                    },
                    {
                      title: "Speaking",
                      judul: "Berbicara",
                      iconPath:
                        "M14.45 19L12 22.5L9.55 19H3C2.73478 19 2.48043 18.8946 2.29289 18.7071C2.10536 18.5196 2 18.2652 2 18V4C2 3.73478 2.10536 3.48043 2.29289 3.29289C2.48043 3.10536 2.73478 3 3 3H21C21.2652 3 21.5196 3.10536 21.7071 3.29289C21.8946 3.48043 22 3.73478 22 4V18C22 18.2652 21.8946 18.5196 21.7071 18.7071C21.5196 18.8946 21.2652 19 21 19H14.45ZM13.409 17H20V5H4V17H10.591L12 19.012L13.409 17Z",
                    },
                    {
                      title: "Writing",
                      judul: "Menulis",
                      iconPath:
                        "M6.93912 14.0328C6.7072 14.6563 6.51032 15.2331 6.33421 15.8155C7.29345 15.1189 8.43544 14.6767 9.75193 14.5121C12.2652 14.198 14.4976 12.5385 15.6279 10.4537L14.1721 8.99888L15.5848 7.58417C15.9185 7.25004 16.2521 6.91614 16.5858 6.58248C17.0151 6.15312 17.5 5.35849 18.0129 4.2149C12.4197 5.08182 8.99484 8.50647 6.93912 14.0328ZM17 8.99739L18 9.99669C17 12.9967 14 15.9967 10 16.4967C7.33146 16.8303 5.66421 18.6636 4.99824 21.9967H3C4 15.9967 6 1.99669 21 1.99669C20.0009 4.99402 19.0018 6.99313 18.0027 7.99402C17.6662 8.33049 17.3331 8.66382 17 8.99739Z",
                    },
                    {
                      title: "Listening",
                      judul: "Mendengar",
                      iconPath:
                        "M12 4C7.58172 4 4 7.58172 4 12H7C8.10457 12 9 12.8954 9 14V19C9 20.1046 8.10457 21 7 21H4C2.89543 21 2 20.1046 2 19V12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12V19C22 20.1046 21.1046 21 20 21H17C15.8954 21 15 20.1046 15 19V14C15 12.8954 15.8954 12 17 12H20C20 7.58172 16.4183 4 12 4ZM4 14V19H7V14H4ZM17 14V19H20V14H17Z",
                    },
                  ].map((item, index) => (
                    <div key={index} className="flex flex-col items-center p-4">
                      <span className="bg-[#02264A] flex p-4 rounded-full text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="35"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d={item.iconPath}></path>
                        </svg>
                      </span>
                      <div className="text-center font-semibold text-base mt-2">
                        <h2>{langs ? item.title : item.judul}</h2>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="w-full">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">
                      {langs ? "Free:" : "Gratis:"}
                    </h3>
                    <ul className="list-disc ml-5 text-gray-900">
                      {currentProduct.free?.map((free, index) => (
                        <li key={index}>{free}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mt-4 mb-2">
                      {langs ? "Facilities:" : "Fasilitas:"}
                    </h3>
                    <ul className="list-disc ml-5 text-gray-900">
                      {currentProduct.facilities?.map((facility, index) => (
                        <li key={index}>{facility}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mt-4 mb-2">
                      {langs ? "Class Detail:" : "Detail Kelas:"}
                    </h3>
                    <ul className="list-disc ml-5 text-gray-900">
                      {currentProduct.detail_class?.map((detail, index) => (
                        <li key={index}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-6">
                  <p className="font-semibold text-2xl">
                    Rp {currentProduct.price}
                    <span className="font-light text-base ml-1">
                      {langs ? "/Month" : "/Bulan"}
                    </span>
                  </p>
                  <a
                    href="https://wa.me/+6282279506450"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#FFCC00] text-[#252525] font-semibold rounded-full shadow-lg transition duration-300 px-3 py-2 sm:px-6 sm:py-3"
                  >
                    Chat Admin
                  </a>
                </div>
              </Modal>
            </div>
          </div>

          <div className="py-10" id="Mentor">
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
