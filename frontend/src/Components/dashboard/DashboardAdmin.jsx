import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bar } from 'react-chartjs-2';
import { RiMoneyDollarCircleFill, RiFileTextFill } from "react-icons/ri";
import 'chart.js/auto';
import { ListCard } from './ListCard';

const years = [2025, 2026];

const generateChartData = () => {
    return {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
        datasets: [
            {
                label: '',
                backgroundColor: '#3377FF',
                borderColor: '#3377FF',
                borderWidth: 1,
                hoverBackgroundColor: '#3377FF',
                borderRadius: 15,
                data: Array.from({ length: 12 }, () => Math.floor(Math.random() * 100) + 1),
            },
        ],
    };
};

const chartOptions = {
    plugins: {
        legend: { display: false },
    },
    scales: {
        x: {
            grid: { display: false },
        },
        y: {
            beginAtZero: true,
            grid: { drawBorder: false },
        },
    },
    maintainAspectRatio: false, 
};

const topProducts = [
    { rank: 1, name: "Comprehensive Book 1", sold: 76 },
    { rank: 2, name: "E-Flashcard HSK 1", sold: 20 },
    { rank: 3, name: "E-Flashcard HSK 2", sold: 10 },
    { rank: 4, name: "Buku Kotak-Kotak Hanzi", sold: 9 },
    { rank: 5, name: "Comprehensive Book 5", sold: 7 }
];

const topPrograms = [
    { rank: 1, name: "Mandarin Juara", sold: 76 },
    { rank: 2, name: "HSK 1", sold: 20 },
    { rank: 3, name: "Mandarin Native", sold: 10 },
    { rank: 4, name: "Kelas Umum Basic Mandarin", sold: 9 },
    { rank: 5, name: "HSK 5", sold: 7 }
];


const DashboardAdmin = () => {
    const [selectedYear, setSelectedYear] = useState(years[0]);
    const [chartData, setChartData] = useState(generateChartData());
    const chartContainerRef = useRef(null);
    const [chartHeight, setChartHeight] = useState(300); // Default height

    const handleYearChange = (year) => {
        setSelectedYear(year);
        setChartData(generateChartData());
    };

    useEffect(() => {
        if (chartContainerRef.current) {
            setChartHeight(chartContainerRef.current.clientHeight);
        }
    }, [chartData]);

    return (
        <section className='flex flex-col'>
            <div className="w-full flex p-4">
                {/* CHART SECTION */}
                <div className="w-[75%]">
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }} 
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white p-4 rounded-xl shadow-lg"
                        ref={chartContainerRef}
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold">Performa Pembelian</h2>
                            <select 
                                className="border-none p-2 rounded-md text-sm"
                                onChange={(e) => handleYearChange(parseInt(e.target.value))}
                                value={selectedYear}
                            >
                                {years.map((year) => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                            </select>
                        </div>
                        
                        <motion.div
                            key={selectedYear}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="rounded-xl overflow-hidden"
                            style={{ height: '350px' }} 
                        >
                            <Bar data={chartData} options={{ ...chartOptions, height: 350 }} />
                        </motion.div>
                    </motion.div>
                </div>
                {/* RIGHT CARD SECTION */}
                <div className='flex flex-col w-[25%] gap-4 ml-4' style={{ height: `${chartHeight}px` }}>
                    <div className='flex flex-col rounded-xl bg-white px-4 shadow-lg flex-1 justify-center gap-4'>
                        <div className="flex items-center justify-center bg-[#F9CA24] text-white rounded-full w-14 h-14">
                            <RiMoneyDollarCircleFill className="text-4xl" />
                        </div>
                        <div className='w-full flex flex-col gap-2'>
                            <h2 className='text-gray-900 text-3xl font-semibold'>Rp 10.000.000</h2>
                            <h4 className='text-gray-400'>Pendapatan</h4>
                        </div>
                    </div>
                    <div className='flex flex-col rounded-xl bg-white px-4 shadow-lg flex-1 justify-center gap-4'>
                        <div className="flex items-center justify-center bg-[#02264A] text-white rounded-full w-14 h-14">
                            <RiFileTextFill className="text-4xl" />
                        </div>
                        <div className='w-full flex flex-col gap-2'>
                            <h2 className='text-gray-900 text-3xl font-semibold'>123</h2>
                            <h4 className='text-gray-400'>Jumlah Transaksi</h4>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex w-full min-h-[480px] gap-4 p-4'>
                <ListCard title="Top 5 Produk" link="/dashboard/products" data={topProducts} />
                <ListCard title="Top 5 Program"link="/dashboard/programs"  data={topPrograms} />
            </div>
        </section>
    );
};

export default DashboardAdmin;
