import React, { useState, useEffect } from "react";
import Mainlayouts from "../Layouts/MainLayouts";
import { useDispatch, useSelector } from "react-redux";
import { getClass } from "../Store/Action/getAllDatas";
import CardClasses from "../Components/CardClass";
import { Row, Col } from "antd";
import Slider from "react-slick";
import { Rate } from "antd";

const Catalog = () => {
  const [filter, setFilter] = useState("");
  const { data, langs } = useSelector((state) => state.LangReducer);

  const dummyClasses =[
    {
        title: "Mandarin Class Juara Next Level",
        price: "699.000",
        bnefits: [
            "HSK 1 - HSK 4 exam simulation",
            "Private Class (1 Student/class)",
            "Access to PDF, PPT, Video and Audio Learning",
            "Free e-Flashcard HSK 1 - HSK 4 + Hanzi Practiced Book",
            "Duration: 5 months (40 sessions)"
        ]

    },
    {
        title: "Mandarin Class Juara",
        price: "699.000",
        bnefits: [
            "HSK 1 - HSK 4 exam simulation",
            "Mini Group (3 - 5 Students)",
            "Access to PDF, PPT, Video and Audio Learning",
            "Free e-Flashcard HSK 1 - HSK 4 + Hanzi Practiced Book",
            "Duration: 5 months (40 sessions)"
        ]

    },
    {
        title: "General Basic Mandarin Class",
        price: "699.000",
        bnefits: [
            "Best for beginners",
            "Mini Group (5 - 10 Student)",
            "Access to PDF, PPT, Video and Audio Learning",
            "Free Hanzi Practiced Book",
            "Duration: 1 months (8 sessions)"
        ]

    },
    {
        title: "Mandarin Class Native",
        price: "Soon",
        bnefits: [
            "HSK 1 - HSK 5 exam simulation",
            "Access to PDF, PPT, Video and Audio Learning",
            "Free e-Flashcard HSK 1 - HSK 4 + Hanzi Practiced Book",
            "Duration: Soon"
        ]

    },
  ];

  const products = [
    {
        title: "Hanzi Practice Book",
        price: "24.999",
        star: 4,
        image: "/assets/product1.png",
    },
    {
        title: "E-Flashcard HSK 1",
        price: "249.000",
        star: 4,
        image: "/assets/product2.png",
    },
    {
        title: "E-Flashcard HSK 2",
        price: "349.000",
        star: 4,
        image: "/assets/product2.png",
    },
    {
        title: "E-Flashcard HSK 3",
        price: "549.000",
        star: 4,
        image: "/assets/product2.png",
    },
    {
        title: "E-Flashcard HSK 4",
        price: "799.000",
        star: 4,
        image: "/assets/product2.png",
    },
    {
        title: "E-Flashcard HSK 5",
        price: "1.299.000",
        star: 4,
        image: "/assets/product2.png",
    },
    {
        title: "Comprehensive Chinese Book Level 1",
        price: "299.000",
        star: 4,
        image: "/assets/producta.png",
    },
    {
        title: "Comprehensive Chinese Book Level 2",
        price: "499.000",
        star: 4,
        image: "/assets/producta.png",
    },
    {
        title: "Comprehensive Chinese Book Level 3",
        price: "599.000",
        star: 4,
        image: "/assets/producta.png",
    },
    {
        title: "Comprehensive Chinese Book Level 4",
        price: "599.000",
        star: 4,
        image: "/assets/producta.png",
    },
    {
        title: "Comprehensive Chinese Book Level 5",
        price: "1.499.000",
        star: 4,
        image: "/assets/producta.png",
    },
  ];

  const scholarship = [
    {
      title: "Mentor Scholarship Group",
      price: "3.499.000",
      bnefits: [
          "Group chat with mentors to share information and experiences.",
          "5 consultations, including 2 meetings via Zoom Meeting.",
          "Personalized guidance on applying for scholarships in China.",
      ]
    },
    {
        title: "Mandarin Class Juara",
        price: "4.999.000",
        bnefits: [
            "Your scholarship application will be fully supported by Active Mandarin Indonesia's Education Consultant.",
            "Consultation with mentors to develop a study plan or other personal documents.",
            "Complete information and updates on the application process until acceptance.",
        ]
    },
  ];

  const degree = [
    {
      title: "Non-Degree Program",
      price: "3.499.000",
      bnefits: [
          "Enjoy a hands-on Mandarin learning experience in Nanjing while exploring the unique Chinese culture. Sample must-try street food specialties and experience the authentic atmosphere of this historic city! In addition to learning the language, you'll make valuable international connections and expand your future opportunities. Only this program combines intensive learning with exciting adventure!",
      ]
    },
    {
        title: "Degree Program D3-S3",
        price: "4.999.000",
        bnefits: [
            "Private group chat for exclusive information and advice.",
            "1 on 1 consultation for personalized guidance on your academic and scholarship needs.",
            "Guide your entire university application process in China to meet the target university's standards.",
        ]
    },
  ];

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

  const { classes = [] } = useSelector((state) => state.classReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getClass());
  }, [dispatch]);

  const category = ["All", "Mandarin", "Taiwan"];

  const filteredClasses =
    filter === "All"
      ? dummyClasses
      : dummyClasses.filter((item) => item.title.includes(filter));

  return (
    <Mainlayouts>
      <div className="container mx-auto px-5">
        <div className="py-10">
          <h2 className="text-2xl md:text-3xl font-bold text-[#02264A] mb-6">
            {langs ? "Suggested Class" : "Kelas Yang Di Sarankan"}
          </h2>
          <div className="w-full flex flex-col justify-center items-center">
            {dummyClasses.map((item, index) => (
              <div key={index} className="flex flex-col w-9/12 mb-6">
                <CardClasses data={item} />
              </div>
            ))}
          </div>
        </div>

        <div className="pt-10 pb-1">
          <Row gutter={[32, 32]} align="middle">
            <Col xs={24} md={12}>
              <h2 className="text-2xl md:text-3xl font-bold text-[#02264A] mb-6">
                {langs ? "Class Catalog" : "Katalog Kelas"}
              </h2>
              <span className="font-light">
                {langs
                  ? "Find the premium class and opportunities along the way"
                  : "Temukan kelas premium dan peluang di sepanjang jalan"}
              </span>
            </Col>
            <div className="w-full my-8">
                <Slider {...settings}>
                  {products.map((item, index) => (
                      <div key={index} className="p-0"> {/* Hilangkan padding horizontal */}
                          <div className="bg-white w-8/12 mx-auto rounded-2xl shadow-lg flex flex-col h-auto my-4">
                              {/* Gambar Produk */}
                              <img
                                  src={item.image}
                                  alt={item.title}
                                  className="w-full h-auto object-contain"
                              />
                              <div className="flex flex-col justify-start items-start px-4 py-5">
                                  <h2 className="text-lg font-semibold text-gray-800 mb-2">
                                      {item.title}
                                  </h2>
                                  <p className="font-semibold text-lg mb-2">
                                      Rp {item.price}<span className="font-light text-sm ml-1">/Item</span>
                                  </p>
                                  <span className="flex items-center">
                                      <Rate disabled defaultValue={item.star} />
                                      <h2 className="ml-3 mt-1 text-base">(138)</h2>
                                  </span>
                              </div>
                          </div>
                      </div>
                  ))}
                </Slider>
            </div>
          </Row>
          
          <div className="py-10">
            <h2 className="text-2xl md:text-3xl font-bold text-[#02264A] mb-6">
              {langs ? "Suggested Class" : "Kelas Yang Di Sarankan"}
            </h2>
            <div className="w-full flex flex-col justify-center items-center">
              {scholarship.map((item, index) => (
                <div key={index} className="flex flex-col w-9/12 mb-6">
                  <CardClasses data={item} />
                </div>
              ))}
            </div>
          </div>

          <div className="py-10">
            <h2 className="text-2xl md:text-3xl font-bold text-[#02264A] mb-6">
              {langs ? "Suggested Class" : "Kelas Yang Di Sarankan"}
            </h2>
            <div className="w-full flex flex-col justify-center items-center">
              {degree.map((item, index) => (
                <div key={index} className="flex flex-col w-9/12 mb-6">
                  <CardClasses data={item} />
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
