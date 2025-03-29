import { Col, Row, Space, Dropdown, Menu, Modal, Input, Button } from "antd";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { GlobalOutlined } from "@ant-design/icons";
import { RiArrowDownSFill, RiMenu3Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { HandleLang } from "../Store/Action/LangAction";
import { loginUser, registerUser, verifyOTP } from "../api/auth";

const Headers = ({ collapse, funcs }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [openProfileDropdown, setOpenProfileDropdown] = useState(false);
    const [openSignIn, setOpenSignIn] = useState(false);
    const [openSignUp, setOpenSignUp] = useState(false);
    const [openVerification, setOpenVerification] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [otpCode, setOtpCode] = useState("");
    const [userEmail, setUserEmail] = useState("");

    const handleRegister = async () => {
      try {
        const response = await registerUser({ name, email, password });
        if (response.data.status) {
          setOpenSignUp(false);
          setOpenSignIn(true);
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        alert("Error: " + error.response?.data?.message || "Registration failed");
      }
    };

    const handleLogin = async () => {
      try {
        const response = await loginUser({ email, password });
        if (response.data.status) {
          setOpenSignIn(false);
          setOpenVerification(true);
          setUserEmail(email);
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        alert("Error: " + error.response?.data?.message || "Login failed");
      }
    };
    
    const handleVerifyOTP = async () => {
      try {
        const response = await verifyOTP({ email: userEmail, otp_code: otpCode });
        if (response.data.status) {
          localStorage.setItem("token", response.data.token); // Simpan token setelah login sukses
          setOpenVerification(false);
          alert("Login successful!");
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        alert("Error: " + error.response?.data?.message || "OTP verification failed");
      }
    };
      
      

    const dispatch = useDispatch();
    const { data, langs } = useSelector((state) => state.LangReducer);
    const text = langs ? data?.english : data?.indonesia;
    const location = useLocation();

    const navs = [
        { name: text?.navbar[0], href: "/" },
        { name: text?.navbar[1], href: "/about" },
        { name: text?.navbar[2], href: "/class" },
        { name: text?.navbar[3], href: "/products" },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
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

    const profileMenu = (
        <Menu className="w-48 shadow-md">
            <Menu.Item key="1">
                <Link to="/dashboard">Dashboard</Link>
            </Menu.Item>
            <Menu.Item key="2">
                <button onClick={() => console.log("Logout...")}>Logout</button>
            </Menu.Item>
        </Menu>
    );

    return (
        <div className="sticky top-0 z-50">
            {/* Navbar */}
            <div className={`bg-white backdrop-blur-md bg-opacity-80`}>
                <Row align="middle" className="py-5 container mx-auto px-5 md:px-10 xl:px-5">
                    <Col span={5}>
                        <Link to="/" className="flex items-center w-full">
                            <img src="/assets/active_logo.png" alt="logo" className="mr-6 w-auto h-12 object-contain" />
                            <img src="/assets/1000 Startup Digital.png" alt="logo" className="w-auto h-12 object-contain" />
                        </Link>
                    </Col>
                    <Col span={14} className="lg:block hidden">
                        <Row justify="center" gutter={24}>
                            {navs.map((item, index) => (
                                <div key={index}>
                                    <Link
                                        to={item.href}
                                        className={`relative no-underline nav-text font-medium text-lg text-[#9F9FA1] px-3 hover:text-[#09072E] p-2 transition-all duration-300 xl:text-xl xl:px-4 ${
                                            item.href === location.pathname ? "active-link" : ""
                                        }`}
                                    >
                                        {item.name}
                                    </Link>
                                </div>
                            ))}
                        </Row>
                    </Col>
                    <Col className="lg:m-0 ml-auto hidden justify-end lg:flex items-center" xs={{ span: 6 }} lg={{ span: 5 }}>
                        <Space size={15} align="center" className="mr-6">
                            <Dropdown menu={{ items }} trigger={["click"]} className="flex items-center text-2xl">
                                <button onClick={(e) => e.preventDefault()} className="text-gray-400 text-center lg:m-0 mx-auto">
                                    <div className="text-sm md:text-xl">
                                        <GlobalOutlined />
                                        <span className="ml-2 font-normal">{langs ? "ENG" : "ID"}</span>
                                    </div>
                                </button>
                            </Dropdown>
                        </Space>
                        
                        {process.env.REACT_APP_LOGIN === "true" ? (
                            <Dropdown overlay={profileMenu} trigger={["click"]} open={openProfileDropdown} onOpenChange={setOpenProfileDropdown}>
                                <div className="flex items-center gap-4 font-medium cursor-pointer">
                                    <h4 className="text-md lg:text-lg">Hallo, Dicka</h4>
                                    <div className="flex items-center">
                                        <img src="/assets/profile-dummy.png" alt="" className="w-14 h-14 rounded-full mr-1" />
                                        <RiArrowDownSFill size={25} className="cursor-pointer" />
                                    </div>
                                </div>
                            </Dropdown>
                        ) : (
                            <div className="flex items-center gap-4 font-medium">
                                <button className="text-lg" onClick={() => setOpenSignUp(true)}>Daftar</button>
                                <button className="text-lg bg-[#FFCC00] py-2 px-4 rounded-xl" onClick={() => setOpenSignIn(true)}>Masuk</button>
                            </div>
                        )}
                    </Col>
                    <Col className="lg:m-0 ml-auto flex justify-end lg:hidden" xs={{ span: 6 }} lg={{ span: 5 }}>
                        <Space size={15} align="center">
                            <RiMenu3Line size={25} className="cursor-pointer mr-2" onClick={funcs} />
                        </Space>
                    </Col>
                </Row>
            </div>

            {/* Mobile Menu */}
            <div className={`${collapse ? "flex" : "hidden"} h-screen w-screen bg-white backdrop-blur-md bg-opacity-70`}>
                <div className="container mx-auto px-5">
                    <div className="flex justify-end pt-3 gap-4">
                        <Dropdown menu={{ items }} trigger={["click"]} className="flex items-center text-2xl">
                            <button onClick={(e) => e.preventDefault()} className="text-gray-400 text-center">
                                <div className="text-sm md:text-xl">
                                    <GlobalOutlined />
                                    <span className="ml-2 font-normal">{langs ? "ENG" : "ID"}</span>
                                </div>
                            </button>
                        </Dropdown>
                        {process.env.REACT_APP_LOGIN === "true" ? (
                            <Dropdown overlay={profileMenu} trigger={["click"]} open={openProfileDropdown} onOpenChange={setOpenProfileDropdown}>
                                <div className="flex items-center gap-4 font-medium cursor-pointer">
                                    <h4 className="text-md lg:text-lg">Hallo, Dicka</h4>
                                    <div className="flex items-center">
                                        <img src="/assets/profile-dummy.png" alt="" className="w-14 h-14 rounded-full mr-1" />
                                        <RiArrowDownSFill size={25} className="cursor-pointer" />
                                    </div>
                                </div>
                            </Dropdown>
                        ) : (
                            <div className="flex items-center gap-4 font-medium">
                                <button className="text-lg" onClick={() => setOpenSignUp(true)}>Daftar</button>
                                <button className="text-lg bg-[#FFCC00] py-2 px-4 rounded-xl" onClick={() => setOpenSignIn(true)}>Masuk</button>
                            </div>
                        )}
                    </div>
                    <Row align="middle" className="py-5">
                        <div className="flex flex-col">
                            {navs.map((item, index) => (
                                <Link
                                    to={item.href}
                                    className={`relative no-underline nav-text font-medium text-xl text-[#9F9FA1] mx-4 hover:text-[#09072E] p-2 transition-all duration-300 !w-full ${
                                        item.href === location.pathname ? "active-link" : ""
                                    }`}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </Row>
                </div>
            </div>


            {/* Modal Sign In */}
            <Modal title="Sign In" open={openSignIn} onCancel={() => setOpenSignIn(false)} footer={null} centered>
                <hr className="mb-6"/>
                <Input 
                    placeholder="Email" 
                    className="mb-3 py-2" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                />
                <Input.Password 
                    placeholder="Password" 
                    className="mb-3 py-2" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />
                <Link to="#" className="text-blue-500 text-end text-sm mb-4 inline-block">Forgot Password?</Link>
                <Button type="primary" className="w-full bg-[#FFCC00] text-black py-2" onClick={handleLogin}>
                    Sign In
                </Button>

                <Button className="w-full mt-2 py-4" onClick={() => { setOpenSignIn(false); setOpenSignUp(true); }}>Create New Account</Button>
            </Modal>

            {/* Modal Sign Up */}
            <Modal title="Sign Up" open={openSignUp} onCancel={() => setOpenSignUp(false)} footer={null} centered>
                <hr className="mb-6"/>
                <Input 
                    placeholder="Nama" 
                    className="mb-3 py-2" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                />
                <Input 
                    placeholder="Email" 
                    className="mb-3 py-2" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                />
                <Input.Password 
                    placeholder="Password" 
                    className="mb-3 py-2" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />
                <Button type="primary" className="w-full bg-[#FFCC00] text-black py-4" onClick={handleRegister}>
                    Sign Up
                </Button>
                <Button className="w-full mt-2 py-4" onClick={() => { setOpenSignUp(false); setOpenSignIn(true); }}>Sign In</Button>
            </Modal>

            {/* Modal OTP Verification */}
            <Modal title="Verification" open={openVerification} onCancel={() => setOpenVerification(false)} footer={null} centered>
                <hr className="mb-6"/>
                <p className="text-sm text-gray-600">Enter the 6-digit code sent to your email</p>
                <Input 
                    placeholder="Enter OTP" 
                    className="mb-3 mt-2 py-2" 
                    value={otpCode} 
                    onChange={(e) => setOtpCode(e.target.value)} 
                />
                <Button type="primary" className="w-full bg-[#FFCC00] text-black py-2" onClick={handleVerifyOTP}>
                  Submit
                </Button>

            </Modal>
        </div>
    );
};

export default Headers;
