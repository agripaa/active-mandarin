export const ListCard = ({ title, data, link }) => {
    return (
        <div className='w-full rounded-xl bg-white p-4 shadow-lg flex-1'>
            <div className='border-b flex justify-between items-center pb-3'>
                <h4 className='text-md font-semibold'>{title}</h4>
                <a href={link} className='text-sm text-[#3377FF] cursor-pointer'>Selengkapnya</a>
            </div>
            <div className='flex flex-col gap-6 mt-4'>
                {data.map((item, index) => (
                    <div key={index} className={`flex items-center justify-between text-gray-900`}>
                        <div className="flex items-center gap-3">
                            <span className={`text-lg font-semibold flex justify-center items-center w-10 h-10 rounded-full 
                                ${index === 0 ? 'bg-[#FFF5CC] border border-[#FFCC00] text-black' : 'text-black'}`}>
                                {item.rank}
                            </span>
                            <div>
                                <h5 className="text-lg font-medium">{item.name}</h5>
                                <p className="text-gray-500 text-sm">{item.sold} Terjual</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
