import React, { useState } from "react";
import { Modal } from "antd";
import { FaCheckCircle } from "react-icons/fa";

const CardClasses = ({ data }) => {
  const addCommas = (num) =>
    num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);

  return (
    <>
      {/* Card */}
      <div className="w-full h-full p-4 bg-white rounded-2xl text-[#02264A] drop-shadow-md transition ease-in overflow-hidden flex flex-col gap-8 sm:p-6 lg:items-start lg:flex-row xl:items-center">
        {/* Gambar */}
        <div className="w-full lg:w-6/12">
          <img
            src={data.image}
            alt="card"
            className="w-full h-auto object-cover rounded-xl"
          />
        </div>

        {/* Konten */}
        <div className="w-full flex flex-col justify-between lg:w-6/12">
          <h1 className="text-xl font-semibold mb-4 md:text-2xl">{data?.title}</h1>

          {/* Daftar Benefit */}
          <ul className="space-y-2">
            {data?.bnefits?.map((bnefit, index) => (
              <li key={index} className="flex items-start gap-2">
                <FaCheckCircle className="text-green-500 flex-shrink-0" size={20} />
                <span className="text-sm font-medium text-gray-700 leading-relaxed md:text-base">{bnefit}</span>
              </li>
            ))}
          </ul>


          {/* Footer Card */}
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={showModal}
              className="bg-[#FFCC00] text-[#252525] px-2.5 py-2 font-medium text-sm rounded-xl sm:px-5 sm:py-3 sm:rounded-2xl"
            >
              Program Detail
            </button>
            <p className="font-semibold text-lg">
              {data?.price === "Soon" ? "Soon" : `Rp ${addCommas(data?.price)}`}
              {data?.price !== "Soon" && (
                <span className="font-light text-xs ml-1 sm:text-sm">{data.category ? "/Orang" : "/Month"}</span>
              )}
            </p>
          </div>
        </div>
      </div>

      <Modal
        title={data?.title}
        visible={isModalVisible}
        footer={null}
        onCancel={handleCancel}
        centered
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-4">
          <div className="w-full flex justify-center my-4">
            <img
              src={data?.banner ? data?.banner : data?.image}
              alt={data?.title}
              className="w-8/12 h-full object-fill rounded-lg mb-4"
            />
          </div>
            <p className="text-gray-700 text-justify leading-relaxed">{data?.desc}</p>

          <div className="space-y-4">
            {data.detail_class.length > 0 && (
              <div>
                <h3 className="font-semibold text-lg text-[#02264A] mb-2">Class Details:</h3>
                <ul className="list-disc ml-5 text-gray-600">
                  {data.detail_class.map((detail, index) => (
                    <li key={index}>{detail}</li>
                  ))}
                </ul>
              </div>
            )}

            {data.facilities.length > 0 && (
              <div>
                <h3 className="font-semibold text-lg text-[#02264A] mb-2">Facilities:</h3>
                <ul className="list-disc ml-5 text-gray-600">
                  {data.facilities.map((facility, index) => (
                    <li key={index}>{facility}</li>
                  ))}
                </ul>
              </div>
            )}

            {data.free.length > 0 && (
              <div>
                <h3 className="font-semibold text-lg text-[#02264A] mb-2">Free Benefits:</h3>
                <ul className="list-disc ml-5 text-gray-600">
                  {data.free.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center mt-8 border-t pt-6">
          <div>
            <p className="text-xl md:text-2xl font-bold text-gray-800">
              {data?.price === "Soon" ? "Soon" : <>Rp {addCommas(data?.price)} <span className="text-sm md:text-lg font-normal">/ Month</span></>}
            </p>
          </div>

          <a
            href="https://wa.me/+6282223369246"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#FFCC00] text-[#252525] font-semibold px-6 py-3 rounded-full shadow-lg transition duration-300"
          >
            Chat Admin
          </a>
        </div>
      </Modal>
    </>
  );
};

export default CardClasses;
