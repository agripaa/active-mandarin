import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const  Prospect = ({text}) => {
    const {data, langs} = useSelector(state => state.LangReducer);

    const careerDatas = {
        english: [
            'Asistant Manager',
            'Mandarin Editor',
            'Mandarin Translator',
            'Personal Assistant',
            'Bussiness Consultant',
            'Mandarin Speaker',
            'Mandarin Teacher',
            'Other',
        ],
        indonesia: [
            'Asisten Manajer',
            'Editor Bahasa Mandarin',
            'Penerjemah Bahasa Mandarin',
            'Asisten Pribadi',
            'Konsultan Bisnis',
            'Penutur Bahasa Mandarin',
            'Guru Bahasa Mandarin',
            'Lainnya',
        ]
    }

    const careers = langs ? careerDatas?.english : careerDatas?.indonesia;

    return (
        <div className='container mx-auto pt-16 pb-24 px-5 relative w-full md:px-16'>
            <div className='flex items-center justify-center w-full h-full'>
                <div className='w-full p-6 flex max-h-auto gap-12 rounded-[32px] bg-white sm:p-8 relative' style={{ backgroundImage: "url('/assets/texture-prospect.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
                    <img src="/assets/prospect4.png" alt="" className='absolute h-[70%] w-auto bottom-0 left-0 hidden lg:block xl:h-[100%] z-10' />
                    <div className='absolute overflow-hidden w-full h-full top-0 left-0 hidden lg:flex'>
                        <div className='hidden absolute left-[2%] -bottom-[12%] h-[300px] aspect-square rounded-full bg-[#E5EEFF] lg:block xl:left-[4%] xl:-bottom-[7%] xl:h-[340px] 2xl:left-[3%] 2xl:-bottom-[10%] 2xl:h-[360px]' />
                    </div>
                    <div className='w-4/12 hidden lg:flex' />
                    <div className='flex flex-col justify-center text-[#02264A] w-full z-10 lg:w-8/12'>
                        <h2 className='font-semibold text-xl sm:text-2xl md:text-[32px]'>{langs ? "Earn a Higher Salary by Learning Mandarin" : "Dapatkan Gaji Lebih Tinggi dengan Belajar Mandarin"}</h2>
                        <span className='max-w-max my-6'>
                            <h1 className='text-[#3377FF] font-semibold text-4xl smtext-5xl md:text-6xl'>{langs ? 'Rp8-30 Million' : 'Rp8-30 Juta'}</h1>
                            <p className='text-base font-medium text-[#8493AC] w-auto text-end md:text-lg'>{langs ? 'Source: Jobstreet' : 'Sumber: Jobstreet'}</p>
                        </span>
                        <div className='flex flex-col w-full'>
                            <h2 className='text-[#8493AC] text-2xl'>{langs ? 'As a' : 'Sebagai'}</h2>
                            <div className='grid gap-2 mt-4 grid-cols-2 md:grid-cols-3 xl:gap-4'>
                                {careers?.map((career, index) => (
                                    <h2 key={index} className='text-sm sm:text-base'>{career}</h2>
                                ))}
                            </div>
                        </div>
                        <div className='flex items-center mt-8 gap-4'>
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
                </div>
            </div>
        </div>
    )
}

export default  Prospect