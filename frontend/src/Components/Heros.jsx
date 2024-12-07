import { Space } from "antd";
import React from "react";

const Heros = ({ text }) => {
    return(
        <div className="container mx-auto px-5 md:px-0">
            <Space align="center" direction="vertical" className="py-10">
                <div className="text-center mb-10">
                    <h1 className="text-xl font-bold text-[#02264A] md:text-5xl">{text.title}</h1>
                    <h2 className="text-lg font-reguler text-[#201F1F] mt-3 md:text-2xl">{text.desc}</h2>
                </div>
                <img src="/assets/heros.png" alt="img" className="sm:w-3/4 mx-auto w-full"/>
            </Space>
        </div>
    )
}

export default Heros