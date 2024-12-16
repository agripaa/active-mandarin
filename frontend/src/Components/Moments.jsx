import React from "react";
import Slider from "react-slick";

const Gallery = ({ text }) => {
    const [activeSlide, setActiveSlide] = React.useState(0);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        centerMode: true,
        centerPadding: "20%",
        beforeChange: (current, next) => setActiveSlide(next),
    };

    const images = [
        "/assets/gallery.png",
        "/assets/gallery.png",
        "/assets/gallery.png",
        "/assets/gallery.png",
        "/assets/gallery.png",
    ];

    return (
        <div className="container mx-auto py-20 px-5">
            <div className="text-center flex flex-col items-center mb-10">
                <h1 className="text-5xl uppercase tracking-wide font-semibold text-[#02264A]">
                    {text.title}
                </h1>
                <p className="text-lg w-4/5 text-[#02264A] mt-2 tracking-wide font-normal">
                    {text.tags}
                </p>
            </div>
            <div className="h-full">
                <Slider {...settings} className="rounded-xl overflow-hidden h-full">
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className={`relative transition-transform duration-500 px-12 my-12 ${
                                activeSlide === index ? "z-10 scale-105" : "z-0 scale-95"
                            }`}
                        >
                            <img
                                src={image}
                                alt={`Gallery ${index + 1}`}
                                className="w-full h-[50vh] object-cover rounded-xl cursor-pointer"
                                draggable="false"
                            />
                            {activeSlide === index && (
                                <div className="absolute left-12 cursor-pointer inset-0 w-[89.25%] h-full bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-xl">
                                    <span className="text-white text-4xl font-semibold">
                                        Image {index + 1}
                                    </span>
                                </div>
                            )}
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default Gallery;
