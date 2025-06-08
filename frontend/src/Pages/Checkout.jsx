import React, { useEffect, useState } from "react";
import Mainlayouts from "../Layouts/MainLayouts";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RiArrowLeftLine } from "react-icons/ri";
import { getBrandById } from "../api/brand";
import { getUjianById } from "../api/ujian";
import { formatRupiah } from "../utils/rupiahFormat";
import { validateReveralCode } from "../api/affiliate";
import { getProfile } from "../api/auth";
import { Checkbox, Spin } from "antd";
import Swal from "sweetalert2";

const Checkout = () => {
  const { id, type } = useParams();
  const navigate = useNavigate();

  const isUjian = type === "ujian";

  const [data, setData] = useState({});
  const [reveralCode, setReveralCode] = useState("");
  const [address, setAddress] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [includeCertif, setIncludeCertif] = useState(true); 

  const fetchData = async () => {
    try {
      const response = isUjian ? await getUjianById(id) : await getBrandById(id);
      setData(response.data);
    } catch (err) {
      navigate("/", { replace: true });
    } finally {
      setLoading(false);
    }
  };

  const fetchUser = async () => {
    setIsUserLoading(true);
    try {
      const res = await getProfile();
      if (res.status) {
        setUser(res.data);
        if (res.data?.address) setAddress(res.data.address);
      }
    } finally {
      setIsUserLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    fetchUser();
  }, [id]);

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!isUjian && data.type_product === "fisik" && !address) {
      Swal.fire("Peringatan", "Alamat tidak boleh kosong", "warning");
      setLoading(false);
      return;
    }

    if (reveralCode) {
      try {
        const res = await validateReveralCode(reveralCode);
        if (!res.status) {
          Swal.fire("Error", res.message, "error");
          return;
        }
      } catch (error) {
        Swal.fire("Error", error?.message, "error");
        return;
      }
    }
    if (isUjian) {
      localStorage.setItem("include_certif", includeCertif.toString());
    }
    localStorage.setItem("reveral_code", reveralCode);
    localStorage.setItem("address", address);

    setTimeout(() => {
      navigate(`/pembayaran/${id}${isUjian ? "/ujian" : ""}`);
    }, 100);
  };

  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/", { replace: true });
    return null;
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
  const desc = isUjian ? data.desc : data.detail_brand;
  const img = isUjian ? data.ujian_img : data.brand_img;
  const title = isUjian ? data.nama_ujian : data.variant;
  const price = isUjian ? data.harga_normal : data.price;
  const discount = isUjian ? data.harga_diskon : data.discount_price;
  const certif = isUjian ? data.harga_certif : null;
  const basePrice = discount && discount !== "0" ? Number(discount) : Number(price);
  const totalTransfer = includeCertif && certif ? basePrice + Number(certif) : basePrice;


  return (
    <Mainlayouts>
      <div className="container mx-auto px-6 md:px-12 lg:px-20 py-10 md:py-20">
        <button onClick={() => navigate(-1)} className="text-[#3377FF] text-lg font-medium flex gap-2 items-center mb-6">
          <RiArrowLeftLine /> Kembali
        </button>

        <div className="grid grid-cols-1 md:flex md:items-start md:justify-between gap-10 w-full">
          {/* LEFT */}
          <div className="bg-white rounded-lg w-full md:w-5/12">
            <img src={`${process.env.REACT_APP_API_IMG}${img}`} alt="Product" className="w-full h-auto border-b pb-4" />
            <h1 className="text-2xl font-semibold mt-6">{title}</h1>
            <div
              className="prose text-gray-600 mt-2 leading-relaxed [&_a]:text-blue-600 [&_ul]:list-disc [&_ol]:list-decimal [&_ul]:pl-6 [&_ol]:pl-6"
              dangerouslySetInnerHTML={{
                __html: showFullDesc || desc?.length <= MAX_LENGTH
                  ? desc
                  : `${desc?.substring(0, MAX_LENGTH)}...`
              }}
            />
            {desc?.length > MAX_LENGTH && (
              <button onClick={() => setShowFullDesc(!showFullDesc)} className="text-blue-500 font-medium mt-2 inline-block">
                {showFullDesc ? "Tutup" : "Selengkapnya"}
              </button>
            )}
          </div>

          {/* RIGHT */}
          <div className="bg-white p-6 rounded-lg border md:w-6/12">
            {isUjian && certif && (
              <>
                <h2 className="text-lg font-semibold mb-2">Include Certificate</h2>
                <div className="flex items-center mb-4">
                  <Checkbox checked={includeCertif} onChange={(e) => setIncludeCertif(e.target.checked)} />
                  <span className="ml-2">+ E-Certificate</span>
                </div>
              </>
            )}
            <h2 className="text-lg font-semibold mb-2">Kode Referal</h2>
            <input
              type="text"
              value={reveralCode}
              onChange={(e) => setReveralCode(e.target.value)}
              placeholder="Masukkan Kode Reveral Affiliator (Opsional)"
              className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none"
            />

            {!isUjian && data.type_product === "fisik" && (
              <>
                <h2 className="text-lg font-semibold mb-2 mt-4">Alamat</h2>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  disabled={isUserLoading}
                  placeholder={isUserLoading ? "Loading..." : "Masukkan Alamatmu untuk pengiriman produk"}
                  className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none"
                />
              </>
            )}

            <h2 className="text-lg font-semibold mt-6">Detail Pembayaran</h2>
            <div className="mt-3">
              <div className="flex justify-between text-gray-700">
                <span>Harga Item</span>
                <span className="font-semibold">{formatRupiah(price)}</span>
              </div>

              {/* Tambahan jika Include Sertifikat aktif */}
              {isUjian && certif && includeCertif && (
                <div className="flex justify-between mt-1 text-gray-700">
                  <span>Biaya Sertifikat</span>
                  <span className="text-blue-600">+ {formatRupiah(certif)}</span>
                </div>
              )}

              <div className="flex justify-between mt-1 text-gray-700">
                <span>Promo</span>
                <span className="text-green-500">
                  {discount && discount !== "0" ? `- ${formatRupiah(price - discount)}` : `- Rp 0`}
                </span>
              </div>


              <hr className="my-2" />

              <div className="flex justify-between text-xl font-bold">
                <span>Total Transfer</span>
                <span>{formatRupiah(totalTransfer)}</span>
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
