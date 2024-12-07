import { Col, Row, Space } from "antd";
import React from "react";
import { FaChalkboardTeacher, FaHeadSideVirus } from 'react-icons/fa'
import { GiVrHeadset } from 'react-icons/gi'
import { TbCertificate } from 'react-icons/tb'

const Works = ({ text, cards }) => {

    const icons = [<GiVrHeadset/>, <TbCertificate/>, <FaChalkboardTeacher/>, <FaHeadSideVirus/>]
    
    const even = 'p-5 rounded-xl bg-[#6699FF] text-3xl text-white'
    const odd = 'p-5 rounded-xl bg-[#26294B] text-3xl text-white'
    return (
        <div className="py-10 container mx-auto">
            <h1 className="uppercase text-center font-semibold text-xl text-[#D15254] md:px-0 px-3">{text?.title}</h1>
            <h2 className="text-4xl text-center font-semibold my-5">{text?.desc}</h2>
            <div className="py-20 relative">
                <div className="absolute left-[50%] translate-x-[-50%] translate-y-[-100%] top-[50%]">
                    <img src="./assets/works.png" alt="" className="hidden lg:block w-3/4 m-auto"/>
                </div>
                <Row align='center' gutter={[0, 32]}>
                    {
                        cards?.map((item, index) => 
                            <Col xs={{ span: 9, offset: 0 }} lg={{ span: 3, offset: 0 }} key={index} style={{ position: 'static'}} className="p-2">
                                <Space direction="vertical" align="center"
                                className={`translate-y-0 ${index % 2 === 0 ? "sm:translate-y-[15%]" : "sm:translate-y-[40%]"}`}>
                                    <div className={index % 2 === 0 ? even : odd}>{icons[index]}</div>
                                    <h3 className="font-semibold md:text-xl text-sm text-center mx-auto">{item?.title}</h3>
                                    <p className="md:w-3/4 w-full m-auto text-center font-reguler md:text-md text-xs">{item?.shorts}</p>
                                </Space>
                            </Col>
                        )
                    }
                </Row>
            </div>
        </div>
    )
}
export default Works