import React, { useState, useEffect, useMemo, useRef } from "react";
import Slider from "react-slick";
import { Rate, Modal, Button } from "antd";
import { useSelector } from "react-redux";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

const Products = ({ text }) => {
  const { data, langs } = useSelector((state) => state.LangReducer);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({});
  let sliderRef = useRef(null);

  const products = useMemo(() => ({
    english: [
      {
        title: "Hanzi Grid Notebook",
        price: "24.999",
        star: 4,
        image: "/assets/product1.png",
        desc: "Hanzi Grid Notebook: The best partner to practice your Mandarin character writing skills! Designed with special grids, this notebook helps you refine your Hanzi writing technique to be neat and proportional. Suitable for beginners to advanced learners, start your Mandarin learning journey in a more structured and enjoyable way!",
        product_detail: [
          "1 Book: Rp. 24,999",
          "3 Books: Rp. 64,999",
          "5 Books: Rp. 99,999",
        ],
      },
      {
        title: "E-Flashcard HSK 1",
        price: "100.000",
        star: 4,
        image: "/assets/product2.png",
        desc: "Want to master Mandarin in a fun and effective way? Our HSK Flashcards are here to be your best companion in learning Mandarin vocabulary. With an enjoyable and practical method, learning becomes easier and helps you achieve Mandarin fluency faster than you imagined!",
        product_detail: [
          "HSK 1: Rp. 100,000",
          "HSK 2: Rp. 120,000",
          "HSK 3: Rp. 150,000",
          "HSK 4: Rp. 200,000",
          "HSK 5: Rp. 300,000",
        ],
      },
      {
        title: "E-Flashcard HSK 2",
        price: "120.000",
        star: 4,
        image: "/assets/product2.png",
        desc: "Want to master Mandarin in a fun and effective way? Our HSK Flashcards are here to be your best companion in learning Mandarin vocabulary. With an enjoyable and practical method, learning becomes easier and helps you achieve Mandarin fluency faster than you imagined!",
        product_detail: [
          "HSK 1: Rp. 100,000",
          "HSK 2: Rp. 120,000",
          "HSK 3: Rp. 150,000",
          "HSK 4: Rp. 200,000",
          "HSK 5: Rp. 300,000",
        ],
      },
      {
        title: "E-Flashcard HSK 3",
        price: "150.000",
        star: 4,
        image: "/assets/product2.png",
        desc: "Want to master Mandarin in a fun and effective way? Our HSK Flashcards are here to be your best companion in learning Mandarin vocabulary. With an enjoyable and practical method, learning becomes easier and helps you achieve Mandarin fluency faster than you imagined!",
        product_detail: [
          "HSK 1: Rp. 100,000",
          "HSK 2: Rp. 120,000",
          "HSK 3: Rp. 150,000",
          "HSK 4: Rp. 200,000",
          "HSK 5: Rp. 300,000",
        ],
      },
      {
        title: "E-Flashcard HSK 4",
        price: "200.000",
        star: 4,
        image: "/assets/product2.png",
        desc: "Want to master Mandarin in a fun and effective way? Our HSK Flashcards are here to be your best companion in learning Mandarin vocabulary. With an enjoyable and practical method, learning becomes easier and helps you achieve Mandarin fluency faster than you imagined!",
        product_detail: [
          "HSK 1: Rp. 100,000",
          "HSK 2: Rp. 120,000",
          "HSK 3: Rp. 150,000",
          "HSK 4: Rp. 200,000",
          "HSK 5: Rp. 300,000",
        ],
      },
      {
        title: "E-Flashcard HSK 5",
        price: "300.000",
        star: 4,
        image: "/assets/product2.png",
        desc: "Want to master Mandarin in a fun and effective way? Our HSK Flashcards are here to be your best companion in learning Mandarin vocabulary. With an enjoyable and practical method, learning becomes easier and helps you achieve Mandarin fluency faster than you imagined!",
        product_detail: [
          "HSK 1: Rp. 100,000",
          "HSK 2: Rp. 120,000",
          "HSK 3: Rp. 150,000",
          "HSK 4: Rp. 200,000",
          "HSK 5: Rp. 300,000",
        ],
      },
      {
        title: "Comprehensive Chinese E-Book Level 1",
        price: "50.000",
        star: 4,
        image: "/assets/comprensive.png",
        desc: "Explore a variety of interesting Mandarin vocabulary in our book collection, ranging from HSK 1 to HSK 5. Each book is designed to support your learning with interactive practice questions and simple grammar explanations, making it easy to understand. Start your exciting learning journey with Comprehensive Chinese Book and experience satisfying progress!",
        product_detail: [
          "Level 1: Rp. 50,000",
          "Level 2: Rp. 70,000",
          "Level 3: Rp. 100,000",
          "Level 4: Rp. 150,000",
          "Level 5: Rp. 200,000",
        ],
      },
      {
        title: "Comprehensive Chinese E-Book Level 2",
        price: "70.000",
        star: 4,
        image: "/assets/comprensive.png",
        desc: "Explore a variety of interesting Mandarin vocabulary in our book collection, ranging from HSK 1 to HSK 5. Each book is designed to support your learning with interactive practice questions and simple grammar explanations, making it easy to understand. Start your exciting learning journey with Comprehensive Chinese Book and experience satisfying progress!",
        product_detail: [
          "Level 1: Rp. 50,000",
          "Level 2: Rp. 70,000",
          "Level 3: Rp. 100,000",
          "Level 4: Rp. 150,000",
          "Level 5: Rp. 200,000",
        ],
      },
      {
        title: "Comprehensive Chinese E-Book Level 3",
        price: "100.000",
        star: 4,
        image: "/assets/comprensive.png",
        desc: "Explore a variety of interesting Mandarin vocabulary in our book collection, ranging from HSK 1 to HSK 5. Each book is designed to support your learning with interactive practice questions and simple grammar explanations, making it easy to understand. Start your exciting learning journey with Comprehensive Chinese Book and experience satisfying progress!",
        product_detail: [
          "Level 1: Rp. 50,000",
          "Level 2: Rp. 70,000",
          "Level 3: Rp. 100,000",
          "Level 4: Rp. 150,000",
          "Level 5: Rp. 200,000",
        ],
      },
      {
        title: "Comprehensive Chinese E-Book Level 4",
        price: "150.000",
        star: 4,
        image: "/assets/comprensive.png",
        desc: "Explore a variety of interesting Mandarin vocabulary in our book collection, ranging from HSK 1 to HSK 5. Each book is designed to support your learning with interactive practice questions and simple grammar explanations, making it easy to understand. Start your exciting learning journey with Comprehensive Chinese Book and experience satisfying progress!",
        product_detail: [
          "Level 1: Rp. 50,000",
          "Level 2: Rp. 70,000",
          "Level 3: Rp. 100,000",
          "Level 4: Rp. 150,000",
          "Level 5: Rp. 200,000",
        ],
      },
      {
        title: "Comprehensive Chinese E-Book Level 5",
        price: "200.000",
        star: 4,
        image: "/assets/comprensive.png",
        desc: "Explore a variety of interesting Mandarin vocabulary in our book collection, ranging from HSK 1 to HSK 5. Each book is designed to support your learning with interactive practice questions and simple grammar explanations, making it easy to understand. Start your exciting learning journey with Comprehensive Chinese Book and experience satisfying progress!",
        product_detail: [
          "Level 1: Rp. 50,000",
          "Level 2: Rp. 70,000",
          "Level 3: Rp. 100,000",
          "Level 4: Rp. 150,000",
          "Level 5: Rp. 200,000",
        ],
      },
    ],
    indonesia: [
      {
        title: "Buku Tulis Kotak Kotak Hanzi",
        price: "24.999",
        star: 4,
        image: "/assets/product1.png",
        desc: "Buku Kotak-Kotak Hanzi: Partner terbaik untuk melatih keterampilan menulis karakter Mandarin Anda! Dengan desain khusus kotak-kotak, buku ini membantu Anda mengasah teknik menulis Hanzi yang rapi dan proporsional. Cocok untuk pemula hingga tingkat lanjut, mari mulai perjalanan belajar Mandarin Anda dengan cara yang lebih terstruktur dan menyenangkan",
        product_detail: [
          "1 Buku: Rp. 24,999",
          "3 Buku: Rp. 64,999",
          "5 Buku: Rp. 99,999",
        ],
      },
      {
        title: "E-Flashcard HSK 1",
        price: "100.000",
        star: 4,
        image: "/assets/product2.png",
        desc: "Ingin menguasai bahasa Mandarin dengan cara seru dan efektif? Kartu Flashcard HSK kami siap menjadi sahabat terbaik Anda dalam belajar kosakata Mandarin. Dengan metode yang menyenangkan dan praktis, belajar jadi lebih mudah dan membantu Anda mencapai kemahiran berbahasa Mandarin lebih cepat dari yang Anda bayangkan!",
        product_detail: [
          "HSK 1: Rp. 100,000",
          "HSK 2: Rp. 120,000",
          "HSK 3: Rp. 150,000",
          "HSK 4: Rp. 200,000",
          "HSK 5: Rp. 300,000",
        ],
      },
      {
        title: "E-Flashcard HSK 2",
        price: "120.000",
        star: 4,
        image: "/assets/product2.png",
        desc: "Ingin menguasai bahasa Mandarin dengan cara seru dan efektif? Kartu Flashcard HSK kami siap menjadi sahabat terbaik Anda dalam belajar kosakata Mandarin. Dengan metode yang menyenangkan dan praktis, belajar jadi lebih mudah dan membantu Anda mencapai kemahiran berbahasa Mandarin lebih cepat dari yang Anda bayangkan!",
        product_detail: [
          "HSK 1: Rp. 100,000",
          "HSK 2: Rp. 120,000",
          "HSK 3: Rp. 150,000",
          "HSK 4: Rp. 200,000",
          "HSK 5: Rp. 300,000",
        ],
      },
      {
        title: "E-Flashcard HSK 3",
        price: "150.000",
        star: 4,
        image: "/assets/product2.png",
        desc: "Ingin menguasai bahasa Mandarin dengan cara seru dan efektif? Kartu Flashcard HSK kami siap menjadi sahabat terbaik Anda dalam belajar kosakata Mandarin. Dengan metode yang menyenangkan dan praktis, belajar jadi lebih mudah dan membantu Anda mencapai kemahiran berbahasa Mandarin lebih cepat dari yang Anda bayangkan!",
        product_detail: [
          "HSK 1: Rp. 100,000",
          "HSK 2: Rp. 120,000",
          "HSK 3: Rp. 150,000",
          "HSK 4: Rp. 200,000",
          "HSK 5: Rp. 300,000",
        ],
      },
      {
        title: "E-Flashcard HSK 4",
        price: "200.000",
        star: 4,
        image: "/assets/product2.png",
        desc: "Ingin menguasai bahasa Mandarin dengan cara seru dan efektif? Kartu Flashcard HSK kami siap menjadi sahabat terbaik Anda dalam belajar kosakata Mandarin. Dengan metode yang menyenangkan dan praktis, belajar jadi lebih mudah dan membantu Anda mencapai kemahiran berbahasa Mandarin lebih cepat dari yang Anda bayangkan!",
        product_detail: [
          "HSK 1: Rp. 100,000",
          "HSK 2: Rp. 120,000",
          "HSK 3: Rp. 150,000",
          "HSK 4: Rp. 200,000",
          "HSK 5: Rp. 300,000",
        ],
      },
      {
        title: "E-Flashcard HSK 5",
        price: "300.000",
        star: 4,
        image: "/assets/product2.png",
        desc: "Ingin menguasai bahasa Mandarin dengan cara seru dan efektif? Kartu Flashcard HSK kami siap menjadi sahabat terbaik Anda dalam belajar kosakata Mandarin. Dengan metode yang menyenangkan dan praktis, belajar jadi lebih mudah dan membantu Anda mencapai kemahiran berbahasa Mandarin lebih cepat dari yang Anda bayangkan!",
        product_detail: [
          "HSK 1: Rp. 100,000",
          "HSK 2: Rp. 120,000",
          "HSK 3: Rp. 150,000",
          "HSK 4: Rp. 200,000",
          "HSK 5: Rp. 300,000",
        ],
      },
      {
        title: "E-Book Komprehensif Bahasa Mandarin Level 1",
        price: "50.000",
        star: 4,
        image: "/assets/comprensive.png",
        desc: "Jelajahi berbagai kosakata Mandarin yang menarik dalam koleksi buku kami, mulai dari HSK 1 hingga HSK 5. Setiap buku dirancang untuk mendukung pembelajaran Anda dengan pertanyaan latihan interaktif dan penjelasan tata bahasa sederhana, sehingga mudah dipahami. Mulailah perjalanan belajar yang menyenangkan dengan Buku Komprehensif Mandarin dan rasakan kemajuan yang memuaskan!",
        product_detail: [
          "Level 1: Rp. 50,000",
          "Level 2: Rp. 70,000",
          "Level 3: Rp. 100,000",
          "Level 4: Rp. 150,000",
          "Level 5: Rp. 200,000",
        ],
      },
      {
        title: "E-Book Komprehensif Bahasa Mandarin Level 2",
        price: "70.000",
        star: 4,
        image: "/assets/comprensive.png",
        desc: "Jelajahi berbagai kosakata Mandarin yang menarik dalam koleksi buku kami, mulai dari HSK 1 hingga HSK 5. Setiap buku dirancang untuk mendukung pembelajaran Anda dengan pertanyaan latihan interaktif dan penjelasan tata bahasa sederhana, sehingga mudah dipahami. Mulailah perjalanan belajar yang menyenangkan dengan Buku Komprehensif Mandarin dan rasakan kemajuan yang memuaskan!",
        product_detail: [
          "Level 1: Rp. 50,000",
          "Level 2: Rp. 70,000",
          "Level 3: Rp. 100,000",
          "Level 4: Rp. 150,000",
          "Level 5: Rp. 200,000",
        ],
      },
      {
        title: "E-Book Komprehensif Bahasa Mandarin Level 3",
        price: "100.000",
        star: 4,
        image: "/assets/comprensive.png",
        desc: "Jelajahi berbagai kosakata Mandarin yang menarik dalam koleksi buku kami, mulai dari HSK 1 hingga HSK 5. Setiap buku dirancang untuk mendukung pembelajaran Anda dengan pertanyaan latihan interaktif dan penjelasan tata bahasa sederhana, sehingga mudah dipahami. Mulailah perjalanan belajar yang menyenangkan dengan Buku Komprehensif Mandarin dan rasakan kemajuan yang memuaskan!",
        product_detail: [
          "Level 1: Rp. 50,000",
          "Level 2: Rp. 70,000",
          "Level 3: Rp. 100,000",
          "Level 4: Rp. 150,000",
          "Level 5: Rp. 200,000",
        ],
      },
      {
        title: "E-Book Komprehensif Bahasa Mandarin Level 4",
        price: "150.000",
        star: 4,
        image: "/assets/comprensive.png",
        desc: "Jelajahi berbagai kosakata Mandarin yang menarik dalam koleksi buku kami, mulai dari HSK 1 hingga HSK 5. Setiap buku dirancang untuk mendukung pembelajaran Anda dengan pertanyaan latihan interaktif dan penjelasan tata bahasa sederhana, sehingga mudah dipahami. Mulailah perjalanan belajar yang menyenangkan dengan Buku Komprehensif Mandarin dan rasakan kemajuan yang memuaskan!",
        product_detail: [
          "Level 1: Rp. 50,000",
          "Level 2: Rp. 70,000",
          "Level 3: Rp. 100,000",
          "Level 4: Rp. 150,000",
          "Level 5: Rp. 200,000",
        ],
      },
      {
        title: "E-Book Komprehensif Bahasa Mandarin Level 5",
        price: "200.000",
        star: 4,
        image: "/assets/comprensive.png",
        desc: "Jelajahi berbagai kosakata Mandarin yang menarik dalam koleksi buku kami, mulai dari HSK 1 hingga HSK 5. Setiap buku dirancang untuk mendukung pembelajaran Anda dengan pertanyaan latihan interaktif dan penjelasan tata bahasa sederhana, sehingga mudah dipahami. Mulailah perjalanan belajar yang menyenangkan dengan Buku Komprehensif Mandarin dan rasakan kemajuan yang memuaskan!",
        product_detail: [
          "Level 1: Rp. 50,000",
          "Level 2: Rp. 70,000",
          "Level 3: Rp. 100,000",
          "Level 4: Rp. 150,000",
          "Level 5: Rp. 200,000",
        ],
      },
    ],
  }), []);

  const translateProduct = langs ? products?.english : products?.indonesia;

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    cssEase: "linear",
    arrows: false,
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

  const showModal = (product) => {
    setCurrentProduct(product);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleNext = () => {
    if (sliderRef) {
      sliderRef.slickNext();
    }
  };

  const handlePrev = () => {
    if (sliderRef) {
      sliderRef.slickPrev();
    }
  };

  return (
    <div className="container mx-auto px-5 py-16 md:px-16" id="products">
      <h1 className="text-2xl font-semibold text-start md:text-3xl lg:text-[32px]">{text.title}</h1>
      <p className="mb-6 text-start text-base font-medium tracking-wide text-[#8493AC] md:text-lg lg:text-xl">
        {text.desc}
      </p>
      <div className="flex flex-col">
        <div className="home-slider product-slider w-full">
          <Slider {...settings} ref={(slider) => sliderRef = slider}>
            {translateProduct.map((item, index) => (
              <div key={index} className="h-full">
                <div
                  className="bg-white w-full mx-auto border border-[#D5DAE2] rounded-3xl flex flex-col h-full cursor-pointer"
                  onClick={() => showModal(item)}
                >
                  {/* Gambar Program */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-auto object-contain"
                  />
                  <div className="flex flex-col justify-start items-start px-4 py-5 h-full">
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">
                      {item.title}
                    </h2>
                    <p className="font-semibold text-base mb-2 mt-auto">
                      Rp {item.price}
                      <span className="font-light text-sm ml-1 text-[#657692]">/Month</span>
                    </p>
                    <p className="mt-2 text-[#3377FF] text-xs">Dapatkan komisi Rp Rp224.950</p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
        <div className="flex flex-row gap-2 mt-4 items-center justify-center w-full md:justify-start">
          <button
            className="border-2 border-[#8493AC] p-2 rounded-xl"
            onClick={handlePrev}
          >
            <RiArrowLeftSLine className="text-[#1A1A1A]" />
          </button>
          <button
            className="border-2 border-[#8493AC] p-2 rounded-xl"
            onClick={handleNext}
          >
            <RiArrowRightSLine className="text-[#1A1A1A]" />
          </button>
        </div>
      </div>

      {/* Modal */}
      <Modal
        title={currentProduct.title}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        centered
      >
        <img
          src={currentProduct.image || "/assets/product-dummy.png"}
          alt={currentProduct.title}
          className="w-full h-48 object-contain mb-6 rounded-lg"
        />
        <p className="text-gray-900 mb-4">{currentProduct.desc}</p>
        <h3 className="font-medium text-xl mb-2">
          {langs ? "Details: " : "Detail: "}
        </h3>
        <ul className="list-disc ml-5 text-gray-900">
          {currentProduct.product_detail?.map((detail, index) => (
            <li key={index}>{detail}</li>
          ))}
        </ul>
        <div className="flex flex-col justify-between items-start mt-6 gap-6">
          <p className="font-medium text-xl text-[#252525]">
            {langs
              ? "Learn intensively for only"
              : "Belajar secara intensif hanya dengan"}
          </p>
          <h3 className="font-semibold text-xl md:text-3xl text-[#252525]">
            {currentProduct.title === "Buku Tulis Mandarin" ||
            currentProduct.title === "Mandarin Notebook"
              ? langs
                ? "Starting From: "
                : "Mulai Dari: "
              : null}
            Rp {currentProduct.price}
            <span className="font-medium text-sm ml-1">/Item</span>
          </h3>
          <a
            href="https://wa.me/+6282279506450"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button
              type="primary"
              size="large"
              className="bg-[#FFCC00] text-black px-6 py-3 border-none rounded-2xl"
              href="https://wa.me/+6282279506450"
            >
              Chat Admin
            </button>
          </a>
        </div>
      </Modal>
    </div>
  );
};

export default Products;
