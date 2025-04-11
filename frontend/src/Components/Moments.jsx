import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";

const Gallery = ({ text }) => {
    const [activeSlide, setActiveSlide] = React.useState(0);
    const [galleryData, setGalleryData] = useState([]); // State untuk menyimpan data dari API/sumber
    const { data, langs } = useSelector((state) => state.LangReducer);
    

    const settings = {
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
                }
            }
        ],
    };

    useEffect(() => {
        const fetchData = () => {
            const images = [
                {
                    image: "/assets/gallery/Assist the teacher to make a video of the teaching competition.jpeg",
                    activity: {
                        english: "Assist the teacher to make a video of the teaching competition",
                        indonesia: "Membantu guru membuat video untuk lomba mengajar",
                    },
                },
                {
                    image: "/assets/gallery/Campaign Indonesian batik in Campus.jpeg",
                    activity: {
                        english: "Campaign Indonesian batik in Campus",
                        indonesia: "Kampanye batik Indonesia di kampus",
                    },
                },
                {
                    image: "/assets/gallery/Celebrating Chinese Day at the campus library.jpeg",
                    activity: {
                        english: "Celebrating Chinese Day at the campus library",
                        indonesia: "Merayakan Hari Bahasa Mandarin di perpustakaan kampus",
                    },
                },
                {
                    image: "/assets/gallery/Chinese Speech Contest.jpg",
                    activity: {
                        english: "Chinese Speech Contest",
                        indonesia: "Lomba pidato bahasa Mandarin",
                    },
                },
                {
                    image: "/assets/gallery/Chinese Writing Competition.jpg",
                    activity: {
                        english: "Chinese Writing Competition",
                        indonesia: "Lomba menulis bahasa Mandarin",
                    },
                },
                {
                    image: "/assets/gallery/International Culture Festival.jpeg",
                    activity: {
                        english: "International Culture Festival",
                        indonesia: "Festival budaya internasional",
                    },
                },
                {
                    image: "/assets/gallery/International student and teacher performance at Chinese New Year event.jpeg",
                    activity: {
                        english: "International student and teacher performance at Chinese New Year event",
                        indonesia: "Penampilan mahasiswa dan guru internasional di acara Tahun Baru China",
                    },
                },
                {
                    image: "/assets/gallery/Jiangsu Intercultural Competence Competition.jpeg",
                    activity: {
                        english: "Jiangsu Intercultural Competence Competition",
                        indonesia: "Kompetisi kemampuan lintas budaya Jiangsu",
                    },
                },
                {
                    image: "/assets/gallery/Opening ceremony for international students.jpeg",
                    activity: {
                        english: "Opening ceremony for international students",
                        indonesia: "Upacara pembukaan untuk mahasiswa internasional",
                    },
                },
                {
                    image: "/assets/gallery/International Chinese Language Day.jpeg",
                    activity: {
                        english: "International Chinese Language Day",
                        indonesia: "Hari Bahasa Mandarin Internasional",
                    },
                },

                {
                    image: "/assets/gallery/Chinese Corner Language Department Academic Affairs Department NUIST.jpeg",
                    activity: {
                        english: "Chinese Corner Language Department Academic Affairs Department NUIST",
                        indonesia: "Sudut Bahasa Cina Departemen Bahasa Departemen Akademik NUIST",
                    },
                },
                {
                    image: "/assets/gallery/English Teaching Volunteer by NUIST.jpeg",
                    activity: {
                        english: "English Teaching Volunteer by NUIST",
                        indonesia: "Relawan Pengajaran Bahasa Inggris oleh NUIST",
                    },
                },
                {
                    image: "/assets/gallery/Volunteering to School by NUIST.jpeg",
                    activity: {
                        english: "Volunteering to School by NUIST",
                        indonesia: "Relawan ke Sekolah oleh NUIST",
                    },
                },
                {
                    image: "/assets/gallery/Welcoming Indonesia Freshmen PPIT Nanjing.jpeg",
                    activity: {
                        english: "Welcoming Indonesia Freshmen PPIT Nanjing",
                        indonesia: "Menyambut Mahasiswa Baru Indonesia PPIT Nanjing",
                    },
                },
                {
                    image: "/assets/gallery/World Aids Day Domestic Affairs Department NUIST.jpeg",
                    activity: {
                        english: "World Aids Day Domestic Affairs Department NUIST",
                        indonesia: "Hari AIDS Sedunia Departemen Dalam Negeri NUIST",
                    },
                },
                
            ];
            setGalleryData(images);
        };

        fetchData();
    }, []);

    return (
        <div className="w-full mx-auto py-16 pb-28 px-5 md:px-0">
            <div className="text-center flex flex-col items-center mb-10">
                <h1 className="text-2xl w-full capitalize font-semibold text-[#02264A] md:text-3xl lg:w-9/12 lg:text-4xl">
                    {langs ? 'Documentation of Indonesian Students and International Students in China' : 'Dokumentasi Pelajar Indonesia dan Pelajar Internasional di Tiongkok'}
                </h1>
            </div>
            <div className="h-full max-h-[440px]">
                <Slider {...settings} className="rounded-xl overflow-hidden h-full">
                    {galleryData.map((item, index) => (
                        <div
                            key={index}
                            className={`relative transition-transform duration-1000 px-8 my-12 ${
                                activeSlide === index ? "z-10 scale-110" : "z-0 scale-95"
                            }`}
                        >
                            <img
                                src={item.image}
                                alt={`Gallery ${index + 1}`}
                                className="w-full h-[440px] object-cover rounded-xl cursor-pointer"
                                draggable="false"
                            />
                            {activeSlide === index && (
                                <div className="absolute left-8 cursor-pointer inset-0 w-[93%] h-full bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-xl">
                                    <span className="text-white text-center text-2xl font-semibold px-4">
                                        {langs ? item.activity.english : item.activity.indonesia}
                                    </span>
                                </div>
                            )}
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default Gallery;
