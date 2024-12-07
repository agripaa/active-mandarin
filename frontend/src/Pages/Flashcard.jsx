import React from "react";
import Mainlayouts from "../Layouts/MainLayouts";
import { Col, Row, Space } from "antd";
import Buttons from "../Components/Buttons";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Flashcard = () => {
    const { data, langs } = useSelector(state => state.LangReducer)
    const text = langs ? data?.english : data?.indonesia
    return(
        <Mainlayouts>
            <div className="container mx-auto">
                <Row>
                    <Col xs={{ span: 24, offset: 0 }} lg={{ span: 8, offset: 0 }} md={{ span: 12 }}>
                        <img src="/assets/flashcard.png" alt="flash card" className="m-auto"/>
                    </Col>
                    <Col xs={{ span: 24, offset: 0 }} lg={{ span: 16, offset: 0 }} md={{ span: 12 }} className="py-14 md:px-0 px-10">
                        <h1 className="md:text-5xl text-2xl font-semibold text-[#02264A]">Flashcard</h1>
                        <p className="md:text-2xl text-lg font-reguler text-[#A1A1A1] my-5">{text?.flashCardDesc}</p>
                        <Space size={32} className="mt-10">
                            <Link to='https://tokopedia.link/MbKfoIO8fyb' target="_blank" >
                                <Buttons>Tokopedia</Buttons>
                            </Link>
                        </Space>
                    </Col>
                </Row>
            </div>
        </Mainlayouts>
    )
}

export default Flashcard