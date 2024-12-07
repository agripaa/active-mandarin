import React, { useEffect } from "react";
import { Col, Row } from "antd";
import Buttons from "./Buttons";
import { useDispatch, useSelector } from "react-redux";
import { getSponsors } from "../Store/Action/getAllDatas";
import { url } from "../Store/Config/url";
import { Link } from "react-router-dom";

const Sponsors = ({ text }) => {
    const dispatch = useDispatch()
    const { data } = useSelector(state => state.sponsorReducer)
    useEffect(() => {
        dispatch(getSponsors())
    }, [dispatch])
    return (
        <div className="my-20 container mx-auto p-3">
            <h2 className="font-normal text-[#7D7D7D] md:text-xl text-xs text-center">{text.tags}</h2>
            <div className="my-20">
                <Row gutter={[16, 16]} justify='center' align='middle'>
                    {
                        data.map((item, index) => 
                            <Col key={index} xs={{ span: 5, offset: 0 }} lg={{ span: 2, offset: 0 }} className="static">
                                <img src={`${url.IMAGE_URL}sponsors/${item.MstSponsorsAttachment?.file_name}`} alt={item.name} className="w-3/4 mx-auto"/>
                            </Col>
                        )
                    }
                </Row>
            </div>
            <div className="text-center">
                <Link to='mailto:activemandarinid@gmail.com' target="_blank">
                    <Buttons>{text.button}</Buttons>
                </Link>
            </div>
        </div>
    )
}

export default Sponsors