import { Carousel } from "antd";
import React, { useEffect, useState, useRef } from "react";
import CardSlider from "./CardSlider";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getTestimony } from "../Store/Action/getAllDatas";

const Testimony = ({ text }) => {
    const [data, setData] = useState([])
    const dispatch = useDispatch()
    const { testimony } = useSelector(state => state.testimonyReducer)
    const slider = useRef(null)
    let pointer = Math.ceil(testimony.length / (testimony.length/2))
    useEffect(() => {
        dispatch(getTestimony())
    }, [])
    useEffect(() => {
        const newData = []
        for(let i = 0; i < testimony.length; i += pointer){
            let temp = testimony.slice(i, i + pointer)
            newData.push(temp)
        }
        setData(newData)
    }, [testimony])

    const left = "md:py-5 md:px-6 py-3 px-4 border-2 border-[#02264A] text-[#02264A] hover:bg-[#02264A] hover:text-white rounded-full md:text-2xl text-lg font-bold"
    const right = "md:py-5 md:px-6 py-3 px-4 border-2 border-[#02264A] bg-[#02264A] text-white rounded-full md:text-2xl text-lg font-bold"
    return(
        <div className="container mx-auto">
            <div className="px-5">
                <h1 className="md:text-3xl text-xl font-semibold text-[#D15254]">{text.title}</h1>
                <div className="flex flex-wrap justify-between items-center">
                    <h2 className="md:text-4xl text-3xl lg:text-5xl font-semibold text-[#02264A] md:my-5 my-3 w-[600px]">{text.tags}</h2>
                    <div className="flex gap-5">
                        <button className={left} onClick={() => slider.current.prev()}><LeftOutlined /></button>
                        <button className={right} onClick={() => slider.current.next()}><RightOutlined /></button>
                    </div>
                </div>
            </div>
            <Carousel draggable autoplay dots={false} ref={slider}>
                {
                    data.map((item, index) => 
                        <div key={index} className="w-full px-5">
                            <CardSlider data={item}/>
                        </div>
                    )
                }
            </Carousel>
        </div>
    )
}

export default Testimony