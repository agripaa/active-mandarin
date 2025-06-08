import React, { useEffect, useState } from "react";
import Mainlayouts from "../Layouts/MainLayouts";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RiArrowLeftLine } from "react-icons/ri";
import { getBrandById, getBrandCategoryTurunan } from "../api/brand";
import { getUjianById } from "../api/ujian";
import { formatRupiah } from "../utils/rupiahFormat";
import { Spin } from "antd";

const DetailPage = () => {
  const { id, type } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [brandData, setBrandData] = useState({});
  const [similarData, setSimilarData] = useState([]);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const { _, langs } = useSelector((state) => state.LangReducer);
  const [dynamicMaxLength, setDynamicMaxLength] = useState(200);
  const isUjian = type === "ujian";

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1536) setDynamicMaxLength(600);
      else if (window.innerWidth >= 1280) setDynamicMaxLength(450);
      else if (window.innerWidth >= 1024) setDynamicMaxLength(210);
      else setDynamicMaxLength(200);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchDetail = async () => {
    try {
      const response = isUjian ? await getUjianById(id) : await getBrandById(id);
      setBrandData(response.data);
    } catch (error) {
      navigate("/", { replace: true });
    } finally {
      setLoading(false);
    }
  };

  const fetchSimilarBrand = async () => {
    if (!brandData.category_brand || !brandData.turunan) return;
    try {
      const response = await getBrandCategoryTurunan(brandData.category_brand, brandData.turunan);
      const filtered = response.data.filter((item) => item.id !== parseInt(id));
      setSimilarData(filtered);
    } catch (err) {
      if (err.status === 400 || err.status === 403) navigate("/", { replace: true });
    }
  };

  useEffect(() => {
    fetchDetail();
  }, [id]);

  useEffect(() => {
    if (!isUjian && brandData.category_brand && brandData.turunan) {
      fetchSimilarBrand();
    }
  }, [brandData]);

  const handleCheckout = (e, id) => {
    e.preventDefault();
    isUjian ? navigate(`/checkout/${id}/ujian`) : navigate(`/checkout/${id}`);
  };

  const capitalize = (str) => (!str ? "-" : str.charAt(0).toUpperCase() + str.slice(1));

  // Aliases untuk menyamakan ujian dan brand
  const imageKey = isUjian ? brandData.ujian_img : brandData.brand_img;
  const title = isUjian ? brandData.nama_ujian : brandData.variant;
  const description = isUjian ? brandData.desc : brandData.detail_brand;
  const hargaNormal = isUjian ? brandData.harga_normal : brandData.price;
  const hargaDiskon = isUjian ? brandData.harga_diskon : brandData.discount_price;
  const hargaCertif = isUjian ? brandData.harga_certif : null;
  const komisi = brandData.commission?.toString() || "0";

  if (loading) {
    return (
      <Mainlayouts>
        <div className="flex justify-center items-center h-[80vh]">
          <Spin size="large" />
        </div>
      </Mainlayouts>
    );
  }

  return (
    <Mainlayouts>
      <div className="container mx-auto px-6 md:px-12 lg:px-20 py-10">
        <button onClick={() => navigate(-1)} className="text-[#3377FF] text-lg font-medium flex gap-2 items-center mb-6">
          <RiArrowLeftLine /> Kembali
        </button>

        <div className="flex flex-col-reverse md:flex-row justify-between gap-8">
          {/* LEFT CONTENT */}
          <div className="flex-grow">
            <div className="flex flex-col gap-3 mb-6">
              <h1 className="text-4xl font-semibold">{capitalize(title)}</h1>
              {!isUjian && brandData.category_brand === "product" && (
                <span className={`flex items-center justify-center text-base font-medium py-1 px-3 rounded-2xl w-[140px] ${brandData.type_product === "fisik" ? "bg-[#FFCC00] text-black" : "bg-blue-500 text-white"}`}>
                  Produk {capitalize(brandData.type_product)}
                </span>
              )}
            </div>

            {/* Harga dan Komisi */}
            {(!isUjian && brandData.category_brand === "program" && ["Non - Degree Program", "Degree Program"].includes(brandData.turunan)) ? null : (
              <div>
                {hargaDiskon && hargaDiskon !== "0" ? (
                  <>
                    <p className="text-3xl text-gray-900 font-semibold mt-2">
                      {formatRupiah(hargaDiskon)}
                      {!isUjian && !["Mentor Scholarship", "Non - Degree Program", "Degree Program"].includes(brandData.turunan) && (
                        <span className="text-sm">{brandData.category_brand === "product" ? "/item" : brandData.category_buy}</span>
                      )}
                    </p>
                    <p className="text-lg text-red-500 line-through">{formatRupiah(hargaNormal)}</p>
                  </>
                ) : (
                  <p className="text-3xl text-gray-900 font-semibold mt-2">
                    {formatRupiah(hargaNormal)}
                    {!isUjian && !["Mentor Scholarship", "Non - Degree Program", "Degree Program"].includes(brandData.turunan) && (
                      <span className="text-sm">{brandData.category_brand === "product" ? "/item" : brandData.category_buy}</span>
                    )}
                  </p>
                )}
                {hargaCertif && <p className="text-sm text-blue-500 mt-1">+ Sertifikat {formatRupiah(hargaCertif)}</p>}
                {(komisi && komisi !== "0") ? <p className="text-blue-600 font-medium mt-2">Dapatkan Komisi {formatRupiah(komisi)}</p> : ""}
              </div>
            )}

            {/* Deskripsi */}
            <h2 className="text-xl font-semibold mt-6">Detail</h2>
            <div
              className="prose text-gray-600 mt-2 overflow-auto grow leading-relaxed w-full md:w-10/12 [&_a]:text-blue-600 [&_ul]:list-disc [&_ol]:list-decimal [&_ul]:pl-6 [&_ol]:pl-6"
              dangerouslySetInnerHTML={{
                __html:
                  showFullDesc || (description?.length || 0) <= dynamicMaxLength
                    ? description
                    : `${description?.substring(0, dynamicMaxLength)}...`,
              }}
            />
            {description?.length > dynamicMaxLength && (
              <button
                onClick={() => setShowFullDesc(!showFullDesc)}
                className="text-blue-500 font-medium mt-2 inline-block"
              >
                {showFullDesc ? "Tutup" : "Selengkapnya"}
              </button>
            )}
          </div>

          {/* RIGHT SIDEBAR: Gambar & Tombol */}
          <div className="bg-white shadow-md w-full md:w-5/12 rounded-lg p-6 flex-shrink-0">
            <img
              src={`${process.env.REACT_APP_API_IMG}${imageKey}`}
              alt="Preview"
              className="w-full h-auto rounded-md"
            />
            {!isUjian && brandData.category_brand === "program" && ["Non - Degree Program", "Degree Program"].includes(brandData.turunan) ? (
              <div className="flex gap-6 mt-4">
                {brandData.link_classroom && (
                  <Link to={brandData.link_classroom} target="_blank" className="w-full block">
                    <button className="py-3 w-full border-2 border-[#8493AC] text-xs text-black font-semibold rounded-xl hover:bg-yellow-500">
                      PDF Program
                    </button>
                  </Link>
                )}
                <Link to="https://wa.me/+6282279506450" target="_blank" className="w-full block">
                  <button className="w-full bg-[#FFCC00] hover:bg-[#debc38] text-black font-semibold py-3 rounded-xl">
                    Chat Mintive
                  </button>
                </Link>
              </div>
            ) : (
              <button
                onClick={(e) => handleCheckout(e, brandData.id)}
                className="mt-4 w-full bg-[#FFCC00] hover:bg-[#debc38] text-black font-semibold py-3 rounded-xl"
              >
                {isUjian ? "Ikuti Ujian" : "Beli Produk"}
              </button>
            )}
          </div>
        </div>

        {/* Similar Produk */}
        {!isUjian && (
          <>
            <h2 className="text-3xl font-semibold mt-12">Similar {brandData.category_brand === "product" ? "Products" : "Programs"}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              {similarData.length === 0 ? (
                <p className="text-gray-500">Tidak ada produk serupa.</p>
              ) : (
                similarData.map((item, index) => (
                  <a href={`/detail/${item.id}`} key={index}>
                    <div className="bg-white rounded-2xl border border-neutral-300 flex flex-col w-full h-full relative">
                      <img
                        src={`${process.env.REACT_APP_API_IMG}${item.brand_img}`}
                        alt={item.variant}
                        className="w-full h-56 object-fill rounded-t-2xl"
                      />
                      <div className="flex flex-col justify-between items-start px-4 py-5">
                        <h2 className="text-lg font-semibold text-gray-800 mb-2">{item.variant}</h2>
                        <p className="font-semibold text-lg mb-2">
                          {item.discount_price && item.discount_price !== "0"
                            ? formatRupiah(item.discount_price)
                            : formatRupiah(item.price)}
                          {!["Mentor Scholarship", "Non - Degree Program", "Degree Program"].includes(item?.turunan) && (
                            <span className="font-light text-sm ml-1">
                              {langs ? "/Month" : "/Bulan"}
                            </span>
                          )}
                        </p>
                        <div className="flex mt-2">
                          <span className="text-sm text-[#3377FF]">
                            {langs ? "Earn commission" : "Dapatkan komisi"}{" "}
                            {formatRupiah(item.commission) || formatRupiah(0)}
                          </span>
                        </div>
                      </div>
                      {item.category_brand === "product" && (
                        <span className={`absolute bottom-[42%] right-2 ${item.type_product === "fisik" ? "bg-[#FFCC00] text-black" : "bg-blue-500 text-white"} text-sm font-medium py-1 px-3 rounded-2xl`}>
                          Produk {capitalize(item.type_product)}
                        </span>
                      )}
                    </div>
                  </a>
                ))
              )}
            </div>
          </>
        )}
      </div>
    </Mainlayouts>
  );
};

export default DetailPage;
