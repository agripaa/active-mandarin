import React, { useState } from "react";
import Slider from "react-slick";
import { Rate, Modal, Button } from "antd";
import { useSelector } from "react-redux";

const Products = ({ text }) => {
  const { data, langs } = useSelector((state) => state.LangReducer);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({});

  const products = {
    english: [
      {
        title: "Hanzi Practice Book",
        price: "24.999",
        star: 4,
        image: "/assets/product1.png",
        desc: "Hanzi Grid Notebook: Your perfect partner to enhance Mandarin character writing skills! With its special grid design, this notebook helps you practice writing Hanzi neatly and proportionally. Suitable for beginners to advanced learners. Start your Mandarin journey with a more structured and enjoyable approach!",
        product_detail: [
          "1 Book: Rp. 24,999",
          "3 Books: Rp. 64,999",
          "5 Books: Rp. 99,999",
        ],
      },
      {
        title: "E-Flashcard HSK 1",
        price: "150.000",
        star: 4,
        image: "/assets/product2.png",
        desc: "Want to master Mandarin in a fun and effective way? Our HSK Flashcards are your perfect companion for learning Mandarin vocabulary. With an enjoyable and practical method, learning becomes easier and helps you achieve Mandarin fluency faster than ever!",
        product_detail: [
          "HSK 1: Rp. 150,000",
          "HSK 2: Rp. 250,000",
          "HSK 3: Rp. 350,000",
          "HSK 4: Rp. 450,000",
          "HSK 5: Rp. 750,000",
        ],
      },
      {
        title: "E-Flashcard HSK 2",
        price: "250.000",
        star: 4,
        image: "/assets/product2.png",
        desc: "Want to master Mandarin in a fun and effective way? Our HSK Flashcards are your perfect companion for learning Mandarin vocabulary. With an enjoyable and practical method, learning becomes easier and helps you achieve Mandarin fluency faster than ever!",
        product_detail: [
          "HSK 1: Rp. 150,000",
          "HSK 2: Rp. 250,000",
          "HSK 3: Rp. 350,000",
          "HSK 4: Rp. 450,000",
          "HSK 5: Rp. 750,000",
        ],
      },
      {
        title: "E-Flashcard HSK 3",
        price: "350.000",
        star: 4,
        image: "/assets/product2.png",
        desc: "Want to master Mandarin in a fun and effective way? Our HSK Flashcards are your perfect companion for learning Mandarin vocabulary. With an enjoyable and practical method, learning becomes easier and helps you achieve Mandarin fluency faster than ever!",
        product_detail: [
          "HSK 1: Rp. 150,000",
          "HSK 2: Rp. 250,000",
          "HSK 3: Rp. 350,000",
          "HSK 4: Rp. 450,000",
          "HSK 5: Rp. 750,000",
        ],
      },
      {
        title: "E-Flashcard HSK 4",
        price: "450.000",
        star: 4,
        image: "/assets/product2.png",
        desc: "Want to master Mandarin in a fun and effective way? Our HSK Flashcards are your perfect companion for learning Mandarin vocabulary. With an enjoyable and practical method, learning becomes easier and helps you achieve Mandarin fluency faster than ever!",
        product_detail: [
          "HSK 1: Rp. 150,000",
          "HSK 2: Rp. 250,000",
          "HSK 3: Rp. 350,000",
          "HSK 4: Rp. 450,000",
          "HSK 5: Rp. 750,000",
        ],
      },
      {
        title: "E-Flashcard HSK 5",
        price: "750.000",
        star: 4,
        image: "/assets/product2.png",
        desc: "Want to master Mandarin in a fun and effective way? Our HSK Flashcards are your perfect companion for learning Mandarin vocabulary. With an enjoyable and practical method, learning becomes easier and helps you achieve Mandarin fluency faster than ever!",
        product_detail: [
          "HSK 1: Rp. 150,000",
          "HSK 2: Rp. 250,000",
          "HSK 3: Rp. 350,000",
          "HSK 4: Rp. 450,000",
          "HSK 5: Rp. 750,000",
        ],
      },
      {
        title: "Comprehensive Chinese Book Level 1",
        price: "80.000",
        star: 4,
        image: "/assets/producta.png",
        desc: "Explore a variety of interesting Mandarin vocabulary in our book collection, ranging from HSK 1 to HSK 5. Each book is designed to support your learning with interactive practice questions and simple grammar explanations, making it easy to understand. Start your exciting learning journey with Comprehensive Chinese Book and experience satisfying progress!",
        product_detail: [
          "Level 1: Rp. 80,000",
          "Level 2: Rp. 100,000",
          "Level 3: Rp. 150,000",
          "Level 4: Rp. 210,000",
          "Level 5: Rp. 300,000",
        ],
      },
      {
        title: "Comprehensive Chinese Book Level 2",
        price: "100.000",
        star: 4,
        image: "/assets/producta.png",
        desc: "Explore a variety of interesting Mandarin vocabulary in our book collection, ranging from HSK 1 to HSK 5. Each book is designed to support your learning with interactive practice questions and simple grammar explanations, making it easy to understand. Start your exciting learning journey with Comprehensive Chinese Book and experience satisfying progress!",
        product_detail: [
          "Level 1: Rp. 80,000",
          "Level 2: Rp. 100,000",
          "Level 3: Rp. 150,000",
          "Level 4: Rp. 210,000",
          "Level 5: Rp. 300,000",
        ],
      },
      {
        title: "Comprehensive Chinese Book Level 3",
        price: "150.000",
        star: 4,
        image: "/assets/producta.png",
        desc: "Explore a variety of interesting Mandarin vocabulary in our book collection, ranging from HSK 1 to HSK 5. Each book is designed to support your learning with interactive practice questions and simple grammar explanations, making it easy to understand. Start your exciting learning journey with Comprehensive Chinese Book and experience satisfying progress!",
        product_detail: [
          "Level 1: Rp. 80,000",
          "Level 2: Rp. 100,000",
          "Level 3: Rp. 150,000",
          "Level 4: Rp. 210,000",
          "Level 5: Rp. 300,000",
        ],
      },
      {
        title: "Comprehensive Chinese Book Level 4",
        price: "210.000",
        star: 4,
        image: "/assets/producta.png",
        desc: "Explore a variety of interesting Mandarin vocabulary in our book collection, ranging from HSK 1 to HSK 5. Each book is designed to support your learning with interactive practice questions and simple grammar explanations, making it easy to understand. Start your exciting learning journey with Comprehensive Chinese Book and experience satisfying progress!",
        product_detail: [
          "Level 1: Rp. 80,000",
          "Level 2: Rp. 100,000",
          "Level 3: Rp. 150,000",
          "Level 4: Rp. 210,000",
          "Level 5: Rp. 300,000",
        ],
      },
      {
        title: "Comprehensive Chinese Book Level 5",
        price: "300.000",
        star: 4,
        image: "/assets/producta.png",
        desc: "Explore a variety of interesting Mandarin vocabulary in our book collection, ranging from HSK 1 to HSK 5. Each book is designed to support your learning with interactive practice questions and simple grammar explanations, making it easy to understand. Start your exciting learning journey with Comprehensive Chinese Book and experience satisfying progress!",
        product_detail: [
          "Level 1: Rp. 80,000",
          "Level 2: Rp. 100,000",
          "Level 3: Rp. 150,000",
          "Level 4: Rp. 210,000",
          "Level 5: Rp. 300,000",
        ],
      },
    ],
    indonesia: [
      {
        title: "Buku Latihan Hanzi",
        price: "24.999",
        star: 4,
        image: "/assets/product1.png",
        desc: "Buku Catatan Kotak-Kotak Hanzi: Teman sempurna untuk meningkatkan kemampuan menulis karakter Mandarin! Dengan desain grid khusus, buku ini membantu Anda berlatih menulis Hanzi dengan rapi dan proporsional. Cocok untuk pemula hingga pelajar tingkat lanjut. Mulailah perjalanan belajar Mandarin Anda dengan pendekatan yang lebih terstruktur dan menyenangkan!",
        product_detail: [
          "1 Buku: Rp. 24,999",
          "3 Buku: Rp. 64,999",
          "5 Buku: Rp. 99,999",
        ],
      },
      {
        title: "E-Flashcard HSK 1",
        price: "150.000",
        star: 4,
        image: "/assets/product2.png",
        desc: "Ingin menguasai Mandarin dengan cara yang menyenangkan dan efektif? Flashcard HSK kami adalah teman belajar sempurna untuk mempelajari kosakata Mandarin. Dengan metode yang menyenangkan dan praktis, belajar menjadi lebih mudah dan membantu Anda mencapai kefasihan Mandarin lebih cepat!",
        product_detail: [
          "HSK 1: Rp. 150,000",
          "HSK 2: Rp. 250,000",
          "HSK 3: Rp. 350,000",
          "HSK 4: Rp. 450,000",
          "HSK 5: Rp. 750,000",
        ],
      },
      {
        title: "E-Flashcard HSK 2",
        price: "250.000",
        star: 4,
        image: "/assets/product2.png",
        desc: "Ingin menguasai Mandarin dengan cara yang menyenangkan dan efektif? Flashcard HSK kami adalah teman belajar sempurna untuk mempelajari kosakata Mandarin. Dengan metode yang menyenangkan dan praktis, belajar menjadi lebih mudah dan membantu Anda mencapai kefasihan Mandarin lebih cepat!",
        product_detail: [
          "HSK 1: Rp. 150,000",
          "HSK 2: Rp. 250,000",
          "HSK 3: Rp. 350,000",
          "HSK 4: Rp. 450,000",
          "HSK 5: Rp. 750,000",
        ],
      },
      {
        title: "E-Flashcard HSK 3",
        price: "350.000",
        star: 4,
        image: "/assets/product2.png",
        desc: "Ingin menguasai Mandarin dengan cara yang menyenangkan dan efektif? Flashcard HSK kami adalah teman belajar sempurna untuk mempelajari kosakata Mandarin. Dengan metode yang menyenangkan dan praktis, belajar menjadi lebih mudah dan membantu Anda mencapai kefasihan Mandarin lebih cepat!",
        product_detail: [
          "HSK 1: Rp. 150,000",
          "HSK 2: Rp. 250,000",
          "HSK 3: Rp. 350,000",
          "HSK 4: Rp. 450,000",
          "HSK 5: Rp. 750,000",
        ],
      },
      {
        title: "E-Flashcard HSK 4",
        price: "450.000",
        star: 4,
        image: "/assets/product2.png",
        desc: "Ingin menguasai Mandarin dengan cara yang menyenangkan dan efektif? Flashcard HSK kami adalah teman belajar sempurna untuk mempelajari kosakata Mandarin. Dengan metode yang menyenangkan dan praktis, belajar menjadi lebih mudah dan membantu Anda mencapai kefasihan Mandarin lebih cepat!",
        product_detail: [
          "HSK 1: Rp. 150,000",
          "HSK 2: Rp. 250,000",
          "HSK 3: Rp. 350,000",
          "HSK 4: Rp. 450,000",
          "HSK 5: Rp. 750,000",
        ],
      },
      {
        title: "E-Flashcard HSK 5",
        price: "750.000",
        star: 4,
        image: "/assets/product2.png",
        desc: "Ingin menguasai Mandarin dengan cara yang menyenangkan dan efektif? Flashcard HSK kami adalah teman belajar sempurna untuk mempelajari kosakata Mandarin. Dengan metode yang menyenangkan dan praktis, belajar menjadi lebih mudah dan membantu Anda mencapai kefasihan Mandarin lebih cepat!",
        product_detail: [
          "HSK 1: Rp. 150,000",
          "HSK 2: Rp. 250,000",
          "HSK 3: Rp. 350,000",
          "HSK 4: Rp. 450,000",
          "HSK 5: Rp. 750,000",
        ],
      },
      {
        title: "Buku Komprehensif Bahasa Mandarin Level 1",
        price: "80.000",
        star: 4,
        image: "/assets/producta.png",
        desc: "Jelajahi berbagai kosakata Mandarin yang menarik dalam koleksi buku kami, mulai dari HSK 1 hingga HSK 5. Setiap buku dirancang untuk mendukung pembelajaran Anda dengan pertanyaan latihan interaktif dan penjelasan tata bahasa sederhana, sehingga mudah dipahami. Mulailah perjalanan belajar yang menyenangkan dengan Buku Komprehensif Mandarin dan rasakan kemajuan yang memuaskan!",
        product_detail: [
          "Level 1: Rp. 80,000",
          "Level 2: Rp. 100,000",
          "Level 3: Rp. 150,000",
          "Level 4: Rp. 210,000",
          "Level 5: Rp. 300,000",
        ],
      },
      {
        title: "Buku Komprehensif Bahasa Mandarin Level 2",
        price: "100.000",
        star: 4,
        image: "/assets/producta.png",
        desc: "Jelajahi berbagai kosakata Mandarin yang menarik dalam koleksi buku kami, mulai dari HSK 1 hingga HSK 5. Setiap buku dirancang untuk mendukung pembelajaran Anda dengan pertanyaan latihan interaktif dan penjelasan tata bahasa sederhana, sehingga mudah dipahami. Mulailah perjalanan belajar yang menyenangkan dengan Buku Komprehensif Mandarin dan rasakan kemajuan yang memuaskan!",
        product_detail: [
          "Level 1: Rp. 80,000",
          "Level 2: Rp. 100,000",
          "Level 3: Rp. 150,000",
          "Level 4: Rp. 210,000",
          "Level 5: Rp. 300,000",
        ],
      },
      {
        title: "Buku Komprehensif Bahasa Mandarin Level 3",
        price: "150.000",
        star: 4,
        image: "/assets/producta.png",
        desc: "Jelajahi berbagai kosakata Mandarin yang menarik dalam koleksi buku kami, mulai dari HSK 1 hingga HSK 5. Setiap buku dirancang untuk mendukung pembelajaran Anda dengan pertanyaan latihan interaktif dan penjelasan tata bahasa sederhana, sehingga mudah dipahami. Mulailah perjalanan belajar yang menyenangkan dengan Buku Komprehensif Mandarin dan rasakan kemajuan yang memuaskan!",
        product_detail: [
          "Level 1: Rp. 80,000",
          "Level 2: Rp. 100,000",
          "Level 3: Rp. 150,000",
          "Level 4: Rp. 210,000",
          "Level 5: Rp. 300,000",
        ],
      },
      {
        title: "Buku Komprehensif Bahasa Mandarin Level 4",
        price: "210.000",
        star: 4,
        image: "/assets/producta.png",
        desc: "Jelajahi berbagai kosakata Mandarin yang menarik dalam koleksi buku kami, mulai dari HSK 1 hingga HSK 5. Setiap buku dirancang untuk mendukung pembelajaran Anda dengan pertanyaan latihan interaktif dan penjelasan tata bahasa sederhana, sehingga mudah dipahami. Mulailah perjalanan belajar yang menyenangkan dengan Buku Komprehensif Mandarin dan rasakan kemajuan yang memuaskan!",
        product_detail: [
          "Level 1: Rp. 80,000",
          "Level 2: Rp. 100,000",
          "Level 3: Rp. 150,000",
          "Level 4: Rp. 210,000",
          "Level 5: Rp. 300,000",
        ],
      },
      {
        title: "Buku Komprehensif Bahasa Mandarin Level 5",
        price: "300.000",
        star: 4,
        image: "/assets/producta.png",
        desc: "Jelajahi berbagai kosakata Mandarin yang menarik dalam koleksi buku kami, mulai dari HSK 1 hingga HSK 5. Setiap buku dirancang untuk mendukung pembelajaran Anda dengan pertanyaan latihan interaktif dan penjelasan tata bahasa sederhana, sehingga mudah dipahami. Mulailah perjalanan belajar yang menyenangkan dengan Buku Komprehensif Mandarin dan rasakan kemajuan yang memuaskan!",
        product_detail: [
          "Level 1: Rp. 80,000",
          "Level 2: Rp. 100,000",
          "Level 3: Rp. 150,000",
          "Level 4: Rp. 210,000",
          "Level 5: Rp. 300,000",
        ],
      },
    ],
  };

  const translateProduct = langs ? products?.english : products?.indonesia;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
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

  const showModal = (product) => {
    setCurrentProduct(product);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="container mx-auto xl:pb-10" id="products">
      <h1 className="text-4xl font-semibold text-center mb-2">{text.title}</h1>
      <p className="mb-10 text-center text-xl font-semibold tracking-wide text-[#AFB8CA]">
        {text.desc}
      </p>
      <div className="my-8 flex justify-center">
        <div className="w-9/12">
          <Slider {...settings}>
            {translateProduct.map((item, index) => (
              <div key={index} className="pb-6 h-[90%]">
                <div
                  className="bg-white w-11/12 mx-auto rounded-2xl shadow-lg flex flex-col h-full my-4 mb-8 cursor-pointer"
                  onClick={() => showModal(item)}
                >
                  {/* Gambar Produk */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-auto object-contain"
                  />
                  <div className="flex flex-col justify-start items-start px-4 py-5 h-full">
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">
                      {item.title}
                    </h2>
                    <p className="font-semibold text-lg mb-2 mt-auto">
                      Rp {item.price}
                      <span className="font-light text-sm ml-1">/Item</span>
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
        <p className="text-gray-700 mb-4">{currentProduct.desc}</p>
        <h3 className="font-medium text-xl mb-2">Details:</h3>
        <ul className="list-disc ml-5 text-gray-600">
          {currentProduct.product_detail?.map((detail, index) => (
            <li key={index}>{detail}</li>
          ))}
        </ul>
        <div className="flex flex-col justify-between items-start mt-6 gap-6">
          <p className="font-medium text-xl text-[#252525]">
            Learn intensively for only
          </p>
          <h3 className="font-semibold text-xl md:text-3xl text-[#252525]">
            Starting From: Rp {currentProduct.price}
          </h3>
          <a
            href="https://wa.me/+6282223369246"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button
              type="primary"
              size="large"
              className="bg-[#FFCC00] text-black px-6 py-3 border-none rounded-2xl"
              onClick="https://wa.me/+6282223369246"
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
