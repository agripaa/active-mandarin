import React, { useState, useEffect } from "react";
import Mainlayouts from "../Layouts/MainLayouts";
import { Col, Row, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAbout } from "../Store/Action/getAllDatas";
import { url } from "../Store/Config/url";


const About = () => {
    const { data, langs } = useSelector(state => state.LangReducer)
    const { about } = useSelector(state => state.aboutReducer)
    const [idx, setIndex] = useState('2019')
    const text = langs ? data?.english : data?.indonesia
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAbout(idx))
    }, [dispatch, idx])

    const year = ['2019', '2020', '2021', '2022', '2023']

    const years = 'transition ease-out font-bold text-center hover:text-[#02264A] cursor-pointer'

    return(
        <Mainlayouts>
            <div className="container m-auto px-10">
                <div className="py-10 text-center">
                    <h1 className="md:text-5xl text-2xl font-bold text-[#02264A]">{text?.aboutTitle}</h1>
                    <p className="md:text-2xl text-lg font-reguler text-[#201F1F] mt-3">{text?.aboutDesc}</p>
                </div>
                <Row className="py-10" align='middle' justify='center' gutter={[0, 32]}>
                    <Col xs={{ span: 24, offset: 0 }} lg={{ span: 5, offset: 0 }} md={{ span: 7 }} className="text-center">
                        <Space direction="vertical" size={20}>
                            {
                                year.map((item, index) => 
                                    <div key={index} onClick={() => setIndex(item)} className={`${years} ${item === idx ? 'text-[#02264A] text-5xl py-3' : 'text-[#E5E9F2] text-4xl py-2'}`}>{item}</div>
                                )
                            }
                        </Space>
                    </Col>
                    <Col  xs={{ span: 24, offset: 0 }} lg={{ span: 15, offset: 0 }} md={{ span: 12 }} >
                        <Space direction="vertical" className="items-center">
                            <div className="max-w-[500px] max-h-[400px] relative border-2 border-[#02264A] rounded-3xl mb-20">
                                <img src={`${url.IMAGE_URL}about/${about?.file_name}`} alt="bg" className="absoulte rounded-2xl w-[500px] h-[300px] object-cover m-auto drop-shadow-xl mb-10" style={{ transform: 'translate(-5%, 5%)'}}/>
                            </div>
                            <h1 className="md:text-4xl text-xl font-bold text-[#02264A] text-center lg:w-3/4 mx-auto">
                                {langs ? about?.subject?.english : about?.subject?.indonesia}</h1>
                            <p className="md:text-lg text-md font-reguler text-[#A1A1A1] mt-3 text-center">
                                {langs ? about?.description?.english : about?.description?.indonesia}</p>
                        </Space>
                    </Col>
                </Row>
            </div>
        </Mainlayouts>
    )
}
export default About