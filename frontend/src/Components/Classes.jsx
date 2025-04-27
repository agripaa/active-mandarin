import { Col } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import CardClasses from "./CardClass";

const Classes = ({ title }) => {
  const { langs } = useSelector((state) => state.LangReducer);

  const classes = {
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
          "Access to PDFs, PPTs, and Audio"
        ],
        other: [],
        detail_class: [
          "Level: Beginner",
          "Quota: 5 - 10 students",
          "Duration: 1 month (8 sessions)"
        ]
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

  const text = langs ? classes?.english : classes.indonesia;

  return (
    <div className="px-5 bg-neutral-50">
      <div className="container mx-auto py-8">
        <div className="w-full mx-auto mb-5 lg:w-9/12">
          <h1 className="text-4xl font-semibold text-start">{title}</h1>
        </div>

        <Col className="py-5 flex flex-col justify-center items-center w-full">
          {text.map((item, index) => (
            <div key={index} className="mb-8 w-full lg:w-11/12 xl:w-9/12">
              <CardClasses data={item} />
            </div>
          ))}
        </Col>
      </div>
    </div>
  );
};

export default Classes;
