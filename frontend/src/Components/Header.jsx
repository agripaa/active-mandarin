import { Col, Divider, Dropdown, Row, Space } from "antd";
import React from "react";
import Buttons from "./Buttons";
import { Link, useLocation } from "react-router-dom";
import { GlobalOutlined, MenuOutlined, CloseOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { HandleLang } from "../Store/Action/LangAction";
import { RiHandHeartLine, RiSearch2Line } from "@remixicon/react";

const Headers = ({ collapse, funcs }) => {
    const dispatch = useDispatch();
    const { data, langs } = useSelector((state) => state.LangReducer);
    const text = langs ? data?.english : data?.indonesia;
    const location = useLocation();

    const navs = [
        { name: text?.navbar[0], href: "/" },
        { name: text?.navbar[1], href: "/about" },
        { name: text?.navbar[2], href: "/class" },
        { name: text?.navbar[3], href: "/contact" },
    ];

    const items = [
        {
            key: "1",
            label: <button onClick={() => dispatch(HandleLang(false))}>Indonesia</button>,
        },
        {
            key: "2",
            label: <button onClick={() => dispatch(HandleLang(true))}>English</button>,
        },
    ];

    const collapsed = () => {
        funcs();
    };

    return (
        <div className="sticky top-0 bg-white z-50">
            {/* Header Section */}
            <div className="bg-[#0D1333] py-6 text-white">
                <div className="container mx-auto flex justify-between items-center px-5">
                    <span className="flex flex-row items-center">
                        <RiHandHeartLine size={40} color="white" className="font-thin" />
                        <span className="ml-4">
                            <h4 className="text-md font-semibold">Give Your Donation</h4>
                            <p className="text-sm font-light">towards educating children</p>
                        </span>
                    </span>
                    <div className="flex items-center text-md space-x-4">
                        <Link to="/learn-more" className="text-sm hover:underline">
                            Learn More
                        </Link>
                        <Link
                            to="/donate"
                            className="px-4 py-3 bg-[#FFCC00] text-[#252525] rounded-2xl transition-all duration-300 font-medium hover:bg-yellow-500"
                        >
                            Donate Now
                        </Link>
                    </div>
                </div>
            </div>
            {/* Navbar Section */}
            <Row align="middle" className="py-7 container mx-auto p-4 animate-fade-in">
                <Col span={5}>
                    <Link to="/" className="flex items-center w-full">
                        <img
                            src="/assets/active_logo.png"
                            alt="logo"
                            className="mr-6 w-auto h-12 object-contain"
                        />
                        <img
                            src="/assets/1000 Startup Digital.png"
                            alt="logo"
                            className="w-auto h-12 object-contain"
                        />
                    </Link>
                </Col>
                <Col span={14} className="lg:block hidden">
                    <Row justify="center" gutter={24}>
                        {navs.map((item, index) => (
                            <Col key={index}>
                                <Link
                                    to={item.href}
                                    className={`relative no-underline nav-text font-medium text-xl text-[#9F9FA1] mx-4 hover:text-[#09072E] p-2 transition-all duration-300 ${
                                        item.href === location.pathname ? "active-link" : ""
                                    }`}
                                >
                                    {item.name}
                                </Link>
                            </Col>
                        ))}
                    </Row>
                </Col>
                <Col
                    className="lg:m-0 ml-auto flex justify-end"
                    xs={{ span: 6, offset: 0 }}
                    lg={{ span: 5, offset: 0 }}
                >
                    <Space size={15} align="center">
                        <RiSearch2Line 
                            size={25}
                            color="fill"
                            className="mr-2"
                        />
                        <Dropdown
                            menu={{ items }}
                            trigger={["click"]}
                            className="flex items-center text-2xl"
                        >
                            <button
                                onClick={(e) => e.preventDefault()}
                                className="text-gray-400 text-center lg:m-0 mx-auto"
                            >
                                <div className="text-sm md:text-xl">
                                    <GlobalOutlined />
                                    <span className="ml-2 font-normal">{langs ? "ENG" : "INA"}</span>
                                </div>
                            </button>
                        </Dropdown>
                    </Space>
                </Col>
                <Col className="lg:hidden sm:flex items-center">
                    <button onClick={collapsed}>
                        {collapse ? <CloseOutlined /> : <MenuOutlined />}
                    </button>
                </Col>
            </Row>
            {collapse && (
                <div className="menus animate-slide-in">
                    <div className="absolute top-0 left-0 bg-white w-full min-h-screen p-5">
                        <Space size={17} direction="vertical" className="w-full">
                            {navs.map((item, index) => (
                                <Link
                                    key={index}
                                    to={item.href}
                                    className={`no-underline font-medium text-lg hover:text-[#09072E] ${
                                        item.href === location.pathname ? "text-[#09072E]" : "text-[#9F9FA1]"
                                    }`}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </Space>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Headers;
