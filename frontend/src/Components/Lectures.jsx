import React, { useState } from "react";
import Slider from "react-slick";
import { Modal, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";

const Lectures = ({ text }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentLecturer, setCurrentLecturer] = useState({});
    const [currentSlide, setCurrentSlide] = useState(1);
    const [currentCertificates, setCurrentCertificates] = useState([]);

    const lecture = [
          {
            "name": "Surya Pratama Januarvi",
            "profile": "/assets/Surya Pratama Januarvi.jpeg",
            "university_name": "Nanjing University of Information Science and Technology",
            "cat_certificate": "HSK 5 Certified",
            "certificates": [
              {
                "english": "Best Academic Performance and Rank 2/39 in Bachelor Degree Class",
                "chinese": "最佳学习成绩，学士学位班排名 2/39"
              },
              {
                "english": "Awardee of Chinese Scholarship by Nanjing University of Information Science and Technology",
                "chinese": "南京信息工程大学中国政府奖学金获得者"
              },
              {
                "english": "Awardee of TSP Scholarship by Nanjing Polytechnic Institute",
                "chinese": "南京科技职业学院TSP奖学金获得者"
              },
              {
                "english": "Awardee of Representatives Perhimpunan Pelajar Indonesia Tiongkok Nanjing Branch on Indonesia Consulate General in Shanghai",
                "chinese": "印尼留学生联合会南京分会代表，出席印度尼西亚驻上海总领事馆活动"
              },
              {
                "english": "3rd Chinese Speech Competition 2019",
                "chinese": "2019年第三名中文演讲比赛"
              },
              {
                "english": "3rd Chinese Listening and Speaking Competition 2019",
                "chinese": "2019年第三名中文听说比赛"
              },
              {
                "english": "HSK 5 Certified",
                "chinese": "HSK 5 认证"
              }
            ]
          },
          {
            "name": "Nasy-ah Nur Firdousi",
            "profile": "/assets/Nasy-ah Nur Firdousi.jpg",
            "university_name": "Nanjing Polytechnic Institute",
            "cat_certificate": "HSK 4 Certified",
            "certificates": [
              {
                "english": "HSK 4 Certified",
                "chinese": "HSK 4 认证"
              },
              {
                "english": "Awardee the President’s Scholarship",
                "chinese": "校长奖学金得奖者"
              },
              {
                "english": "Author of the book Comprehensive Chinese Book",
                "chinese": "著有《综合汉语书》"
              }
            ]
          },
          {
            "name": "Kamila Yeta",
            "profile": "/assets/Kamila Yeta.jpg",
            "university_name": "Guangxi University",
            "cat_certificate": "HSK 5 Certified",
            "certificates": [
              {
                "english": "Awardee International Chinese Language Teachers Scholarship for one academic year from 2024 to 2025",
                "chinese": "荣获国际中文教师奖学金自2024年至2025年"
              },
              {
                "english": "Awardee Guangxi Government Scholarship for ASEAN Student by Guangxi Government from 2018 to 2023",
                "chinese": "荣获广西政府东盟国家留学生奖学金自2018年至2023年"
              },
              {
                "english": "First Winner of The 14th Chinese Classics Reading Competition and the 2021 Guangxi Campus Chinese Classics Reading Competition",
                "chinese": "在广西第十四届中华经典朗读大赛暨2021广西校园中华经典朗读比赛中获得了外国学生个人组一等奖"
              },
              {
                "english": "Outstanding International Student in Guangxi University - 2019",
                "chinese": "广西大学优秀国际学生 - 2019"
              },
              {
                "english": "Outstanding Volunteer for The School Anniversary – 2018",
                "chinese": "学校周年庆优秀志愿者 - 2018"
              },
              {
                "english": "HSK 5 Certified",
                "chinese": "HSK 5 认证"
              }
            ]
          },
          {
            "name": "Vemas Alvieno Dian Saputra",
            "profile": "/assets/Vemas Alvieno.jpg",
            "university_name": "Nanjing University of Information Science and Technology",
            "cat_certificate": "HSK 5 Certified",
            "certificates": [
              {
                "english": "Award for being Campus Ambassador for College of International Education by Nanjing University of Information Science and Technology from 2024 to 2025",
                "chinese": "荣获2024-2025年南京信息工程大学国际教育学院校园大使称号"
              },
              {
                "english": "Awardee Longshan Type B (1st Prize) Scholarship for International Student by Nanjing University of Information Science and Technology from 2024 to 2025",
                "chinese": "获奖者 南京信息工程大学2024年至2025年龙山B类留学生奖学金（一等奖）"
              },
              {
                "english": "Awardee for The 4th Stories of China Retold in English Challenge for International Student by Jiangsu Government in Intermediate round, May 2024",
                "chinese": "2024 年 5 月江苏省第四届留学生英文讲述中国故事大赛中级赛获奖者"
              },
              {
                "english": "Awardee NUIST Excellent Freshmen Scholarship (1st Prize) Scholarship for International Student by Nanjing University of Information Science and Technology from 2023 to 2024",
                "chinese": "获奖者 南京信息工程大学优秀新生奖学金（一等奖） 南京信息工程大学留学生奖学金2023年至2024年"
              }
            ]
          },
          {
            "name": "Anisa Nur Hasanah",
            "profile": "/assets/Anisa Nur Hasanah.jpg",
            "university_name": "Nanjing Polytechnic Institute",
            "cat_certificate": "HSK 5 Certified",
            "certificates": [
              {
                "english": "Awardee Jiangsu Government Scholarship for Excellent Student by Jiangsu Government 2024",
                "chinese": "2024年留学江苏政府优秀学生奖学金"
              },
              {
                "english": "Awardee Jiangsu Government Scholarship for Excellent Student by Jiangsu Government 2023",
                "chinese": "2023年留学江苏政府优秀学生奖学金"
              },
              {
                "english": "Awardee NJPI President’s Scholarship from 2021 to 2024",
                "chinese": "南京科技职业学院奖学金自2021年至2024年"
              },
              {
                "english": "Second Prize in the International Student Group of the 2nd 'Chinese Language plus Logistics Vocational Skills' International Contest 2023",
                "chinese": "2023年在第二届“中文+物流职业技能”国际赛二等奖"
              },
              {
                "english": "Second Prize in the SFLEP Cup National College Students Intercultural Competence Contest",
                "chinese": "2023年在第六届“外教社杯”江苏省跨文化能力大赛二等奖"
              },
              {
                "english": "Awardee for Award of Excellence in 'Portraying Jiangsu From a Different Angle' Writing Competition for Foreign Friends in Jiangsu",
                "chinese": "2023年在“洋笔江苏”在江苏外国人正文大赛中荣获优秀奖"
              },
              {
                "english": "Excellence Award in the International Student Group 2023 'A New Era of Book Fragrance, Classics Illuminating a New Journey' Chinese Classics Recitation Competition",
                "chinese": "在2023年 “书香新时代, ‘典’ 亮新征程” 中华经典诵读大赛中获留学生组优秀奖"
              },
              {
                "english": "HSK 5 Certified",
                "chinese": "HSK 5 认证"
              }
            ]
          }
    ]


    const settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      centerMode: false, // Nonaktifkan centerMode
      arrows: true, // Nonaktifkan tombol next dan prev
      beforeChange: (current, next) => setCurrentSlide(next),
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
      <div className="bg-[#02264A] py-20" style={{ backgroundImage: "url('/assets/texture-card-big.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
          <div className="container mx-auto text-start">
              <h1 className="text-white text-4xl font-semibold mb-10">{text.title}</h1>
              <Slider {...settings} className="px-5">
                  {lecture.map((item, index) => (
                      <div key={index} className="p-4">
                          <div className="bg-white rounded-xl w-full max-h-[650px] h-full shadow-lg text-center p-6">
                            <div className="relative w-48 h-48 mx-auto mb-4 flex justify-center items-center">
                              {/* SVG Border */}
                              <svg
                                className="absolute"
                                width="190"
                                height="190"
                                viewBox="0 0 305 339"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M122.937 5.04074C122.745 2.52876 124.626 0.330389 127.142 0.206158C155.043 -1.17136 182.878 4.36808 208.159 16.363C234.815 29.0103 257.707 48.3963 274.573 72.6041C291.44 96.8118 301.695 125.003 304.325 154.389C306.955 183.776 301.87 213.34 289.57 240.158C277.271 266.976 258.185 290.12 234.199 307.3C210.213 324.48 182.158 335.101 152.809 338.114C123.459 341.127 93.8311 336.426 66.855 324.478C41.2704 313.145 18.9115 295.666 1.7514 273.623C0.203819 271.635 0.642517 268.775 2.67137 267.282C4.70022 265.788 7.55063 266.227 9.10125 268.212C25.3178 288.977 46.4172 305.447 70.5497 316.136C96.0739 327.442 124.107 331.889 151.877 329.038C179.647 326.188 206.192 316.138 228.887 299.883C251.582 283.627 269.641 261.73 281.278 236.355C292.915 210.98 297.727 183.007 295.238 155.203C292.75 127.398 283.046 100.724 267.088 77.8194C251.13 54.9146 229.469 36.572 204.248 24.6055C180.402 13.2913 154.154 8.0474 127.837 9.30634C125.321 9.42672 123.129 7.55272 122.937 5.04074Z"
                                  fill="url(#paint0_linear_448_40)"
                                />
                                <defs>
                                  <linearGradient
                                    id="paint0_linear_448_40"
                                    x1="135.5"
                                    y1="0"
                                    x2="135.5"
                                    y2="339"
                                    gradientUnits="userSpaceOnUse"
                                  >
                                    <stop stopColor="#6699FF" />
                                    <stop offset="1" stopColor="#181B3F" />
                                  </linearGradient>
                                </defs>
                              </svg>

                              {/* Gambar Profil */}
                              <img
                                src={item.profile}
                                alt={item.name}
                                className="relative shadow-lg mr-[17px] p-[2px] w-[90%] h-[90%] object-cover rounded-full"
                              />
                            </div>
                              <div className="flex flex-col mt-6 justify-center items-center">
                                <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
                                <span className=" w-full py-1 text-center text-[#8493AC] font-medium text-sm">
                                    {item.university_name}
                                </span>
                              </div>
                              <Button
                                  className="mt-4 flex items-center font-semibold justify-center w-full bg-yellow-400 text-black border-none hover:text-black rounded-2xl py-6"
                                  onClick={() => showModal(item)}
                              >
                                  View More
                              </Button>
                          </div>
                      </div>
                  ))}
              </Slider>
          </div>

          {/* Modal */}
          <Modal
                visible={isModalVisible}
                footer={null}
                className="rounded-lg min-w-[650px]"
                closeIcon={<></>}
            >
                <div className="bg-[#02264A] text-white p-6 rounded-lg flex justify-between items-center">
                    <div className="flex w-full">
                      <div className="w-3/12">
                        <img
                          src={currentLecturer.profile}
                          alt={currentLecturer.name}
                          className="w-24 h-24 object-cover rounded-full mr-4 shadow-lg"
                        />
                      </div>
                        <div className="w-full flex flex-col justify-around ml-4">
                          <div className="flex w-full justify-between">
                                  <h1 className="tracking-wide text-2xl font-bold">{currentLecturer.name}</h1>
                                  <button
                                      className="text-white text-xl bg-transparent border-none cursor-pointer"
                                      onClick={handleCancel}
                                  >
                                      <CloseOutlined />
                                  </button>
                          </div>
                          <span className="bg-[#3377FF] w-[30%] py-1 text-center text-white  font-medium rounded-full text-sm">
                              {currentLecturer.cat_certificate}
                          </span>
                        </div>
                    </div>
                </div>
                <div className="p-6">
                    <h2 className="font-bold text-lg mb-4">Tutor Achievement</h2>
                    <ul className="list-disc ml-5">
                        {currentCertificates.map((cert, index) => (
                            <li key={index} className="mb-2">
                                <p className="text-black text-lg">{cert.english}</p>
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