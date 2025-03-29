import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Bar } from "react-chartjs-2";
import { Table, Input } from "antd";
import { RiSearchLine } from "react-icons/ri";
import DashboardLayout from "../Layouts/DashboardLayout";
import { RiMoneyDollarCircleFill, RiFileTextFill } from "react-icons/ri";
import "chart.js/auto";

const years = [2025, 2026];

const generateChartData = () => {
  return {
    labels: [
      "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
      "Jul", "Agu", "Sep", "Okt", "Nov", "Des"
    ],
    datasets: [
      {
        label: "",
        backgroundColor: "#3377FF",
        borderColor: "#3377FF",
        borderWidth: 1,
        hoverBackgroundColor: "#3377FF",
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
    x: { grid: { display: false } },
    y: { beginAtZero: true, grid: { drawBorder: false } },
  },
  maintainAspectRatio: false,
};

const affiliateData = [
  {
    key: "1",
    name: "Mohammed Hussein",
    email: "nancy.brooks@gmail.com",
    phone: "+62 (648) 958-7603",
    referralCode: "FHD678",
    commission: "Rp 500.000",
  },
  {
    key: "2",
    name: "Aleksander Nowak",
    email: "friable_woodworkers_51@gmail.com",
    phone: "+62 (510) 432-8766",
    referralCode: "FHD678",
    commission: "Rp 500.000",
  },
  {
    key: "3",
    name: "Cynthia Stewart",
    email: "lisa.jones@gmail.com",
    phone: "+62 (230) 161-1127",
    referralCode: "FHD678",
    commission: "Rp 500.000",
  },
  {
    key: "4",
    name: "Josh Stewart",
    email: "ola.ad6b6y@gmail.com",
    phone: "+62 (826) 587-5118",
    referralCode: "FHD678",
    commission: "Rp 500.000",
  },
  {
    key: "5",
    name: "仝思",
    email: "jesús.rodriguez@gmail.com",
    phone: "+62 (423) 937-3835",
    referralCode: "FHD678",
    commission: "Rp 500.000",
  },
];

const Affiliate = () => {
  const [selectedYear, setSelectedYear] = useState(years[0]);
  const [chartData, setChartData] = useState(generateChartData());
  const [searchText, setSearchText] = useState("");
  const chartContainerRef = useRef(null);
  const [chartHeight, setChartHeight] = useState(300);

  useEffect(() => {
    if (chartContainerRef.current) {
      setChartHeight(chartContainerRef.current.clientHeight);
    }
  }, [chartData]);

  const handleYearChange = (year) => {
    setSelectedYear(year);
    setChartData(generateChartData());
  };

  const filteredData = affiliateData.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    { title: "Nama", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "No Telpon", dataIndex: "phone", key: "phone" },
    { title: "Kode Referal", dataIndex: "referralCode", key: "referralCode" },
    { title: "Total Komisi", dataIndex: "commission", key: "commission" },
  ];

  return (
    <DashboardLayout>
      <section className="flex flex-col">
        <div className="w-full flex my-4">
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
                style={{ height: "350px" }}
              >
                <Bar data={chartData} options={{ ...chartOptions, height: 350 }} />
              </motion.div>
            </motion.div>
          </div>

          {/* RIGHT CARD SECTION */}
          <div className="flex flex-col w-[25%] gap-4 ml-4" style={{ height: `${chartHeight}px` }}>
            <div className="flex flex-col rounded-xl bg-white px-4 shadow-lg flex-1 justify-center gap-4">
              <div className="flex items-center justify-center bg-[#F9CA24] text-white rounded-full w-14 h-14">
                <RiMoneyDollarCircleFill className="text-4xl" />
              </div>
              <div className="w-full flex flex-col gap-2">
                <h2 className="text-gray-900 text-3xl font-semibold">Rp 10.000.000</h2>
                <h4 className="text-gray-400">Total Komisi Affiliator</h4>
              </div>
            </div>
            <div className="flex flex-col rounded-xl bg-white px-4 shadow-lg flex-1 justify-center gap-4">
              <div className="flex items-center justify-center bg-[#02264A] text-white rounded-full w-14 h-14">
                <RiFileTextFill className="text-4xl" />
              </div>
              <div className="w-full flex flex-col gap-2">
                <h2 className="text-gray-900 text-3xl font-semibold">123</h2>
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
              onChange={(e) => setSearchText(e.target.value)}
              className="w-96 py-2 px-4"
            />
          </div>
          <Table columns={columns} dataSource={filteredData} pagination={false} />
        </div>
      </section>
    </DashboardLayout>
  );
};

export default Affiliate;
