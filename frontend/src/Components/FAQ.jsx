import { Collapse } from "antd";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { RiArrowDownSLine, RiArrowUpSLine } from "@remixicon/react";

const Faq = ({ text }) => {
    const { Panel } = Collapse;
    const { langs } = useSelector((state) => state.LangReducer);
    const [activeKey, setActiveKey] = useState([]); // Track single active panel

    useEffect(() => {
        console.log(activeKey)
    }, [activeKey])

    const faq = useMemo(() => [
        {
            question: {
                english: "What Programs and Products are Available at Active Mandarin Indonesia?",
                indonesia: "Program dan Produk Apa yang Tersedia di Active Mandarin Indonesia?",
            },
            answer: {
                english: `
                <strong>Programs:</strong>
                <ul>
                    <li>Mandarin Premium Class (Fast-Track Program):</li>
                    <ul>
                        <li>Mandarin Juara Next Level (5 months) – Private class from Basic to HSK 4.</li>
                        <li>Mandarin Juara (5 months) – Small class from Basic to HSK 4.</li>
                        <li>Mandarin Basic to HSK 4 (8 months) – Group class for Basic to Intermediate levels.</li>
                        <li>Mandarin Native Basic to HSK 5 (8 months) – Class with native tutors from Basic to HSK 5.</li>
                    </ul>
                    <li>General Class (Flexible Learning Program):</li>
                    <ul>
                        <li>General Class (Basic – HSK 5) – Duration of 1, 2, or 3 months per level.</li>
                        <li>General Native Class (Basic – HSK 5) – Class with native tutors, duration of 1, 2, or 3 months per level.</li>
                    </ul>
                </ul>
                <strong>Products:</strong>
                <ul>
                    <li>E-Book Comprehensive Mandarin Grammar – Complete guide to Mandarin grammar.</li>
                    <li>E-Flashcard Active Mandarin Indonesia – Interactive cards for vocabulary building.</li>
                    <li>Grid Notebook for Learning Hanzi Writing – Notebook for practicing Hanzi writing.</li>
                    <li>Guidebook to Studying in China with Scholarships – Complete guide to studying in China with scholarships.</li>
                </ul>
                `,
                indonesia: `
                <strong>Program:</strong>
                <ul>
                    <li>Mandarin Premium Class (Fast-Track Program):</li>
                    <ul>
                        <li>Mandarin Juara Next Level (5 bulan) – Kelas privat dari Basic hingga HSK 4.</li>
                        <li>Mandarin Juara (5 bulan) – Kelas kecil dari Basic hingga HSK 4.</li>
                        <li>Mandarin Basic to HSK 4 (8 bulan) – Kelas grup untuk level dasar hingga menengah.</li>
                        <li>Mandarin Native Basic to HSK 5 (8 bulan) – Kelas dengan tutor native dari Basic hingga HSK 5.</li>
                    </ul>
                    <li>General Class (Flexible Learning Program):</li>
                    <ul>
                        <li>General Class (Basic – HSK 5) – Durasi 1, 2, atau 3 bulan per level.</li>
                        <li>General Native Class (Basic – HSK 5) – Kelas dengan tutor native, durasi 1, 2, atau 3 bulan per level.</li>
                    </ul>
                </ul>
                <strong>Produk:</strong>
                <ul>
                    <li>E-Book Comprehensive Mandarin Grammar – Panduan lengkap tata bahasa Mandarin.</li>
                    <li>E-Flashcard Active Mandarin Indonesia – Kartu interaktif untuk membangun kosakata.</li>
                    <li>Grid Notebook for Learning Hanzi Writing – Buku catatan untuk latihan menulis Hanzi.</li>
                    <li>Guidebook to Studying in China with Scholarships – Panduan lengkap kuliah di China dengan beasiswa.</li>
                </ul>
                `,
            },
        },
        {
            question: {
                english: "What Classes Are Available at Active Mandarin Indonesia?",
                indonesia: "Kelas Apa Saja yang Tersedia di Active Mandarin Indonesia?",
            },
            answer: {
                english: `
                <strong>Programs:</strong>
                <ul>
                    <li>Mandarin Premium Class (Fast-Track Program):</li>
                    <ul>
                        <li>Mandarin Juara Next Level (5 months) – Private class from Basic to HSK 4.</li>
                        <li>Mandarin Juara (5 months) – Small class from Basic to HSK 4.</li>
                        <li>Mandarin Basic to HSK 4 (8 months) – Group class for Basic to Intermediate levels.</li>
                        <li>Mandarin Native Basic to HSK 5 (8 months) – Class with native tutors from Basic to HSK 5.</li>
                    </ul>
                    <li>General Class (Flexible Learning Program):</li>
                    <ul>
                        <li>General Class (Basic – HSK 5) – Duration of 1, 2, or 3 months per level.</li>
                        <li>General Native Class (Basic – HSK 5) – Class with native tutors, duration of 1, 2, or 3 months per level.</li>
                    </ul>
                </ul>
                `,
                indonesia: `
                <strong>Program:</strong>
                <ul>
                    <li>Mandarin Premium Class (Fast-Track Program):</li>
                    <ul>
                        <li>Mandarin Juara Next Level (5 bulan) – Kelas privat dari Basic hingga HSK 4.</li>
                        <li>Mandarin Juara (5 bulan) – Kelas kecil dari Basic hingga HSK 4.</li>
                        <li>Mandarin Basic to HSK 4 (8 bulan) – Kelas grup untuk level dasar hingga menengah.</li>
                        <li>Mandarin Native Basic to HSK 5 (8 bulan) – Kelas dengan tutor native dari Basic hingga HSK 5.</li>
                    </ul>
                    <li>General Class (Flexible Learning Program):</li>
                    <ul>
                        <li>General Class (Basic – HSK 5) – Durasi 1, 2, atau 3 bulan per level.</li>
                        <li>General Native Class (Basic – HSK 5) – Kelas dengan tutor native, durasi 1, 2, atau 3 bulan per level.</li>
                    </ul>
                </ul>
                `,
            },
        },
        {
            question: {
                english: "What is the Difference Between Premium and General Classes?",
                indonesia: "Apa Perbedaan Kelas Premium dan General?",
            },
            answer: {
                english: `
                <strong>Premium Class (Fast-Track Program):</strong>
                <ul>
                    <li>Intensive learning with exclusive methods.</li>
                    <li>Suitable for students who want to master Mandarin in a short time.</li>
                    <li>Fixed duration: 5-8 months.</li>
                </ul>
                <strong>General Class (Flexible Learning Program):</strong>
                <ul>
                    <li>More flexible learning pace.</li>
                    <li>Designed for students without specific time targets.</li>
                    <li>Variable duration: 1, 2, or 3 months per level.</li>
                </ul>
                `,
                indonesia: `
                <strong>Premium Class (Fast-Track Program):</strong>
                <ul>
                    <li>Pembelajaran intensif dengan metode eksklusif.</li>
                    <li>Cocok bagi siswa yang ingin menguasai Mandarin dalam waktu singkat.</li>
                    <li>Durasi tetap: 5-8 bulan.</li>
                </ul>
                <strong>General Class (Flexible Learning Program):</strong>
                <ul>
                    <li>Tempo belajar lebih fleksibel.</li>
                    <li>Dirancang bagi siswa tanpa target waktu tertentu.</li>
                    <li>Durasi bervariasi: 1, 2, atau 3 bulan per level.</li>
                </ul>
                `,
            },
        },
        {
            question: {
                english: "What are the Benefits of Studying at Active Mandarin Indonesia?",
                indonesia: "Apa Keuntungan Belajar di Active Mandarin Indonesia?",
            },
            answer: {
                english: `
                <ul>
                    <li>Speaking sessions with native speakers to improve pronunciation and fluency.</li>
                    <li>Interactive discussion rooms to enhance understanding.</li>
                    <li>Placement tests to ensure students learn at the appropriate level.</li>
                    <li>Certified and experienced tutors.</li>
                    <li>Flexible and structured programs tailored to students' needs.</li>
                    <li>Full support for HSK exams and professional needs.</li>
                    <li>Supportive and interactive learning environment.</li>
                </ul>
                `,
                indonesia: `
                <ul>
                    <li>Sesi berbicara dengan native speaker untuk meningkatkan pelafalan dan kefasihan.</li>
                    <li>Ruang diskusi interaktif untuk meningkatkan pemahaman.</li>
                    <li>Tes penempatan agar siswa belajar di level yang sesuai.</li>
                    <li>Tutor bersertifikat dan berpengalaman.</li>
                    <li>Program fleksibel dan terstruktur sesuai kebutuhan siswa.</li>
                    <li>Dukungan penuh untuk ujian HSK dan kebutuhan profesional.</li>
                    <li>Lingkungan belajar yang suportif dan interaktif.</li>
                </ul>
                `,
            },
        },
        {
            question: {
                english: "What is the Duration of Each Class?",
                indonesia: "Berapa Durasi Setiap Kelas?",
            },
            answer: {
                english: "Each class session lasts 75-90 minutes for optimal efficiency and engagement.",
                indonesia: "Setiap sesi kelas berlangsung selama 75-90 menit untuk efisiensi dan keterlibatan optimal.",
            },
        },
        {
            question: {
                english: "Who are the Tutors at Active Mandarin Indonesia?",
                indonesia: "Siapa Tutor di Active Mandarin Indonesia?",
            },
            answer: {
                english: "Our tutors are graduates and students from top universities in China who have passed rigorous selection. We also offer classes with native tutors for a more immersive learning experience.",
                indonesia: "Tutor kami adalah lulusan dan mahasiswa dari universitas terkemuka di China yang telah melalui seleksi ketat. Kami juga menawarkan kelas dengan tutor native untuk pengalaman belajar yang lebih mendalam.",
            },
        },
        {
            question: {
                english: "What Platforms are Used for Online Classes?",
                indonesia: "Apa Platform yang Digunakan untuk Kelas Online?",
            },
            answer: {
                english: "Classes are conducted via Zoom and VooV Meeting, which support various interactive features such as screen sharing, breakout rooms, and real-time interaction with tutors.",
                indonesia: "Kelas dilakukan melalui Zoom dan VooV Meeting yang mendukung berbagai fitur interaktif seperti screen sharing, breakout rooms, dan interaksi real-time dengan tutor.",
            },
        },
        {
            question: {
                english: "How is the Payment Process for Programs?",
                indonesia: "Bagaimana Cara Pembayaran Program?",
            },
            answer: {
                english: `
                All payments are made through our official website:
                <ul>
                    <li>Select the desired class.</li>
                    <li>Complete the payment through the website.</li>
                    <li>Confirmation will be sent via WhatsApp and email with further instructions.</li>
                </ul>
                For payment inquiries, contact our support team.
                `,
                indonesia: `
                Semua pembayaran dilakukan melalui website resmi kami:
                <ul>
                    <li>Pilih kelas yang diinginkan.</li>
                    <li>Selesaikan pembayaran melalui website.</li>
                    <li>Konfirmasi akan dikirim via WhatsApp dan email dengan instruksi selanjutnya.</li>
                </ul>
                Untuk pertanyaan seputar pembayaran, hubungi tim dukungan kami.
                `,
            },
        },
        {
            question: {
                english: "Can Students Ask Questions Outside Class Hours?",
                indonesia: "Apakah Siswa Bisa Bertanya di Luar Jam Kelas?",
            },
            answer: {
                english: "Yes, students can ask questions through the WhatsApp group provided at the start of the class. However, additional sessions outside the schedule are not included in the program.",
                indonesia: "Ya, siswa dapat bertanya melalui grup WhatsApp yang disediakan di awal kelas. Namun, sesi tambahan di luar jadwal tidak termasuk dalam program.",
            },
        },
        {
            question: {
                english: "Can Payments be Canceled?",
                indonesia: "Apakah Pembayaran Bisa Dibatalkan?",
            },
            answer: {
                english: "Payments cannot be canceled or refunded after the transaction is completed. However, students can reschedule classes to other available sessions.",
                indonesia: "Pembayaran tidak dapat dibatalkan atau dikembalikan setelah transaksi selesai. Namun, siswa dapat menjadwalkan ulang kelas ke sesi lain yang tersedia.",
            },
        },
        {
            question: {
                english: "How Can I Register at Active Mandarin Indonesia?",
                indonesia: "Bagaimana Cara Mendaftar di Active Mandarin Indonesia?",
            },
            answer: {
                english: "Registration can be done through the official website activemandarin.id. After payment is completed, students will receive confirmation via WhatsApp and email.",
                indonesia: "Pendaftaran dapat dilakukan melalui website resmi activemandarin.id. Setelah pembayaran selesai, siswa akan menerima konfirmasi via WhatsApp dan email.",
            },
        },
        {
            question: {
                english: "Are There Any Requirements to Register for Classes?",
                indonesia: "Apakah Ada Syarat untuk Mendaftar Kelas?",
            },
            answer: {
                english: `
                <ul>
                    <li><strong>Mandarin Premium Class:</strong> Open to all levels, no specific requirements.</li>
                    <li><strong>Mandarin Juara & Mandarin Juara Next Level:</strong> Suitable for beginners and intermediate levels.</li>
                    <li><strong>Mandarin Basic to HSK 4 & Mandarin Native Basic to HSK 5:</strong> No prior knowledge required.</li>
                    <li><strong>General & General Native Class:</strong> Open to all, but basic Mandarin is recommended for higher levels.</li>
                    <li><strong>HSK Preparation Program:</strong> Basic knowledge according to the registered HSK level is recommended.</li>
                </ul>
                `,
                indonesia: `
                <ul>
                    <li><strong>Mandarin Premium Class:</strong> Terbuka untuk semua level, tanpa persyaratan khusus.</li>
                    <li><strong>Mandarin Juara & Mandarin Juara Next Level:</strong> Cocok untuk pemula dan level menengah.</li>
                    <li><strong>Mandarin Basic to HSK 4 & Mandarin Native Basic to HSK 5:</strong> Tidak memerlukan pengetahuan awal.</li>
                    <li><strong>General & General Native Class:</strong> Terbuka untuk semua, namun disarankan memiliki dasar Mandarin untuk level lebih tinggi.</li>
                    <li><strong>HSK Preparation Program:</strong> Disarankan memiliki dasar sesuai level HSK yang didaftarkan.</li>
                </ul>
                `,
            },
        },
    ], []);

    const handleExpandIcon = (isActive) => {
        return isActive ? (
            <RiArrowUpSLine className="text-xl" />
        ) : (
            <RiArrowDownSLine className="text-xl" />
        );
    };

    const onChange = useCallback((key) => {
        setActiveKey(key); 
    }, []);

    return (
        <div className="container flex flex-col gap-8 items-center m-auto py-16 px-5 lg:px-10 lg:mt-10">
            <div className="text-center w-full">
                <h1 className="text-2xl font-semibold text-[#252525] md:text-3xl lg:text-[32px] 2xl:text-5xl">{langs ? 'Frequently Asked Questions' : 'Pusat Bantuan'}</h1>
                <h2 className="text-base font-normal text-[#252525] mt-4 lg:text-lg">"{langs ? 'One language sets you in a corridor for life. Two languages open every door along the way.' : 'Satu bahasa menempatkanmu di sebuah koridor sepanjang hidup. Dua bahasa membuka setiap pintu di sepanjang jalan.'}"</h2>
                <h2 className="text-base font-normal text-[#252525] mt-1 lg:text-lg">- Frank Smith</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-4 w-full">
                <Collapse
                    accordion
                    activeKey={activeKey}
                    onChange={(key) => onChange(key)}
                    size="large"
                    ghost
                    expandIcon={({ isActive }) => handleExpandIcon(isActive)}
                    expandIconPosition="end"
                >
                    {faq?.slice(0, faq.length / 2).map((item, index) => (
                        <Panel
                            className="mb-4 pl-2 py-2 !rounded-2xl bg-white lg:mb-6"
                            header={<span className={`text-base font-semibold ${index.toString() === activeKey[0] ? '' : 'line-clamp-1'}`}>{item.question[langs ? 'english' : 'indonesia']}</span>}
                            key={index.toString()}
                        >
                            <p
                                className="text-lg py-2 text-[#505e79] faq-content"
                                dangerouslySetInnerHTML={{ __html: item.answer[langs ? 'english' : 'indonesia'] }}
                            />
                        </Panel>
                    ))}
                </Collapse>
                <Collapse
                    accordion
                    activeKey={activeKey}
                    onChange={(key) => onChange(key)}
                    size="large"
                    ghost
                    expandIcon={({ isActive }) => handleExpandIcon(isActive)}
                    expandIconPosition="end"
                >
                    {faq?.slice(faq.length / 2, faq.length).map((item, index) => (
                        <Panel
                            className="mb-4 pl-2 py-2 !rounded-2xl bg-white lg:mb-6"
                            header={<span className={`text-base font-semibold ${(index + faq.length / 2).toString() === activeKey[0] ? '' : 'line-clamp-1'}`}>{item.question[langs ? 'english' : 'indonesia']}</span>}
                            key={(index + faq.length / 2).toString()}
                        >
                            <p
                                className="text-lg py-2 text-[#505e79] faq-content"
                                dangerouslySetInnerHTML={{ __html: item.answer[langs ? 'english' : 'indonesia'] }}
                            />
                        </Panel>
                    ))}
                </Collapse>
            </div>
        </div>
    );
};

export default Faq;
