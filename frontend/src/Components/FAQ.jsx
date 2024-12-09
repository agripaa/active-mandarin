import { Collapse } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RiArrowDownSLine, RiArrowUpSLine } from "@remixicon/react";

const Faq = ({ text }) => {
    const { Panel } = Collapse;
    const { langs } = useSelector((state) => state.LangReducer);
    const [activeKey, setActiveKey] = useState([]); // Track active panel(s)

    const faq = [
        {
            question: {
                english: "What is the duration of the Mandarin class?",
                indonesia: "Berapa durasi kelas Mandarin?",
            },
            answer: {
                english: "Each Mandarin class lasts approximately 1.5 hours.",
                indonesia: "Setiap kelas Mandarin berlangsung selama kurang lebih 1,5 jam.",
            },
        },
        {
            question: {
                english: "Are the classes available online?",
                indonesia: "Apakah kelas tersedia secara online?",
            },
            answer: {
                english: "Yes, all classes are available online via Zoom.",
                indonesia: "Ya, semua kelas tersedia secara online melalui Zoom.",
            },
        },
        {
            question: {
                english: "Do I get a certificate after completing the course?",
                indonesia: "Apakah saya mendapatkan sertifikat setelah menyelesaikan kursus?",
            },
            answer: {
                english: "Yes, you will receive an official certificate after course completion.",
                indonesia: "Ya, Anda akan mendapatkan sertifikat resmi setelah menyelesaikan kursus.",
            },
        },
        {
            question: {
                english: "Can I join the class as a complete beginner?",
                indonesia: "Bisakah saya mengikuti kelas jika saya benar-benar pemula?",
            },
            answer: {
                english: "Absolutely! We have classes specifically designed for beginners.",
                indonesia: "Tentu saja! Kami memiliki kelas yang dirancang khusus untuk pemula.",
            },
        },
        {
            question: {
                english: "Are there any discounts for group registrations?",
                indonesia: "Apakah ada diskon untuk pendaftaran grup?",
            },
            answer: {
                english: "Yes, group registrations of 3 or more people get a 15% discount.",
                indonesia: "Ya, pendaftaran grup yang terdiri dari 3 orang atau lebih mendapatkan diskon 15%.",
            },
        },
        {
            question: {
                english: "What is the refund policy?",
                indonesia: "Bagaimana kebijakan pengembalian dana?",
            },
            answer: {
                english: "Refunds are available within the first 7 days of registration.",
                indonesia: "Pengembalian dana tersedia dalam waktu 7 hari pertama setelah pendaftaran.",
            },
        },
    ];

    const handleExpandIcon = (panelKey) => {
        return activeKey.includes(panelKey) ? (
            <RiArrowUpSLine className="text-xl" />
        ) : (
            <RiArrowDownSLine className="text-xl" />
        );
    };

    const onChange = (key) => {
        setActiveKey(key); 
    };

    return (
        <div className="flex container m-auto py-20 px-5 md:px-10">
            <div className="text-start w-6/12">
                <h1 className="text-3xl lg:text-4xl font-semibold text-[#252525]">{text.title}</h1>
                <h2 className="text-md w-4/6 font-normal text-[#252525] mt-6">"{text.tags}"</h2>
                <h2 className="text-md w-4/6 font-normal text-[#252525] mt-1">- Frank Smith</h2>
                <button className="bg-[#FFCC00] py-4 px-8 rounded-full mt-4">Help & Support</button>
            </div>
            <Collapse
                activeKey={activeKey}
                onChange={onChange}
                size="large"
                className="w-6/12"
                ghost
                expandIcon={({ isActive, panelKey }) => handleExpandIcon(panelKey)}
                expandIconPosition="end"
            >
                {faq.map((item, index) => (
                    <Panel
                        className="mb-10 px-2 py-3 shadow-md rounded-lg"
                        header={<span className="text-2xl font-semibold">{item.question[langs ? 'english' : 'indonesia']}</span>}
                        key={index.toString()}
                    >
                        <p className="text-lg py-2 text-[#505E79]">
                            {item.answer[langs ? 'english' : 'indonesia']}
                        </p>
                    </Panel>
                ))}
            </Collapse>
        </div>
    );
};

export default Faq;
