import React, { useState, useEffect } from "react";
import { getAllUserTransactions } from "../../api/user";
import { Spin } from "antd";
import { formatRupiah } from "../../utils/rupiahFormat";
import { formatDate } from "../../utils/formatDate";

const TransaksiUser = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchTransactions();
  }, [currentPage]);

  const fetchTransactions = async () => {
    try {
      const response = await getAllUserTransactions(currentPage, pageSize);
      setTransactions(response.data);
      setTotalPages(response.total_pages);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (loading) {
    return <Spin size="large" className="flex justify-center items-center h-screen" />;
  }

  return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Transaksi Mu</h2>
        
        {/* Table */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3">Gambar</th>
                <th className="p-3">Item</th>
                <th className="p-3">Harga</th>
                <th className="p-3">Tanggal Pembelian</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length > 0 ? transactions.map((transaction, index) => (
                <tr key={transaction.id} className="border-b">
                  <td className="p-3">
                    <img src={transaction.brand_image ? `${process.env.REACT_APP_API_IMG}${transaction.brand_image}` : "/assets/product-default.png"} alt={transaction.item} className="w-42 h-28 rounded-md" />
                  </td>
                  <td className="p-3">{transaction.item}</td>
                  <td className="p-3">{transaction.discount_price ? formatRupiah(transaction.discount_price) : formatRupiah(transaction.price)}</td>
                  <td className="p-3">{formatDate(transaction.transaction_date)}</td>
                  <td className={`p-3 font-semibold ${
                    transaction.status_transaction === "success" ? "text-green-500" 
                    : transaction.status_transaction === "cancel" ? "text-red-500" 
                    : "text-yellow-500"
                  }`}>
                    {transaction.status_transaction}
                  </td>
                </tr>
              )) : <tr><td colSpan="6" className="p-4 text-center">Anda Belum Melakukan Transaksi!.</td></tr>}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-6 space-x-2">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-2 border rounded-md ${currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-gray-700 hover:bg-gray-100"}`}
          >
            &lt;
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => goToPage(index + 1)}
              className={`px-3 py-2 border rounded-md ${currentPage === index + 1 ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-100"}`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-2 border rounded-md ${currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "text-gray-700 hover:bg-gray-100"}`}
          >
            &gt;
          </button>
        </div>
      </div>
  );
};

export default TransaksiUser;
