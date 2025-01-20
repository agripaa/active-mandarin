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
            <div className="container mx-auto bg-white pb-24 mt-12 text-[#201F1F] px-5 md:px-10">
                <Row gutter={[24, 32]} justify='space-between'>
                    <Col xs={{ span: 24, offset: 0 }} lg={{ span: 6, offset: 0 }} sm={{ span: 12 }}>
                        <img src="/assets/active_logo.png" alt="logo" className="md:w-48 w-1/3"/>
                        <Space direction="vertical" className="mt-5">
                            <p className="md:text-xl text-md font-regular">{text?.footerDesc}</p>
                            <h2 className="text-xl font-semibold">{text?.addressTitle}</h2>
                            <p className="md:text-xl text-md font-regular">Xinle Road, Jiangbei New Area Nanjing, Jiangsu China.</p>
                            <h2 className="text-xl font-semibold">{text?.phoneTitle}</h2>
                            <p className="md:text-xl text-md font-regular">+62 822-7950-6450</p>
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
                            <Link to='#products' className="md:text-xl text-md flex items-center gap-3">{langs ? "Products" : "Produk Kami"}</Link>
                            <Link to='/class' className="md:text-xl text-md flex items-center gap-3">{langs ? "Programs" : "Program Kami"}</Link>
                            <Link to='https://docs.google.com/forms/d/1t9Ti-EZBO0ZCHwvaj0lTfmI8yO-sibZV2DZXm10fpK8/edit' target="_blank" className="md:text-xl text-md flex items-center gap-3">{langs ? "Donation" : "Donasi"}</Link>
                            <Link to='https://docs.google.com/forms/d/14c32eKPuWFBfkXPRlS7cgWFBvfx0C_p3zZdhL0Kikzk/edit' target="_blank" className="md:text-xl text-md flex items-center gap-3">{langs ? "Become Our Partner" : "Kemitraan"}</Link>
                            <Link to='https://forms.gle/s1DuHDGpyUiwPjXp8' target="_blank" className="md:text-xl text-md flex items-center gap-3">{langs ? "Join Our Team" : "Gabung Tim Kami"}</Link>

                        </Space>
                    </Col>
                </Row>
            </div>
            <div className="bg-[#02264A] p-5 w-full text-white text-center">
                <p className="text-xs sm:text-sm md:text-base">© 2024 All Right Reserved | Active Mandarin Indonesia</p>
            </div>
        </div>
    )
}

export default Footers