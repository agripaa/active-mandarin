import React, { useState, useEffect } from "react";
import Mainlayouts from "../Layouts/MainLayouts";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import { getBrandCategoryTurunan } from "../api/brand";
import { formatRupiah } from "../utils/rupiahFormat";
import { Spin } from "antd";
import { getAllTurunanBrand } from "../api/turunan";
import { handleClickItem } from "../utils/handleClickItem";
import { Link } from "react-router-dom";
import { getProfile } from "../api/auth";

const Catalog = () => {
  const { _, langs } = useSelector((state) => state.LangReducer);
  const [loading, setLoading] = useState(false);
  const [activeSlide, setActiveSlide] = React.useState(0);
  const [galleryData, setGalleryData] = useState([]); 
  const [turunan, setTurunan] = useState([]);
  const [groupedData, setGroupedData] = useState({});
  const [user, setUser] = useState(null);

  useEffect(() => {
    handleProfileUser();
    fetchTurunanData();
    fetchData();
  }, []);

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

  const fetchTurunanData = async () => {
    try {
      const res = await getAllTurunanBrand();
      setTurunan(res.data);
    } catch (error) {
      
    }
  }

  useEffect(() => {
    if (turunan.length > 0) {
      fetchAllData();
    }
  }, [turunan]); 

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const promises = turunan?.map((t) => getBrandCategoryTurunan("program", t.turunan));
      const responses = await Promise.allSettled(promises);

      const groupedData = turunan.reduce((acc, t, index) => {
        const status = responses[index]?.status;
        if (status === "fulfilled" && responses[index].value?.data) {
          const data = responses[index].value.data;
          acc[t.turunan] = {
            title: t.title,
            subtitle: t.sub_title,
            data: data,
          };
        }
        return acc;
      }, {});

      setGroupedData(groupedData);
    } catch (error) {
      console.error("Fetching data failed:", error);
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

  if (loading) {
    return (
      <Mainlayouts>
        <div className="flex justify-center items-center h-[80vh]">
          <Spin size="large" />
        </div>
      </Mainlayouts>
    );
  }

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

        <div className="md:pt-10 pb-1">
        {Object.keys(groupedData).map((turunanKey, index) => {
          const group = groupedData[turunanKey];
          return (
            <div key={index} className="md:py-10 mb-10 md:mb-0">
              <div className="w-full mx-auto mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-[#02264A] mb-2">
                  {langs ? group.title : group.title} {/* You can localize the title */}
                </h2>
                <span className="font-semibold text-[#8493AC] text-lg">
                  {langs ? group.subtitle : group.subtitle} {/* You can localize the subtitle */}
                </span>
              </div>

              {/* Grid untuk menampilkan data dari setiap turunan */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full gap-4">
                {group.data.map((item, itemIndex) => (
                  <CardCatalog
                    key={itemIndex}
                    item={item}
                    handleClickItem={() => handleClickItem(item.id)}
                    user={user}
                    isDegreeProgram={item.turunan === "Non - Degree Program" || item.turunan === "Degree Program"}
                  />
                ))}
              </div>
            </div>
          );
        })}
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
          className="w-full aspect-video object-fill rounded-t-2xl cursor-pointer"
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
          {item.commission && !isDegreeProgram ? (
            user?.Role?.role_name === "user" ? (
              <Link
                to={"/join-affiliate"}
                onClick={() => {}}
                className="text-sm text-[#3377FF]"
              >
                {langs ? "Earn commission" : "Dapatkan komisi"}{" "}
                {formatRupiah(item.commission || 0)}
              </Link>
            ) : (
              <span className="text-sm text-[#3377FF]">
                {langs ? "Earn commission" : "Dapatkan komisi"}{" "}
                {formatRupiah(item.commission || 0)}
              </span>
            )
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Catalog;
