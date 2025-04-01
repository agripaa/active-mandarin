import React, { useState, useEffect } from "react";
import Mainlayouts from "../Layouts/MainLayouts";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import { getBrandCategoryTurunan } from "../api/brand";
import { formatRupiah } from "../utils/rupiahFormat";
import { Spin } from "antd";

const Catalog = () => {
  const { _, langs } = useSelector((state) => state.LangReducer);
  const [loading, setLoading] = useState(false);
  const [nonDegree, setNonDegree] = useState([]);
  const [degree, setDegree] = useState([]);
  const [mentorScholarship, setMentorScholarship] = useState([]);
  const [kelasHSK, setKelasHSK] = useState([]);
  const [premiumMandarin, setPremiumMandarin] = useState([]);
  const [educonsult, setEduconsult] = useState([]);
  const [activeSlide, setActiveSlide] = React.useState(0);
  const [galleryData, setGalleryData] = useState([]); // State untuk menyimpan data dari API/sumber

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const responses = await Promise.allSettled([
        getBrandCategoryTurunan("program", "Non Degree (Kelas Bahasa di China)"),
        getBrandCategoryTurunan("program", "Degree"),
        getBrandCategoryTurunan("program", "Mentor Scholarship"),
        getBrandCategoryTurunan("program", "Kelas HSK"),
        getBrandCategoryTurunan("program", "Premium Mandarin Learning"),
        getBrandCategoryTurunan("program", "Educonsult S1-S3 Full Cover")
      ]);
  
      setNonDegree(responses[0].status === "fulfilled" ? responses[0].value.data || [] : []);
      setDegree(responses[1].status === "fulfilled" ? responses[1].value.data || [] : []);
      setMentorScholarship(responses[2].status === "fulfilled" ? responses[2].value.data || [] : []);
      setKelasHSK(responses[3].status === "fulfilled" ? responses[3].value.data || [] : []);
      setPremiumMandarin(responses[4].status === "fulfilled" ? responses[4].value.data || [] : []);
      setEduconsult(responses[5].status === "fulfilled" ? responses[5].value.data || [] : []);
    } catch (error) {
      console.error("🔥 ERROR fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchData = () => {
    const images = [
      {
        image: "/assets/banner/Web Banne Act CTA-1.png",
        link: "#start",
      },
      {
        image: "/assets/banner/Web Banne Act CTA-2.png",
        link: "https://wa.me/+6282279506450",
      },
      {
        image: "/assets/banner/Web Banne Act CTA-3.png",
        link: "https://wa.me/+6282279506450",
      },
      {
        image: "/assets/banner/Web Banne Act CTA-4.png",
        link: "#Mentor",
      },
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
      {
        image: "/assets/banner/Web Banne Act CTA-10.png",
        link: "#Mentor",
      },
      {
        image: "/assets/banner/Web Banne Act CTA-11.png",
        link: "#Mentor",
      },
      {
        image: "/assets/banner/Web Banne Act CTA-12.png",
        link: "#Mentor",
      },
    ];
    setGalleryData(images);
  };

  useEffect(() => {
    fetchData();
  }, []);

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
          <div>
            <div className="w-full mx-auto mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-[#02264A] mb-2">
                {langs ? "From Zero To Hero" : "Dari Nol Menjadi Pahlawan"}
              </h2>
              <span className="font-semibold text-[#8493AC] text-lg">
                {langs
                  ? "Find the premium class and opportunities along the way "
                  : "Temukan kelas premium dan peluang di sepanjang prosesnya"}
              </span>
            </div>
            <div className="my-8 flex justify-start">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full gap-4">
                  {kelasHSK.map((item, index) => (
                    <div onClick={() => handleClickItem(item.id)} className="cursor-pointer">
                      <div className="bg-white rounded-2xl border border-neutral-300 flex flex-col w-full h-full">
                        <img
                          src={`${process.env.REACT_APP_API_IMG}${item.brand_img}`}
                          alt={item.variant}
                          className="w-full h-56 object-cover rounded-t-2xl"
                        />
                        <div className="flex flex-col justify-between items-start px-4 py-5">
                          <h2 className="text-lg font-semibold text-gray-800 mb-2">{item.variant}</h2>
                          <p className="font-semibold text-lg mb-2">
                            {item.discount_price ? formatRupiah(item.discount_price) : formatRupiah(item.price)}
                            <span className="font-light text-sm ml-1">{langs ? "/Month" : "/Bulan"}</span>
                          </p>
                          <span className="text-sm text-[#3377FF]">
                            {langs ? "Earn commission" : "Dapatkan komisi"} {formatRupiah(item.commission || 0)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <div className="md:py-10" id="start">
            <div className="w-full mx-auto mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-[#02264A] mb-2">
                {langs
                  ? "Premium Mandarin Learning"
                  : "Pembelajaran Mandarin Premium"}
              </h2>
              <span className="font-semibold text-[#8493AC] text-lg">
                {langs
                  ? "For your bright future starts here"
                  : "Untuk masa depan cerah Anda dimulai di sini"}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full gap-4">
                  {premiumMandarin.map((item, index) => (
                    <div onClick={() => handleClickItem(item.id)} className="cursor-pointer">
                      <div className="bg-white rounded-2xl border border-neutral-300 flex flex-col w-full h-full">
                        <img
                          src={`${process.env.REACT_APP_API_IMG}${item.brand_img}`}
                          alt={item.variant}
                          className="w-full h-56 object-cover rounded-t-2xl"
                        />
                        <div className="flex flex-col justify-between items-start px-4 py-5">
                          <h2 className="text-lg font-semibold text-gray-800 mb-2">{item.variant}</h2>
                          <p className="font-semibold text-lg mb-2">
                            {item.discount_price ? formatRupiah(item.discount_price) : formatRupiah(item.price)}
                            <span className="font-light text-sm ml-1">{langs ? "/Month" : "/Bulan"}</span>
                          </p>
                          <span className="text-sm text-[#3377FF]">
                            {langs ? "Earn commission" : "Dapatkan komisi"} {formatRupiah(item.commission || 0)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
          </div>

          <div className="py-10" id="Mentor">
            <div className="w-full mx-auto mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-[#02264A] mb-2">
                {langs
                  ? "Mentor Scholarship Program"
                  : "Program Beasiswa Mentor"}
              </h2>
              <span className="font-semibold text-[#8493AC] text-lg">
                {langs
                  ? "Find the programs and opportunities along the way "
                  : "Temukan program dan peluang di sepanjang jalan"}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full gap-4">
                  {mentorScholarship.map((item, index) => (
                    <div onClick={() => handleClickItem(item.id)} className="cursor-pointer">
                      <div className="bg-white rounded-2xl border border-neutral-300 flex flex-col w-full h-full">
                        <img
                          src={`${process.env.REACT_APP_API_IMG}${item.brand_img}`}
                          alt={item.variant}
                          className="w-full h-56 object-cover rounded-t-2xl"
                        />
                        <div className="flex flex-col justify-between items-start px-4 py-5">
                          <h2 className="text-lg font-semibold text-gray-800 mb-2">{item.variant}</h2>
                          <p className="font-semibold text-lg mb-2">
                            {item.discount_price ? formatRupiah(item.discount_price) : formatRupiah(item.price)}
                            <span className="font-light text-sm ml-1">{langs ? "/Month" : "/Bulan"}</span>
                          </p>
                          <span className="text-sm text-[#3377FF]">
                            {langs ? "Earn commission" : "Dapatkan komisi"} {formatRupiah(item.commission || 0)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
          </div>

          <div className="py-10">
            <div className="w-full mx-auto mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-[#02264A] mb-2">
                {langs
                  ? "Degree Program"
                  : "Program Gelar"}
              </h2>
              <span className="font-semibold text-[#8493AC] text-lg">
                {langs
                  ? "To secure your future, seek knowledge even as far as China."
                  : "Untuk menjamin masa depanmu, carilah ilmu sampai ke Tiongkok."}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full gap-4">
                  {degree.map((item, index) => (
                    <div onClick={() => handleClickItem(item.id)} className="cursor-pointer">
                      <div className="bg-white rounded-2xl border border-neutral-300 flex flex-col w-full h-full">
                        <img
                          src={`${process.env.REACT_APP_API_IMG}${item.brand_img}`}
                          alt={item.variant}
                          className="w-full h-56 object-cover rounded-t-2xl"
                        />
                        <div className="flex flex-col justify-between items-start px-4 py-5">
                          <h2 className="text-lg font-semibold text-gray-800 mb-2">{item.variant}</h2>
                          <p className="font-semibold text-lg mb-2">
                            {item.discount_price ? formatRupiah(item.discount_price) : formatRupiah(item.price)}
                            <span className="font-light text-sm ml-1">{langs ? "/Month" : "/Bulan"}</span>
                          </p>
                          <span className="text-sm text-[#3377FF]">
                            {langs ? "Earn commission" : "Dapatkan komisi"} {formatRupiah(item.commission || 0)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
          </div>

          <div className="py-10">
            <div className="w-full mx-auto mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-[#02264A] mb-2">
                {langs
                  ? "Non - Degree Program"
                  : "Program Non-Gelar"}
              </h2>
              <span className="font-semibold text-[#8493AC] text-lg">
                {langs
                  ? "To secure your future, seek knowledge even as far as China."
                  : "Untuk menjamin masa depanmu, carilah ilmu sampai ke Tiongkok."}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full gap-4">
                  {nonDegree.map((item, index) => (
                    <div onClick={() => handleClickItem(item.id)} className="cursor-pointer">
                      <div className="bg-white rounded-2xl border border-neutral-300 flex flex-col w-full h-full">
                        <img
                          src={`${process.env.REACT_APP_API_IMG}${item.brand_img}`}
                          alt={item.variant}
                          className="w-full h-56 object-cover rounded-t-2xl"
                        />
                        <div className="flex flex-col justify-between items-start px-4 py-5">
                          <h2 className="text-lg font-semibold text-gray-800 mb-2">{item.variant}</h2>
                          <p className="font-semibold text-lg mb-2">
                            {item.discount_price ? formatRupiah(item.discount_price) : formatRupiah(item.price)}
                            <span className="font-light text-sm ml-1">{langs ? "/Month" : "/Bulan"}</span>
                          </p>
                          <span className="text-sm text-[#3377FF]">
                            {langs ? "Earn commission" : "Dapatkan komisi"} {formatRupiah(item.commission || 0)}
                          </span>
                        </div>
                      </div>
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
