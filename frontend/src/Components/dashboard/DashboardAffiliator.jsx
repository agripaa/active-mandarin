import React, { useState, useEffect } from "react";
import { Table, Button, Pagination, Spin } from "antd";
import { RiMoneyDollarCircleFill, RiFileTextFill, RiHashtag } from "react-icons/ri";
import { RiBook2Fill } from "react-icons/ri";
import { getUserAffiliateDashboard, getUserTransactions } from "../../api/affiliate";
import { formatRupiah } from "../../utils/rupiahFormat";
import { formatDate } from "../../utils/formatDate";

const DashboardAffiliator = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [transactionLoading, setTransactionLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const [totalTransactions, setTotalTransactions] = useState(0);

  useEffect(() => {
    fetchDashboardData();
    fetchTransactions(1);
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await getUserAffiliateDashboard();
      setDashboardData(response.data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTransactions = async (page) => {
    setTransactionLoading(true);
    try {
      const response = await getUserTransactions(page, pageSize);
      setTransactions(response.data);
      setTotalTransactions(response.total_transactions);
      setCurrentPage(response.current_page);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setTransactionLoading(false);
    }
  };

  if (loading) {
    return <Spin size="large" className="flex justify-center items-center h-screen" />;
  }

  const columns = [
    { title: "Nama Pembeli", dataIndex: "buyer_name", key: "buyer_name" },
    { title: "Item", dataIndex: "item", key: "item" },
    { title: "Harga", dataIndex: "price", key: "price", render: (price, record) => record.discount_price ? formatRupiah(record.discount_price) : formatRupiah(price) }, // Dummy price
    { title: "Tanggal Pembelian", dataIndex: "transaction_date", key: "transaction_date", render: (date) => formatDate(date)},
    { title: "Komisi", dataIndex: "commission", key: "commission", render: (value) => `Rp ${value.toLocaleString("id-ID")}` },
  ];

  return (
      <div className="flex flex-col w-full min-h-screen p-4">
        {/* Header Cards */}
        <div className="flex justify-between w-full gap-4 mb-6">
          <div className="flex flex-col rounded-xl bg-white px-6 shadow-lg py-6 w-[22%]">
            <div className="flex items-center justify-center bg-[#F9CA24] text-white rounded-full w-14 h-14">
              <RiMoneyDollarCircleFill className="text-4xl" />
            </div>
            <div className="w-full flex flex-col gap-2 mt-2">
              <h2 className="text-gray-900 text-3xl font-semibold">
                Rp {dashboardData.total_revenue.toLocaleString("id-ID")}
              </h2>
              <h4 className="text-gray-400">Pendapatan</h4>
            </div>
          </div>
          <div className="flex flex-col rounded-xl bg-white px-6 shadow-lg py-6 w-[22%]">
            <div className="flex items-center justify-center bg-[#02264A] text-white rounded-full w-14 h-14">
              <RiFileTextFill className="text-4xl" />
            </div>
            <div className="w-full flex flex-col gap-2 mt-2">
              <h2 className="text-gray-900 text-3xl font-semibold">{dashboardData.total_transactions}</h2>
              <h4 className="text-gray-400">Jumlah Transaksi</h4>
            </div>
          </div>
          <div className="flex flex-col rounded-xl bg-white px-6 shadow-lg py-6 w-[22%]">
            <div className="flex items-center justify-center bg-[#3377FF] text-white rounded-full w-14 h-14">
              <RiBook2Fill className="text-4xl" />
            </div>
            <div className="w-full flex flex-col gap-2 mt-2">
              <h2 className="text-gray-900 text-3xl font-semibold">Guide Book Affiliate</h2>
              <h4 className="text-gray-400">Klik Disini</h4>
            </div>
          </div>
          <div className="flex flex-col rounded-xl bg-white px-6 shadow-lg py-6 w-[22%]">
            <div className="flex items-center justify-center bg-[#FF3E3E] text-white rounded-full w-14 h-14">
              <RiHashtag className="text-4xl" />
            </div>
            <div className="w-full flex flex-col gap-2 mt-2">
              <h2 className="text-gray-900 text-3xl font-semibold">{dashboardData.reveral_code || "N/A"}</h2>
              <h4 className="text-gray-400">Kode Referal</h4>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white p-6 shadow-lg rounded-xl">
            <h4 className="text-lg font-semibold mb-4">Transaksi</h4>
            {transactionLoading ? (
                <Spin size="large" className="flex justify-center" />
            ) : (
                <>
                    <Table columns={columns} dataSource={transactions} pagination={false} />
                    <Pagination
                      current={currentPage}
                      total={totalTransactions}
                      pageSize={pageSize}
                      showSizeChanger={false}
                      onChange={(page) => fetchTransactions(page)}
                      className="flex justify-center mt-6"
                    />
                </>
            )}
        </div>
      </div>
  );
};

export default DashboardAffiliator;
