import React, { useState }  from 'react'
import DashboardLayout from '../../Layouts/DashboardLayout'
import { Spin } from "antd";

const ResultExams = () => {
    //   const [loading, setLoading] = useState(true);
      const [currentPage, setCurrentPage] = useState(1);
      const pageSize = 10;
      const [totalPages, setTotalPages] = useState(1);
    
    
      const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
          setCurrentPage(page);
        }
      };
    
      const handleDirectInvoice = (e, id) => {
        e.preventDefault();
        window.open(`/invoice/${id}`);
      }
    
    //   if (loading) {
    //     return <Spin size="large" className="flex justify-center items-center h-screen" />;
    //   }

    const transactions = [
        {
            id: 1,
            nama_ujian: "Soal 1",
            nama_peserta: "Dicka Taksa",
            tipe: "HSK 1",
            nilai: "80/100",
            status: false,
        }
    ]
  return (
    <DashboardLayout>
        <div className="p-6 min-h-screen">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Transaksi Mu</h2>
          
          {/* Table */}
          <div className="bg-white shadow-md rounded-lg overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-3">Nama Ujian</th>
                  <th className="p-3">Nama Peserta</th>
                  <th className="p-3">Tipe Ujian</th>
                  <th className="p-3">Nilai Final</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {transactions.length > 0 ? transactions.map((transaction, index) => (
                  <tr key={transaction.id} className="border-b">
                    <td className="p-3">{transaction.nama_ujian}</td>
                    <td className="p-3">{transaction.nama_peserta}</td>
                    <td className="p-3">{transaction.tipe}</td>
                    <td className="p-3">{transaction.nilai}</td>
                    <td className={`p-3 font-semibold ${
                      transaction.status ? "text-green-500" 
                      :"text-yellow-500"
                    }`}>
                      {transaction.status ? "Selesai" : "Diperiksa Mentor"}
                    </td>
                    <td className={`p-3 flex gap-3`}>
                      <button onClick={(e) => handleDirectInvoice(e,transaction.id)} className="bg-transparent border-2 border-neutral-600 hover:bg-neutral-600 hover:text-white text-black font-semibold py-3 px-4 rounded-xl flex justify-center items-center">Certificate</button>
                      <button onClick={(e) => handleDirectInvoice(e,transaction.id)} className="bg-transparent border-2 border-neutral-600 hover:bg-neutral-600 hover:text-white text-black font-semibold py-3 px-4 rounded-xl flex justify-center items-center">Review Ujian</button>
                    </td>
                  </tr>
                )) : <tr><td colSpan="6" className="p-4 text-center">Anda Belum Melakukan Transaksi!.</td></tr>}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center mt-6 space-x-2 flex-wrap">
            {/* <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-2 py-1 border rounded-md ${currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-gray-700 hover:bg-gray-100"}`}
            >
              &lt;
            </button> */}

            {/* Generate Pagination Items */}
            {/* {(() => {
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
            })()} */}

            {/* <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-2 py-1 border rounded-md ${currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "text-gray-700 hover:bg-gray-100"}`}
            >
              &gt;
            </button> */}
          </div>
        </div>
    </DashboardLayout>
  )
}

export default ResultExams