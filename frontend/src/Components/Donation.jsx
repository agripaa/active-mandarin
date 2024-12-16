import { Link, useLocation } from "react-router-dom";
import { RiHandHeartLine, RiSearch2Line } from "@remixicon/react";    

const Donation = ({text}) => {
    return (
        <div
        className={`bg-[#02264A] py-6 text-white`}
    >
        <div className="container mx-auto flex justify-between items-center">
            <span className="flex flex-row items-center">
                <RiHandHeartLine size={40} color="white" className="font-thin" />
                <span className="ml-4">
                    <h4 className="text-md font-semibold">{text.title}</h4>
                    <p className="text-sm font-light">{text.tags}</p>
                </span>
            </span>
            <div className="flex items-center text-md space-x-4">
                <Link
                    to="/donate"
                    className="px-4 py-3 bg-[#FFCC00] text-[#252525] rounded-2xl transition-all duration-300 font-medium text-md hover:bg-yellow-500"
                >
                    Give Your Support
                </Link>
            </div>
        </div>
    </div>
    )

}

export default Donation;