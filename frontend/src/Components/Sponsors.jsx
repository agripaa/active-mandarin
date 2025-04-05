import React from "react";
import { Row } from "antd";
import Buttons from "./Buttons";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Sponsors = ({ text }) => {
    const { _, langs } = useSelector((state) => state.LangReducer);
    const data = [
        '/assets/1000 Startup Digital.png',
        '/assets/kgm.png',
        '/assets/Kinrui New Energy 1.png',
        '/assets/MMA.png',
        '/assets/ANOA.png',
        
    ];
    return (
        <div className="bg-[#FFFFFF] pt-48 sm:pt-28 pb-4">
            <div className="container w-full flex justify-center items-center flex-col mx-auto px-5 md:px-16">
                <h2 className="font-normal text-[#252525] text-base text-start md:text-lg lg:text-2xl">{langs ? 'Our Company & Organization Partners' : 'Mitra Perusahaan & Organisasi Kami'}</h2>
                <div className="w-full flex justify-between items-center mt-8">
                    <div className="w-full justify-center flex items-center">
                        <Row className="w-full justify-center flex items-center gap-10">
                            {
                                data?.map((item, index) => 
                                    <div className="bg-white border border-[#AFB8CA] p-4 rounded-2xl w-auto h-20">
                                        <img key={index} src={item} alt='company' className="h-full w-auto"/>
                                    </div>
                                )
                            }
                        </Row>
                    </div>
                </div>
                <div className="w-full flex justify-center items-center mt-12">
                    <Link to='https://docs.google.com/forms/d/14c32eKPuWFBfkXPRlS7cgWFBvfx0C_p3zZdhL0Kikzk/edit' target="_blank">
                        <Buttons>{langs ? 'Become Our Partner' : 'Menjadi Mitra Kami'}</Buttons>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Sponsors