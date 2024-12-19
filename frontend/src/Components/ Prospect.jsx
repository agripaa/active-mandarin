import React from 'react'

const  Prospect = ({text}) => {

  return (
    <div className='container mx-auto my-24 relative w-full'>
        <div className='flex items-center justify-center w-full h-full'>
            <div className='w-9/12 flex  max-h-auto shadow-md rounded-2xl py-12 px-14' style={{ backgroundImage: "url('/assets/texture-prospect.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
                <div className='w-4/12 flex items-center justify-start'>
                    <img src="/assets/prospect3.png" alt="" className='w-full' />
                </div>
                <div className='flex flex-col justify-center text-[#02264A] ml-12 w-7/12'>
                    <h2 className='font-semibold text-4xl'>{text.title}</h2>
                    <span className='max-w-max my-6'>
                        <h1 className='text-[#3377FF] font-semibold text-7xl'>{text.tags}</h1>
                        <p className=' text-lg font-medium text-[#8493AC] w-auto text-end'>{text.source}</p>
                    </span>
                    <div className='flex flex-col w-full'>
                        <h2 className='text-[#8493AC] text-2xl'>{text.head}</h2>
                        <div className='grid gap-4 grid-cols-3 mt-4'>
                            {text.careers.map((career, index) => (
                                <h2 className='text-base'>{career}</h2>
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