import React, { useState } from "react";
import Slider from "react-slick";
import { Modal, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

const Lectures = ({ text }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentLecturer, setCurrentLecturer] = useState({});
  const [currentSlide, setCurrentSlide] = useState(1);
  const [currentCertificates, setCurrentCertificates] = useState([]);
  const { data, langs } = useSelector((state) => state.LangReducer);

  const lecture = [
    {
      name: "Surya Pratama Januarvi",
      profile: "/assets/Surya Pratama Januarvi.jpeg",
      university_name:
        "Nanjing University of Information Science and Technology",
      cat_certificate: "HSK 5 Certified",
      certificates: [
        {
          english:
            "Best Academic Performance and Rank 2/39 in Bachelor Degree Class",
          indonesian:
            "Prestasi Akademik Terbaik dan Peringkat 2/39 di Kelas Sarjana",
          chinese: "最佳学习成绩，学士学位班排名 2/39",
        },
        {
          english:
            "Awardee of Chinese Scholarship by Nanjing University of Information Science and Technology",
          indonesian:
            "Penerima Beasiswa Pemerintah Tiongkok dari Universitas Ilmu dan Teknologi Informasi Nanjing",
          chinese: "南京信息工程大学中国政府奖学金获得者",
        },
        {
          english:
            "Awardee of TSP Scholarship by Nanjing Polytechnic Institute",
          indonesian:
            "Penerima Beasiswa TSP dari Nanjing Polytechnic Institute",
          chinese: "南京科技职业学院TSP奖学金获得者",
        },
        {
          english:
            "Awardee of Representatives Perhimpunan Pelajar Indonesia Tiongkok Nanjing Branch on Indonesia Consulate General in Shanghai",
          indonesian:
            "Perwakilan Perhimpunan Pelajar Indonesia Tiongkok Cabang Nanjing di Konsulat Jenderal Indonesia di Shanghai",
          chinese:
            "印尼留学生联合会南京分会代表，出席印度尼西亚驻上海总领事馆活动",
        },
        {
          english: "3rd Chinese Speech Competition 2019",
          indonesian: "Juara 3 Lomba Pidato Bahasa Mandarin 2019",
          chinese: "2019年第三名中文演讲比赛",
        },
        {
          english: "3rd Chinese Listening and Speaking Competition 2019",
          indonesian:
            "Juara 3 Lomba Mendengarkan dan Berbicara Bahasa Mandarin 2019",
          chinese: "2019年第三名中文听说比赛",
        },
        {
          english: "HSK 5 Certified",
          indonesian: "Bersertifikat HSK 5",
          chinese: "HSK 5 认证",
        },
      ],
    },
    {
      name: "Nasy-ah Nur Firdousi",
      profile: "/assets/Nasy-ah Nur Firdousi.jpg",
      university_name: "Nanjing Polytechnic Institute",
      cat_certificate: "HSK 4 Certified",
      certificates: [
        {
          english: "HSK 4 Certified",
          indonesian: "Bersertifikat HSK 4",
          chinese: "HSK 4 认证",
        },
        {
          english: "Awardee the President’s Scholarship",
          indonesian: "Penerima Beasiswa Presiden",
          chinese: "校长奖学金得奖者",
        },
        {
          english: "Author of the book Comprehensive Chinese Book",
          indonesian: "Penulis buku 'Komprehensif Bahasa Mandarin'",
          chinese: "著有《综合汉语书》",
        },
      ],
    },
    {
      name: "Vemas Alvieno Dian Saputra",
      profile: "/assets/Vemas Alvieno.jpg",
      university_name:
        "Nanjing University of Information Science and Technology",
      cat_certificate: "HSK 5 Certified",
      certificates: [
        {
          english:
            "Award for being Campus Ambassador for College of International Education by Nanjing University of Information Science and Technology from 2024 to 2025",
          indonesian:
            "Penghargaan sebagai Duta Kampus untuk College of International Education oleh Universitas Ilmu dan Teknologi Informasi Nanjing dari 2024 hingga 2025",
          chinese: "荣获2024-2025年南京信息工程大学国际教育学院校园大使称号",
        },
        {
          english:
            "Awardee Longshan Type B (1st Prize) Scholarship for International Student by Nanjing University of Information Science and Technology from 2024 to 2025",
          indonesian:
            "Penerima Beasiswa Longshan Tipe B (Juara 1) untuk Mahasiswa Internasional oleh Universitas Ilmu dan Teknologi Informasi Nanjing dari 2024 hingga 2025",
          chinese:
            "获奖者 南京信息工程大学2024年至2025年龙山B类留学生奖学金（一等奖）",
        },
        {
          english:
            "Awardee for The 4th Stories of China Retold in English Challenge for International Student by Jiangsu Government in Intermediate round, May 2024",
          indonesian:
            "Penerima Penghargaan dalam Lomba 'Stories of China Retold in English' ke-4 untuk Mahasiswa Internasional oleh Pemerintah Jiangsu pada babak menengah, Mei 2024",
          chinese:
            "2024 年 5 月江苏省第四届留学生英文讲述中国故事大赛中级赛获奖者",
        },
        {
          english:
            "Awardee NUIST Excellent Freshmen Scholarship (1st Prize) Scholarship for International Student by Nanjing University of Information Science and Technology from 2023 to 2024",
          indonesian:
            "Penerima Beasiswa Mahasiswa Baru Berprestasi NUIST (Juara 1) untuk Mahasiswa Internasional oleh Universitas Ilmu dan Teknologi Informasi Nanjing dari 2023 hingga 2024",
          chinese:
            "获奖者 南京信息工程大学优秀新生奖学金（一等奖） 南京信息工程大学留学生奖学金2023年至2024年",
        },
      ],
    },
    {
      name: "Anisa Nur Hasanah",
      profile: "/assets/Anisa Nur Hasanah.jpg",
      university_name: "Nanjing Polytechnic Institute",
      cat_certificate: "HSK 5 Certified",
      certificates: [
          {
            english:
              "Awardee Jiangsu Government Scholarship for Excellent Student by Jiangsu Government 2024",
            indonesian:
              "Penerima Beasiswa Pemerintah Jiangsu untuk Mahasiswa Berprestasi oleh Pemerintah Jiangsu 2024",
            chinese: "2024年留学江苏政府优秀学生奖学金",
          },
          {
            english:
              "Awardee Jiangsu Government Scholarship for Excellent Student by Jiangsu Government 2023",
            indonesian:
              "Penerima Beasiswa Pemerintah Jiangsu untuk Mahasiswa Berprestasi oleh Pemerintah Jiangsu 2023",
            chinese: "2023年留学江苏政府优秀学生奖学金",
          },
          {
            english: "Awardee NJPI President’s Scholarship from 2021 to 2024",
            indonesian: "Penerima Beasiswa Presiden NJPI dari 2021 hingga 2024",
            chinese: "南京科技职业学院奖学金自2021年至2024年",
          },
          {
            english:
              "Second Prize in the International Student Group of the 2nd 'Chinese Language plus Logistics Vocational Skills' International Contest 2023",
            indonesian:
              "Juara Kedua Kategori Mahasiswa Internasional dalam Lomba Internasional 'Bahasa Mandarin plus Keterampilan Kejuruan Logistik' ke-2 tahun 2023",
            chinese: "2023年在第二届“中文+物流职业技能”国际赛二等奖",
          },
          {
            english:
              "Second Prize in the SFLEP Cup National College Students Intercultural Competence Contest",
            indonesian:
              "Juara Kedua dalam Lomba Kompetensi Antarbudaya Mahasiswa Nasional Piala SFLEP",
            chinese: "2023年在第六届“外教社杯”江苏省跨文化能力大赛二等奖",
          },
          {
            english:
              "Awardee for Award of Excellence in 'Portraying Jiangsu From a Different Angle' Writing Competition for Foreign Friends in Jiangsu",
            indonesian:
              "Penerima Penghargaan Keunggulan dalam Lomba Menulis 'Melukiskan Jiangsu dari Sudut Pandang Berbeda' untuk Teman Asing di Jiangsu",
            chinese: "2023年在“洋笔江苏”在江苏外国人正文大赛中荣获优秀奖",
          },
          {
            english:
              "Excellence Award in the International Student Group 2023 'A New Era of Book Fragrance, Classics Illuminating a New Journey' Chinese Classics Recitation Competition",
            indonesian:
              "Penghargaan Keunggulan Kategori Mahasiswa Internasional dalam Lomba Resitasi Klasik Mandarin 2023 'Era Baru yang Harum dengan Buku, Klasik Menerangi Perjalanan Baru'",
            chinese:
              "在2023年 “书香新时代, ‘典’ 亮新征程” 中华经典诵读大赛中获留学生组优秀奖",
          },
          {
            english: "HSK 5 Certified",
            indonesian: "Bersertifikat HSK 5",
            chinese: "HSK 5 认证",
          },
      ],
    },
  ];

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    centerMode: false, // Nonaktifkan centerMode
    arrows: true, // Nonaktifkan tombol next dan prev
    beforeChange: (current, next) => setCurrentSlide(next),
    responsive: [
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          centerMode: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  const showModal = (lecturer) => {
    setCurrentCertificates(lecturer.certificates);
    setCurrentLecturer(lecturer);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div
      className="my-20 mx-20"
    >
      <div className="mx-auto text-start">
        <div className="w-full md:w-11/12 lg:w-10/12 xl:w-full mx-auto mb-5 px-5">
          <h1 className="text-black text-4xl font-semibold">{text?.title}</h1>
        </div>
        <div className="my-14 flex justify-center">
          <div className="w-full md:w-11/12 lg:w-10/12 xl:w-full">
            <Slider {...settings} className="">
              {lecture.map((item, index) => (
                <div key={index} className="px-4 h-full">
                  <div className="flex flex-col bg-white rounded-xl w-full h-full shadow-lg text-center p-4 xl:p-6">
                    <div className="relative w-10/12 h-fit mx-auto mb-4 flex justify-center items-center">
                      <img
                        src={item.profile}
                        alt={item.name}
                        className="relative shadow-lg p-[2px] w-full aspect-square object-cover rounded-full"
                      />
                    </div>
                    <div className="flex flex-col mt-6 justify-center items-center">
                      <h2 className="text-lg font-semibold text-gray-800">
                        {item.name}
                      </h2>
                      <span className=" w-full py-1 text-center text-[#8493AC] font-medium text-sm">
                        {item.university_name}
                      </span>
                    </div>
                    <div className="mt-auto">
                      <Button
                        className="mt-4 flex items-center font-semibold justify-center w-full bg-yellow-400 text-black border-none hover:text-black rounded-2xl py-6"
                        onClick={() => showModal(item)}
                      >
                        View More
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal
        visible={isModalVisible}
        footer={null}
        className="rounded-lg lg:min-w-[650px]"
        closeIcon={<></>}
      >
        <div className="relative bg-[#02264A] text-white p-4 rounded-lg flex justify-between items-center md:p-6">
          <div className="flex flex-col items-center w-full gap-4 md:flex-row">
            <img
              src={currentLecturer.profile}
              alt={currentLecturer.name}
              className="w-20 h-20 object-cover rounded-full shadow-lg lg:w-24 lg:h-24"
            />
            <div className="w-full flex flex-col-reverse justify-around gap-2 md:flex-col md:mr-4">
              <div className="flex w-full justify-between">
                <h1 className="text-lg font-bold mx-auto md:text-2xl lg:tracking-wide md:mx-0">
                  {currentLecturer.name}
                </h1>
              </div>
              {currentLecturer.name === "Vemas Alvieno Dian Saputra" ? null :
                <span className="bg-[#3377FF] w-fit mx-auto py-1 px-3 text-center text-white font-medium rounded-full text-sm mt-auto md:mx-0">
                  {currentLecturer.cat_certificate}
                </span>
              }
            </div>
            <button
              className="absolute text-white text-xl bg-transparent border-none cursor-pointer top-4 right-4 md:top-6 md:right-6"
              onClick={handleCancel}
            >
              <CloseOutlined />
            </button>
          </div>
        </div>
        <div className="p-6">
          <h2 className="font-bold text-lg mb-4">Tutor Achievement</h2>
          <ul className="list-disc ml-5">
            {currentCertificates.map((cert, index) => (
              <li key={index} className="mb-2">
                <p className="text-black text-lg">
                  {langs 
                  ? cert.english
                  : cert.indonesian
                  }</p>
                <p className="text-gray-500">{cert.chinese}</p>
              </li>
            ))}
          </ul>
        </div>
      </Modal>
    </div>
  );
};

export default Lectures;
