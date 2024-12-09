import { Card, Row, Col, Modal, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import React, { useState } from "react";

const Lectures = ({ text }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentCertificates, setCurrentCertificates] = useState([]);
    const [currentLecturer, setCurrentLecturer] = useState({});

        const lecture = [
            {
              "name": "Surya Pratama Januarvi",
              "university_name": "Nanjing University of Information Science and Technology",
              "cat_certificate": "HSK 4 Certified",
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
              "university_name": "Huaqiao University",
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
            }
          ]
        const showModal = (lecturer) => {
            setCurrentCertificates(lecturer.certificates);
            setCurrentLecturer(lecturer);
            setIsModalVisible(true);
        };
    
        const handleCancel = () => {
            setIsModalVisible(false);
        };

    return (
        <div className="md:py-20 py-10 md:px-10 px-5 bg-[#181B3F]">
            <div className="container mx-auto mb-10">
                <h1 className="text-xl lg:text-4xl font-semibold text-white text-center">
                    {text.title}
                </h1>
            </div>
            <div className="container mx-auto">
                <Row gutter={[24, 24]}>
                    {lecture.map((item, index) => (
                        <Col key={index} xs={24} md={12} lg={12}>
                            <Card
                                className="border-0 drop-shadow-md"
                                style={{
                                    backgroundColor: "#FFFFFF",
                                    borderRadius: "16px",
                                    padding: "12px",
                                }}
                            >
                                <div className="flex flex-col items-start text-start">
                                    <div className="flex justify-between items-center w-full mb-2">
                                        <h2 className="text-[#3D3D3D] text-2xl font-semibold capitalize">
                                            {item.name}
                                        </h2>
                                        <span className="bg-[#3377FF] text-white px-4 py-1 font-medium rounded-full text-sm">
                                            {item.cat_certificate}
                                        </span>
                                    </div>
                                    <p className="text-[#7A7778] tracking-wide text-base font-medium">
                                        {item.university_name}
                                    </p>
                                </div>
                                <div className="mt-6">
                                    <button
                                        className="py-2 px-6 font-medium bg-[#FFCC00] text-black rounded-2xl"
                                        onClick={() => showModal(item)}
                                    >
                                        View More
                                    </button>
                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>

            {/* Modal */}
            <Modal
                visible={isModalVisible}
                footer={null}
                onCancel={handleCancel}
                className="rounded-lg "
                closeIcon={<CloseOutlined style={{ fontSize: "18px" }} />}
            >
                <div className="bg-[#02264A] text-white p-6 rounded-lg flex justify-between items-center">
                    <div className="w-full">
                        <div className="flex w-full justify-between">
                                <h1 className="text-2xl font-bold">{currentLecturer.name}</h1>
                                <button
                                    className="text-white text-xl bg-transparent border-none cursor-pointer"
                                    onClick={handleCancel}
                                >
                                    <CloseOutlined />
                                </button>
                        </div>
                        <p className="text-md mt-2 mb-4">{currentLecturer.university_name}</p>
                        <span className="bg-[#3377FF] text-white px-4 py-1 font-medium rounded-full text-sm">
                            {currentLecturer.cat_certificate}
                        </span>
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
