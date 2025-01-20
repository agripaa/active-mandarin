import { Col, Row, Space, Dropdown, Modal, Input, List, Avatar } from "antd";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { GlobalOutlined, MenuOutlined, CloseOutlined } from "@ant-design/icons";
import { RiHandHeartLine, RiSearch2Line, RiMenu3Line  } from "@remixicon/react";
import { useDispatch, useSelector } from "react-redux";
import { HandleLang } from "../Store/Action/LangAction";
import CardClasses from "./CardClass";


const Headers = ({ collapse, funcs }) => {
    const [isScrolled, setIsScrolled] = useState(false);

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


    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50); // Adjust threshold for when the navbar becomes sticky
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

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

    return (
    <div className="sticky top-0 z-50">

    {/* Navbar */}
    <div
        className={`bg-white backdrop-blur-md bg-opacity-80`}
    >
        <Row align="middle" className="py-5 container mx-auto px-5 md:px-10 xl:px-5">
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
                        <div key={index}>
                            <Link
                                to={item.href}
                                className={`relative no-underline nav-text font-medium text-lg text-[#9F9FA1] px-3 hover:text-[#09072E] p-2 transition-all duration-300 xl:text-xl xl:px-4 ${
                                    item.href === location.pathname
                                        ? "active-link"
                                        : ""
                                }`}
                            >
                                {item.name}
                            </Link>
                        </div>
                    ))}
                </Row>
            </Col>
            <Col
                className="lg:m-0 ml-auto hidden justify-end lg:flex"
                xs={{ span: 6, offset: 0 }}
                lg={{ span: 5, offset: 0 }}
            >
                <Space size={15} align="center">
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
                                <span className="ml-2 font-normal">
                                    {langs ? "ENG" : "ID"}
                                </span>
                            </div>
                        </button>
                    </Dropdown>
                </Space>
            </Col>
            <Col
                className="lg:m-0 ml-auto flex justify-end lg:hidden"
                xs={{ span: 6, offset: 0 }}
                lg={{ span: 5, offset: 0 }}
            >
                <Space size={15} align="center">
                    <RiMenu3Line
                        size={25}
                        className="cursor-pointer mr-2"
                        onClick={funcs}
                    />
                </Space>
            </Col>
        </Row>
    </div>

    <div className={`${collapse ? 'flex' : 'hidden'} h-screen w-screen bg-white backdrop-blur-md bg-opacity-70`}>
        <div className="container mx-auto px-5">
            <div className="flex justify-end pt-3 gap-4">
                <Dropdown
                    menu={{ items }}
                    trigger={["click"]}
                    className="flex items-center text-2xl"
                >
                    <button
                        onClick={(e) => e.preventDefault()}
                        className="text-gray-400 text-center"
                    >
                        <div className="text-sm md:text-xl">
                            <GlobalOutlined />
                            <span className="ml-2 font-normal">
                                {langs ? "ENG" : "ID"}
                            </span>
                        </div>
                    </button>
                </Dropdown>
            </div>
            <Row align="middle" className="py-5">
                <div className="flex flex-col">
                    {navs.map((item, index) => (
                        <Link
                            to={item.href}
                            className={`relative no-underline nav-text font-medium text-xl text-[#9F9FA1] mx-4 hover:text-[#09072E] p-2 transition-all duration-300 !w-full ${
                                item.href === location.pathname
                                    ? "active-link"
                                    : ""
                            }`}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
            </Row>
        </div>
    </div>
    </div>

    );
};

export default Headers;
