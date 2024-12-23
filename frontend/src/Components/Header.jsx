import { Col, Row, Space, Dropdown, Modal, Input, List, Avatar } from "antd";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { GlobalOutlined, MenuOutlined, CloseOutlined } from "@ant-design/icons";
import { RiHandHeartLine, RiSearch2Line, RiMenu3Line  } from "@remixicon/react";
import { useDispatch, useSelector } from "react-redux";
import { HandleLang } from "../Store/Action/LangAction";
import CardClasses from "./CardClass";


const Headers = ({ collapse, funcs }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
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

    const courses = [
        {
            name: "Mandarin Juara",
            price: 199000,
            originalPrice: 699000,
            rating: 4.8,
            reviews: 138,
            image: "/assets/dummy.png",
        },
        {
            name: "Basic Mandarin Class",
            price: 299000,
            originalPrice: 899000,
            rating: 4.6,
            reviews: 98,
            image: "/assets/dummy.png",
        },
    ];

    const classes = [
        {
            title: "Mentorship",
            price: "699.000",
            discountPrice: "199.000",
            star: 4,
            level: 2,
        },
        {
            title: "Kelas Mandarin Juara",
            price: "699.000",
            discountPrice: "199.000",
            star: 3,
            level: 1,
        },
        {
            title: "Kelas Mandarin Sederhana",
            price: "699.000",
            discountPrice: "199.000",
            star: 5,
            level: 3,
        },
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

    const handleSearchIconClick = () => {
        setIsModalVisible(true);
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
        setSearchQuery("");
        setSearchResults([]);
    };

    const handleSearchInput = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        if (query.trim()) {
            const results = courses.filter((course) =>
                course.name.toLowerCase().includes(query.toLowerCase())
            );
            setSearchResults(results);
        } else {
            setSearchResults([]);
        }
    };

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
                    <RiSearch2Line
                        size={25}
                        className="cursor-pointer mr-2"
                        onClick={handleSearchIconClick}
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
                <RiSearch2Line
                    size={25}
                    className="cursor-pointer mr-2"
                    onClick={handleSearchIconClick}
                />
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

    {/* Search Modal */}
    {isModalVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white h-3/6 w-full max-w-md rounded-lg shadow-lg overflow-hidden">
                {/* Modal Header */}
                <div className="flex justify-between items-center w-full px-6 pt-4">
                    <h2 className="text-xl font-semibold">Find Your Class</h2>
                    <button
                        className="text-gray-400 hover:text-gray-600 p-0 m-0"
                        onClick={handleModalCancel}
                    >
                        <CloseOutlined className="text-lg" />
                    </button>
                </div>
                {/* Modal Body */}
                <div className="p-6">
                    {/* Search Input */}
                    <div className="relative mb-6">
                        <RiSearch2Line className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400 text-lg" />
                        <input
                            type="text"
                            placeholder="Search Class Ex: Mandarin Basic"
                            value={searchQuery}
                            onChange={handleSearchInput}
                            className="w-full pl-12 pr-4 py-3 border rounded-lg bg-[#FAFAFA] focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    {/* Search Results */}
                    {searchResults.length ? (
                        <div className="space-y-4">
                            {searchResults.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex cursor-pointer items-center border rounded-lg bg-white hover:shadow-lg transition-shadow p-4"
                                >
                                    {/* Thumbnail */}
                                    <div className="w-54 h-20 flex-shrink-0 mr-8">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-contain rounded-lg"
                                        />
                                    </div>
                                    {/* Class Details */}
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-[#02264A]">
                                            {item.name}
                                        </h3>
                                        <div className="flex items-center mt-2">
                                            <span className="line-through text-red-500 text-sm">
                                                Rp {item.originalPrice.toLocaleString()}
                                            </span>
                                            <span className="ml-4 text-black font-normal text-sm">
                                                Rp {item.price.toLocaleString()}
                                            </span>
                                        </div>
                                        <div className="flex items-center mt-2">
                                            <span className="text-yellow-500 text-sm flex items-center">
                                                ★ {item.rating}
                                            </span>
                                            <span className="ml-2 text-gray-500 text-sm">
                                                ({item.reviews} reviews)
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-center">
                            Search for your desired class above.
                        </p>
                    )}
                </div>
            </div>
        </div>
    )}
    </div>

    );
};

export default Headers;
