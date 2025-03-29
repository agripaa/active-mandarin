import React from "react";
import { Row } from "antd";
import Buttons from "./Buttons";

import { Link } from "react-router-dom";

const Sponsors = ({ text }) => {
    const data = [
        '/assets/1000 Startup Digital.png',
        '/assets/kgm.png',
        '/assets/Kinrui New Energy 1.png',
        '/assets/MMA.png',
        '/assets/ANOA.png',
        
    ];
    return (
        <div className="bg-[#F5F8FF] py-24">
            <div className="w-full flex justify-center items-center flex-col mx-auto p-3">
                <h2 className="font-normal text-[#252525] md:text-lg text-xs text-start">{text.tags}</h2>
                <div className="w-full flex justify-between items-center">
                    <div className="w-full my-6 justify-center flex items-center">
                        <Row className="w-full justify-center flex items-center gap-3 mb-7">
                            {
                                data.map((item, index) => 
                                    <div className="bg-white mx-8 px-6 py-4 rounded-2xl">
                                        <img key={index} src={item} alt='company' className="w-auto h-20"/>
                                    </div>
                                )
                            }
                        </Row>
                    </div>
                </div>
                    <div className="w-full flex justify-center items-center ">
                        <Link to='https://docs.google.com/forms/d/14c32eKPuWFBfkXPRlS7cgWFBvfx0C_p3zZdhL0Kikzk/edit' target="_blank">
                            <Buttons>{text.button}</Buttons>
                        </Link>
                    </div>
            </div>
        </div>
    )
}

export default Sponsors