import React, { useState, useEffect } from "react";
import Mainlayouts from "../Layouts/MainLayouts";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RiArrowLeftLine } from "react-icons/ri";
import { getBrandById } from "../api/brand";
import { createTransaction } from "../api/transaksi";
import Swal from "sweetalert2";
import { Spin } from "antd";

const Pembayaran = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [metode, setMetode] = useState("QRIS");
  const [brandData, setBrandData] = useState({});
  const [showQRIS, setShowQRIS] = useState(false);
  const [proof, setProof] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const reveralCode = localStorage.getItem("reveral_code");

  useEffect(() => {
    fetchBrand();
  }, [id]);

  const fetchBrand = async () => {
    try {
      const response = await getBrandById(id);
      setBrandData(response.data);
    } catch (error) {
      if (error.status == 400 || error.status == 401 || error.status == 403) {
        navigate("/", { replace: true });
        return;
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
    if (file.size > MAX_FILE_SIZE) {
      Swal.fire(
        "Ukuran File Produk Terlalu Besar",
        "File maksimum 5MB.",
        "error"
      );
      return;
    }

    if (file) {
      setProof(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!proof) {
      Swal.fire("Error!", "Bukti pembayaran wajib diunggah!", "error");
      return;
    }

    const formData = new FormData();
    formData.append("brand_id", id);
    formData.append("payment_method", metode);
    formData.append("proof_transaction", proof);
    if (reveralCode) formData.append("reveral_code", reveralCode);

    setLoadingSubmit(true); // ⏳ Start loading
    try {
      const response = await createTransaction(formData);
      Swal.fire("Berhasil!", "Transaksi berhasil dibuat!", "success").then(
        () => {
          localStorage.removeItem("reveral_code");
          navigate(`/invoice/${response.data.id}`);
        }
      );
    } catch (error) {
      Swal.fire("Error!", error.message || "Terjadi kesalahan", "error");
    } finally {
      setLoadingSubmit(false); // ✅ Stop loading
    }
  };

  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/", { replace: true });
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
        {/* Kembali */}
        <button
          onClick={() => navigate(-1)}
          className="text-[#3377FF] text-lg font-medium flex gap-2 items-center mb-6"
        >
          <RiArrowLeftLine /> Kembali
        </button>

        <div className="grid grid-cols-1 md:flex md:items-start md:justify-between gap-10 w-full">
          {/* Detail Produk */}
          <div className="bg-white rounded-lg md:w-5/12">
            <img
              src={`${process.env.REACT_APP_API_IMG}${brandData.brand_img}`}
              alt="Product"
              className="w-full h-auto border-b pb-4"
            />
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

          {/* Metode Pembayaran */}
          <div className="bg-white rounded-lg md:w-6/12 p-6 border">
            <h2 className="text-xl font-semibold mb-4">Metode Pembayaran</h2>
            <div className="flex gap-4 mb-6">
              <button
                className={`px-4 py-2 rounded-lg font-medium border-2 ${
                  metode === "QRIS"
                    ? "bg-yellow-400 text-black"
                    : "border-gray-300"
                }`}
                onClick={() => setMetode("QRIS")}
              >
                QRIS
              </button>
              <button
                className={`px-4 py-2 rounded-lg font-medium border-2 ${
                  metode === "Transfer Bank"
                    ? "bg-yellow-400 text-black"
                    : "border-gray-300"
                }`}
                onClick={() => setMetode("Transfer Bank")}
              >
                Transfer Bank
              </button>
            </div>

            {metode === "QRIS" ? (
              <div className="flex flex-col items-start">
                <img
                  src="/assets/qris-dummy.jpg"
                  alt="QRIS"
                  className="w-60 h-auto"
                />
                <button
                  className="mt-4 border px-4 py-2 rounded-lg"
                  onClick={() => setShowQRIS(true)}
                >
                  Lihat QRIS
                </button>
              </div>
            ) : (
              <div className="border p-4 rounded-lg flex items-center gap-4">
                <img
                  src="/assets/bni.png"
                  alt="Bank Transfer"
                  className="w-20 h-auto"
                />
                <div className="flex flex-col">
                  <p className="text-lg font-semibold">1920120881</p>
                  <p className="text-gray-600">A/n PT Active Edulang Global</p>
                </div>
              </div>
            )}

            {/* Input Bukti Pembayaran */}
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-2">
                Unggah Bukti Pembayaran (Max 5MB)
              </h2>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="mt-3 p-2 border rounded w-full"
              />
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="mt-4 w-32 h-auto border rounded-md"
                />
              )}
            </div>

            <button
              onClick={handleSubmit}
              className="mt-6 w-full bg-[#FFCC00] hover:bg-yellow-500 text-black font-semibold py-3 rounded-xl flex justify-center items-center"
              disabled={loadingSubmit}
            >
              {loadingSubmit ? <Spin size="small" /> : "Buat Pesanan"}
            </button>
          </div>
        </div>

        {/* Modal untuk Zoom QRIS */}
        {showQRIS && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg relative">
              <button
                className="absolute top-2 right-2 text-gray-600 text-2xl"
                onClick={() => setShowQRIS(false)}
              >
                &times;
              </button>
              <img
                src="/assets/qris-dummy.jpg"
                alt="QRIS"
                className="w-96 h-auto"
              />
            </div>
          </div>
        )}
      </div>
    </Mainlayouts>
  );
};

export default Pembayaran;
