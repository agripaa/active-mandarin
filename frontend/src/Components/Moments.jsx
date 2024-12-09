import React from "react";

const Gallery = ({ text }) => {
    return (
        <div className="container mx-auto py-20 px-5">
            {/* Wrapper dengan Flexbox */}
            <div className="flex flex-wrap justify-between gap-6">
                {/* Left Column */}
                <div className="flex flex-col gap-6 flex-1 max-w-[30%]">
                    <div className="w-full h-6/12 rounded-xl overflow-hidden">
                        <img
                            src="/assets/main_moments.png"
                            alt="Gallery 1"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="w-full h-h-6/12 rounded-xl overflow-hidden">
                        <img
                            src="/assets/main_moments.png"
                            alt="Gallery 2"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                {/* Middle Column */}
                <div className="flex flex-col gap-6 flex-1 max-w-[40%] items-center">
                    <div className="text-center">
                        <h1 className="text-3xl tracking-wide font-semibold text-[#02264A]">
                            {text.title}
                        </h1>
                        <p className="text-lg text-gray-500">{text.tags}</p>
                    </div>
                        <div className="h-[61vh]">
                            <img
                                src="/assets/main_moments.png"
                                alt="Gallery 3"
                                className="rounded-xl h-full "
                            />
                        </div>
                </div>

                {/* Right Column */}
                <div className="flex flex-col gap-6 flex-1 max-w-[30%]">
                    <div className="w-full h-6/12 rounded-xl overflow-hidden">
                        <img
                            src="/assets/main_moments.png"
                            alt="Gallery 4"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="w-full h-6/12 rounded-xl overflow-hidden">
                        <img
                            src="/assets/main_moments.png"
                            alt="Gallery 5"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Gallery;
