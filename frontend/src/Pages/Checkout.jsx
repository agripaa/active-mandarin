import React from "react";
import Mainlayouts from "../Layouts/MainLayouts";
import { Link } from "react-router-dom";
import { RiArrowLeftLine } from "react-icons/ri";

const Checkout = () => {
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
            <img src="/assets/product1.png" alt="Product" className="w-full h-auto border-b pb-4" />
            <h1 className="text-2xl font-semibold mt-6">Comprehensive Book Level 1</h1>
            <p className="text-gray-600 mt-2 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum mollis nunc a molestie dictum.
              Mauris venenatis, felis scelerisque aliquet lacinia, nulla nisi venenatis odio, id blandit mauris ipsum id sapien.
            </p>
          </div>

          {/* Kode Referral + Detail Pembayaran */}
          <div className="bg-white p-6 rounded-lg border md:w-6/12">
            <h2 className="text-lg font-semibold mb-2">Kode Referal</h2>
            <input
              type="text"
              placeholder="Masukkan Kode Referal Affiliator, cth: FHDY68"
              className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />

            <h2 className="text-lg font-semibold mt-6">Payment Detail</h2>
            <div className="mt-3">
              <div className="flex justify-between text-gray-700">
                <span>Harga Item</span>
                <span className="font-semibold">Rp 150.000</span>
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-gray-700">Promo</span>
                <span className="text-green-500">- Rp 90.000</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between text-xl font-bold">
                <span>Total Transfer</span>
                <span>Rp 60.000</span>
              </div>
            </div>

            <button className="mt-6 w-full bg-[#FFCC00] hover:bg-[#6b5a18] text-black hover:text-white transition-all duration-300 font-semibold py-3 rounded-xl">
              Pilih Metode Pembayaran
            </button>
          </div>
        </div>
      </div>
    </Mainlayouts>
  );
};

export default Checkout;
