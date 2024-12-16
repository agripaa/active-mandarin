import { Col, Row } from "antd";
import React from "react";
import CardClasses from "./CardClass";

const Classes = ({ title }) => {
    const classes = [
        {
            title: "Mandarin Class Juara Next Level",
            price: "699.000",
            bnefits: [
                "HSK 1 - HSK 4 exam simulation",
                "Private Class (1 Student/class)",
                "Access to PDF, PPT, Video and Audio Learning",
                "Free e-Flashcard HSK 1 - HSK 4 + Hanzi Practiced Book",
                "Duration: 5 months (40 sessions)"
            ]

        },
        {
            title: "Mandarin Class Juara",
            price: "699.000",
            bnefits: [
                "HSK 1 - HSK 4 exam simulation",
                "Mini Group (3 - 5 Students)",
                "Access to PDF, PPT, Video and Audio Learning",
                "Free e-Flashcard HSK 1 - HSK 4 + Hanzi Practiced Book",
                "Duration: 5 months (40 sessions)"
            ]

        },
        {
            title: "General Basic Mandarin Class",
            price: "699.000",
            bnefits: [
                "Best for beginners",
                "Mini Group (5 - 10 Student)",
                "Access to PDF, PPT, Video and Audio Learning",
                "Free Hanzi Practiced Book",
                "Duration: 1 months (8 sessions)"
            ]

        },
        {
            title: "Mandarin Class Native",
            price: "Soon",
            bnefits: [
                "HSK 1 - HSK 5 exam simulation",
                "Access to PDF, PPT, Video and Audio Learning",
                "Free e-Flashcard HSK 1 - HSK 4 + Hanzi Practiced Book",
                "Duration: Soon"
            ]

        },
    ];

    return (
        <div className="px-5">
            <div className="container mx-auto py-20">
                <h1 className="text-4xl font-semibold text-start mb-10">{title}</h1>
                <Col className="py-5 flex flex-col justify-center items-center w-full">
                    {classes.map((item, index) => (
                        <div key={index} className="mb-8 w-9/12" >
                            <CardClasses data={item} />
                        </div>
                    ))}
                </Col>
            </div>
        </div>
    );
};

export default Classes;
