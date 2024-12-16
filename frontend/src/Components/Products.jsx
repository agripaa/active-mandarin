import React from "react";
import Slider from "react-slick";
import { Rate } from "antd";

const Products = ({ text }) => {
    const products = [
        {
            title: "Hanzi Practice Book",
            price: "24.999",
            star: 4,
            image: "/assets/product1.png",
        },
        {
            title: "E-Flashcard HSK 1",
            price: "249.000",
            star: 4,
            image: "/assets/product2.png",
        },
        {
            title: "E-Flashcard HSK 2",
            price: "349.000",
            star: 4,
            image: "/assets/product2.png",
        },
        {
            title: "E-Flashcard HSK 3",
            price: "549.000",
            star: 4,
            image: "/assets/product2.png",
        },
        {
            title: "E-Flashcard HSK 4",
            price: "799.000",
            star: 4,
            image: "/assets/product2.png",
        },
        {
            title: "E-Flashcard HSK 5",
            price: "1.299.000",
            star: 4,
            image: "/assets/product2.png",
        },
        {
            title: "Comprehensive Chinese Book Level 1",
            price: "299.000",
            star: 4,
            image: "/assets/producta.png",
        },
        {
            title: "Comprehensive Chinese Book Level 2",
            price: "499.000",
            star: 4,
            image: "/assets/producta.png",
        },
        {
            title: "Comprehensive Chinese Book Level 3",
            price: "599.000",
            star: 4,
            image: "/assets/producta.png",
        },
        {
            title: "Comprehensive Chinese Book Level 4",
            price: "599.000",
            star: 4,
            image: "/assets/producta.png",
        },
        {
            title: "Comprehensive Chinese Book Level 5",
            price: "1.499.000",
            star: 4,
            image: "/assets/producta.png",
        },
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        cssEase: "linear",
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div className="container mx-auto py-20" id="products">
            <h1 className="text-4xl font-semibold text-center mb-2">{text.title}</h1>
            <p className="mb-10 text-center text-xl font-semibold tracking-wide text-[#AFB8CA]">
                {text.desc}
            </p>
            <Slider {...settings}>
                {products.map((item, index) => (
                    <div key={index} className="p-0"> {/* Hilangkan padding horizontal */}
                        <div className="bg-white w-8/12 mx-auto rounded-2xl shadow-lg flex flex-col h-auto my-11">
                            {/* Gambar Produk */}
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-auto object-contain"
                            />
                            <div className="flex flex-col justify-start items-start px-4 py-5">
                                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                                    {item.title}
                                </h2>
                                <p className="font-semibold text-lg mb-2">
                                    Rp {item.price}<span className="font-light text-sm ml-1">/Item</span>
                                </p>
                                <span className="flex items-center">
                                    <Rate disabled defaultValue={item.star} />
                                    <h2 className="ml-3 mt-1 text-base">(138)</h2>
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Products;
