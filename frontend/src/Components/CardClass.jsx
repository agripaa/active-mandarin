import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { StarFilled, StarOutlined } from "@ant-design/icons";

const CardClasses = ({ data }) => {
  const addCommas = (num) =>
    num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return (
    <div className="transition px-6 py-8 ease-in bg-white rounded-2xl text-[#02264A] h-full w-full drop-shadow-md overflow-hidden flex">
      {/* Gambar */}
      <div className="w-6/12 mr-8">
        <img
          src="/assets/dummy.png"
          alt="card"
          className="w-full h-auto object-cover rounded-xl"
        />
      </div>

      {/* Konten */}
      <div className="flex flex-col justify-between w-6/12">
        <h1 className="text-2xl font-semibold mb-4">{data?.title}</h1>
        
        {/* Daftar Benefit */}
        <ul className="space-y-4">
          {data.bnefits.map((bnefit, index) => (
            <li key={index} className="flex items-center gap-2">
              <FaCheckCircle className="text-green-500" />
              <span className="text-base font-medium text-gray-700">{bnefit}</span>
            </li>
          ))}
        </ul>

        {/* Footer Card */}
        <div className="flex justify-between items-center mt-6">
          <span className="bg-[#FFCC00] text-[#252525] px-5 py-3 font-medium rounded-2xl text-sm">
            Program Detail
          </span>
          <p className="font-semibold text-lg">
            {data?.price === "Soon" ? "Soon" : `Rp ${addCommas(data?.price)}`}
            {data?.price !== "Soon" && (
              <span className="font-light text-sm ml-1">/Item</span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardClasses;
