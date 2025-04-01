import React, { useState, useEffect } from "react";
import { Table, Button, Pagination } from "antd";
import Swal from "sweetalert2";
import { RiMoneyDollarCircleFill, RiFileTextFill } from "react-icons/ri";
import {
  getAllTransactions,
  exportTransactionsToExcel,
  getTransactionSummary
} from "../../api/transaksi";
import { formatDate } from "../../utils/formatDate";
import { formatRupiah } from "../../utils/rupiahFormat";

const TransaksiAdmin = () => {
  const [data, setData] = useState([]);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    fetchTransactions();
    fetchTransactionSummary();
  }, [currentPage]);

  const fetchTransactions = async () => {
    try {
      const response = await getAllTransactions(currentPage, pageSize);
      const totalAffiliators = response.total_affiliators.reduce((sum, item) => sum + item.count, 0);
      setData(response.data);
      setTotalItems(totalAffiliators);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTransactionSummary = async () => {
    try {
      const response = await getTransactionSummary();
      setTotalTransactions(response.total_transactions);
      setTotalRevenue(response.total_revenue);
    } catch (error) {
      console.error(error);
    }
  };

  const handleExportExcel = async () => {
    try {
      await exportTransactionsToExcel();
      Swal.fire("Success", "Transactions exported successfully!", "success");
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  const columns = [
    { title: "Nama Pembeli", dataIndex: "User", key: "buyer", render: (user) => user?.name || "-" },
    { title: "Category", dataIndex: "Brand", key: "item", render: (brand) => brand?.category_brand || "-" },
    { title: "Variant", dataIndex: "Brand", key: "variant", render: (brand) => brand?.variant || "-" },
    { title: "Turunan", dataIndex: "Brand", key: "turunan", render: (brand) => brand?.turunan || "-" },
    { 
      title: "Harga", 
      dataIndex: "Brand", 
      key: "price", 
      render: (_, record) => record?.Brand?.discount_price ? formatRupiah(record?.Brand?.discount_price)  : formatRupiah(record?.Brand?.price) },
    { title: "Tanggal Pembelian", dataIndex: "transaction_date", key: "date", render: (date) => formatDate(date) },
    { title: "Metode Pembayaran", dataIndex: "payment_method", key: "paymentMethod" },
    { title: "Affiliate", dataIndex: "Affiliator", key: "affiliate", render: (aff) => aff?.name || "-" },
    { 
      title: "Komisi", 
      dataIndex: "Brand", 
      key: "commission", 
      render: (_, record) => record?.Affiliator ? formatRupiah(record.Brand?.commission) : "-" 
    },
  ];

  return (
    <div className="flex flex-col w-full min-h-screen p-4">
      <div className="flex w-full gap-4 mb-6">
        <div className="flex flex-col rounded-xl bg-white px-6 shadow-lg py-6 w-[22%]">
          <div className="flex items-center justify-center bg-[#F9CA24] text-white rounded-full w-14 h-14">
            <RiMoneyDollarCircleFill className="text-4xl" />
          </div>
          <div className="w-full flex flex-col gap-2 mt-2">
            <h2 className="text-gray-900 text-3xl font-semibold">{formatRupiah(totalRevenue)}</h2>
            <h4 className="text-gray-400">Pendapatan</h4>
          </div>
        </div>
        <div className="flex flex-col rounded-xl bg-white px-6 shadow-lg py-6 w-[22%]">
          <div className="flex items-center justify-center bg-[#02264A] text-white rounded-full w-14 h-14">
            <RiFileTextFill className="text-4xl" />
          </div>
          <div className="w-full flex flex-col gap-2 mt-2">
            <h2 className="text-gray-900 text-3xl font-semibold">{totalTransactions}</h2>
            <h4 className="text-gray-400">Jumlah Transaksi</h4>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 shadow-lg rounded-xl">
        <div className="flex w-full justify-between items-center mb-4">
          <h4 className="text-lg font-semibold">Transaksi Berhasil</h4>
          <Button onClick={handleExportExcel} className="text-black bg-[#FFCC00] hover:bg-[#FFCC00] border-none px-5 py-6 font-medium rounded-2xl">
            Export To Excel
          </Button>
        </div>
        <Table columns={columns} dataSource={data} pagination={false} rowKey="id" />
        <div className="flex justify-end mt-4">
            <Pagination
                current={currentPage}
                total={totalItems}
                pageSize={pageSize}
                onChange={(page) => setCurrentPage(page)}
                showSizeChanger={false}
            />
        </div>
      </div>
    </div>
  );
};

export default TransaksiAdmin;