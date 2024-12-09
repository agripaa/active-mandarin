import React from "react";
import { HiOutlineUsers } from "react-icons/hi";
import { StarFilled, StarOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Row, Col } from "antd";

const CardClasses = ({ data }) => {
    const addCommas = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    // Render bintang
    const renderStars = () => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            if (i < data.star) {
                stars.push(<StarFilled key={i} className="text-[#FAC917]" />);
            } else {
                stars.push(
                    <StarOutlined key={i} className="text-[#FAC917] border-[#FAC917]" />
                );
            }
        }
        return stars;
    };

    // Render grafik level berbentuk tangga
    const renderLevel = () => {
        const heights = ["h-4", "h-6", "h-8"]; // Tinggi bar
        return (
            <div className="flex items-end gap-1">
                {heights.map((height, index) => (
                    <div
                        key={index}
                        className={`w-2 ${
                            index < data.level ? "bg-blue-500" : "bg-gray-300"
                        } ${height} rounded`}
                    ></div>
                ))}
            </div>
        );
    };

    return (
        <Link to="https://wa.link/4hhjtd" target="_blank">
            <div className="transition ease-in bg-white rounded-2xl text-[#02264A] min-h-[320px] w-full mx-6 drop-shadow-md overflow-hidden">
                <img
                    src="/assets/dummy.png"
                    alt="card"
                    className="w-full h-48 object-cover"
                />
                <div className="px-6 py-4">
                    <h1 className="text-2xl font-semibold mb-4">{data?.title}</h1>
                    <div className="">
                        <div className="flex flex-row  items-center text-start">
                            <p className="line-through text-base text-red-500">
                                Rp.{addCommas(data?.price)}
                            </p>
                            <p className="text-base font-semibold text-[#252525] ml-4">
                                Rp.{addCommas(data?.discountPrice)}
                            </p>
                        </div>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                        <div span={12} className="flex items-center gap-1">
                            {renderStars()} 
                            <span>(138)</span>
                        </div>
                        <div className=" flex items-center">
                            {renderLevel()}
                            <h4 className="text-sm font-medium text-gray-500 ml-2">
                            </h4>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default CardClasses;
