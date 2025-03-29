import React from "react";
import Mainlayouts from "../Layouts/MainLayouts";
import { Link } from "react-router-dom";
import { RiArrowLeftLine } from "react-icons/ri";

const DetailPage = () => {
  return (
    <Mainlayouts>
      <div className="container mx-auto px-6 md:px-12 lg:px-20 py-10">
        {/* Kembali */}
        <Link to="/products" className="text-[#3377FF] text-lg font-medium flex gap-2 items-center mb-6">
          <RiArrowLeftLine /> Kembali
        </Link>

        <div className="grid grid-cols-1 md:flex md:justify-between items-start gap-6">
          {/* Detail Produk */}
          <div>
            <h1 className="text-4xl font-semibold mb-6">E-Flashcard HSK 1</h1>
            <p className="text-3xl text-gray-900 font-semibold mt-2">Rp 60.000 <span className="text-sm">/item</span></p>
            <p className="text-lg text-red-500 line-through">Rp 150.000</p>
            <p className="text-blue-600 font-medium mt-2">Dapatkan Komisi Rp 10.000</p>

            <h2 className="text-xl font-semibold mt-6">Detail</h2>
            <p className="text-gray-600 mt-2 leading-relaxed w-10/12">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum mollis nunc a molestie dictum. Mauris venenatis, felis scelerisque aliquet
              lacinia, nulla nisi venenatis odio, id blandit mauris ipsum id sapien. Vestibulum malesuada orci sit amet pretium facilisis.
            </p>
            <Link to="#" className="text-blue-500 font-medium mt-2 inline-block">
              Selengkapnya
            </Link>
          </div>

          {/* Gambar Produk + Tombol Beli */}
          <div className="bg-white shadow-md w-9/12 rounded-lg p-6">
            <img src="/assets/product1.png" alt="Product" className="w-full h-auto rounded-md" />
            <button className="mt-4 w-full bg-[#FFCC00] hover:bg-[#debc38] text-black font-semibold py-3 rounded-xl">
              Beli Produk
            </button>
          </div>
        </div>

        {/* Produk Serupa */}
        <h2 className="text-3xl font-semibold mt-12">Similar Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {/* Kartu Produk Serupa */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <img src="/assets/product1.png" alt="Mandarin Juara" className="w-full h-auto rounded-md" />
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold mt-2">Mandarin Juara</h3>
                <div className="flex flex-col gap-2">
                    <p className="text-gray-600 text-lg font-semibold">Rp 3.000.000 <span className="text-sm font-normal">/Month</span></p>
                    <p className="text-blue-600 text-sm font-medium">Dapatkan komisi Rp 150.000</p>
                </div>
            </div>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4">
            <img src="/assets/product1.png" alt="Mandarin Juara" className="w-full h-auto rounded-md" />
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold mt-2">Mandarin Juara</h3>
                <div className="flex flex-col gap-2">
                    <p className="text-gray-600 text-lg font-semibold">Rp 3.000.000 <span className="text-sm font-normal">/Month</span></p>
                    <p className="text-blue-600 text-sm font-medium">Dapatkan komisi Rp 150.000</p>
                </div>
            </div>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4">
            <img src="/assets/product1.png" alt="Mandarin Juara" className="w-full h-auto rounded-md" />
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold mt-2">Mandarin Juara</h3>
                <div className="flex flex-col gap-2">
                    <p className="text-gray-600 text-lg font-semibold">Rp 3.000.000 <span className="text-sm font-normal">/Month</span></p>
                    <p className="text-blue-600 text-sm font-medium">Dapatkan komisi Rp 150.000</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </Mainlayouts>
  );
};

export default DetailPage;