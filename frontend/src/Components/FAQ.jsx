import { Collapse } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RiArrowDownSLine, RiArrowUpSLine } from "@remixicon/react";

const Faq = ({ text }) => {
    const { Panel } = Collapse;
    const { langs } = useSelector((state) => state.LangReducer);
    const [activeKey, setActiveKey] = useState(null); // Track single active panel

    const faq = [
        {
            question: {
                english: "What are the Programs and Products at Active Mandarin Indonesia?",
                indonesia: "Apa saja Program dan Produk di Active Mandarin Indonesia?",
            },
            answer: {
                english: `
                <strong>Programs:</strong>
                <ul>
                    <li>Mandarin Native Program (Coming Soon)</li>
                    <li>Mandarin Juara Next Level</li>
                    <li>Mandarin Juara</li>
                    <li>Basic Mandarin</li>
                    <li>HSK 1-5</li>
                    <li>Mentor Scholarship Program</li>
                    <li>Non-Degree Program</li>
                </ul>
                <strong>Products:</strong>
                <ul>
                    <li>E-Book Comprehensive Mandarin Grammar</li>
                    <li>E-Flashcard Active Mandarin Indonesia</li>
                    <li>Buku Kotak-Kotak untuk Belajar Menulis Hanzi</li>
                </ul>
                `,
                indonesia: `
                <strong>Program:</strong>
                <ul>
                    <li>Mandarin Native Program (Coming Soon)</li>
                    <li>Mandarin Juara Next Level</li>
                    <li>Mandarin Juara</li>
                    <li>Basic Mandarin</li>
                    <li>HSK 1-5</li>
                    <li>Mentor Scholarship Program</li>
                    <li>Non-Degree Program</li>
                </ul>
                <strong>Produk:</strong>
                <ul>
                    <li>E-Book Comprehensive Mandarin Grammar</li>
                    <li>E-Flashcard Active Mandarin Indonesia</li>
                    <li>Buku Kotak-Kotak untuk Belajar Menulis Hanzi</li>
                </ul>
                `,
            },
        },
        {
            question: {
                english: "What classes are available at Active Mandarin Indonesia?",
                indonesia: "Program kelas apa yang tersedia di Active Mandarin Indonesia?",
            },
            answer: {
                english: `
                <ul>
                    <li><strong>Mandarin Juara:</strong> Intensive program for improving speaking, reading, and writing skills.</li>
                    <li><strong>Mandarin Native:</strong> Exclusive program with native speakers.</li>
                    <li><strong>Basic Mandarin:</strong> Beginner program for foundational Mandarin.</li>
                    <li><strong>HSK 1 - HSK 5:</strong> HSK certification preparation program.</li>
                </ul>
                `,
                indonesia: `
                <ul>
                    <li><strong>Mandarin Juara:</strong> Program intensif untuk meningkatkan keterampilan berbicara, membaca, dan menulis.</li>
                    <li><strong>Mandarin Native:</strong> Program eksklusif bersama penutur asli.</li>
                    <li><strong>Basic Mandarin:</strong> Program dasar untuk pemula.</li>
                    <li><strong>HSK 1 - HSK 5:</strong> Program persiapan ujian HSK.</li>
                </ul>
                `,
            },
        },
        {
            question: {
                english: "What is the difference between General and Featured Classes?",
                indonesia: "Apa perbedaan antara Kelas Umum dan Kelas Unggulan?",
            },
            answer: {
                english: `
                <strong>General Classes:</strong>
                <ul>
                    <li>Relaxed learning pace.</li>
                    <li>Suitable for students without specific targets.</li>
                </ul>
                <strong>Featured HSK Classes:</strong>
                <ul>
                    <li>Designed for students with specific goals like studying or working.</li>
                    <li>More intensive and faster learning process.</li>
                </ul>
                `,
                indonesia: `
                <strong>Kelas Umum:</strong>
                <ul>
                    <li>Pola belajar santai.</li>
                    <li>Cocok untuk siswa tanpa target spesifik.</li>
                </ul>
                <strong>Kelas Unggulan (HSK):</strong>
                <ul>
                    <li>Dirancang untuk siswa dengan target khusus seperti kuliah atau kerja.</li>
                    <li>Pembelajaran lebih intensif dan cepat.</li>
                </ul>
                `,
            },
        },
        {
            question: {
                english: "What are the benefits of joining the classes?",
                indonesia: "Apa saja manfaat yang diperoleh selama mengikuti kelas?",
            },
            answer: {
                english: `
                <ul>
                    <li>Speaking sessions with native speakers for HSK classes.</li>
                    <li>Interactive discussion rooms.</li>
                    <li>Placement tests for program alignment.</li>
                    <li>Experienced and certified tutors.</li>
                    <li>Flexible and structured programs.</li>
                    <li>Full support for HSK exams and professional needs.</li>
                    <li>Supportive and interactive learning environment.</li>
                </ul>
                `,
                indonesia: `
                <ul>
                    <li>Sesi berbicara dengan penutur asli (HSK).</li>
                    <li>Ruang diskusi interaktif.</li>
                    <li>Placement test untuk penyesuaian program.</li>
                    <li>Pengajar berpengalaman dan tersertifikasi.</li>
                    <li>Program fleksibel dan terstruktur.</li>
                    <li>Dukungan penuh untuk ujian HSK dan kebutuhan profesional.</li>
                    <li>Lingkungan belajar yang mendukung.</li>
                </ul>
                `,
            },
        },
        {
            question: {
                english: "What is the class duration?",
                indonesia: "Berapa lama durasi setiap kelas?",
            },
            answer: {
                english: "Each class lasts 75 minutes.",
                indonesia: "Durasi setiap kelas adalah 75 menit.",
            },
        },
        {
            question: {
                english: "Who are the tutors at Active Mandarin?",
                indonesia: "Siapa tutor di Active Mandarin?",
            },
            answer: {
                english: "Our tutors are certified graduates or students from Chinese universities who passed rigorous selection.",
                indonesia: "Tutor kami adalah mahasiswa/lulusan universitas di Tiongkok yang tersertifikasi dan melalui seleksi ketat.",
            },
        },
        {
            question: {
                english: "What platforms are used during the classes?",
                indonesia: "Media pembelajaran apa yang digunakan saat kelas berlangsung?",
            },
            answer: {
                english: "Classes are conducted via Zoom and VooV platforms.",
                indonesia: "Kelas dilakukan melalui aplikasi Zoom dan VooV.",
            },
        },
        {
            question: {
                english: "How can I pay for the programs?",
                indonesia: "Bagaimana metode pembayaran untuk program?",
            },
            answer: {
                english: `
                <ul>
                    <li>Payments are made monthly.</li>
                    <li>Steps:</li>
                    <ol>
                        <li>Choose a class via the website or WhatsApp admin (0822-7950-6450).</li>
                        <li>Transfer payment to BNI account 1446724452 a.n. SURYA PRATAMA JANUARVI.</li>
                        <li>Confirm via WhatsApp.</li>
                    </ol>
                </ul>
                `,
                indonesia: `
                <ul>
                    <li>Pembayaran dilakukan setiap bulan.</li>
                    <li>Langkah pembayaran:</li>
                    <ol>
                        <li>Pilih kelas melalui website atau WhatsApp admin (0822-7950-6450).</li>
                        <li>Lakukan pembayaran ke rekening BNI 1446724452 a.n. SURYA PRATAMA JANUARVI.</li>
                        <li>Konfirmasi pembayaran via WhatsApp.</li>
                    </ol>
                </ul>
                `,
            },
        },
        {
            question: {
                english: "Can students ask questions outside class hours?",
                indonesia: "Apakah siswa boleh bertanya di luar jam kelas?",
            },
            answer: {
                english: `
                Of course. Students can ask questions through the WhatsApp group provided at the start of the class. However, additional class time outside the scheduled hours is not provided.
                `,
                indonesia: `
                Tentu saja boleh. Siswa dapat bertanya melalui grup WhatsApp yang disediakan saat kelas dimulai. Namun, tambahan waktu kelas di luar jadwal yang telah ditentukan tidak disediakan.
                `,
            },
        },
        {
            question: {
                english: "Can payments be canceled?",
                indonesia: "Apakah pembayaran bisa dibatalkan?",
            },
            answer: {
                english: `
                Payments can be canceled by requesting a refund within 24 hours of payment. After this time, the funds cannot be refunded in any form.
                `,
                indonesia: `
                Pembayaran dapat dibatalkan dengan pengajuan refund dalam waktu 1 × 24 jam setelah pembayaran. Setelah melewati batas waktu tersebut, dana tidak dapat dikembalikan dalam bentuk apapun.
                `,
            },
        },
        {
            question: {
                english: "How can I register for a class at Active Mandarin Indonesia?",
                indonesia: "Bagaimana cara mendaftar kelas di Active Mandarin Indonesia?",
            },
            answer: {
                english: `
                Registration can be done by contacting the WhatsApp admin or through the official website of Active Mandarin Indonesia at activemandarin.id.
                `,
                indonesia: `
                Pendaftaran dapat dilakukan dengan menghubungi admin WhatsApp atau melalui website resmi Active Mandarin Indonesia di activemandarin.id.
                `,
            },
        },
        {
            question: {
                english: "Are there any requirements to register for a class?",
                indonesia: "Apakah ada syarat untuk mendaftar kelas?",
            },
            answer: {
                english: `
                <ul>
                    <li><strong>Basic Mandarin and Mandarin Juara:</strong> No specific requirements.</li>
                    <li><strong>HSK Program:</strong> It is recommended to have prior knowledge according to the level being followed.</li>
                </ul>
                `,
                indonesia: `
                <ul>
                    <li><strong>Basic Mandarin dan Mandarin Juara:</strong> Tidak ada syarat khusus.</li>
                    <li><strong>HSK Program:</strong> Disarankan memiliki pemahaman awal sesuai level yang diikuti.</li>
                </ul>
                `,
            },
        },
    ];
    
    
    

    const handleExpandIcon = (panelKey) => {
        return activeKey === panelKey ? (
            <RiArrowUpSLine className="text-xl" />
        ) : (
            <RiArrowDownSLine className="text-xl" />
        );
    };

    const onChange = (key) => {
        setActiveKey(key); 
    };

    return (
        <div className="grid grid-cols-1 container m-auto py-16 px-5 lg:px-10 lg:grid-cols-2 gap-10">
            <div className="text-center md:text-start w-full">
                <h1 className="text-5xl font-semibold text-[#252525]">{text.title}</h1>
                <h2 className="text-lg font-normal text-[#252525] mt-6 lg:w-5/6">"{text.tags}"</h2>
                <h2 className="text-lg font-normal text-[#252525] mt-1 lg:w-5/6">- Frank Smith</h2>
                <div className="mt-8">
                    <a  href="/contact" className="bg-[#FFCC00] py-4 px-8 rounded-full">Help & Support</a>
                </div>
            </div>
            <Collapse
                accordion
                activeKey={activeKey}
                onChange={(key) => onChange(key)}
                size="large"
                ghost
                expandIcon={({ isActive, panelKey }) => handleExpandIcon(panelKey)}
                expandIconPosition="end"
            >
                {faq.map((item, index) => (
                    <Panel
                        className="mb-10 px-2 py-3 shadow-md rounded-lg"
                        header={<span className="text-xl md:text-2xl font-semibold">{item.question[langs ? 'english' : 'indonesia']}</span>}
                        key={index.toString()}
                    >
                        <p
                            className="text-lg py-2 text-[#505e79] faq-content"
                            dangerouslySetInnerHTML={{ __html: item.answer[langs ? 'english' : 'indonesia'] }}
                        ></p>
                    </Panel>
                ))}
            </Collapse>
        </div>
    );
};

export default Faq;
