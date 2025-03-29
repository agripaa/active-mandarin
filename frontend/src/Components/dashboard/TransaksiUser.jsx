import React, { useState } from "react";

const TransaksiUser = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  // Data transaksi dummy
  const transactions = [
    {
      id: 1,
      image: "/assets/product1.png",
      item: "E-Flashcard HSK 1",
      price: "Rp 50.000",
      date: "25 Mar 2025",
      commission: "Rp 10.000",
      status: "Success",
    },
    {
      id: 2,
      image: "/assets/product1.png",
      item: "Mandarin Juara",
      price: "Rp 3.000.000",
      date: "25 Mar 2025",
      commission: "Rp 10.000",
      status: "Canceled",
    },
    {
      id: 3,
      image: "/assets/product1.png",
      item: "HSK 1",
      price: "Rp 1.000.000",
      date: "25 Mar 2025",
      commission: "Rp 10.000",
      status: "Process",
    },
    {
      id: 4,
      image: "/assets/product1.png",
      item: "Kelas Umum Basic Mandarin",
      price: "Rp 750.000",
      date: "25 Mar 2025",
      commission: "Rp 10.000",
      status: "Success",
    },
    {
      id: 5,
      image: "/assets/product1.png",
      item: "Buku Kotak-Kotak",
      price: "Rp 50.000",
      date: "25 Mar 2025",
      commission: "Rp 10.000",
      status: "Success",
    },
  ];

  // Simulasi total halaman
  const totalTransactions = 10;
  const totalPages = Math.ceil(totalTransactions / pageSize);

  // Fungsi untuk mengganti halaman
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

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
                <th className="p-3">Komisi</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr key={transaction.id} className="border-b">
                  <td className="p-3">
                    <img src={transaction.image} alt={transaction.item} className="w-42 h-28 rounded-md" />
                  </td>
                  <td className="p-3">{transaction.item}</td>
                  <td className="p-3">{transaction.price}</td>
                  <td className="p-3">{transaction.date}</td>
                  <td className="p-3">{transaction.commission}</td>
                  <td className={`p-3 font-semibold ${transaction.status === "Success" ? "text-green-500" : transaction.status === "Canceled" ? "text-red-500" : "text-yellow-500"}`}>
                    {transaction.status}
                  </td>
                </tr>
              ))}
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
