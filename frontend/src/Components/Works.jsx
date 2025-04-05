import { Col, Row, Space } from "antd";
import React from "react";
import { FaChalkboardTeacher, FaHeadSideVirus } from "react-icons/fa";
import { GiVrHeadset } from "react-icons/gi";
import { TbCertificate } from "react-icons/tb";
import { useSelector } from "react-redux";

const Works = ({ text, test }) => {
    const { langs } = useSelector((state) => state.LangReducer);
    const dataCard = {
        english: [
            {
                title: 'Best Teachers',
                shorts: 'We have highly skilled teachers with experience'
            },
            {
                title: 'Best Curriculum',
                shorts: 'We have made our structure easy & understandable'
            },
            {
                title: "1 to 1 Support",
                shorts: 'We give 1 to 1 support to our students'
            },
            {
                title: 'Work Relation',
                shorts: 'We have more than 500+ access with top company '
            }
        ],
        indonesia: [
            {
                title: 'Guru Terbaik',
                shorts: 'Kami memiliki guru berpengalaman dan sangat terampil'
            },
            {
                title: 'Kurikulum Terbaik',
                shorts: 'Kami menyusun kurikulum yang mudah dipahami'
            },
            {
                title: 'Bantuan 1 Per 1',
                shorts: 'Kami memberikan dukungan 1 lawan 1 kepada siswa kami'
            },
            {
                title: 'Relasi Kerja',
                shorts: 'Kami memiliki lebih dari 500+ koneksi dengan perusahaan terkemuka'
            } 
        ]
    }
    const cards = langs ? dataCard?.english : dataCard?.indonesia
    const icons = [
        <GiVrHeadset />,
        <TbCertificate />,
        <FaChalkboardTeacher />,
        <FaHeadSideVirus />,
    ];

    const colors = ["#9848FF", "#417CD3", "#EC722E", "#EC4882"];

    const positions = [
        { transform: "sm:translate-x-[0%] sm:translate-y-[0px] md:translate-x-[0%] md:translate-y-[-130px] lg:translate-x-[0%] lg:translate-y-[-150px] xl:translate-x-[110%] 2xl:translate-x-[160%] xl:translate-y-[-150px]" }, 
        { transform: "sm:translate-x-[0%] sm:translate-y-[0px] md:translate-x-[-6%] md:translate-y-[-45px] lg:translate-x-[-6%] lg:translate-y-[-45px] xl:translate-x-[35%] 2xl:translate-x-[45%] xl:translate-y-[-45px]" },   
        { transform: "sm:translate-x-[0%] sm:translate-y-[0px] md:translate-x-[16%] md:translate-y-[-120px] lg:translate-x-[20%] lg:translate-y-[-140px] xl:translate-x-[-20%] 2xl:translate-x-[-35%] xl:translate-y-[-140px]" },   
        { transform: "sm:translate-x-[0%] sm:translate-y-[0px] md:translate-x-[0%] md:translate-y-[-50px] lg:translate-x-[0%] lg:translate-y-[-50px] xl:translate-x-[-110%] xl:translate-y-[-50px] 2xl:translate-x-[-160%] 2xl:translate-y-[-80px]" },  
    ];

    return (
        <div className="py-10 w-full bg-white" style={{ backgroundImage: "url('/assets/texture.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
            <div className="container mx-auto relative w-full">
            <h1 className="text-center mt-4 font-semibold text-2xl text-[#252525] px-3 md:text-3xl lg:text-[32px]">
                {langs ? 'Why are we different from others?': 'Mengapa kita berbeda dari yang lain?'}
            </h1>
            <h2 className="text-4xl text-center font-semibold my-5">{text?.desc}</h2>

            <div className="w-full hidden items-center mt-36 justify-center md:flex">
                <img src="/assets/line.png" className="w-10/12 md:w-9/12 xl:w-3/6" alt="" />
            </div>

            {/* Konten */}
            <Row justify="space-between" align="middle" className="relative w-full mt-10 z-10 gap-y-10 md:mt-0">
                {cards?.map((item, index) => (
                    <Col
                    key={index}
                    className={`text-center trasnform w-1/2 px-2 md:max-w-[180px] ${positions[index].transform}`}
                    style={{
                        position: "relative",
                    }}
                    >
                        <Space direction="vertical" align="center">
                            <div
                                className="rounded-full text-3xl"
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
                            <p className="text-center font-reguler md:text-md text-sm text-[#7A7778]">
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
