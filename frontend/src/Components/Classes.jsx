import { Col, Row } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import CardClasses from "./CardClass";

const Classes = ({title}) => {
    const {data, langs} = useSelector(state => state.LangReducer);

    const classes = {
        indonesia: [{
            title: "Mandarin Class Juara Next Level",
            price: "4.499.000",
            image: "/assets/class/1.png",
            banner: "/assets/banner-juara-next.png",
            bnefits: [
                "Simulasi ujian HSK 1 - HSK 4",
                "Kelas Privat (1 Siswa/kelas)",
                "Akses ke materi pembelajaran PDF, PPT, Video, dan Audio",
                "Gratis e-Flashcard HSK 1 - HSK 4 + Buku Latihan Hanzi",
                "Durasi: 5 bulan (40 sesi)"
            ],
            desc: "Kelas ini dirancang untuk memungkinkan siswa menguasai Bahasa Mandarin dalam waktu singkat namun efektif. Kurikulumnya mencakup berbagai aspek pembelajaran dari tingkat dasar, termasuk keterampilan mendengar, berbicara, membaca, dan menulis, yang disusun secara sistematis dari tingkat pemula hingga menengah.",
            free: [
                "1 Buku Tulis Hanzi",
                "Akses ke e-Flashcard HSK 1-4 dengan kosakata, terjemahan, dan contoh kalimat",
                "Sesi tanya jawab di luar kelas dalam grup eksklusif",
                "Daftar Kosakata HSK 1-4"
            ],
            facilities: [
                "Simulasi ujian HSK 1 hingga HSK 4",
                "Silabus pengajaran",
                "Kelas interaktif: Membaca, Berbicara, Menulis, dan Mendengar",
                "Akses ke materi PDF, PPT, dan Audio",
                "Rekaman video kelas tersedia untuk diputar ulang"
            ],
            other: [
                "Informasi lowongan kerja untuk penutur Mandarin",
                "Informasi beasiswa kuliah di Tiongkok",
                "Jaminan kelulusan HSK 4"
            ],
            detail_class: [
                "Level: Pemula - HSK 4",
                "Kuota: 1 siswa",
                "Durasi: 5 bulan (40 pertemuan)"
            ]
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
                "Durasi: 5 bulan (40 sesi)"
            ],
            desc: "Program ini dirancang khusus untuk satu siswa per kelas, memastikan pendekatan pembelajaran yang sangat personal dengan fokus penuh pada kebutuhan individu. Dengan metode intensif namun efektif, siswa dibimbing untuk menguasai Bahasa Mandarin dalam waktu singkat, mencakup semua keterampilan utama: mendengar, berbicara, membaca, dan menulis.",
            free: [
                "1 Buku Tulis Hanzi",
                "Akses ke e-Flashcard HSK 1-4 dengan kosakata, terjemahan, dan contoh kalimat",
                "Sesi tanya jawab di luar kelas dalam grup eksklusif",
                "Daftar Kosakata HSK 1-4"
            ],
            facilities: [
                "Simulasi ujian HSK 1 hingga HSK 4",
                "Silabus pengajaran",
                "Kelas interaktif: Membaca, Berbicara, Menulis, dan Mendengar",
                "Akses ke materi PDF, PPT, dan Audio",
                "Rekaman video kelas tersedia untuk diputar ulang"
            ],
            other: [
                "Informasi lowongan kerja untuk penutur Mandarin",
                "Informasi beasiswa kuliah di Tiongkok",
                "Jaminan kelulusan HSK 4"
            ],
            detail_class: [
                "Level: Pemula - HSK 4",
                "Kuota: 1 siswa",
                "Durasi: 5 bulan (40 pertemuan)"
            ]
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
                "Rekaman video kelas tersedia untuk diputar ulang"
            ],
            desc: "Kelas dasar ini sangat cocok untuk pemula tanpa pengetahuan sebelumnya tentang Bahasa Mandarin. Siswa akan mempelajari dasar-dasar seperti pinyin, hanzi, nada, pelafalan, dan percakapan sederhana. Kelas ini dirancang untuk memberikan dasar yang kuat, mempersiapkan siswa untuk maju dengan percaya diri ke tingkat pembelajaran berikutnya.",
            free: [],
            facilities: [],
            other: [],
            detail_class: [
                "Level: Pemula",
                "Kuota: 5 - 10 siswa",
                "Durasi: 1 bulan (8 pertemuan)"
            ]
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
                "Durasi: Segera"
            ],
            desc: "Program ini dirancang khusus untuk beberapa siswa per kelas, memastikan proses pembelajaran yang menarik. Dengan metode pembelajaran bersama yang intensif namun efektif, siswa akan dibimbing untuk menguasai Bahasa Mandarin dalam waktu singkat, mencakup semua keterampilan utama: mendengar, berbicara, membaca, dan menulis.",
            free: [
                "1 Buku Tulis Hanzi",
                "Akses ke e-Flashcard HSK 1-5 dengan kosakata, terjemahan, dan contoh kalimat",
                "Sesi tanya jawab di luar kelas dalam grup eksklusif",
                "Daftar Kosakata HSK 1-4"
            ],
            facilities: [
                "Simulasi ujian HSK 1 hingga HSK 5",
                "Silabus pengajaran",
                "Kelas interaktif: Membaca, Berbicara, Menulis, dan Mendengar",
                "Akses ke materi PDF, PPT, dan Audio",
                "Rekaman video kelas tersedia untuk diputar ulang"
            ],
            other: [
                "Informasi lowongan kerja untuk penutur Mandarin",
                "Informasi beasiswa kuliah di Tiongkok",
                "Jaminan kelulusan HSK 5"
            ],
            detail_class: [
                "Level: Pemula - HSK 5",
                "Kuota: Segera",
                "Durasi: Segera"
            ]
        }],
        english: [{
            title: "Mandarin Class Juara Next Level",
            price: "4.499.000",
            image: "/assets/class/1.png",
            banner: "/assets/banner-juara-next.png",
            bnefits: [
                "HSK 1 - HSK 4 exam simulation",
                "Private Class (1 Student/class)",
                "Access to PDF, PPT, Video and Audio Learning",
                "Free e-Flashcard HSK 1 - HSK 4 + Hanzi Practiced Book",
                "Duration: 5 months (40 sessions)"
            ],
            desc: "This class is designed to enable students to master Mandarin in a short but effective timeframe. The curriculum covers various aspects of learning from the basic level, including listening, speaking, reading, and writing skills, which are systematically arranged from the beginner to intermediate levels.",
            free: [
                "1 Hanzi Writing Notebook",
                "Access to HSK 1-4 e-Flashcards with vocabulary, translations, and example sentences",
                "Q&A sessions outside of class in an exclusive class group",
                "HSK 1-4 Vocabulary List"
            ],
            facilities: [
                "HSK 1 to HSK 4 exam simulations",
                "Teaching syllabus",
                "Interactive classes: Reading, Speaking, Writing, and Listening",
                "Access to PDF, PPT, and Audio materials",
                "Class video recordings available for replay"
            ],
            other: [
                "Job vacancy information Mandarin speakers",
                "Information on college scholarships at China",
                "HSK 4 completion guarantee"
            ],
            detail_class: [
                "Level: Beginner - HSK 4",
                "Quota: 1 student",
                "Duration: 5 months (40 meetings)"
            ]
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
                "Duration: 5 months (40 sessions)"
            ],
            desc: "This program is specially designed for one student per class, ensuring a highly personalized learning approach with full focus on individual needs. Using an intensive yet effective method, students are guided to master Mandarin in a short time, covering all key skills: listening, speaking, reading, and writing.",
            free: [
                "1 Hanzi Writing Notebook",
                "Access to HSK 1-4 e-Flashcards with vocabulary, translations, and example sentences",
                "Q&A sessions outside of class in an exclusive class group",
                "HSK 1-4 Vocabulary List"
            ],
            facilities: [
                "HSK 1 to HSK 4 exam simulations",
                "Teaching syllabus",
                "Interactive classes: Reading, Speaking, Writing, and Listening",
                "Access to PDF, PPT, and Audio materials",
                "Class video recordings available for replay"
            ],
            other: [
                "Job vacancy information Mandarin speakers",
                "Information on college scholarships at China",
                "HSK 4 completion guarantee"
            ],
            detail_class: [
                "Level: Beginner - HSK 4",
                "Quota: 1 student",
                "Duration: 5 months (40 meetings)"
            ]
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
                "Class video recordings available for replay"
            ],
            desc: "This foundational class is perfect for beginners with no prior knowledge of Mandarin. Students will learn the essentials such as pinyin, hanzi, tones, pronunciation, and simple conversations. The class is designed to provide a strong foundation, preparing students to advance confidently to the next learning level.",
            free: [],
            facilities: [],
            other: [],
            detail_class: [
                "Level: Beginner",
                "Quota: 5 - 10 students",
                "Duration: 1 month (8 meetings)"
            ]
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
                "Duration: Soon"
            ],
            desc: "This program is specifically designed for multiple students per class, ensuring attractive learning process. With intensive joint learning methods but effectively, students will be guided to master Mandarin in time short, covers all the main skills: listening, speaking, reading, and write.",
            free: [
                "1 Hanzi Writing Notebook",
                "Access to HSK 1-5 e-Flashcards with vocabulary, translations, and example sentences",
                "Q&A sessions outside of class in an exclusive class group",
                "HSK 1-4 Vocabulary List"
            ],
            facilities: [
                "HSK 1 to HSK 5 exam simulations",
                "Teaching syllabus",
                "Interactive classes: Reading, Speaking, Writing, and Listening",
                "Access to PDF, PPT, and Audio materials",
                "Class video recordings available for replay"
            ],
            other: [
                "Job vacancy information Mandarin speakers",
                "Information on college scholarships at China",
                "HSK 5 completion guarantee"
            ],
            detail_class: [
                "Level: Beginner - HSK 5",
                "Quota: Soon",
                "Duration: Soon"
            ]
        }]
    };
    
    const text = langs ? classes?.english : classes.indonesia;

    console.log(text)

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
