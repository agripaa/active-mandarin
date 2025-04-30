import React, { useEffect, useState } from "react";
import Mainlayouts from "../Layouts/MainLayouts";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RiArrowLeftLine } from "react-icons/ri";
import { getBrandById, getBrandCategoryTurunan } from "../api/brand";
import { formatRupiah } from "../utils/rupiahFormat";
import { Spin } from "antd";

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [brandData, setBrandData] = useState({});
  const [similarData, setSimilarData] = useState([]);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const { _, langs } = useSelector((state) => state.LangReducer);
  const [dynamicMaxLength, setDynamicMaxLength] = useState(200); // Default fallback
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

  // Update max length based on window width
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      
      // Adjust MAX_LENGTH based on breakpoints
      if (window.innerWidth >= 1536) {
        setDynamicMaxLength(600);
      } else if (window.innerWidth >= 1280) {
        setDynamicMaxLength(450);
      } else if (window.innerWidth >= 1024) {
        setDynamicMaxLength(210);
      } else if (window.innerWidth >= 768) {
        setDynamicMaxLength(200);
      } else {
        setDynamicMaxLength(200);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initialize
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleCheckout = (e, id) => {
    e.preventDefault();
    navigate(`/checkout/${id}`);
  };

  const fetchBrand = async () => {
    try {
      const response = await getBrandById(id);
      setBrandData(response.data);
    } catch (error) {
      navigate("/", {replace: true})
    } finally{
      setLoading(false)
    }
  };

  const fetchSimilarBrand = async () => {
    try {
      if (!brandData.category_brand || !brandData.turunan) return;

      const response = await getBrandCategoryTurunan(brandData.category_brand, brandData.turunan);
      const filteredData = response.data.filter((item) => item.id !== parseInt(id));

      setSimilarData(filteredData);
    } catch (error) {
      if(error.status == 400 || error.status == 403) {
        navigate("/", {replace: true})
        return;
      }
    }
  };

  
  useEffect(() => {
    fetchBrand();
  }, [id]);
  
  useEffect(() => {
    if (brandData.category_brand && brandData.turunan) {
      fetchSimilarBrand();
    }
  }, [brandData]);
  
  if (loading) {
    return (
        <Mainlayouts>
            <div className="flex justify-center items-center h-[80vh]">
                <Spin size="large" />
            </div>
        </Mainlayouts>
    );
  }

  const detailBrandText = brandData.detail_brand || "";

  const capitalize = (str) => {
    if (!str) return "-";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <Mainlayouts>
      <div className="container mx-auto px-6 md:px-12 lg:px-20 py-10">
        {/* Kembali */}
        <button onClick={() => navigate(-1)} className="text-[#3377FF] text-lg font-medium flex gap-2 items-center mb-6">
          <RiArrowLeftLine /> Kembali
        </button>

        <div className="flex flex-col-reverse justify-center md:flex-row md:justify-between items-start gap-8 min-h-0">
          {/* Detail Produk */}
          <div className="flex-grow">
            <div className="flex flex-col gap-3 mb-6">
              <h1 className="text-4xl font-semibold">{capitalize(brandData.variant)}</h1>
              {brandData.category_brand == "product" ? (
                <span className="flex items-center justify-center bg-blue-500 text-white text-base font-medium py-1 px-3 rounded-2xl w-[19%]">
                  Produk {capitalize(brandData.type_product)}
                </span>
              ) : ""}
            </div>

            {brandData.discount_price && brandData.discount_price != "0" ? (
              <>
                <p className="text-3xl text-gray-900 font-semibold mt-2">
                  {formatRupiah(brandData.discount_price)} 
                  {!["Mentor Scholarship", "Non Degree (Kelas Bahasa di China)", "Degree"].includes(brandData.turunan) ? <span className="text-sm">{brandData.category_brand == "product" ? "/item" : langs ? "/Month" : "/Bulan"}</span> : ""}
                </p>
                <p className="text-lg text-red-500 line-through">{formatRupiah(brandData.price)}</p>
              </>
            ) : (
              <p className="text-3xl text-gray-900 font-semibold mt-2">
                {formatRupiah(brandData.price)} 
                {!["Mentor Scholarship", "Non Degree (Kelas Bahasa di China)", "Degree"].includes(brandData.turunan) ? <span className="text-sm">{brandData.category_brand == "product" ? "/item" : langs ? "/Month" : "/Bulan"}</span> : ""}
              </p>
            )}

            {brandData.commission ? (
              <p className="text-blue-600 font-medium mt-2">Dapatkan Komisi {formatRupiah(brandData.commission)}</p>
            ) : null}
            
            <h2 className="text-xl font-semibold mt-6">Detail</h2>
            <div
              className={"prose text-gray-600 mt-2 overflow-auto grow leading-relaxed w-full md:w-10/12 [&_a]:text-blue-600 [&_a]:underline [&_ul]:list-disc [&_ol]:list-decimal [&_ul]:pl-6 [&_ol]:pl-6"}
              dangerouslySetInnerHTML={{
                __html:
                  showFullDesc || detailBrandText.length <= dynamicMaxLength
                    ? detailBrandText
                    : `${detailBrandText.substring(0, dynamicMaxLength)}...`,
              }}
            />

            {detailBrandText.length > dynamicMaxLength && (
              <button
                onClick={() => setShowFullDesc(!showFullDesc)}
                className="text-blue-500 font-medium mt-2 inline-block"
              >
                {showFullDesc ? "Tutup" : "Selengkapnya"}
              </button>
            )}
          </div>

          {/* Gambar Produk + Tombol Beli */}
          {brandData.category_brand === "program" && (brandData.turunan === "Non Degree (Kelas Bahasa di China)" || brandData.turunan === "Degree") ? (
            <div className="bg-white shadow-md w-full md:w-5/12 rounded-lg p-6 flex-shrink-0">
              <img
                src={`${process.env.REACT_APP_API_IMG}${brandData.brand_img}`}
                alt="Product"
                className="w-full h-auto rounded-md"
              />
              <div className="flex gap-6 mt-4">
                {brandData.link_classroom ? (
                  <Link to={brandData.link_classroom} target="_blank" className="w-full block">
                    <button
                      className="py-3 w-full border-2 border-[#8493AC] text-xs text-black font-semibold rounded-xl transition-all duration-300 hover:bg-yellow-500 sm:text-sm lg:text-base"
                    >
                      PDF Program
                    </button>
                  </Link>
                ) : null}
                <Link to={'https://wa.me/+6282279506450'} target="_blank" className="w-full block">
                  <button
                    className="w-full bg-[#FFCC00] hover:bg-[#debc38] text-black font-semibold py-3 rounded-xl"
                  >
                    Chat Mintive
                  </button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="bg-white shadow-md w-full md:w-5/12 rounded-lg p-6 flex-shrink-0">
              <img
                src={`${process.env.REACT_APP_API_IMG}${brandData.brand_img}`}
                alt="Product"
                className="w-full h-auto rounded-md"
              />
              <button
                onClick={(e) => handleCheckout(e, brandData.id)}
                className="mt-4 w-full bg-[#FFCC00] hover:bg-[#debc38] text-black font-semibold py-3 rounded-xl"
              >
                Beli Produk
              </button>
            </div>
          )}
        </div>

        {/* Produk Serupa */}
        <h2 className="text-3xl font-semibold mt-12">Similar {brandData.category_brand == "product" ? "Products" : "Programs"}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {similarData.length === 0 ? (
            <p className="text-gray-500">Tidak ada produk serupa.</p>
          ) : (
            similarData.map((item, index) => (
              <a href={`/detail/${item.id}`} key={index} className="p-0 m-0">
                <div className="bg-white rounded-2xl border border-neutral-300 flex flex-col w-full h-full relative">
                  <img
                    src={`${process.env.REACT_APP_API_IMG}${item.brand_img}`}
                    alt={item.variant}
                    className="w-full h-56 object-fill rounded-t-2xl"
                  />
                  <div className="flex flex-col justify-between items-start px-4 py-5">
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">{item.variant}</h2>
                    <p className="font-semibold text-lg mb-2">
                      {item.discount_price && item.discount_price != "0" ? formatRupiah(item.discount_price) : formatRupiah(item.price)}
                      {!["Mentor Scholarship", "Non Degree (Kelas Bahasa di China)", "Degree"].includes(item?.turunan) ?<span className="font-light text-sm ml-1">{langs ? "/Month" : "/Bulan"}</span> : ""}
                    </p>
                    <div className="flex mt-2">
                      <span className="text-sm text-[#3377FF]">
                        {langs ? "Earn commission" : "Dapatkan komisi"} {formatRupiah(item.commission) || formatRupiah(0)}
                      </span>
                    </div>
                  </div>
                  {item.category_brand == "product" ? (
                    <span className="absolute bottom-[42%] right-2 bg-blue-500 text-white text-sm font-medium py-1 px-3 rounded-2xl">
                      Produk {capitalize(item.type_product)}
                    </span>
                  ) : ""}
                </div>
              </a>
            ))
          )}
        </div>
      </div>
    </Mainlayouts>
  );
};

export default DetailPage;
