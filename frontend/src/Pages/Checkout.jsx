import React, { useEffect, useState } from "react";
import Mainlayouts from "../Layouts/MainLayouts";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RiArrowLeftLine } from "react-icons/ri";
import { getBrandById } from "../api/brand";
import { formatRupiah } from "../utils/rupiahFormat";
import { validateReveralCode } from "../api/affiliate";
import { Spin } from "antd";
import Swal from "sweetalert2";

const Checkout = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [brandData, setBrandData] = useState({});
    const [reveralCode, setReveralCode] = useState("");
    const [loading, setLoading] = useState(true);
    const [showFullDesc, setShowFullDesc] = useState(false);
    const [validReveral, setValidReveral] = useState(null);
    
    const fetchBrand = async () => {
      try {
        const response = await getBrandById(id);
        setBrandData(response.data);
      } catch (error) {
        console.error(error);
        if(error.status == 400 || error.status == 401 || error.status == 403) {
          navigate('/', {replace: true});
          return;
        }
      } finally{
        setLoading(false);
      }
    };
    
    
    useEffect(() => {
        fetchBrand();
    }, [id]);

    const handlePayment = async (e) => {
        e.preventDefault();

        setLoading(true)
        if (reveralCode) {
            try {
                const response = await validateReveralCode(reveralCode);
                if (!response.status) {
                    Swal.fire("Error", response.message, "error");
                    return;
                }
                setValidReveral(true);
            } catch (error) {
              console.log(error)
                Swal.fire("Error", error?.message, "error");
                return;
            } finally {
              setLoading(false);
            }
        }

        localStorage.setItem("reveral_code", reveralCode);
        navigate(`/pembayaran/${id}`);
    };

    const token = localStorage.getItem("token");
    if(!token) {
      navigate('/', {replace: true});
      return;
    }

    if (loading) {
      return (
        <Mainlayouts>
          <div className="flex justify-center items-center h-[100vh]">
              <Spin size="large" />
          </div>
        </Mainlayouts>
      );
    }

  const MAX_LENGTH = 200;
  const detailBrandText = brandData.detail_brand || "";

    return (
        <Mainlayouts>
            <div className="container mx-auto px-6 md:px-12 lg:px-20 py-10 md:py-20">
              <button onClick={() => navigate(-1)} className="text-[#3377FF] text-lg font-medium flex gap-2 items-center mb-6">
                <RiArrowLeftLine /> Kembali
              </button>

                <div className="grid grid-cols-1 md:flex md:items-start md:justify-between gap-10 w-full">
                    {/* Detail Produk */}
                    <div className="bg-white rounded-lg w-full md:w-5/12">
                        <img src={`${process.env.REACT_APP_API_IMG}${brandData.brand_img}`} alt="Product" className="w-full h-auto border-b pb-4" />
                        <h1 className="text-2xl font-semibold mt-6">{brandData.variant}</h1>
                        <div
                        className="prose text-gray-600 mt-2 leading-relaxed w-full md:w-10/12 
                                  [&_a]:text-blue-600 [&_a]:underline 
                                  [&_ul]:list-disc [&_ol]:list-decimal [&_ul]:pl-6 [&_ol]:pl-6"
                        dangerouslySetInnerHTML={{
                          __html:
                            showFullDesc || detailBrandText.length <= MAX_LENGTH
                              ? detailBrandText
                              : `${detailBrandText.substring(0, MAX_LENGTH)}...`,
                        }}
                      />

                      {detailBrandText.length > MAX_LENGTH && (
                        <button
                          onClick={() => setShowFullDesc(!showFullDesc)}
                          className="text-blue-500 font-medium mt-2 inline-block"
                        >
                          {showFullDesc ? "Tutup" : "Selengkapnya"}
                        </button>
                      )}
                    </div>

                    {/* Kode Referral + Detail Pembayaran */}
                    <div className="bg-white p-6 rounded-lg border md:w-6/12">
                        <h2 className="text-lg font-semibold mb-2">Kode Referal</h2>
                        <input
                            type="text"
                            value={reveralCode}
                            onChange={(e) => setReveralCode(e.target.value)}
                            placeholder="Masukkan Kode Reveral Affiliator (Opsional)"
                            className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none"
                        />

                        <h2 className="text-lg font-semibold mt-6">Detail Pembayaran</h2>
                        <div className="mt-3">
                            <div className="flex justify-between text-gray-700">
                                <span>Harga Item</span>
                                <span className="font-semibold">{formatRupiah(brandData.price)}</span>
                            </div>
                            <div className="flex justify-between mt-1">
                                <span className="text-gray-700">Promo</span>
                                <span className="text-green-500">{brandData.discount_price ? formatRupiah(brandData.discount_price - brandData.price) : `- Rp 0`}</span>
                            </div>
                            <hr className="my-2" />
                            <div className="flex justify-between text-xl font-bold">
                                <span>Total Transfer</span>
                                <span>{brandData.discount_price ? formatRupiah(brandData.discount_price) : formatRupiah(brandData.price)}</span>
                            </div>
                        </div>

                        <button onClick={handlePayment} className="mt-6 w-full bg-[#FFCC00] text-black font-semibold py-3 rounded-xl">
                            Pilih Metode Pembayaran
                        </button>
                    </div>
                </div>
            </div>
        </Mainlayouts>
    );
};

export default Checkout;
