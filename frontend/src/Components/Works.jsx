import { Col, Row, Space } from "antd";
import React from "react";
import { FaChalkboardTeacher, FaHeadSideVirus } from "react-icons/fa";
import { GiVrHeadset } from "react-icons/gi";
import { TbCertificate } from "react-icons/tb";

const Works = ({ text, cards }) => {
    const icons = [
        <GiVrHeadset />,
        <TbCertificate />,
        <FaChalkboardTeacher />,
        <FaHeadSideVirus />,
    ];

    const colors = ["#9848FF", "#417CD3", "#EC722E", "#EC4882"];

    const positions = [
        { transform: "translate(30%, 50px)" }, 
        { transform: "translate(60%, 130px)" },   
        { transform: "translate(-40%, 40px)" },   
        { transform: "translate(-40%, 130px)" },  
    ];

    return (
        <div className="py-10 bg-[#FAFAFA] w-full">
            <div className="container mx-auto relative w-full">
            <h1 className="text-center mt-4 font-semibold text-4xl text-[#252525] px-3">
                {text?.title}
            </h1>
            <h2 className="text-4xl text-center font-semibold my-5">{text?.desc}</h2>


                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1200 200"
                    preserveAspectRatio="none"
                    className="absolute left-[10%] w-[4/6] h-[200px] top-[130px] z-0"
                    >
                    <path
                        d="M0,100 C350,0 400,250 600,150 C900,0 700,150 1200,180"
                        stroke="#7D7D7D"
                        strokeWidth="2"
                        strokeDasharray="25,15"
                        fill="none"
                        />
                </svg>

            {/* Konten */}
            <Row justify="space-between" align="middle" className="relative w-full my-24 z-10">
                {cards?.map((item, index) => (
                    <Col
                    xs={{ span: 24 }}
                    sm={{ span: 12 }}
                    md={{ span: 6 }}
                    key={index}
                    className="text-center"
                    style={{
                        position: "relative",
                        ...positions[index],
                        maxWidth: "180px",
                    }}
                    >
                        <Space direction="vertical" align="center">
                            <div
                                className="p-5 rounded-full text-3xl"
                                style={{
                                    backgroundColor: colors[index],
                                    color: "white",
                                    width: "80px",
                                    height: "80px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                {icons[index]}
                            </div>
                            <h3 className="font-semibold md:text-lg text-sm mx-auto">
                                {item?.title}
                            </h3>
                            <p className="text-center font-reguler md:text-md text-xs">
                                {item?.shorts}
                            </p>
                        </Space>
                    </Col>
                ))}
            </Row>
            </div>

        </div>
    );
};

export default Works;
