import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { Modal } from "antd";
import { useSelector } from "react-redux";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { getLatestPrograms } from "../api/brand";
import { formatRupiah } from "../utils/rupiahFormat";
import { handleClickItem } from "../utils/handleClickItem";
import { getProfile } from "../api/auth";

const Products = ({ text }) => {
  const { data, langs } = useSelector((state) => state.LangReducer);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({});
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  let sliderRef = useRef(null);

  useEffect(() => {
    handleProfileUser();
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setIsLoading(true);
    try {
      const response = await getLatestPrograms();

      if (response.status) {
        setProducts(response.data || []);
      } else {
        setProducts([]);
      }
    } catch (error) {}
    setIsLoading(false);
  };

  const handleProfileUser = async () => {
    try {
      const response = await getProfile();
      if (response.status) {
        setUser(response.data);
      }
    } catch (error) {
      setUser(null);
    }
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

  return (
    <div className="container mx-auto px-5 py-16 md:px-16" id="products">
      <h1 className="text-2xl font-semibold text-start md:text-3xl lg:text-[32px]">{langs ? 'Just Released' : 'Baru Rilis'}</h1>
      <p className="mb-6 text-start text-base font-medium tracking-wide text-[#8493AC] md:text-lg lg:text-xl">
        {langs ? 'Find the premium class and opportunities along the way' : 'Temukan kelas premium dan peluang di sepanjang jalan'}
      </p>
      <div className="flex flex-col">
        <div className="home-slider product-slider w-full">
          <Slider {...settings} ref={(slider) => sliderRef = slider}>
            {products.map((item, index) => (
              <div
                key={index}
                className="p-0 m-0 h-full"
              >
                <div className="bg-white rounded-2xl border border-neutral-300 flex flex-col w-full h-full">
                  <img
                    onClick={() => handleClickItem(item.id)}
                    src={`${process.env.REACT_APP_API_IMG}${item.brand_img}`}
                    alt={item.variant}
                    className="w-full h-56 object-fill rounded-t-2xl cursor-pointer"
                  />
                  <div className="flex flex-col h-full items-start px-4 py-5">
                    <h2 onClick={() => handleClickItem(item.id)} className="text-lg font-semibold text-gray-800 mb-2 cursor-pointer">
                      {item.variant}
                    </h2>
                    {item.turunan === 'Non - Degree Program' || item.turunan === 'Degree Program' ? (
                      <div
                        className={"prose text-gray-600 overflow-auto mb-2 grow leading-relaxed w-full [&_a]:text-blue-600 [&_a]:underline [&_ul]:list-disc [&_ol]:list-decimal [&_ul]:pl-6 [&_ol]:pl-6"}
                        dangerouslySetInnerHTML={{
                          __html: `${item.detail_brand.substring(0, 100)}...`,
                        }}
                      />
                    ) : (
                      <p className="font-semibold text-lg mb-2">
                        {item.discount_price && item.discount_price != "0"
                          ? (
                            <>
                              <span className="font-medium text-sm text-[#FF3E3E] mr-2 line-through">
                                {formatRupiah(item.price)}
                              </span>
                              {formatRupiah(item.discount_price)}
                            </>
                          ) : formatRupiah(item.price)}
                        {/* {isMonthlyProgram ? (
                          <span className="font-light text-sm ml-1">
                            {langs ? "/Month" : "/Bulan"}
                          </span>
                        ) : null} */}
                      </p>
                    )}
                    {item.commission ? (
                      user?.Role?.role_name === "affiliator" ? (
                        <div className="flex mt-auto">
                          <span className="text-sm text-[#3377FF] mt-2">
                            {langs ? "Earn commission" : "Dapatkan komisi"}{" "}
                            {formatRupiah(item.commission || 0)}
                          </span>
                        </div>
                      ) : (
                        <div className="flex mt-auto">
                          <Link
                            to={"/join-affiliate"}
                            onClick={() => {}}
                            className="text-sm text-[#3377FF] mt-2"
                          >
                            {langs ? "Earn commission" : "Dapatkan komisi"}{" "}
                            {formatRupiah(item.commission || 0)}
                          </Link>
                        </div>
                      )
                    ) : null}
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
