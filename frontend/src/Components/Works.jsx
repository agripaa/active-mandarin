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
        { transform: "translate(160%, -150px)" }, 
        { transform: "translate(45%, -45px)" },   
        { transform: "translate(-35%, -140px)" },   
        { transform: "translate(-160%, -80px)" },  
    ];

    return (
        <div className="py-10 w-full" style={{ backgroundImage: "url('/assets/texture.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
            <div className="container mx-auto relative w-full">
            <h1 className="text-center mt-4 font-semibold text-4xl text-[#252525] px-3">
                {text?.title}
            </h1>
            <h2 className="text-4xl text-center font-semibold my-5">{text?.desc}</h2>

            <div className="w-full flex items-center mt-36 justify-center">
                <img src="/assets/line.png" className="w-3/6" alt="" />
            </div>

            {/* Konten */}
            <Row justify="space-between" align="middle" className="relative w-full z-10">
                {cards?.map((item, index) => (
                    <Col
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
                                className=" rounded-full text-3xl"
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
