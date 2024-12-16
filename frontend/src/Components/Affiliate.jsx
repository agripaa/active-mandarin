import React from 'react'
import { Link } from 'react-router-dom'

const Affiliate = ({text}) => {
  return (
    <div className='container mx-auto my-24 relative w-full'>
        <div className='flex items-center justify-center w-full h-full'>
            <div className='w-9/12 flex  max-h-auto bg-[#02264A] rounded-2xl py-12 px-14' style={{ backgroundImage: "url('/assets/card-texture.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
                <div className='w-4/12 flex items-center justify-start'>
                    <img src="/assets/affiliate2.png" alt="" className='h-64 w-64 object-cover rounded' />
                </div>
                <div className='flex flex-col justify-center text-white w-7/12'>
                    <h2 className='font-semibold text-4xl'>{text.title}</h2>
                    <p className='mt-4 text-lg font-light'>{text.desc}</p>
                    <div className='mt-12'>
                        <Link
                                to="/donate"
                                className="px-8 py-4 bg-[#FFCC00] tracking-wide mt-2 text-base text-[#252525] font-semibold rounded-3xl transition-all duration-300 hover:bg-yellow-500 hover:text-black"
                            >
                                Join Now
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Affiliate