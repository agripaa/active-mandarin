import { Col, Row } from "antd";
import React from "react";

const Moments = ({ text }) => {
    return(
        <div className="container mx-auto py-20 md:px-0 px-5">
            <Row wrap>
                <Col xs={{ span: 24, offset: 0 }} sm={{ span: 12, offset: 0 }}>
                    <img src="/assets/main_moments.png" alt="1" />
                </Col>
                <Col xs={{ span: 24, offset: 0 }} sm={{ span: 12, offset: 0 }}>
                    <div>
                        <h1 className="md:text-3xl text-xl font-semibold text-[#D15254]">{text.title}</h1>
                        <h2 className="md:text-4xl text-2xl lg:text-5xl font-semibold text-[#02264A] md:my-5 ny-3">{text.tags}</h2>
                    </div>
                    <img src="/assets/second_moments.png" alt="2" />
                </Col>
            </Row>
        </div>
    )
}
export default Moments