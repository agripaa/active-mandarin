import { Link } from "react-router-dom";
import { RiHandHeartLine } from "@remixicon/react";    
import { useSelector } from "react-redux";

const Donation = ({text}) => {
    const { langs } = useSelector((state) => state.LangReducer);

    return (
        <div
        className={`bg-[#02264A] py-6 text-white`}
    >
        <div className="container mx-auto flex items-center gap-3 justify-between px-5 md:px-10 xl:px-5">
            <Link
                to="/donate"
                className="flex flex-row items-center"
            >
                <span className="hidden min-w-5 sm:min-w-10 min-h-5 sm:min-h-10 md:block">
                    <RiHandHeartLine size={40} color="white" className="font-thin" />
                </span>
                <span className="md:ml-4">
                    <h4 className="text-sm lg:text-base font-semibold">{langs ? 'Support Free Education Today' : 'Dukung Pendidikan Gratis Hari Ini'}</h4>
                    <p className="text-xs lg:text-sm font-light">{langs ? 'Help Make Mandarin Learning, Mentor Scholarship, Carrer Center, Accessible for All!' : 'Bantu Pembelajaran Mandarin, Pembimbingan Beasiswa, dan Pusat Karier Dapat Diakses oleh Semua!'}</p>
                </span>
            </Link>
            <div className="items-center text-md space-x-4 flex mr-auto md:mr-0">
                <Link
                    to="/donate"
                    target="_blank"
                    className="px-2 py-1.5 bg-[#FFCC00] text-[#252525] text-center rounded-xl transition-all duration-300 font-medium text-sm md:px-4 md:py-3 md:rounded-2xl lg:text-base hover:bg-yellow-500"
                >
                    {langs ? 'Support Now' : 'Dukung Sekarang!'}
                </Link>
            </div>
        </div>
    </div>
    )

}

export default Donation;