import { Card, Col, Row, Space } from "antd";
import React from "react";
import { url } from "../Store/Config/url";

const CardSlider = ({data}) => {
    return(
        <div>
            <Row justify='space-between' align="stretch" className="py-10" gutter={[32, 32]}>
                {
                    data?.map((item, index) => 
                    <Col key={index} xs={{ span: 24, offset: 0 }} sm={{ span: 12, offset: 0 }}>
                        <Card className="drop-shadow-md px-0 md:px-10 min-h-[300px]">
                            <Space>
                                <div className="w-24 h-20 rounded-full overflow-hidden">
                                    <img src={`${url.IMAGE_URL}user/${item?.file_name}`} alt={item?.name} className="w-full h-20 object-cover"/>
                                </div>
                                <div>
                                    <h1 className="text-2xl text-[#3D3D3D] font-semibold">{item?.name}</h1>
                                    <h2 className="text-lg text-[#A1A1A1] font-semibold">{item?.MstCourses.title}</h2>
                                </div>
                            </Space>
                            <div>
                                <div className="text-lg text-[#A1A1A1] my-8 lg:min-h-[150px] md:min-h-[280px]">
                                    <p>{item?.message}. <span>{item?.MstCourses.description}</span></p>
                                </div>
                                <p className="text-xl text-[#02264A] font-semibold">{item?.MstCourses.level}</p>
                            </div>
                        </Card>
                    </Col>
                    )
                }
            </Row>
        </div>
    )
}

export default CardSlider