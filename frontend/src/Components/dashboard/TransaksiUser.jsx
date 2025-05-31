import React, { useState, useEffect } from "react";
import { getAllUserTransactions } from "../../api/user";
import { Spin } from "antd";
import { formatRupiah } from "../../utils/rupiahFormat";
import { formatDate } from "../../utils/formatDate";
import { useNavigate } from "react-router";

const TransaksiUser = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTransactions();
  }, [currentPage]);

  const fetchTransactions = async () => {
    try {
      const response = await getAllUserTransactions(currentPage, pageSize);
      setTransactions(response.data);
      setTotalPages(response.total_pages);
    } catch (error) {} finally {
      setLoading(false);
    }
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleDirectInvoice = (e, id) => {
    e.preventDefault();
    window.open(`/invoice/${id}`);
  }

  if (loading) {
    return <Spin size="large" className="flex justify-center items-center h-screen" />;
  }

  return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Transaksi Mu</h2>
        
        {/* Table */}
        <div className="bg-white shadow-md rounded-lg overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3">Gambar</th>
                <th className="p-3">Item</th>
                <th className="p-3">Harga</th>
                <th className="p-3">Tanggal Pembelian</th>
                <th className="p-3">Status</th>
                <th className="p-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length > 0 ? transactions.map((transaction, index) => (
                <tr key={transaction.id} className="border-b">
                  <td className="p-3">
                    <img src={transaction.brand_image ? `${process.env.REACT_APP_API_IMG}${transaction.brand_image}` : "/assets/product-default.png"} alt={transaction.item} className="w-full h-38 md:h-26 lg:w-36 lg:h-20 rounded-md" />
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
                  <td className={`p-3`}>
                    <button onClick={(e) => handleDirectInvoice(e,transaction.id)} className="bg-transparent border-2 border-neutral-600 hover:bg-neutral-600 hover:text-white text-black font-semibold py-3 px-4 rounded-xl flex justify-center items-center">Invoice</button>
                  </td>
                </tr>
              )) : <tr><td colSpan="6" className="p-4 text-center">Anda Belum Melakukan Transaksi!.</td></tr>}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-6 space-x-2 flex-wrap">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-2 py-1 border rounded-md ${currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-gray-700 hover:bg-gray-100"}`}
          >
            &lt;
          </button>

          {/* Generate Pagination Items */}
          {(() => {
            const pages = [];
            const visiblePages = 3;

            if (totalPages <= 7) {
              // Show all pages if few
              for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
              }
            } else {
              if (currentPage <= 3) {
                pages.push(1, 2, 3, 4, "...", totalPages);
              } else if (currentPage >= totalPages - 2) {
                pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
              } else {
                pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
              }
            }

            return pages.map((page, idx) => {
              if (page === "...") {
                return (
                  <span key={`ellipsis-${idx}`} className="px-2 py-1 text-gray-400">...</span>
                );
              }

              return (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`px-2 py-1 border rounded-md ${currentPage === page ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-100"}`}
                >
                  {page}
                </button>
              );
            });
          })()}

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-2 py-1 border rounded-md ${currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "text-gray-700 hover:bg-gray-100"}`}
          >
            &gt;
          </button>
        </div>
      </div>
  );
};

export default TransaksiUser;
