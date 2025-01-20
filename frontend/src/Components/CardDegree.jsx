import React, { useState } from "react";
import { Modal } from "antd";
import { FaCheckCircle } from "react-icons/fa";
import { useSelector } from "react-redux";

const CardDegree = ({ data }) => {
  const addCommas = (num) =>
    num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  const [isModalVisible, setIsModalVisible] = useState(false);
  const { _, langs } = useSelector(state => state.LangReducer)

  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);

  return (
    <>
      <div className="transition p-4 ease-in bg-white rounded-2xl text-[#252525] h-full w-full drop-shadow-md overflow-hidden flex flex-col gap-8 sm:p-6 lg:items-start lg:flex-row xl:items-center">
        <div className="w-full lg:w-6/12">
          <img
            src={data.image}
            alt="degree-program"
            className="w-full h-auto object-cover rounded-xl"
          />
        </div>

        <div className="flex flex-col justify-between w-full lg:w-6/12">
          <h1 className="text-xl font-semibold mb-4 md:text-2xl">{data?.title}</h1>

          <ul className="space-y-2">
            {data?.bnefits?.map((bnefit, index) => (
                <li key={index} className="flex items-start gap-2">
                {data?.bnefits?.length > 1 && (
                    <FaCheckCircle className="text-green-500 flex-shrink-0" size={20} />
                )}
                <span className="text-sm font-medium text-gray-700 leading-relaxed md:text-base">
                    {bnefit}
                </span>
                </li>
            ))}
            </ul>

          <div className="flex justify-between items-center mt-6">
            <button
              onClick={showModal}
              className="bg-[#FFCC00] text-[#252525] px-2.5 py-2 font-medium rounded-xl text-sm sm:px-5 sm:py-3 sm:rounded-2xl"
            >
              Program Detail
            </button>
            <p className="font-semibold text-lg">
              {data?.price === "Chat Admin" || data?.price === "Hubungi Admin" ? "Chat Admin" : <>Rp {addCommas(data?.price)}<span className="font-light text-xs ml-1 sm:text-sm">{langs ? '/Person' : "/Orang"}</span></>}
            </p>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal
        title={data?.title}
        visible={isModalVisible}
        footer={null}
        onCancel={handleCancel}
        centered
        width={700}
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-6">
          <div className="w-full flex justify-center mt-6">
            <img
              src={data?.banner ? data?.banner : data.image}
              alt={data?.title}
              className="w-full h-auto object-cover rounded-lg mb-4"
            />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-semibold">{data?.title == "Non-Degree Program" ? "China Calling! Ready to Master Mandarin?" : "Pursue Higher Education with Scholarships in China"}</h2>
            <p className="text-gray-700 leading-relaxed">{data?.desc}</p>
          </div>
          <div>
          {data?.program_start?.length > 0 && (
            <div>
              <h3 className="font-semibold text-lg text-[#252525] mb-2">{langs ? "Program Start:" : "Mulai Program:"}</h3>
              <ul className="ml-6 list-disc text-gray-600">
                {data?.program_start?.map((date, index) => (
                  <li key={index}>{date}</li>
                ))}
              </ul>
            </div>
          )}
        {data?.detail_class.length > 0 && (
          <div className="mt-5"> 
            <h3 className="font-semibold text-lg text-[#252525] mb-2">{langs ? "Detail:" : "Detail:"}</h3>
            <ul className="list-disc ml-6 text-gray-600">
              {data?.detail_class?.map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>
          </div>
         )}

         {data?.facilities.length > 0 && (
          <div className="mt-5"> 
            <h3 className="font-semibold text-lg text-[#252525] mb-2">{langs ? "Facilities" : "Fasilitas"}</h3>
            <ul>
              {data?.facilities?.map((fa, index) => (
                <div className="ml-4">
                    <h2 className="font-semibold text-gray-900">{langs ? "Professional Mentorship:" : "Bimbingan Profesional:"}</h2>
                  <div className="list-disc ml-6 text-gray-600">  
                    {fa.mentor.map((men, i) => (
                      <li key={i}>{men}</li>
                    ))}
                  </div>
                    <h2 className="mt-4 font-semibold text-gray-900">{langs ? "Application Assistance:" : "Bantuan Aplikasi:"} </h2>
                  <div className="list-disc ml-6 text-gray-600">  
                    {fa.assistance.map((ass, i) => (
                      <li key={i}>{ass}</li>
                    ))}
                  </div>
                </div>
              ))}
            </ul>
          </div>
         )}
         {data?.free.length > 0 && (
          <div className="mt-5"> 
            <h3 className="font-semibold text-lg text-[#252525] mb-2">{langs ? "Why Choose This Program?" : "Mengapa Memilih Program Ini?"}</h3>
            <ul className="list-disc ml-6 text-gray-60">
              {data?.free?.map((fre, index) => (
                <li key={index}>{fre}</li>
              ))}
            </ul>
          </div>
         )}

        {data?.other !== "" && (
          <div className="mt-5"> 
            <p className=" text-gray-60">
              {data?.other}
            </p>
          </div>
         )}
          </div>
        </div>

        {/* Informasi Harga dan Chat Admin */}
        <div className="flex justify-between items-center mt-8 border-t pt-6">
          <p className="text-xl md:text-2xl font-bold text-gray-800">
            {data?.price === "Chat Admin" || data?.price === "Hubungi Admin"  ? "Chat Admin" : <>Rp {addCommas(data?.price)} <span className="text-sm md:text-lg font-normal">{langs ? '/Person' : "/Orang"}</span></>}
          </p>
          <a
            href="https://wa.me/+6282279506450"
            rel="noopener noreferrer"
            target="_blank"
            className="bg-[#FFCC00] text-[#252525] font-semibold rounded-full shadow-lg transition duration-300 px-3 py-2 sm:px-6 sm:py-3"
          >
            Chat Admin
          </a>
        </div>
      </Modal>
    </>
  );
};

export default CardDegree;
