import { Col, Row } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const Products = ({ text }) => {
    return(
        <div className="container mx-auto px-10" id="products">
            <Row gutter={[50, 20]} className="py-24 px-0" justify='center' align='middle'>
                <Col xs={{ span: 24, offset: 0 }} sm={{ span: 12, offset: 0 }} className="static">
                    <img src="assets/products.png" alt="" className="lg:w-3/4 ml-auto w-full"/>
                </Col>
                <Col xs={{ span: 24, offset: 0 }} sm={{ span: 12, offset: 0 }} className="static p-0 lg:translate-y-[20%]">
                    <div className="md:px-0 px-3">
                        <h1 className="text-xl lg:text-3xl font-semibold text-[#D15254]">{text.title}</h1>
                        <h2 className="text-2xl lg:text-5xl font-semibold text-[#02264A] md:my-5 my-2 w-full lg:w-3/4">{text.tags}</h2>
                        <p className="text-lg font-normal md:my-10 mb-4 text-[#7D7D7D] w-full lg:w-3/4">{text.desc}</p>
                        <Row gutter={[16, 16]} className="mb-10">
                            <Col xs={{ span: 24, offset: 0 }} lg={{ span: 9, offset: 0 }}>
                                <Link to="/class" className="text-[#6699FF] flex gap-3 items-center md:text-2xl text-lg">
                                    <div className="w-2 h-2 rounded-full bg-[#6699FF]"></div> Education
                                </Link>
                            </Col>
                            <Col xs={{ span: 24, offset: 0 }} lg={{ span: 9, offset: 0 }}>
                                <Link to='/flash' className="text-[#6699FF] flex gap-3 items-center md:text-2xl text-lg">
                                    <div className="w-2 h-2 rounded-full bg-[#6699FF]"></div>Flashcard HSK
                                </Link>
                            </Col>
                            <Col xs={{ span: 24, offset: 0 }} lg={{ span: 9, offset: 0 }}>
                                <Link to='https://docs.google.com/forms/d/e/1FAIpQLSdMLbD0-_nz9BJvUnviScGuVkHkoyI57VPsgnZ0G8dSfbH51Q/viewform' target="_blank" className="text-[#6699FF] flex gap-3 items-center md:text-2xl text-lg">
                                    <div className="w-2 h-2 rounded-full bg-[#6699FF]"></div>Carreer Center
                                </Link>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default Products