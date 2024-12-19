import React from "react";
import { FaWhatsapp, FaTelegramPlane } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Testimony = ({text}) => {
    const {data, langs} = useSelector(state => state.LangReducer);

    const testimonies = {
        english: [
            {
                "name": "Iqbal Oka Prasetyo",
                "image": "/assets/testi/Oka.jpg",
                "class": "Mandarin Juara",
                "testi": "The Mandarin Juara class at Active Mandarin was very helpful during my studies in China. The materials are practical and easy to apply, making me more confident in daily and academic communication. Highly recommended!"
            },
            {
                "name": "Susanty",
                "image": "/assets/testi/Susanty.jpg",
                "class": "Mandarin Juara",
                "testi": "I joined the Mandarin Juara program, and here I gained new knowledge starting from the very basics, even though I already had a foundation. 老师 (teacher) is also very patient in explaining things."
            },
            {
                "name": "Muh. Awalun Nur Rahmat",
                "image": "/assets/testi/Muh. Awalun Nur Rahamt.jpg",
                "class": "Mandarin Juara",
                "testi": "This Mandarin Juara class is very beneficial, especially for young people or students who love Mandarin. It's a great way to enhance knowledge and skills in mastering a foreign language."
            },
            {
                "name": "Satrial Iip",
                "image": "/assets/testi/Satrial.jpeg",
                "class": "Mandarin Juara",
                "testi": "Very useful! The materials provided are very comprehensive. Having experienced and competent tutors makes the learning process and understanding easier."
            },
            {
                "name": "Asyrofuddin Fadhlullah",
                "image": "/assets/testi/Asyrofuddin Fadhlullah.PNG",
                "class": "Mandarin Juara",
                "testi": "Having a friendly, communicative, experienced, and helpful tutor is the perfect combination for ideal learning. Highly recommended!"
            }            
        ],
        indonesia: [
            {
                name: "Iqbal Oka Prasetyo",
                image: "/assets/testi/Oka.jpg",
                class: "Mandarin Juara",
                testi: "Kelas Bahasa Mandarin Juara di Active Mandarin sangat helpful selama kuliah di China. Materinya practical dan mudah diaplikasikan, bikin lebih confident untuk komunikasi sehari-hari dan akademik. Highly recommended!"
            },
            {
                name: "Susanty",
                image: "/assets/testi/Susanty.jpg",
                class: "Mandarin Juara",
                testi: "Saya mengambil program mandarin juara, disini saya mendapatkan ilmu-ilmu baru dari basic banget walau saya sudah punya basic & 老师 juga sangat sabar menjelaskan"
            },
            {
                name: "Muh. Awalun Nur Rahmat",
                image: "/assets/testi/Muh. Awalun Nur Rahamt.jpg",
                class: "Mandarin Juara",
                testi: "Kelas Mandari Juara ini Sangat Bermanfaat, terutama bagi kalangan anak muda atau di kalangan mahasiswa yang menyukai dengan bahasa mandarin. Untuk Menambah menambah ilmu dan skill dalam menguasai bahasa asing."
            },
            {
                name: "Satrial Iip",
                image: "/assets/testi/Satrial.jpeg",
                class: "Mandarin Juara",
                testi: "Sangat bermanfaat! Materi yang disampaikan sangat lengkap. Memiliki tutor yang berpengalaman dan kompeten mempermudah proses pembelajaran dan pemahaman."
            },
            {
                name: "Asyrofuddin Fadhlullah",
                image: "/assets/testi/Asyrofuddin Fadhlullah.PNG",
                class: "Mandarin Juara",
                testi: "Having a friendly, communicative, experienced and helpful tutor is such a perfect combination of perfect learning. Highly recommended!"
            },
        ]
    };

    const translate = langs ? testimonies?.english : testimonies?.indonesia;



    return (
        <div
            className="bg-[#02264A]"
            style={{
                backgroundImage: "url('/assets/texture-card-big.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="container mx-auto">
                <div className="flex justify-between min-h-screen items-center px-5">
                    {/* Kiri */}
                    <div className="flex flex-col items-center justify-center w-[30%]">
                        <img
                            src="/assets/contact2x(white).png"
                            className="w-9/12"
                            alt="contact"
                        />
                        <h2 className="text-4xl font-semibold text-white tracking-wide my-6 mt-10">
                            {text.tags}
                        </h2>
                        <div className="flex justify-start items-start w-full">
                            <Link className="bg-[#FFCC00] px-8 py-5 rounded-3xl font-semibold flex items-center mr-6" to="https://chat.whatsapp.com/FSQGLGPJjruKlhYueXz83K" target="_blank">
                                <FaWhatsapp className="mr-4 text-2xl"/> Join Now
                            </Link>
                            <Link className="bg-[#FFCC00] px-8 py-5 rounded-3xl font-semibold flex items-center mr-6" to="https://t.me/+TJzEXxdKA2EyOTQ9" target="_blank">
                                <FaTelegramPlane className="mr-4 text-2xl"/> Join Now
                            </Link>
                        </div>
                    </div>

                    {/* Kanan: Loop Testimonies */}
                    <div className="w-[70%] flex">
                        <div className="flex flex-col w-1/2 h-auto items-center justify-center gap-6 mx-6">
                            {translate.slice(0, 2).map((item, index) => (
                                <div
                                    key={index}
                                    className="bg-white p-6 rounded-2xl flex flex-col shadow-md"
                                >
                                    <div className="flex items-center mb-4">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-12 h-12 rounded-full object-cover"
                                        />
                                        <div className="ml-4">
                                            <h4 className="text-base font-medium mb-1">{item.name}</h4>
                                            <span className="bg-[#3377FF] text-sm text-white px-4 py-1 rounded-full">
                                                {item.class}
                                            </span>
                                        </div>
                                    </div>
                                    <p className="text-lg text-[#252525] font-[400] mt-2">
                                        {item.testi}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Column 2: 3 Cards */}
                        <div className="flex flex-col w-1/2 gap-6 mx-6">
                            {translate.slice(2).map((item, index) => (
                                <div
                                    key={index}
                                    className="bg-white p-6 rounded-2xl flex flex-col shadow-md"
                                >
                                    <div className="flex items-center mb-4">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-12 h-12 rounded-full object-cover"
                                        />
                                        <div className="ml-4">
                                            <h4 className="text-base font-medium mb-1">{item.name}</h4>
                                            <span className="bg-[#3377FF] text-sm text-white px-4 py-1 rounded-full">
                                                {item.class}
                                            </span>
                                        </div>
                                    </div>
                                    <p className="text-lg text-[#252525] font-[400] mt-2">
                                        {item.testi}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Testimony;
