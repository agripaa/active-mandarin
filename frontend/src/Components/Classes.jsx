import { Col, Row } from "antd";
import React from "react";
import CardClasses from "./CardClass";

const Classes = ({ title }) => {
    const classes = [
        {
            title: "Mentorship",
            price: "699.000",
            discountPrice: "199.000",
            star: 4,
            level: 2,
        },
        {
            title: "Kelas Mandarin Juara",
            price: "699.000",
            discountPrice: "199.000",
            star: 3,
            level: 1,
        },
        {
            title: "Kelas Mandarin Sederhana",
            price: "699.000",
            discountPrice: "199.000",
            star: 5,
            level: 3,
        },
    ];

    return (
        <div className="px-5">
            <div className="container mx-auto py-20">
                <h1 className="text-4xl font-semibold text-start mb-10">{title}</h1>
                <Row className="py-5 flex justify-center items-center w-full">
                    {classes.map((item, index) => (
                        <div key={index} className="mx-10" >
                            <CardClasses data={item} />
                        </div>
                    ))}
                </Row>
            </div>
        </div>
    );
};

export default Classes;
