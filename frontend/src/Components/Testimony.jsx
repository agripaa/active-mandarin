import { Carousel } from "antd";
import React from "react";
import CardSlider from "./CardSlider";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const Testimony = ({ text }) => {


    const left = "md:py-5 md:px-6 py-3 px-4 border-2 border-[#02264A] text-[#02264A] hover:bg-[#02264A] hover:text-white rounded-full md:text-2xl text-lg font-bold"
    const right = "md:py-5 md:px-6 py-3 px-4 border-2 border-[#02264A] bg-[#02264A] text-white rounded-full md:text-2xl text-lg font-bold"
    return(
        <div className="bg-[#181B3F]">
            <div className="container mx-auto">
                <div className="flex justify-between min-h-screen items-center px-5">
                    <div className="flex flex-col items-center justify-center w-[30%]">
                        <img src="/assets/contact2x.png" className="w-9/12" alt="" />
                        <h2 className="text-4xl font-semibold text-white tracking-wide my-6 mt-10">{text.tags}</h2>
                        <div className="flex justify-start items-start w-full">
                            <button className="bg-[#FFCC00] px-8 py-5 rounded-3xl font-semibold">Join Now</button>
                        </div>
                    </div>
                    <div className="w-[70%] flex">
 
                    <div className="flex flex-col w-1/2 h-auto items-center justify-center gap-6 mx-6">
                    {[...Array(2)].map((_, index) => (
                        <div
                            key={index}
                            className="bg-white p-6 rounded-2xl flex flex-col shadow-md"
                        >
                            <div className="flex items-center mb-4">
                                <img
                                    src="/assets/profile.png"
                                    alt="Profile"
                                    className="w-12 h-12 rounded-full"
                                />
                                <div className="ml-4">
                                    <h4 className="text-base font-medium">Usman Waskita</h4>
                                    <span className="bg-[#3377FF] text-sm text-white px-4 py-1 rounded-full">
                                        Basic Mandarin
                                    </span>
                                </div>
                            </div>
                            <p className="text-justify text-md font-normal tracking-wide">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Vestibulum mollis nunc a molestie dictum.
                            </p>
                        </div>
                    ))}
                </div>

                {/* Column 2: 3 Cards */}
                <div className="flex flex-col w-1/2 gap-6 mx-6">
                    {[...Array(3)].map((_, index) => (
                        <div
                            key={index}
                            className="bg-white p-6 rounded-2xl flex flex-col shadow-md"
                        >
                            <div className="flex items-center mb-4">
                                <img
                                    src="/assets/profile.png"
                                    alt="Profile"
                                    className="w-12 h-12 rounded-full"
                                />
                                <div className="ml-4">
                                    <h4 className="text-base font-medium">Usman Waskita</h4>
                                    <span className="bg-[#3377FF] text-sm text-white px-4 py-1 rounded-full">
                                        Basic Mandarin
                                    </span>
                                </div>
                            </div>
                            <p className="text-justify text-md font-normal tracking-wide">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Vestibulum mollis nunc a molestie dictum.
                            </p>
                        </div>
                    ))}
                </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Testimony