import React from "react";
import Buttons from "./Buttons";
import { Space } from "antd";
import { Link } from "react-router-dom";

const Supports = ({ text }) => {
    return(
        <div className="text-white text-center flex items-center justify-center supp" style={{ height: '400px'}}>
            <Space align="center" direction="vertical" className="px-5">
                <h1 className="text-4xl lg:text-5xl font-bold">{text.title}</h1>
                <h2 className="text-xl lg:text-2xl font-reguler my-5">{text.desc}</h2>
                <Link to={'https://forms.gle/8eNS96nYrZSm1he47'} target="_blank">
                    <Buttons>{text.button}</Buttons>
                </Link>
            </Space>
        </div>
    )
}

export default Supports