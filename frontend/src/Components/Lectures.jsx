import { Card, Space } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLecture } from "../Store/Action/getAllDatas";
import { url } from "../Store/Config/url";

const Lectures = ({ text }) => {
    const dispatch = useDispatch()
    const { lecture } = useSelector(state => state.lectureReducer)

    useEffect(() => {
        dispatch(getLecture())
    }, [dispatch])

    return(
        <div className="md:py-20 py-10 md:px-10 px-5">
            <div className="container m-auto">
                <h1 className="text-xl lg:text-4xl font-semibold text-[#D15254]">{text.title}</h1>
                <h2 className="text-2xl lg:text-6xl font-semibold text-[#02264A] my-5 md:w-[700px] w-full">{text.tags}</h2>
            </div>
            <div className="container mx-auto">
                <Space className="lectures px-20 max-w-full overflow-x-scroll snap-mandatory lg:scroll-pl-6 scroll-pl-2 snap-x md:py-28 py-10" align="center" size={30}>
                    {
                        lecture.map((item, index) =>
                            <Card className="border-0 snap-center" key={index} style={{ width: '300px'}}>
                                <div className="relative w-full h-[300px] flex items-center justify-center">
                                    <img src={`${url.IMAGE_URL}mentor/${item.MstMentorAttachment.file_name}`} alt="profile" className="object-cover drop-shadow-xl object-center w-[220px] h-[220px] rounded-full" />
                                    <div>
                                        <img src="/assets/bg_lecture.svg" alt="bg" className="absolute top-50% scale-90 left-1/2 translate-x-[-45%] translate-y-[-50%]"/>
                                    </div>
                                </div>
                                <div className="p-5 flex-col items-center text-center h-[100px]">
                                    <h2 className="text-[#3D3D3D] md:text-2xl text-lg font-semibold capitalize">{item.name}</h2>
                                    <p className="text-[#7A7778] text-lg font-medium">{item.university_name}</p>
                                </div>
                            </Card>
                        )
                    }
                    <div className="h-full w-[200px] lg:block hidden"></div>
                </Space>
            </div>
        </div>
    )
}

export default Lectures