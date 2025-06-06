import React from 'react'
import DashboardLayout from '../../Layouts/DashboardLayout'
import { useNavigate } from 'react-router'
import { RiArrowLeftLine } from "react-icons/ri";

const ResultPage = () => {
    const navigate = useNavigate();
  return (
    <DashboardLayout>
        <div className='p-6'> 
          <button className="text-md font-normal flex items-center justify-center text-blue-500 mb-4 gap-2"><RiArrowLeftLine size={20}/> Kembali</button>
            <div className="flex flex-col md:flex-row w-full items-center justify-center gap-24 min-h-[80vh]">
                <img src="/assets/congrats.png" alt="congrats img" className='w-9/12 md:w-5/12'  />
                <div className='bg-white p-5 rounded-lg max-w-lg w-full'>
                    <h4 className='font-normal text-neutral-500 text-lg'>Total Score</h4>
                    <div className='flex my-2 mb-10 items-end'>
                        <h2 className='font-semibold text-gray-800 text-6xl'>288</h2>
                        <h4 className='font-semibold text-blue-500 text-3xl'>/300</h4>
                    </div>
                    <h4 className='font-normal text-neutral-500 text-lg'>Detail Score</h4>
                    <div className='flex flex-col w-full'>
                        <span className='text-neutral-800 w-full flex text-xl my-2 justify-between items-center font-medium'>
                            <h4>Listening Score</h4>
                            <h4>96/100</h4>
                        </span>
                        <span className='text-neutral-800 w-full flex text-xl my-2 justify-between items-center font-medium'>
                            <h4>Reading Score</h4>
                            <h4>96/100</h4>
                        </span>
                        <span className='text-neutral-800 w-full flex text-xl my-2 justify-between items-center font-medium'>
                            <h4>Writing Score</h4>
                            <h4>96/100</h4>
                        </span>
                    </div>
                    <button className="mt-4 w-full bg-[#FFCC00] text-black px-3 py-3 rounded-xl">
                          Review Ujian
                    </button>
                </div>
            </div>
          
        </div>
    </DashboardLayout>
  )
}

export default ResultPage