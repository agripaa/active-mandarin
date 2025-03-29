import React, { useState } from "react";
import Mainlayouts from "../Layouts/MainLayouts";
import { Link } from "react-router-dom";
import { RiArrowLeftLine } from "react-icons/ri";

const Pembayaran = () => {
  const [metode, setMetode] = useState("QRIS");
  const [showQRIS, setShowQRIS] = useState(false); // State untuk modal QRIS

  return (
    <Mainlayouts>
      <div className="container mx-auto px-6 md:px-12 lg:px-20 py-10 md:py-20">
        {/* Kembali */}
        <Link to="/products" className="text-[#3377FF] text-lg font-medium flex gap-2 items-center mb-6">
          <RiArrowLeftLine /> Kembali
        </Link>

        <div className="grid grid-cols-1 md:flex md:items-start md:justify-between gap-10 w-full">
          {/* Detail Produk */}
          <div className="bg-white rounded-lg md:w-5/12">
            <img src="/assets/product1.png" alt="Product" className="w-full h-auto rounded-md" />
            <h1 className="text-2xl font-semibold mt-6">Comprehensive Book Level 1</h1>
            <p className="text-gray-600 mt-2 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum mollis nunc a molestie dictum.
              Mauris venenatis, felis scelerisque aliquet lacinia, nulla nisi venenatis odio, id blandit mauris ipsum id sapien.
            </p>
          </div>

          {/* Metode Pembayaran */}
          <div className="bg-white rounded-lg md:w-6/12 p-6 border">
            <h2 className="text-xl font-semibold mb-4">Metode Pembayaran</h2>
            <div className="flex gap-4 mb-6">
              <button
                className={`px-4 py-2 rounded-lg font-medium border-2 ${metode === "QRIS" ? "bg-yellow-400 text-black" : "border-gray-300"}`}
                onClick={() => setMetode("QRIS")}
              >
                QRIS
              </button>
              <button
                className={`px-4 py-2 rounded-lg font-medium border-2 ${metode === "Bank" ? "bg-yellow-400 text-black" : "border-gray-300"}`}
                onClick={() => setMetode("Bank")}
              >
                Transfer Bank
              </button>
            </div>

            {metode === "QRIS" ? (
              <div className="flex flex-col items-start">
                <img src="/assets/qris-dummy.png" alt="QRIS" className="w-60 h-auto" />
                <button 
                  className="mt-4 border px-4 py-2 rounded-lg"
                  onClick={() => setShowQRIS(true)}
                >
                  Lihat QRIS
                </button>
              </div>
            ) : (
              <div className="border p-4 rounded-lg flex items-center gap-4">
                <img src="/assets/bca.png" alt="Bank Transfer" className="w-20 h-auto" />
                <div className="flex flex-col">
                  <p className="text-lg font-semibold">996162569</p>
                  <p className="text-gray-600">A/n Active Mandarin Indonesia</p>
                </div>
              </div>
            )}

            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-2">Bukti Pembayaran</h2>
              <button className="border px-4 py-2 rounded-lg">Upload Gambar</button>
            </div>

            <button className="mt-6 w-full bg-[#FFCC00] hover:bg-yellow-500 text-black font-semibold py-3 rounded-xl">
              Buat Pesanan
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
              <img src="/assets/qris-dummy.png" alt="QRIS" className="w-96 h-auto" />
            </div>
          </div>
        )}
      </div>
    </Mainlayouts>
  );
};

export default Pembayaran;
