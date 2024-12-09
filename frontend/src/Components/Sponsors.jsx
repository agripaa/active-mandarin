import React, { useEffect } from "react";
import { Col, Row } from "antd";
import Buttons from "./Buttons";

import { Link } from "react-router-dom";

const Sponsors = ({ text }) => {
    const data = [
        '/assets/1000 Startup Digital.png',
        '/assets/KGM.png',
        '/assets/Kinrui New Energy 1.png'
    ];
    return (
        <div className="mb-20 container mx-auto p-3">
            <h2 className="font-normal text-[#252525] md:text-lg text-xs text-start">{text.tags}</h2>
            <div className="w-full flex justify-between items-center">
                <div className="my-4">
                    <Row className="w-full">
                        {
                            data.map((item, index) => 
                                    <img key={index} src={item} alt='company' className="w-auto h-20 mr-12"/>
                            )
                        }
                    </Row>
                </div>
                <div className="text-center">
                    <Link to='mailto:activemandarinid@gmail.com' target="_blank">
                        <Buttons>{text.button}</Buttons>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Sponsors