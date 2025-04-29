import React, { useState, useEffect } from "react";
import Mainlayouts from "../Layouts/MainLayouts";
import { useSelector } from "react-redux";
import { getBrandCategoryTurunan, getGroupedBrands } from "../api/brand";
import { formatRupiah } from "../utils/rupiahFormat";
import { Spin } from "antd";
import { getProfile } from "../api/auth";
import Slider from "react-slick";
import { Link } from "react-router-dom";

const CatalogProduct = () => {
  const { _, langs } = useSelector((state) => state.LangReducer);
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chineseBook, setChineseBook] = useState([]);
  const [flashcard, setFlashcard] = useState([]);
  const [guideBook, setGuideBook] = useState([]);
  const [hanziBook, setHanziBook] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [galleryData, setGalleryData] = useState([]);

  useEffect(() => {
    handleProfileUser();
    fetchAllData();
    fetchSliderImage();
  }, []);

  const fetchSliderImage = () => {
    const images = [
      {
        image: "/assets/banner/Web Banne Act CTA-5.png",
        link: "https://wa.me/+6282279506450",
      },
      {
        image: "/assets/banner/Web Banne Act CTA-6.png",
        link: "https://wa.me/+6282279506450",
      },
      {
        image: "/assets/banner/Web Banne Act CTA-7.png",
        link: "https://wa.me/+6282279506450",
      },
      {
        image: "/assets/banner/Web Banne Act CTA-8.png",
        link: "/join-affiliate",
      },
      {
        image: "/assets/banner/Web Banne Act CTA-9.png",
        link: "/products",
      },
    ];
    setGalleryData(images);
  };

  // const fetchProducts = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await getGroupedBrands();
  //     setProducts(response.data);
  //   } catch (error) {
  //     setError(error.message || "Gagal mengambil data produk.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const responses = await Promise.allSettled([
        getBrandCategoryTurunan("product", "Comprehensive Chinese Book"),
        getBrandCategoryTurunan("product", "E-Flashcard/HSK"),
        getBrandCategoryTurunan("product", "Buku Tulis Hanzi"),
        getBrandCategoryTurunan("product", "Buku Panduan"),
      ]);

      setChineseBook(
        responses[0].status === "fulfilled" ? responses[0].value.data || [] : []
      );
      setFlashcard(
        responses[1].status === "fulfilled" ? responses[1].value.data || [] : []
      );
      setHanziBook(
        responses[2].status === "fulfilled" ? responses[2].value.data || [] : []
      );
      setGuideBook(
        responses[3].status === "fulfilled" ? responses[3].value.data || [] : []
      );
    } catch (error) {
    } finally {
      setLoading(false);
    }
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

  if (loading) {
    return (
      <Mainlayouts>
        <div className="flex justify-center items-center h-[80vh]">
          <Spin size="large" />
        </div>
      </Mainlayouts>
    );
  }

  const handleClickItem = (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      const openModalEvent = new CustomEvent("triggerLoginModal");
      window.dispatchEvent(openModalEvent); // trigger modal dari Header
    } else {
      window.location.href = `/detail/${id}`;
    }
  };

  const settingsCarousel = {
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
        },
      },
    ],
  };

  return (
    <Mainlayouts>
      <div className="container mx-auto px-5 lg:px-0">
        <div className="h-auto">
          <Slider
            {...settingsCarousel}
            className="rounded-xl overflow-visible h-full"
          >
            {galleryData.map((item, index) => (
              <div
                key={index}
                className={`relative transition-transform duration-[1500ms] px-2 sm:px-8 my-8 md:my-12 md:px-10 lg:px-14 xl:px-16 ${
                  activeSlide === index
                    ? "md:z-10 md:scale-125"
                    : "md:z-0 md:scale-105"
                }`}
              >
                <a
                  href={item.link}
                  target={item.link.startsWith("http") ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                >
                  <img
                    src={item.image}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-auto object-contain rounded-xl cursor-pointer"
                    draggable="false"
                  />
                </a>
              </div>
            ))}
          </Slider>
        </div>

        <div className="pt-10 pb-1">
          {chineseBook.length > 0 && (
            <div className="md:py-10">
              <div className="w-full mx-auto mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-[#02264A] mb-2">
                  {langs ? "Comprehensive Chinese Book" : "Buku Mandarin Komprehensif"}
                </h2>
                <span className="font-semibold text-[#8493AC] text-lg">
                  {langs
                    ? "A complete book for all learning levels."
                    : "Buku lengkap untuk semua level pembelajaran."}
                </span>
              </div>
              <div className="my-8 flex justify-start">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full gap-4 ">
                  {chineseBook.map((item, index) => (
                    <CardCatalog
                      item={item}
                      handleClickItem={() => handleClickItem(item.id)}
                      user={user}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {flashcard.length > 0 && (
            <div className="md:py-10" id="start">
              <div className="w-full mx-auto mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-[#02264A] mb-2">
                  {langs
                    ? "E-Flashcard/HSK"
                    : "E-Flashcard/HSK"}
                </h2>
                <span className="font-semibold text-[#8493AC] text-lg">
                  {langs
                    ? "Interactive digital flashcards, the ultimate learning companion."
                    : "Flashcard digital interaktif, teman belajar paling praktis."}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full gap-4">
                {flashcard.map((item, index) => (
                  <CardCatalog
                    item={item}
                    handleClickItem={() => handleClickItem(item.id)}
                    user={user}
                    isMonthlyProgram
                  />
                ))}
              </div>
            </div>
          )}

          {guideBook.length > 0 && (
            <div className="md:py-10" id="start">
              <div className="w-full mx-auto mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-[#02264A] mb-2">
                  {langs
                    ? "Guide Book"
                    : "Buku Panduan"}
                </h2>
                <span className="font-semibold text-[#8493AC] text-lg">
                  {langs
                    ? "A complete guide from preparation to adaptation in the land of the bamboo curtain."
                    : "Panduan lengkap dari persiapan hingga adaptasi di negeri tirai bambu."}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full gap-4">
                {guideBook.map((item, index) => (
                  <CardCatalog
                    item={item}
                    handleClickItem={() => handleClickItem(item.id)}
                    user={user}
                    isMonthlyProgram
                  />
                ))}
              </div>
            </div>
          )}
          
          {hanziBook.length > 0 && (
            <div className="md:py-10" id="start">
              <div className="w-full mx-auto mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-[#02264A] mb-2">
                  {langs
                    ? "Hanzi Notebook"
                    : "Buku Tulis Hanzi"}
                </h2>
                <span className="font-semibold text-[#8493AC] text-lg">
                  {langs
                    ? "Experience the sensation of focused, distraction-free learning."
                    : "Rasakan sensasi belajar yang fokus dan bebas distraksi."}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full gap-4">
                {hanziBook.map((item, index) => (
                  <CardCatalog
                    item={item}
                    handleClickItem={() => handleClickItem(item.id)}
                    user={user}
                    isMonthlyProgram
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Mainlayouts>
  );
};

const CardCatalog = ({ item, handleClickItem, user, isMonthlyProgram, isDegreeProgram }) => {
  const { _, langs } = useSelector((state) => state.LangReducer);

  return (
    <div>
      <div className="bg-white rounded-2xl border border-neutral-300 flex flex-col w-full h-full">
        <img
          onClick={handleClickItem}
          src={`${process.env.REACT_APP_API_IMG}${item.brand_img}`}
          alt={item.variant}
          className="w-full aspect-video object-cover rounded-t-2xl cursor-pointer"
        />
        <div className="flex flex-col justify-between items-start px-4 py-5">
          <h2
            onClick={handleClickItem}
            className="text-lg font-semibold text-gray-800 mb-2 cursor-pointer"
          >
            {item.variant}
          </h2>
          {isDegreeProgram ? (
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
              {isMonthlyProgram ? (
                <span className="font-light text-sm ml-1">
                  {langs ? "/Month" : "/Bulan"}
                </span>
              ) : null}
            </p>
          )}
          {item.commission ? (
            user?.Role?.role_name === "affiliator" ? (
              <span className="text-sm text-[#3377FF]">
                {langs ? "Earn commission" : "Dapatkan komisi"}{" "}
                {formatRupiah(item.commission || 0)}
              </span>
            ) : (
              <Link
                to={"/join-affiliate"}
                onClick={() => {}}
                className="text-sm text-[#3377FF]"
              >
                {langs ? "Earn commission" : "Dapatkan komisi"}{" "}
                {formatRupiah(item.commission || 0)}
              </Link>
            )
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default CatalogProduct;
