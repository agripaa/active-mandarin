import React from "react";
import Mainlayouts from "../Layouts/MainLayouts";
import { SiTiktok, SiGmail, SiInstagram } from 'react-icons/si';
import { SlGlobe } from 'react-icons/sl';

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
            <div className="min-h-[70vh] bg- flex mt-24">
                <div className="container mx-auto md:px-10 px-5">
                    <div className="flex w-full justify-between">
                        <div className="w-full">
                            <div className="w-8/12">
                                <h1 className="text-5xl font-semibold text-[#02264A]">Contact Us</h1>
                                <p className="text-lg w-4/6 font-normal text-[#201F1F] mt-5">
                                    Our operational time is Monday to Friday starting from 09.30 WIB to 17.00 WIB.
                                </p>
                                <div className="flex w-full justify-between py-8">
                                    <span className="w-8/12">
                                        <h2 className="font-bold text-xl">Phone Number</h2>
                                        <p className="text-lg mt-2">+62 853 6601 9384</p>
                                        <button className="bg-[#FFCC00] mt-4 py-3 px-5 text-md rounded-full">
                                            Chat Admin
                                        </button>
                                    </span>
                                    <span className="w-8/12">
                                        <h2 className="font-bold text-xl">Address</h2>
                                        <p className="text-lg mt-2 text-start">
                                            Xinle Road, Jinbei New Area Nanjing, Jiangsu China
                                        </p>
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col max-w-full w-10/12">
                                <h2 className="font-bold text-xl">Social Media</h2>
                                <div className="flex flex-wrap justify-between items-center gap-4 mt-4">
                                    {socmed.map((item, index) => (
                                        <a
                                            key={index}
                                            href={item.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-lg font-medium text-[#02264A] hover:text-[#FFCC00]"
                                        >
                                            <span className="text-2xl">{item.icons}</span>
                                            <span>{item.title}</span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="w-6/12 flex justify-center">
                            <img
                                src="/assets/contact.png"
                                alt="Contact Illustration"
                                className="w-full h-72 object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Mainlayouts>
    );
};

export default Contact;
