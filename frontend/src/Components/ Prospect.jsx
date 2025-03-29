import React from 'react'

const  Prospect = ({text}) => {

  return (
    <div className='mx-auto px-20 mt-16 mb-24 relative w-full'>
        <div className='flex items-center justify-center w-full h-full'>
            <div className='w-full p-6 flex max-h-auto gap-12 rounded-[32px] sm:p-8 lg:w-11/12 xl:w-11/12' style={{ backgroundImage: "url('/assets/texture-prospect.png')", backgroundSize: "cover", backgroundPosition: "center", boxShadow: "0px 1px 3px 0px #0000004D, 0px 4px 8px 3px #00000026" }}>
                <div className='w-4/12 hidden items-center justify-start lg:flex'>
                    <img src="/assets/prospect3.png" alt="" className='w-full' />
                </div>
                <div className='flex flex-col justify-center text-[#02264A] w-full lg:w-9/12'>
                    <h2 className='font-semibold text-xl sm:text-2xl md:text-[32px]'>{text.title}</h2>
                    <span className='max-w-max my-6'>
                        <h1 className='text-[#3377FF] font-semibold text-4xl smtext-5xl md:text-6xl'>{text.tags}</h1>
                        <p className=' text-lg font-medium text-[#8493AC] w-auto text-end'>{text.source}</p>
                    </span>
                    <div className='flex flex-col w-full'>
                        <h2 className='text-[#8493AC] text-2xl'>{text.head}</h2>
                        <div className='grid gap-2 mt-4 grid-cols-2 md:grid-cols-3 xl:gap-4'>
                            {text.careers.map((career, index) => (
                                <h2 className='text-sm sm:text-base'>{career}</h2>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default  Prospect