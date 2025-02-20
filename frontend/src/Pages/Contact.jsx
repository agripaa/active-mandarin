import React from "react";
import Mainlayouts from "../Layouts/MainLayouts";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Contact = () => {
    const { _, langs } = useSelector(state => state.LangReducer)

    return (
      <Mainlayouts>
        <div className="flex items-center justify-center min-h-[60vh] bg-[#FAFAFA]">
          <div className="container my-10 mx-auto px-5 md:px-10 lg:my-0">
            <div className="flex flex-col-reverse w-full justify-between lg:flex-row">
              <div className="w-full mt-12 lg:mt-0">
                <div className="w-full lg:w-10/12 xl:w-full">
                  <h1 className="text-4xl font-semibold text-[#02264A] lg:text-5xl">
                    {langs ? "Contact Us" : "Hubungi Kami"}
                  </h1>
                  <p className="text-base lg:text-lg font-normal text-[#201F1F] mt-5 xl:w-4/6">
                    {langs
                      ? "Our operational time is Monday to Saturday starting from 08.30 WIB to 21.30 WIB."
                      : "Waktu operasional kami adalah Senin sampai Sabtu mulai pukul 08.30 WIB hingga 21.30 WIB."}
                  </p>
                  <div className="flex flex-col w-full justify-between gap-5 py-8 md:flex-row">
                    <span className="w-full xl:w-5/12">
                      <h2 className="font-semibold text-xl">
                        {langs ? "Phone Number" : "Nomor telepon"}
                      </h2>
                      <p className="text-base mt-2 lg:text-lg">
                        +62 822-7950-6450
                      </p>
                      <Link
                        to="https://wa.me/+6282279506450"
                        className="bg-[#FFCC00] mt-4 py-3 px-5 text-md rounded-2xl hover:bg-yellow-500 block w-fit"
                        target="_blank"
                      >
                        Chat Admin
                      </Link>
                    </span>
                    <span className="w-full">
                      <h2 className="font-semibold text-xl">Address</h2>
                      <p className="text-base mt-2 text-start xl:w-7/12 lg:text-lg">
                        Xinle Road, Jiangbei New Area Nanjing, Jiangsu China
                      </p>
                    </span>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-8/12 flex justify-center mb-10 md:my-0">
                <img
                  src="/assets/cont.png"
                  alt="Contact Illustration"
                  className="w-full object-cover rounded-[32px]"
                />
              </div>
            </div>
          </div>
        </div>
      </Mainlayouts>
    );
};

export default Contact;
