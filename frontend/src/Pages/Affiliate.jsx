import React, { useState, useEffect, useRef } from "react";
import { Table, Input, Pagination, Spin } from "antd";
import { Bar } from "react-chartjs-2";
import { motion } from 'framer-motion';
import { RiSearchLine, RiMoneyDollarCircleFill, RiFileTextFill } from "react-icons/ri";
import DashboardLayout from "../Layouts/DashboardLayout";
import { getAffiliatorStatusTrue, getTotalAffiliateRevenue } from "../api/affiliate";
import "chart.js/auto";
import { formatRupiah } from "../utils/rupiahFormat";

const years = [2025, 2026];

const Affiliate = () => {
    const [selectedYear, setSelectedYear] = useState(years[0]);
    const [affiliators, setAffiliators] = useState([]);
    const [totalCommission, setTotalCommission] = useState(0);
    const [monthlyRevenue, setMonthlyRevenue] = useState(new Array(12).fill(0));
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState("");
    const chartContainerRef = useRef(null);
    const [chartHeight, setChartHeight] = useState(300); // Default height
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    useEffect(() => {
        fetchAffiliators(currentPage);
        fetchAffiliateRevenue();
    }, [currentPage]);

    const handleYearChange = (year) => {
        setSelectedYear(year);
        fetchAffiliateRevenue(); // Fetch data ulang jika tahun berubah
    };

    useEffect(() => {
        if (chartContainerRef.current) {
            setChartHeight(chartContainerRef.current.clientHeight);
        }
    }, [monthlyRevenue]);

    const fetchAffiliators = async (page) => {
        setLoading(true);
        try {
            const response = await getAffiliatorStatusTrue(page, pageSize);
            const totalAffiliators = response.total_affiliators.reduce((sum, item) => sum + item.count, 0); // Calculate total items
            setAffiliators(response.data);
            setTotalItems(totalAffiliators); // Set total items based on total count
        } catch (error) {
            console.error("Error fetching approved affiliates:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchAffiliateRevenue = async () => {
        try {
            const response = await getTotalAffiliateRevenue();
            setTotalCommission(response.total_revenue);
            setMonthlyRevenue(response.revenue_by_month);
        } catch (error) {
            console.error("Error fetching total revenue:", error);
        }
    };

    const handleSearch = (e) => {
        setSearchText(e.target.value.toLowerCase());
    };

    const filteredAffiliators = affiliators.filter((item) =>
        item.name.toLowerCase().includes(searchText)
    );

    const columns = [
        { title: "Nama", dataIndex: "name", key: "name", render: (text) => text || "-" },
        { title: "Email", dataIndex: "email", key: "email", render: (text) => text || "-" },
        { title: "No Telpon", dataIndex: "number", key: "number", render: (text) => text || "-" },
        { title: "Kode Referal", dataIndex: "reveral_code", key: "reveral_code", render: (text) => text || "-" },
        { 
            title: "Total Komisi", 
            dataIndex: "total_commission", 
            key: "total_commission", 
            render: (text) => `Rp ${text?.toLocaleString() || "0"}` // ✅ Format ke Rupiah
        },
    ];

    const chartData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"],
        datasets: [
            {
                label: "Jumlah Transaksi",
                backgroundColor: "#3377FF",
                borderColor: "#3377FF",
                borderWidth: 1,
                hoverBackgroundColor: "#3377FF",
                borderRadius: 10,
                data: monthlyRevenue, // ✅ Data transaksi per bulan
            },
        ],
    };

    const chartOptions = {
        plugins: { legend: { display: false } },
        scales: {
            x: { grid: { display: false } },
            y: { beginAtZero: true, grid: { drawBorder: false } },
        },
        maintainAspectRatio: false,
    };

    if (loading) {
        return (
            <DashboardLayout>
                <div className="flex justify-center items-center h-[80vh]">
                    <Spin size="large" />
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <section className="flex flex-col">
                <div className="grid grid-cols-1 md:flex w-full p-4 gap-4 md:gap-0">
                    {/* CHART SECTION */}
                    <div className="w-full md:w-[70%]">
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }} 
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
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
                                {years?.map((year) => (
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
                            {chartData ? <Bar data={chartData} options={{ ...chartOptions, height: 350 }} /> : "Belum Ada Transaksi"}
                        </motion.div>
                    </motion.div>
                    </div>

                    {/* RIGHT CARD SECTION */}
                    <div className='flex flex-col w-full md:w-[30%] gap-4 md:ml-4' style={{ height: `${chartHeight}px` }}>
                        <div className="flex flex-col rounded-xl bg-white px-4 shadow-lg flex-1 justify-center gap-4">
                            <div className="flex items-center justify-center bg-[#F9CA24] text-white rounded-full w-14 h-14">
                                <RiMoneyDollarCircleFill className="text-4xl" />
                            </div>
                            <div className="w-full flex flex-col gap-2">
                                <h2 className='text-gray-900 text-2xl sm:text-3xl font-semibold break-words'>
                                    {formatRupiah(totalCommission)}
                                </h2>
                                <h4 className="text-gray-400">Total Komisi Affiliator</h4>
                            </div>
                        </div>
                        <div className="flex flex-col rounded-xl bg-white px-4 shadow-lg flex-1 justify-center gap-4">
                            <div className="flex items-center justify-center bg-[#02264A] text-white rounded-full w-14 h-14">
                                <RiFileTextFill className="text-4xl" />
                            </div>
                            <div className="w-full flex flex-col gap-2">
                                <h2 className='text-gray-900 text-2xl sm:text-3xl font-semibold break-words'>
                                    {affiliators.length}
                                </h2>
                                <h4 className="text-gray-400">Jumlah Affiliator</h4>
                            </div>
                        </div>
                    </div>
                </div>

                {/* TABEL AFFILIATE */}
                <div className="bg-white p-4 shadow-lg rounded-xl w-full">
                    <div className="flex justify-between items-center mb-4">
                        <h4 className="text-lg font-semibold">Data Affiliate</h4>
                        <Input
                            placeholder="Cari Affiliator, cth: Josh Steward"
                            prefix={<RiSearchLine className="text-2xl mr-2" />}
                            onChange={handleSearch}
                            className="w-8/12 md:w-96 py-2 px-4"
                        />
                    </div>
                    <div className="overflow-x-auto">
                        <Table columns={columns} dataSource={filteredAffiliators} pagination={false} rowKey="id" />
                    </div>
                    <div className="flex justify-end mt-4">
                        <Pagination
                            current={currentPage}
                            total={totalItems}
                            pageSize={pageSize}
                            onChange={(page) => setCurrentPage(page)}
                            showSizeChanger={false}
                            showLessItems
                        />
                    </div>
                </div>
            </section>
        </DashboardLayout>
    );
};

export default Affiliate;
