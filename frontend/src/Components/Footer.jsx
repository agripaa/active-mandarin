import { Col, Row, Space } from "antd";
import React from "react";
import { SiTiktok, SiGmail, SiInstagram } from 'react-icons/si'
import { SlGlobe } from 'react-icons/sl'
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


const Footers = () => {
    const { data, langs } = useSelector(item => item.LangReducer)
    const text = langs ? data.english : data.indonesia
    const socmed = [
        {
            title: 'activemandarinid@gmail.com',
            href: 'mailto:activemandarinid@gmail.com',
            icons: <SiGmail/>
        },
        {
            title: 'activemandarin',
            href: 'https://www.tiktok.com/@activemandarin.id',
            icons: <SiTiktok/>
        },
        {
            title: 'activemandarin.id',
            href: 'https://www.instagram.com/activemandarin.id/',
            icons: <SiInstagram/>
        },
        {
            title: 'activemandarin.id',
            href: '/',
            icons: <SlGlobe/>
        }
    ]
    return(
        <div className="w-full" id="contact">
            <div className="container mx-auto bg-white py-28 text-[#201F1F] px-5 md:px-10">
                <Row gutter={[24, 32]} justify='space-between'>
                    <Col xs={{ span: 24, offset: 0 }} lg={{ span: 6, offset: 0 }} sm={{ span: 12 }}>
                        <img src="/assets/active_logo.png" alt="logo" className="md:w-48 w-1/3"/>
                        <Space direction="vertical" className="mt-5">
                            <p className="md:text-xl text-md font-regular">{text?.footerDesc}</p>
                            <h2 className="text-xl font-semibold">{text?.addressTitle}</h2>
                            <p className="md:text-xl text-md font-regular">Lahat, Sumatera Selatan, Indonesia</p>
                            <h2 className="text-xl font-semibold">{text?.phoneTitle}</h2>
                            <p className="md:text-xl text-md font-regular">+62 821 3337 6775</p>
                        </Space>
                    </Col>
                    <Col xs={{ span: 24, offset: 0 }} lg={{ span: 4, offset: 0 }} sm={{ span: 12 }}>
                        <h1 className="text-2xl font-bold">{text?.socmed}</h1>
                        <Space direction="vertical" className="mt-5" size={15}>
                            {
                                socmed.map((item, index) => 
                                    <Link to={item.href} target={index === socmed.length - 1 ? "" : "_blank"} key={index} className="md:text-xl text-md flex items-center gap-3">{item.icons}{item.title}</Link>
                                )
                            }
                        </Space>
                    </Col>
                    <Col xs={{ span: 24, offset: 0 }} lg={{ span: 4, offset: 0 }} sm={{ span: 12 }}>
                        <h1 className="text-2xl font-bold">{text?.general}</h1>
                        <Space direction="vertical" className="mt-5" size={15}>
                            <Link to='/about' className="md:text-xl text-md flex items-center gap-3">{text?.generalItem[0]}</Link>
                            <Link to='https://docs.google.com/forms/d/e/1FAIpQLSdMLbD0-_nz9BJvUnviScGuVkHkoyI57VPsgnZ0G8dSfbH51Q/viewform' target="_blank" className="md:text-xl text-md flex items-center gap-3">{text?.generalItem[1]}</Link>
                        </Space>
                    </Col>
                    <Col xs={{ span: 24, offset: 0 }} lg={{ span: 4, offset: 0 }} sm={{ span: 12 }}>
                        <h1 className="text-2xl font-bold">FAQ</h1>
                        <Space direction="vertical" className="mt-5" size={15}>
                            <Link to='https://wa.link/4hhjtd' target="_blank" className="md:text-xl text-md flex items-center gap-3">{text?.chatAdmin}</Link>
                        </Space>
                    </Col>
                </Row>
            </div>
            <div className="bg-[#181B3F] p-5 w-full text-white text-center">
                <p>© 2023 All Right Reserved | Active Mandarin</p>
            </div>
        </div>
    )
}

export default Footers