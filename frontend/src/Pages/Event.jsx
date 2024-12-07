import React, { useEffect } from "react";
import Mainlayouts from "../Layouts/MainLayouts";
import { Col, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getPost } from "../Store/Action/getAllDatas";
import { Link } from "react-router-dom";
import { url } from "../Store/Config/url";

const Event = () => {
    const { data, langs } = useSelector(state => state.LangReducer)
    const { post } = useSelector(state => state.postReducer)
    const dispatch = useDispatch()
    const text = langs ? data?.english : data?.indonesia
    useEffect(() => {
        dispatch(getPost())
    }, [])
    return(
        <Mainlayouts>
            <div className="container mx-auto md:px-10 px-5">
                <div className="py-10 text-center">
                    <h1 className="md:text-5xl text-2xl font-bold text-[#02264A]">{text?.eventTitle}</h1>
                    <p className="md:text-2xl text-lg font-reguler text-[#201F1F] mt-3">{text?.eventDesc}</p>
                </div>
                <Row gutter={ [{lg: 24, md: 16, sm: 8, xs: 8} ,24] } className="py-10">
                    {
                        post.map((item, index) => 
                            <Col key={index} xs={{ span: 12, offset: 0 }} lg={{ span: 6, offset: 0 }} sm={{ span: 12 }}>
                                <Link to={item.link} className="transition ease-in px-0 md:py-10 py-5 bg-white md:rounded-2xl rounded text-[#02264A] md:min-h-[350px] min-h-[250px] hover:drop-shadow-md">
                                    <img src={`${url.IMAGE_URL}posting/${item?.MstPostingAttachment?.file_name}`} alt="card" className="w-full"/>
                                    <div className="md:px-5 px-3">
                                        <h1 className="md:text-xl text-md font-semibold mt-3 mb-4 md:min-h-0 min-h-[40px]">{item?.title}</h1>
                                        <p className="text-sm md:text-md text-gray-500 text-ellipsis overflow-hidden min-h-[40px]">{item.link.split('//')[1]}</p>
                                    </div>
                                </Link>
                            </Col>
                        )
                    }
                </Row>
            </div>
        </Mainlayouts>
    )
}

export default Event