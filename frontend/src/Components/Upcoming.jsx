import { Card, Col, Row } from "antd";
import React, { useEffect } from "react";
import Buttons from "./Buttons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPost } from "../Store/Action/getAllDatas";
import { url } from "../Store/Config/url";

const Upcoming = ({ text }) => {
    const { Meta } = Card
    const dispatch = useDispatch()
    const { post } = useSelector(state => state.postReducer)

    useEffect(() => {
        dispatch(getPost())
    }, [])
    const dummy = [
        {
            title: 'QnA Session',
            source: 'www.instagram.com',
            cover: '/assets/events.png'
        },
        {
            title: 'QnA Session',
            source: 'www.instagram.com',
            cover: '/assets/events.png'
        },
        {
            title: 'QnA Session',
            source: 'www.instagram.com',
            cover: '/assets/events.png'
        },
        {
            title: 'QnA Session',
            source: 'www.instagram.com',
            cover: '/assets/events.png'
        }
    ]
    return(
        <div className="container mx-auto py-20 px-5 md:px-10">
            <div className="text-center">
                <h1 className="text-3xl lg:text-4xl font-semibold text-[#D15254]">{text.title}</h1>
                <h2 className="text-4xl lg:text-6xl font-semibold text-[#02264A] my-5">{text.tags}</h2>
            </div>
            <Row gutter={[32, 32]} className="py-10" justify='center'>
                {
                    post.map((item, index) => 
                        <Col key={index} xs={{ span: 24, offset: 0 }} lg={{ span: 6, offset: 0 }} sm={{ span: 12 }}>
                            <Link to={item.link} target="_blank">
                                <Card 
                                cover={
                                    item?.MstPostingAttachment?.file_name ? <img alt={item.title} src={`${url.IMAGE_URL}posting/${item?.MstPostingAttachment?.file_name}`}/> : <div className="w-full h-[425px] rounded-t-lg bg-slate-400"></div>} 
                                className="hover:drop-shadow-md sm:rounded-xl rounded">
                                    <Meta 
                                    title={<h1 className="md:text-lg text-md">{item.title}</h1>}/>
                                    <p className="text-sm md:text-md my-3 text-gray-500">{item.link.split('//')[1]}</p>
                                </Card>
                            </Link>
                        </Col>
                    )
                }
            </Row>
            <div className="text-center">
                <Link to='/events'>
                    <Buttons>{text.button}</Buttons>
                </Link>
            </div>
        </div>
    )
}

export default Upcoming