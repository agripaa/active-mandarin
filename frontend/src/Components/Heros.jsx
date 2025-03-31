import { Space } from "antd";
import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Heros = ({ text }) => {
  const { langs } = useSelector((state) => state.LangReducer);
  return (
    <div className="container flex flex-col justify-between relative overflow-hidden mx-auto px-5 md:px-16 lg:flex-row">
      <div className="pt-10 md:pt-24 pb-48 max-w-[658px] sm:pb-36">
        <h1 className="text-2xl font-semibold md:text-3xl lg:text-[32px]">
          {text.title}
        </h1>
        <p className="mt-6">
          {text.desc}
        </p>
        <div className='flex items-center justify-center mt-6 gap-4 md:justify-start'>
          <Link to='/class'>
            <button
              className="px-6 py-3 md:px-8 md:py-4 w-fit bg-[#FFCC00] tracking-wide mt-2 text-xs text-[#252525] font-semibold rounded-3xl transition-all duration-300 hover:bg-yellow-500 hover:text-black sm:text-sm lg:text-base"
            >
              {langs ? "Explore Our Program" : "Jelajahi Program Kami"}
            </button>
          </Link>
          <Link to='/products'>
            <button
              className="px-6 py-3 md:px-8 md:py-4 w-fit border-2 border-[#8493AC] tracking-wide mt-2 text-xs text-[#252525] font-semibold rounded-3xl transition-all duration-300 hover:bg-yellow-500 hover:text-black sm:text-sm lg:text-base"
            >
              {langs ? "Explore Our Product" : "Jelajahi Produk Kami"}
            </button>
          </Link>
        </div>
      </div>
      <div className="hidden absolute bottom-0 right-0 lg:block">
        <div className="flex flex-col h-max animate-scroll-vertical-infinite-reverse">
          <img src="/assets/hero-6.png" alt="img" className="h-[230px] xl:h-[300px]" />
          <img src="/assets/hero-7.png" alt="img" className="h-[230px] xl:h-[300px]" />
          <img src="/assets/hero-8.png" alt="img" className="h-[230px] xl:h-[300px]" />
          <img src="/assets/hero-9.png" alt="img" className="h-[230px] xl:h-[300px]" />
          <img src="/assets/hero-10.png" alt="img" className="h-[230px] xl:h-[300px]" />
        </div>
        <div className="flex flex-col h-max animate-scroll-vertical-infinite-reverse">
          <img src="/assets/hero-6.png" alt="img" className="h-[230px] xl:h-[300px]" />
          <img src="/assets/hero-7.png" alt="img" className="h-[230px] xl:h-[300px]" />
          <img src="/assets/hero-8.png" alt="img" className="h-[230px] xl:h-[300px]" />
          <img src="/assets/hero-9.png" alt="img" className="h-[230px] xl:h-[300px]" />
          <img src="/assets/hero-10.png" alt="img" className="h-[230px] xl:h-[300px]" />
        </div>
        <div className="flex flex-col h-max animate-scroll-vertical-infinite-reverse">
          <img src="/assets/hero-6.png" alt="img" className="h-[230px] xl:h-[300px]" />
          <img src="/assets/hero-7.png" alt="img" className="h-[230px] xl:h-[300px]" />
          <img src="/assets/hero-8.png" alt="img" className="h-[230px] xl:h-[300px]" />
          <img src="/assets/hero-9.png" alt="img" className="h-[230px] xl:h-[300px]" />
          <img src="/assets/hero-10.png" alt="img" className="h-[230px] xl:h-[300px]" />
        </div>
      </div>
      <div className="hidden absolute bottom-0 right-[180px] lg:block xl:right-[239px]">
        <div className="flex flex-col h-max animate-scroll-vertical-infinite">
          <img src="/assets/hero-1.png" alt="img" className="h-[230px] xl:h-[300px]" />
          <img src="/assets/hero-2.png" alt="img" className="h-[230px] xl:h-[300px]" />
          <img src="/assets/hero-3.png" alt="img" className="h-[230px] xl:h-[300px]" />
          <img src="/assets/hero-4.png" alt="img" className="h-[230px] xl:h-[300px]" />
          <img src="/assets/hero-5.png" alt="img" className="h-[230px] xl:h-[300px]" />
        </div>
        <div className="flex flex-col h-max animate-scroll-vertical-infinite">
          <img src="/assets/hero-1.png" alt="img" className="h-[230px] xl:h-[300px]" />
          <img src="/assets/hero-2.png" alt="img" className="h-[230px] xl:h-[300px]" />
          <img src="/assets/hero-3.png" alt="img" className="h-[230px] xl:h-[300px]" />
          <img src="/assets/hero-4.png" alt="img" className="h-[230px] xl:h-[300px]" />
          <img src="/assets/hero-5.png" alt="img" className="h-[230px] xl:h-[300px]" />
        </div>
        <div className="flex flex-col h-max animate-scroll-vertical-infinite">
          <img src="/assets/hero-1.png" alt="img" className="h-[230px] xl:h-[300px]" />
          <img src="/assets/hero-2.png" alt="img" className="h-[230px] xl:h-[300px]" />
          <img src="/assets/hero-3.png" alt="img" className="h-[230px] xl:h-[300px]" />
          <img src="/assets/hero-4.png" alt="img" className="h-[230px] xl:h-[300px]" />
          <img src="/assets/hero-5.png" alt="img" className="h-[230px] xl:h-[300px]" />
        </div>
      </div>
      <div className="flex flex-row gap-4 absolute right-0 bottom-40 md:bottom-20 lg:hidden">
        <div className="flex gap-4 w-max animate-scroll-horizontal-infinite-reverse">
          <img src="/assets/hero-1.png" alt="img" className="w-[207px]" />
          <img src="/assets/hero-2.png" alt="img" className="w-[207px]" />
          <img src="/assets/hero-3.png" alt="img" className="w-[207px]" />
          <img src="/assets/hero-4.png" alt="img" className="w-[207px]" />
          <img src="/assets/hero-5.png" alt="img" className="w-[207px]" />
          <img src="/assets/hero-6.png" alt="img" className="w-[207px]" />
          <img src="/assets/hero-7.png" alt="img" className="w-[207px]" />
          <img src="/assets/hero-8.png" alt="img" className="w-[207px]" />
          <img src="/assets/hero-9.png" alt="img" className="w-[207px]" />
          <img src="/assets/hero-10.png" alt="img" className="w-[207px]" />
        </div>
        <div className="flex gap-4 w-max animate-scroll-horizontal-infinite-reverse">
          <img src="/assets/hero-1.png" alt="img" className="w-[207px]" />
          <img src="/assets/hero-2.png" alt="img" className="w-[207px]" />
          <img src="/assets/hero-3.png" alt="img" className="w-[207px]" />
          <img src="/assets/hero-4.png" alt="img" className="w-[207px]" />
          <img src="/assets/hero-5.png" alt="img" className="w-[207px]" />
          <img src="/assets/hero-6.png" alt="img" className="w-[207px]" />
          <img src="/assets/hero-7.png" alt="img" className="w-[207px]" />
          <img src="/assets/hero-8.png" alt="img" className="w-[207px]" />
          <img src="/assets/hero-9.png" alt="img" className="w-[207px]" />
          <img src="/assets/hero-10.png" alt="img" className="w-[207px]" />
        </div>
      </div>
      <div className="h-72 block lg:hidden" />
      {/* <Space align="center" direction="vertical" className="py-3">
        <div className="flex justify-center items-center w-full">
          <div className="flex justify-center items-center flex-col text-center w-full md:w-4/5">
            <h1 className="text-2xl font-bold tracking-wide text-[#02264A] md:text-4xl">
              {text.title}
            </h1>
            <h2 className="text-lg font-reguler text-[#201F1F] tracking-wide w-full mt-4 md:text-xl">
              {text.desc} <span className="font-semibold">{text.actionDesc}</span>
            </h2>
            <div className="flex gap-4 justify-between items-center my-6 md:w-8/12">
              {text.listInformation.map((list, index) => {
                return (
                  <h4
                    className="font-semibold tracking-wide text-base md:text-lg"
                    key={index}
                  >
                    {list}
                  </h4>
                );
              })}
            </div>
            <Link
              to="/class"
              className="px-8 py-4 bg-[#FFCC00] tracking-wide mt-2 text-base text-[#252525] font-semibold rounded-3xl transition-all duration-300 hover:bg-yellow-500 hover:text-black"
            >
              {text.btn}
            </Link>
          </div>
        </div> */}
        {/* Responsive Image */}
        {/* <picture> */}
          {/* Mobile Image */}
          {/* <source srcSet="/assets/hero-mobile.png" media="(max-width: 425px)" /> */}
          {/* Default Image */}
          {/* <img
            src="/assets/hero3.png"
            alt="img"
            className="sm:w-8/12 mt-0 mx-auto w-full"
          />
        </picture>
      </Space> */}
      <Link to='https://wa.me/+6282279506450' target="_blank" className="absolute z-20">
        <button className="flex items-center gap-2.5 fixed right-[5%] bottom-[6%] bg-[#57D163] hover:bg-[#4bad55] text-white font-normal text-xs md:text-base lg:text-lg py-3 px-6 rounded-2xl transition duration-300 ease-in-out">
          <FaWhatsapp className="text-lg md:text-2xl lg:text-3xl"/>
          Chat Mintive
        </button>
      </Link>
    </div>
  );
};

export default Heros;
