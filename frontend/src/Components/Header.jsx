import { Col, Divider, Dropdown, Row, Space } from "antd";
import React from "react";
import Buttons from "./Buttons";
import { Link, useLocation } from "react-router-dom";
import { GlobalOutlined, MenuOutlined, CloseOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { HandleLang } from "../Store/Action/LangAction";

const Headers = ({ collapse, funcs }) => {
    const dispatch = useDispatch()
    const { data, langs } = useSelector(state => state.LangReducer)
    const text = langs ? data?.english : data?.indonesia
    const location = useLocation()

    const navs = [
        {
            name: text?.navbar[0],
            href: '/'
        },
        {
            name: text?.navbar[1],
            href: '/about'
        },
        {
            name: text?.navbar[2],
            href: '/class'
        },
        {
            name: text?.navbar[3],
            href: '/events'
        },
        {
            name: text?.navbar[4],
            href: '/flash'
        }
    ]

    const items = [
        {
            key: '1',
            label: <button onClick={() => dispatch(HandleLang(false))}>Indonesia</button>
        },
        {
            key: '2',
            label: <button onClick={() => dispatch(HandleLang(true))}>English</button>
        }
    ]

    const collapsed = () => {
        funcs()
    }

    return(
        <div className="sticky top-0 bg-white z-50">
            <Row align='middle' className="py-7 container mx-auto p-4">
                <Col span={5}>
                    <Link to='/'>
                        <img src="/assets/active_logo.png" alt="logo" className="md:w-1/3 w-full"/>
                    </Link>
                </Col>
                <Col span={14} className="lg:block hidden">
                    <Row justify="center" gutter={24} >
                        {navs.map((item, index) => 
                            <Col key={index} >
                                <Link 
                                to={item.href}
                                className={`no-underline font-medium text-lg hover:text-[#09072E] ${item.href === location.pathname ? 'text-[#09072E]' : 'text-[#9F9FA1]'}`}>{item.name}</Link>
                            </Col>
                        )}
                        <Col>
                            <a href="#contact" className="no-underline font-medium text-lg hover:text-[#09072E] text-[#9F9FA1]">Contact</a>
                        </Col>
                    </Row>
                </Col>
                <Col className="lg:m-0 ml-auto flex justify-end" xs={{ span: 6, offset: 0 }} lg={{ span: 5, offset: 0 }}>
                    <Space size={15} align="center">
                        <Dropdown 
                        menu={{items}}
                        trigger={['click']}
                        className="flex items-center text-xl">
                            <button onClick={e => e.preventDefault()} className="text-gray-400 text-center lg:m-0 mx-auto">
                                <div className="text-sm md:text-lg">
                                    <GlobalOutlined />
                                    <Divider type="vertical"/>
                                    <span>
                                        { langs ? "ENG" : "INA"}
                                    </span>
                                </div>
                            </button>
                        </Dropdown>
                        <Link to='/#products' className="lg:block hidden">
                            <Buttons>Get Started</Buttons>
                        </Link>
                    </Space>
                </Col>
                <Col className="lg:hidden sm:flex items-center">
                    <button onClick={collapsed}>{ collapse ? <CloseOutlined /> : <MenuOutlined />}</button>
                </Col>
            </Row>
            {
                collapse && (
                    <div className="menus">
                        <div className="absolute top-0 left-0 bg-white w-full min-h-screen p-5">
                            <Space size={17} direction="vertical" className="w-full">
                                {navs.map((item, index) => 
                                    <Link 
                                    key={index} 
                                    to={item.href}
                                    className={`no-underline font-medium text-lg hover:text-[#09072E] ${item.href === location.pathname ? 'text-[#09072E]' : 'text-[#9F9FA1]'}`}>{item.name}</Link>
                                )}
                            </Space>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Headers