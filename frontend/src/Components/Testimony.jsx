import React, { useMemo } from "react";
import Slider from "react-slick";
import { FaWhatsapp } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Testimony = ({ text }) => {
  const { data, langs } = useSelector((state) => state.LangReducer);

  const testimonies = useMemo(() => ({
    english: [
      {
        name: "Susanty",
        image: "/assets/testi/Susanty.jpg",
        class: "Mandarin Juara",
        title: "Easy to understand",
        testi: "Great learning experience with patient teachers, starting from the basics—even for those with prior knowledge! ✅️👍",
      },
      {
        name: "Satrial Iip",
        image: "/assets/testi/Satrial.jpeg",
        class: "Mandarin Juara",
        title: "Comprehensive Materials & Expert Tutors",
        testi: "Active Mandarin Indonesia provides a premium learning experience with comprehensive materials, expert tutors, and advanced audio-visual support for effective and enjoyable Mandarin mastery.",
      },
      {
        name: "Asyrofuddin Fadhlullah",
        image: "/assets/testi/Asyrofuddin Fadhlullah.PNG",
        class: "Mandarin Juara",
        title: "High Quality tutors & learning satisfaction",
        testi: "I am very satisfied learning at Mandarin Juara because the tutors are friendly, communicative, experienced, and helpful.",
      },
      {
        name: "Muhammad Thariq Al-Fathir",
        image: "/assets/testi/Muhammad Thariq Al-Fathir .jpg",
        class: "Mandarin Juara",
        title: "Improve My Mandarin Skill From Zero",
        testi: "Active Mandarin Indonesia has greatly helped me improve my Mandarin skills from zero, thanks to the guidance of excellent mentors.",
      },
      {
        name: "Indah Zuhrotul Firdaus",
        image: "/assets/testi/Indah Zuhrotul Firdaus.jpg",
        class: "Mandarin Juara",
        title: "Flexible & Practical Learning",
        testi: "The lessons are designed to fit into a busy schedule, making language learning more accessible.",
      },
      {
        name: "Muh. Awalun Nur Rahmat",
        image: "/assets/testi/Muh. Awalun Nur Rahamt.jpg",
        class: "Mandarin Juara",
        title: "Enhances Knowledge & Skills",
        testi: "A great way to improve language proficiency and master Mandarin effectively.",
      },
      {
        name: "Iqbal Oka Prasetyo",
        image: "/assets/testi/Oka.jpg",
        class: "Mandarin Juara",
        title: "Practical & confidence-boosting",
        testi: "Mandarin Juara Class is very helpful for studying in China. The practical materials make daily and academic communication easier and more confident. Highly recommended!",
      },
      {
        name: "Wahyoe Rhetno Dhewati",
        image: "/assets/testi/Wahyoe Rhetno D. .jpg",
        class: "Mandarin Juara",
        title: "Fun & effective learning",
        testi: "Learning Mandarin at Active Mandarin Indonesia is super fun! The tutors are chill, helpful, and make everything easy to understand. Best decision ever!",
      },
      {
        name: "Roekhanatunnajwa",
        image: "/assets/testi/Roekhanatunnajwa.jpg",
        class: "Mandarin Juara",
        title: "Effective learning guidance",
        testi: " I struggled to find a Mandarin tutor, but Active Mandarin truly helped! As a beginner, I’ve improved a lot. The interactive tutors make learning super fun. Thank you, Active Mandarin!",
      },
    ],
    indonesia: [
      {
        name: "Susanty",
        image: "/assets/testi/Susanty.jpg",
        class: "Mandarin Juara",
        title: "Mudah dipahami",
        testi: "Pengalaman belajar yang luar biasa dengan pengajar yang sabar, dimulai dari dasar—bahkan untuk yang sudah memiliki pengetahuan sebelumnya! ✅️👍",
      },
      {
        name: "Satrial Iip",
        image: "/assets/testi/Satrial.jpeg",
        class: "Mandarin Juara",
        title: "Materi Lengkap & Tutor Ahli",
        testi: "Active Mandarin Indonesia memberikan pengalaman belajar premium dengan materi lengkap, tutor ahli, dan dukungan audio-visual canggih untuk penguasaan Mandarin yang efektif dan menyenangkan.",
      },
      {
        name: "Asyrofuddin Fadhlullah",
        image: "/assets/testi/Asyrofuddin Fadhlullah.PNG",
        class: "Mandarin Juara",
        title: "Tutor Berkualitas & Kepuasan Belajar",
        testi: "Saya sangat puas belajar di Mandarin Juara karena tutornya ramah, komunikatif, berpengalaman, dan sangat membantu.",
      },
      {
        name: "Muhammad Thariq Al-Fathir",
        image: "/assets/testi/Muhammad Thariq Al-Fathir .jpg",
        class: "Mandarin Juara",
        title: "Meningkatkan Kemampuan Mandarin dari Nol",
        testi: "Active Mandarin Indonesia sangat membantu saya meningkatkan kemampuan Mandarin dari nol, berkat bimbingan mentor yang luar biasa.",
      },
      {
        name: "Indah Zuhrotul Firdaus",
        image: "/assets/testi/Indah Zuhrotul Firdaus.jpg",
        class: "Mandarin Juara",
        title: "Belajar Fleksibel & Praktis",
        testi: "Pelajaran dirancang agar sesuai dengan jadwal yang padat, membuat pembelajaran bahasa lebih mudah diakses.",
      },
      {
        name: "Muh. Awalun Nur Rahmat",
        image: "/assets/testi/Muh. Awalun Nur Rahamt.jpg",
        class: "Mandarin Juara",
        title: "Meningkatkan Pengetahuan & Keterampilan",
        testi: "Cara yang bagus untuk meningkatkan kemampuan bahasa dan menguasai Mandarin secara efektif.",
      },
      {
        name: "Iqbal Oka Prasetyo",
        image: "/assets/testi/Oka.jpg",
        class: "Mandarin Juara",
        title: "Praktis & Meningkatkan Kepercayaan Diri",
        testi: "Kelas Mandarin Juara sangat membantu untuk belajar di China. Materi yang praktis membuat komunikasi sehari-hari dan akademik lebih mudah dan percaya diri. Sangat direkomendasikan!",
      },
      {
        name: "Wahyoe Rhetno Dhewati",
        image: "/assets/testi/Wahyoe Rhetno D. .jpg",
        class: "Mandarin Juara",
        title: "Belajar yang Menyenangkan & Efektif",
        testi: "Belajar Mandarin di Active Mandarin Indonesia sangat menyenangkan! Tutornya santai, membantu, dan membuat semuanya mudah dipahami. Keputusan terbaik!",
      },
      {
        name: "Roekhanatunnajwa",
        image: "/assets/testi/Roekhanatunnajwa.jpg",
        class: "Mandarin Juara",
        title: "Panduan Belajar yang Efektif",
        testi: "Saya kesulitan mencari tutor Mandarin, tetapi Active Mandarin benar-benar membantu! Sebagai pemula, saya sudah banyak berkembang. Tutor interaktif membuat belajar sangat menyenangkan. Terima kasih, Active Mandarin!",
      },
    ],
  }), []);

  const translate = useMemo(() => langs ? testimonies?.english : testimonies?.indonesia, [langs]);

  const testiFirstHalf = useMemo(() => translate.slice(0, translate.length / 2), [translate]);
  const testiSecondHalf = useMemo(() => translate.slice(translate.length / 2, translate.length), [translate]);

  return (
    <div
      className="bg-[#02264A]"
      style={{
        backgroundImage: "url('/assets/texture-card-big.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container mx-auto relative px-5 md:px-16 overflow-hidden flex flex-col justify-between items-center gap-11 lg:flex-row">
        {/* Kiri */}
        <div className="flex flex-col items-center justify-center gap-8 w-[400px] lg:w-[280px] xl:w-[400px] py-12 md:flex-row lg:flex-col lg:gap-0">
          <img
            src="/assets/community.png"
            className="w-full"
            alt="contact"
          />
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-[32px] font-semibold text-white mb-4 mt-8">
              {langs ? 'Join Our Growing Community' : 'Bergabunglah dengan Komunitas Kami yang Berkembang'}
            </h2>
            <div className="flex justify-start items-start w-full gap-6">
              <Link
                className="bg-[#FFCC00] px-4 py-4 xl:px-8 2xl:py-5 rounded-2xl lg:rounded-3xl flex items-center w-full justify-center"
                to="https://chat.whatsapp.com/FSQGLGPJjruKlhYueXz83K"
                target="_blank"
              >
                {langs ? "Join Now" : "Gabung Sekarang"}
              </Link>
            </div>
          </div>
        </div>

        <div className="h-80 lg:h-0"></div>

        <div className="flex-col gap-4 hidden absolute bottom-0 right-5 xl:flex md:right-16">
          <div className="flex flex-col gap-4 h-max animate-scroll-vertical-infinite-reverse-50">
            {testiFirstHalf?.map((item, index) => (
              <div key={index} className="h-auto w-[346px]">
                <div className="bg-white p-4 rounded-2xl flex flex-col shadow-md h-full">
                  <div className="flex items-center mb-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="ml-4">
                      <h4 className="text-base font-medium mb-1">
                        {item.name}
                      </h4>
                      <span className="bg-[#3377FF] text-sm text-white px-4 py-1 rounded-full">
                        {item.class}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm xl:text-base text-[#252525] font-[400] mt-2">
                    {item.testi}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-4 h-max animate-scroll-vertical-infinite-reverse-50">
            {testiFirstHalf?.map((item, index) => (
              <div key={index} className="h-auto w-[346px]">
                <div className="bg-white p-4 rounded-2xl flex flex-col shadow-md h-full">
                  <div className="flex items-center mb-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="ml-4">
                      <h4 className="text-base font-medium mb-1">
                        {item.name}
                      </h4>
                      <span className="bg-[#3377FF] text-sm text-white px-4 py-1 rounded-full">
                        {item.class}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm xl:text-base text-[#252525] font-[400] mt-2">
                    {item.testi}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-4 h-max animate-scroll-vertical-infinite-reverse-50">
            {testiFirstHalf?.map((item, index) => (
              <div key={index} className="h-auto w-[346px]">
                <div className="bg-white p-4 rounded-2xl flex flex-col shadow-md h-full">
                  <div className="flex items-center mb-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="ml-4">
                      <h4 className="text-base font-medium mb-1">
                        {item.name}
                      </h4>
                      <span className="bg-[#3377FF] text-sm text-white px-4 py-1 rounded-full">
                        {item.class}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm xl:text-base text-[#252525] font-[400] mt-2">
                    {item.testi}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-col gap-4 hidden absolute bottom-0 right-[180px] xl:flex xl:right-[426px]">
          <div className="flex flex-col gap-4 h-max animate-scroll-vertical-infinite-50">
            {testiSecondHalf?.map((item, index) => (
              <div key={index} className="h-auto w-[346px]">
                <div className="bg-white p-4 rounded-2xl flex flex-col shadow-md h-full">
                  <div className="flex items-center mb-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="ml-4">
                      <h4 className="text-base font-medium mb-1">
                        {item.name}
                      </h4>
                      <span className="bg-[#3377FF] text-sm text-white px-4 py-1 rounded-full">
                        {item.class}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm xl:text-base text-[#252525] font-[400] mt-2">
                    {item.testi}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-4 h-max animate-scroll-vertical-infinite-50">
            {testiSecondHalf?.map((item, index) => (
              <div key={index} className="h-auto w-[346px]">
                <div className="bg-white p-4 rounded-2xl flex flex-col shadow-md h-full">
                  <div className="flex items-center mb-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="ml-4">
                      <h4 className="text-base font-medium mb-1">
                        {item.name}
                      </h4>
                      <span className="bg-[#3377FF] text-sm text-white px-4 py-1 rounded-full">
                        {item.class}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm xl:text-base text-[#252525] font-[400] mt-2">
                    {item.testi}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-4 h-max animate-scroll-vertical-infinite-50">
            {testiSecondHalf?.map((item, index) => (
              <div key={index} className="h-auto w-[346px]">
                <div className="bg-white p-4 rounded-2xl flex flex-col shadow-md h-full">
                  <div className="flex items-center mb-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="ml-4">
                      <h4 className="text-base font-medium mb-1">
                        {item.name}
                      </h4>
                      <span className="bg-[#3377FF] text-sm text-white px-4 py-1 rounded-full">
                        {item.class}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm xl:text-base text-[#252525] font-[400] mt-2">
                    {item.testi}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-col gap-4 hidden absolute bottom-0 right-[180px] lg:flex xl:hidden">
          <div className="flex flex-col gap-4 h-max animate-scroll-vertical-infinite-50">
            {translate?.map((item, index) => (
              <div key={index} className="h-auto w-[346px]">
                <div className="bg-white p-4 rounded-2xl flex flex-col shadow-md h-full">
                  <div className="flex items-center mb-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="ml-4">
                      <h4 className="text-base font-medium mb-1">
                        {item.name}
                      </h4>
                      <span className="bg-[#3377FF] text-sm text-white px-4 py-1 rounded-full">
                        {item.class}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm xl:text-base text-[#252525] font-[400] mt-2">
                    {item.testi}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-4 h-max animate-scroll-vertical-infinite-50">
            {translate?.map((item, index) => (
              <div key={index} className="h-auto w-[346px]">
                <div className="bg-white p-4 rounded-2xl flex flex-col shadow-md h-full">
                  <div className="flex items-center mb-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="ml-4">
                      <h4 className="text-base font-medium mb-1">
                        {item.name}
                      </h4>
                      <span className="bg-[#3377FF] text-sm text-white px-4 py-1 rounded-full">
                        {item.class}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm xl:text-base text-[#252525] font-[400] mt-2">
                    {item.testi}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-4 h-max animate-scroll-vertical-infinite-50">
            {translate?.map((item, index) => (
              <div key={index} className="h-auto w-[346px]">
                <div className="bg-white p-4 rounded-2xl flex flex-col shadow-md h-full">
                  <div className="flex items-center mb-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="ml-4">
                      <h4 className="text-base font-medium mb-1">
                        {item.name}
                      </h4>
                      <span className="bg-[#3377FF] text-sm text-white px-4 py-1 rounded-full">
                        {item.class}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm xl:text-base text-[#252525] font-[400] mt-2">
                    {item.testi}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-row gap-4 absolute right-0 bottom-20 md:bottom-20 lg:hidden">
          <div className="flex gap-4 w-max animate-scroll-horizontal-infinite-reverse-50">
            {translate?.map((item, index) => (
              <div key={index} className="h-auto w-[346px]">
                <div className="bg-white p-4 rounded-2xl flex flex-col shadow-md h-full">
                  <div className="flex items-center mb-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="ml-4">
                      <h4 className="text-base font-medium mb-1">
                        {item.name}
                      </h4>
                      <span className="bg-[#3377FF] text-sm text-white px-4 py-1 rounded-full">
                        {item.class}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm xl:text-base text-[#252525] font-[400] mt-2">
                    {item.testi}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-4 w-max animate-scroll-horizontal-infinite-reverse-50">
            {translate?.map((item, index) => (
              <div key={index} className="h-auto w-[346px]">
                <div className="bg-white p-4 rounded-2xl flex flex-col shadow-md h-full">
                  <div className="flex items-center mb-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="ml-4">
                      <h4 className="text-base font-medium mb-1">
                        {item.name}
                      </h4>
                      <span className="bg-[#3377FF] text-sm text-white px-4 py-1 rounded-full">
                        {item.class}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm xl:text-base text-[#252525] font-[400] mt-2">
                    {item.testi}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* <div className="w-full h-full mt-8 block lg:hidden">
          <Slider {...settings} className="w-full">
            {translate.map((item, index) => (
              <div key={index} className="h-full px-2">
                <div className="bg-white p-4 rounded-2xl flex flex-col shadow-md h-full">
                  <div className="flex items-center mb-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="ml-4">
                      <h4 className="text-base font-medium mb-1">
                        {item.name}
                      </h4>
                      <span className="bg-[#3377FF] text-sm text-white px-4 py-1 rounded-full">
                        {item.class}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm xl:text-base text-[#252525] font-[400] mt-2">
                    {item.testi}
                  </p>
                </div>
              </div>
            ))}
          </Slider>
        </div> */}

        {/* <div className="w-full max-w-[712px] hidden gap-4 lg:flex">
          <div className="flex flex-col w-1/2 h-auto items-center justify-center gap-6">
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
                    <h4 className="text-base font-medium mb-1">
                      {item.name}
                    </h4>
                    <span className="bg-[#3377FF] text-sm text-white px-4 py-1 rounded-full">
                      {item.class}
                    </span>
                  </div>
                </div>
                <p className="text-sm xl:text-base text-[#252525] font-[400] mt-2">
                  {item.testi}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-col w-1/2 gap-6">
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
                    <h4 className="text-base font-medium mb-1">
                      {item.name}
                    </h4>
                    <span className="bg-[#3377FF] text-sm text-white px-4 py-1 rounded-full">
                      {item.class}
                    </span>
                  </div>
                </div>
                <p className="text-sm xl:text-base text-[#252525] font-[400] mt-2">
                  {item.testi}
                </p>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Testimony;
