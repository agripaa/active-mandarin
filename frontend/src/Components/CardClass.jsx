import React, { useState } from "react";
import { Modal } from "antd";
import { FaCheckCircle } from "react-icons/fa";
import { useSelector } from "react-redux";


const CardClasses = ({ data }) => {
  const addCommas = (num) =>
    num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  const { _, langs } = useSelector(state => state.LangReducer)
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);

  return (
    <>
      {/* Card */}
      <div className="w-full h-full min-h-max px-4 py-6 bg-white rounded-2xl text-[#252525] drop-shadow-md transition ease-in overflow-hidden flex flex-col gap-8 lg:items-start lg:flex-row xl:items-center">
        {/* Gambar */}
        <div className="w-full lg:w-6/12 flex justify-center items-center">
          <img
            src={data.image}
            alt="card"
            className="max-w-full max-h-full object-contain rounded-xl"
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
              {data?.price === "Soon" || data?.price === "Segera" ? data?.price : `Rp ${addCommas(data?.price)}`}
              {data?.price !== "Soon" && data?.price !== "Segera" && (
                <span className="font-light text-xs ml-1 sm:text-sm">{data.category ? langs ? "/Person" : "/Orang" : langs ? "/Month" : "/Bulan"}</span>
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
        width={700}
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-4">
          <div className="w-full flex justify-center my-4">
            <img
              src={data?.banner ? data?.banner : data?.image}
              alt={data?.title}
              className="w-full h-auto object-fill rounded-lg mb-4"
            />
          </div>
            <p className="text-gray-700 text-justify leading-relaxed">{data?.desc}</p>

          <div className="space-y-0 w-full flex flex-col">
            <div className="w-full justify-between flex flex-col sm:flex-row">
              {data.facilities.length > 0 && (
                  <div className={data.free.length > 0 ? "w-9/12 sm:w-5/12" : "w-full"}>
                    <h3 className="font-semibold text-lg text-[#252525] mb-2">{langs ? "Facilities:" : "Fasilitas:"}</h3>
                    <ul className="list-disc ml-5 text-gray-600">
                      {data.facilities.map((facility, index) => (
                        <li key={index}>{facility}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {data.free.length > 0 && (
                  <div className="w-full my-2 sm:w-6/12">
                    <h3 className="font-semibold text-lg text-[#252525] mb-2">{langs ? "Free:" : "Gratis:"}</h3>
                    <ul className="list-disc ml-5 text-gray-600">
                      {data.free.map((detail, index) => (
                        <li key={index}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                )}
            </div>
          
            <div className="w-full justify-between flex flex-col sm:flex-row">
              {data.title == "Mandarin General Class - Basic" && (
                    <div className="w-full my-2">
                      <h3 className="font-semibold text-lg text-[#252525] mb-2">{langs ? "Benefits:" : "Manfaat:"}</h3>
                      <ul className="list-disc ml-5 text-gray-600">
                        {data.bnefits.map((bnefit, index) => (
                          <li key={index}>{bnefit}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                {data.other.length > 0 && (
                    <div className="w-full my-2 sm:w-5/12">
                      <h3 className="font-semibold text-lg text-[#252525] mb-2">{langs ? "Other:" : "Lainnya:"}</h3>
                      <ul className="list-disc ml-5 text-gray-600">
                        {data.other.map((facility, index) => (
                          <li key={index}>{facility}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {data.detail_class.length > 0 && (
                    <div className="w-full my-2 sm:w-6/12">
                      <h3 className="font-semibold text-lg text-[#252525] mb-2">{langs ? "Class Detail:" : "Detail Kelas:"}</h3>
                      <ul className="list-disc ml-5 text-gray-600">
                        {data.detail_class.map((detail, index) => (
                          <li key={index}>{detail}</li>
                        ))}
                      </ul>
                    </div>
                  )}
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-8 border-t pt-6">
          <div>
            <p className="text-xl md:text-2xl font-bold text-gray-800">
              {data?.price === "Soon" || data?.price === "Segera" ? data?.price : <>Rp {addCommas(data?.price)} <span className="text-sm md:text-lg font-normal">{data.category ? langs ? "/Person" : "/Orang" : langs ? "/Month" : "/Bulan"}</span></>}
            </p>
          </div>

          <a
            href="https://wa.me/+6282279506450"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#FFCC00] text-[#252525] font-semibold rounded-full shadow-lg transition duration-300 px-3 py-2 sm:px-6 sm:py-3"
          >
            Chat Admin
          </a>
        </div>
      </Modal>
    </>
  );
};

export default CardClasses;
