import React from 'react'
import DashboardLayout from '../../Layouts/DashboardLayout'

const programs = [
  {
    item: 'Soal 4 - HSK 5',
    soal: '50 Soal',
    brand_image: '/assets/product1.png'
  },
  {
    item: 'Soal 2 - HSK 2',
    soal: '50 Soal',
    brand_image: '/assets/product1.png'
  },
  {
    item: 'Soal 1 - HSK 3',
    soal: '50 Soal',
    brand_image: '/assets/product1.png'
  }
];


const ExamList = () => {
  return (
    <DashboardLayout>
      <div className="flex flex-col w-full min-h-screen p-6">
        <section className="mb-8 bg-white p-4 rounded-xl">
          <h2 className="text-xl font-semibold mb-4">Program Saya</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {programs.length > 0 ? programs.map((program, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-xl shadow-md flex flex-col items-start"
              >
                <img
                  src={program.brand_image ? `${program.brand_image}` : "/assets/product-default.png"}
                  alt="Program"
                  className="rounded-lg mb-4"
                />
                <div className="gap-2 flex flex-col w-full">
                    <h3 className="md:text-lg text-2xl font-semibold">{program.item}</h3>
                    <h4 className="md:text-base text-lg font-medium text-gray-400">{program.soal}</h4>
                    <div className="flex flex-col items-start gap-2">
                      <button className="mt-3 w-full bg-[#FFCC00] text-black px-3 py-3 rounded-xl">
                          Kerjakan Ujian
                      </button>
                    </div>
                </div>
              </div>
            )) : (<div>
                  <p className="text-red-500">Program Belum Tersedia!.</p>
                </div>)}
          </div>
        </section>
      </div>
    </DashboardLayout>
  )
}

export default ExamList