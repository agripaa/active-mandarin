import { Card, Row, Col } from "antd";
import React from "react";

const Lectures = ({ text }) => {
    const lecture = [
        {
            name: "Surya Pratama Januarvi",
            university_name: "Nanjing University of Information Science and Technology",
            cat_certificate: "HSK 4 Certified",
            certificates: [],
        },
        {
            name: "Arvia Fuja Aslami",
            university_name: "Huaqiao University",
            cat_certificate: "HSK 5 Certified",
            certificates: [],
        },
        {
            name: "Febriana Dwi Nur Fadilah",
            university_name: "National Kaohsiung University of Science and Technology",
            cat_certificate: "TOCFL Level 3 Certified",
            certificates: [],
        },
        {
            name: "Anisa Nur Hasanah",
            university_name: "Nanjing Polytechnic Institute",
            cat_certificate: "HSK 4 Certified",
            certificates: [],
        },
    ];

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
                                    <button className="py-2 px-6 font-medium bg-[#FFCC00] text-black rounded-2xl">
                                        View More
                                    </button>
                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
};

export default Lectures;
