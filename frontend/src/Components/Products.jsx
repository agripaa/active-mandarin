import { Col, Row } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const Products = ({ text }) => {
    return(
        <div className="container min-h-screen mx-auto px-10" id="products">
            <Col gutter={[50, 20]} className="py-24 px-0" justify='center' align='middle'>
                <div className="md:px-0 px-3">
                    <h1 className="text-xl lg:text-4xl font-semibold text-[#252525]">{text.title}</h1>
                    <p className="text-lg font-normal my-4 text-[#7D7D7D] w-full lg:w-3/4">{text.desc}</p>
                </div>
                <div className="flex flex-col w-full mt-8">
                    <div className="flex mb-6 text-white items-center justify-center bg-[#181B3F] w-full rounded-xl p-14 px-16">
                        <div className="flex flex-col justify-between tracking-wide border border-white text-justify w-6/12">
                            <h2 className="font-bold text-4xl">Flash Card</h2>
                            <p className="my-8 w-5/6 text-xl tracking-wide">Belajar Mandarin semakin mudah dan seru dengan bantuan flashcard yang sudah dilengkapi dengan kosakata, keterangan, terjemahan, serta contoh kalimat penggunaannya.</p>
                            <div className="flex text-black">
                                <button className="bg-[#FFCC00] font-medium px-6 py-3 mr-4 rounded-2xl">Shopee</button>
                                <button className="bg-[#FFCC00] font-medium px-6 py-3 mr-4 rounded-2xl">Tokopedia</button>
                            </div>
                        </div>
                        <div className="flex justify-end w-4/12">
                            <img src="/assets/product2x.png" className="" alt="" />
                        </div>
                    </div>
                    <div className="flex text-white items-center justify-center bg-[#181B3F] w-full rounded-xl p-14 px-16">
                        <div className="flex flex-col justify-between tracking-wide text-justify w-6/12">
                            <h2 className="font-bold text-4xl">Practice Book</h2>
                            <p className="my-8 w-5/6 text-xl tracking-wide">Belajar Mandarin semakin mudah dan seru dengan bantuan flashcard yang sudah dilengkapi dengan kosakata, keterangan, terjemahan, serta contoh kalimat penggunaannya.</p>
                            <div className="flex text-black">
                                <button className="bg-[#FFCC00] font-medium px-6 py-3 mr-4 rounded-2xl">Shopee</button>
                                <button className="bg-[#FFCC00] font-medium px-6 py-3 mr-4 rounded-2xl">Tokopedia</button>
                            </div>
                        </div>
                        <div className="flex justify-end w-6/12">
                            <img src="/assets/product2.png" className="" alt="" />
                        </div>
                    </div>
                </div>
            </Col>
        </div>
    )
}

export default Products