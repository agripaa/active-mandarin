import React from "react";
import Mainlayouts from "../Layouts/MainLayouts";
import { SiTiktok, SiGmail, SiInstagram } from 'react-icons/si';
import { SlGlobe } from 'react-icons/sl';
import { Link } from "react-router-dom";

const Contact = () => {
    const socmed = [
        {
            title: 'activemandarinid@gmail.com',
            href: 'mailto:activemandarinid@gmail.com',
            icons: <SiGmail />,
        },
        {
            title: 'activemandarin',
            href: 'https://www.tiktok.com/@activemandarin.id',
            icons: <SiTiktok />,
        },
        {
            title: 'activemandarin.id',
            href: 'https://www.instagram.com/activemandarin.id/',
            icons: <SiInstagram />,
        },
        {
            title: 'activemandarin.id',
            href: '/',
            icons: <SlGlobe />,
        },
    ];

    return (
        <Mainlayouts>
            <div className="flex items-center justify-center min-h-[60vh] bg-[#FAFAFA]">
                <div className="container my-10 mx-auto px-5 md:px-10 lg:my-0">
                    <div className="flex flex-col w-full justify-between lg:flex-row">
                        <div className="w-full">
                            <div className="w-full lg:w-10/12 xl:w-8/12">
                                <h1 className="text-4xl font-semibold text-[#02264A] lg:text-5xl">Contact Us</h1>
                                <p className="text-base lg:text-lg font-normal text-[#201F1F] mt-5 xl:w-4/6">
                                    Our operational time is Monday to Friday starting from 08.30 WIB to 21.30 WIB.
                                </p>
                                <div className="flex flex-col w-full justify-between gap-5 py-8 md:flex-row">
                                    <span className="w-8/12">
                                        <h2 className="font-bold text-xl">Phone Number</h2>
                                        <p className="text-base mt-2 lg:text-lg">+62 822-7950-6450</p>
                                        <Link to='tel:+6282279506450' className="bg-[#FFCC00] mt-4 py-3 px-5 text-md rounded-2xl hover:bg-yellow-500 block w-fit">
                                            Chat Admin
                                        </Link>
                                    </span>
                                    <span className="w-10/12">
                                        <h2 className="font-bold text-xl">Address</h2>
                                        <p className="text-base mt-2 text-start lg:text-lg">
                                            Xinle Road, Jinbei New Area Nanjing, Jiangsu China
                                        </p>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex justify-center lg:w-6/12">
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
