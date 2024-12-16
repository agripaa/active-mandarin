import React from 'react'

const Tags = ({text}) => {
  return (
    <div className='container mx-auto mb-24 -mt-12 relative w-full'>
        <div className='flex items-center justify-center w-full h-full'>
            <div className='w-9/12 flex max-h-auto bg-[#02264A] rounded-2xl py-10 px-8'>
                <div className='flex justify-between items-center text-white w-full'>
                    <span className='flex w-4/12 justify-start'>
                        <svg xmlns="http://www.w3.org/2000/svg" className='w-20' viewBox="0 0 24 24" fill="currentColor"><path d="M14 14.252V16.3414C13.3744 16.1203 12.7013 16 12 16C8.68629 16 6 18.6863 6 22H4C4 17.5817 7.58172 14 12 14C12.6906 14 13.3608 14.0875 14 14.252ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11ZM18 17V14H20V17H23V19H20V22H18V19H15V17H18Z"></path></svg>
                        <div className='flex flex-col ml-4 justify-evenly'>
                            <h2 className='font-bold text-4xl'>500+</h2>
                            <h4 className='tracking-wide text-md'>Registrant</h4>
                        </div>
                    </span>
                    <span className='flex w-4/12 justify-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" className='w-20' viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM7 13H9C9 14.6569 10.3431 16 12 16C13.6569 16 15 14.6569 15 13H17C17 15.7614 14.7614 18 12 18C9.23858 18 7 15.7614 7 13ZM8 11C7.17157 11 6.5 10.3284 6.5 9.5C6.5 8.67157 7.17157 8 8 8C8.82843 8 9.5 8.67157 9.5 9.5C9.5 10.3284 8.82843 11 8 11ZM16 11C15.1716 11 14.5 10.3284 14.5 9.5C14.5 8.67157 15.1716 8 16 8C16.8284 8 17.5 8.67157 17.5 9.5C17.5 10.3284 16.8284 11 16 11Z"></path></svg>
                        <div className='flex flex-col ml-4 justify-evenly'>
                            <h2 className='font-bold text-4xl'>95%</h2>
                            <h4 className='tracking-wide text-md'>Happy Participants</h4>
                        </div>
                    </span>
                    <span className='flex w-4/12 justify-end'>
                        <svg xmlns="http://www.w3.org/2000/svg" className='w-20' viewBox="0 0 24 24" fill="currentColor"><path d="M16.9337 8.96494C16.426 5.03562 13.0675 2 9 2 4.58172 2 1 5.58172 1 10 1 11.8924 1.65707 13.6313 2.7555 15.0011 3.56351 16.0087 4.00033 17.1252 4.00025 18.3061L4 22H13L13.001 19H15C16.1046 19 17 18.1046 17 17V14.071L18.9593 13.2317C19.3025 13.0847 19.3324 12.7367 19.1842 12.5037L16.9337 8.96494ZM3 10C3 6.68629 5.68629 4 9 4 12.0243 4 14.5665 6.25141 14.9501 9.22118L15.0072 9.66262 16.5497 12.0881 15 12.7519V17H11.0017L11.0007 20H6.00013L6.00025 18.3063C6.00036 16.6672 5.40965 15.114 4.31578 13.7499 3.46818 12.6929 3 11.3849 3 10ZM21.1535 18.1024 19.4893 16.9929C20.4436 15.5642 21 13.8471 21 12.0001 21 10.153 20.4436 8.4359 19.4893 7.00722L21.1535 5.89771C22.32 7.64386 23 9.74254 23 12.0001 23 14.2576 22.32 16.3562 21.1535 18.1024Z"></path></svg>
                        <div className='flex flex-col ml-4 justify-evenly'>
                            <h2 className='font-bold text-4xl'>95%</h2>
                            <h4 className='tracking-wide text-md'>Skills enhancement</h4>
                        </div>
                    </span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Tags