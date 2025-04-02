import React, { useState, useEffect, useMemo, useRef } from "react";
import Slider from "react-slick";
import { Rate, Modal, Button } from "antd";
import { useSelector } from "react-redux";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { getBrandCategoryTurunan, getLatestPrograms } from "../api/brand";
import { formatRupiah } from "../utils/rupiahFormat";

const Products = ({ text }) => {
  const { data, langs } = useSelector((state) => state.LangReducer);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  let sliderRef = useRef(null);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setIsLoading(true);
    try {
      const response = await getLatestPrograms();

      if (response.status) {
        setProducts(response.data || []);
      } else {
        console.error("Error fetching data:", response.reason);
        setProducts([]);
      }
    } catch (error) {
      console.error("🔥 ERROR fetching data:", error);
    }
    setIsLoading(false);
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

  const handleClickItem = (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      const openModalEvent = new CustomEvent("triggerLoginModal");
      window.dispatchEvent(openModalEvent); // trigger modal dari Header
    } else {
      window.location.href = `/detail/${id}`;
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
            {products.map((item, index) => (
              <div
                onClick={() => handleClickItem(item.id)}
                key={index}
                className="p-0 m-0"
              >
                <div className="bg-white rounded-2xl border border-neutral-300 flex flex-col w-full h-full">
                  <img
                    src={`${process.env.REACT_APP_API_IMG}${item.brand_img}`}
                    alt={item.variant}
                    className="w-full h-56 object-cover rounded-t-2xl"
                  />
                  <div className="flex flex-col justify-between items-start px-4 py-5">
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">
                      {item.variant}
                    </h2>
                    <p className="font-semibold text-lg mb-2">
                      {item.discount_price && item.discount_price !== '0' ? formatRupiah(item.discount_price) : formatRupiah(item.price)}
                      <span className="font-light text-sm ml-1">
                        {langs
                          ? "/Month"
                          : "/Bulan"}
                      </span>
                    </p>
                    <div className="flex mt-2">
                      <span className="text-sm text-[#3377FF]">{langs ? "Earn commission" : "Dapatkan komisi"} {formatRupiah(item.commission) || formatRupiah(0)}</span>
                    </div>
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
