import React, { useState } from "react";
import { Table, Button, Pagination } from "antd";
import { RiMoneyDollarCircleFill, RiFileTextFill, RiHashtag } from "react-icons/ri";
import { RiBook2Fill } from "react-icons/ri";


const initialData = Array.from({ length: 20 }, (_, i) => ({
  key: (i + 1).toString(),
  buyer: `Pembeli ${i + 1}`,
  item: i % 2 === 0 ? "E-Flashcard HSK 1" : "Buku Kotak-Kotak",
  price: "Rp 50.000",
  date: "25 Mar 2025",
  commission: "Rp 10.000",
}));

const DashboardAffiliator = () => {
  const [data, setData] = useState(initialData);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const totalPage = Math.ceil(data.length / pageSize);

  const columns = [
    { title: "Nama Pembeli", dataIndex: "buyer", key: "buyer" },
    { title: "Item", dataIndex: "item", key: "item" },
    { title: "Harga", dataIndex: "price", key: "price" },
    { title: "Tanggal Pembelian", dataIndex: "date", key: "date" },
    { title: "Komisi", dataIndex: "commission", key: "commission" },
  ];

  const paginatedData = data.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
      <div className="flex flex-col w-full min-h-screen p-4">
        {/* Header Cards */}
        <div className="flex justify-between w-full gap-4 mb-6">
          <div className="flex flex-col rounded-xl bg-white px-6 shadow-lg py-6 w-[22%]">
            <div className="flex items-center justify-center bg-[#F9CA24] text-white rounded-full w-14 h-14">
              <RiMoneyDollarCircleFill className="text-4xl" />
            </div>
            <div className="w-full flex flex-col gap-2 mt-2">
              <h2 className="text-gray-900 text-3xl font-semibold">Rp 10.000.000</h2>
              <h4 className="text-gray-400">Pendapatan</h4>
            </div>
          </div>
          <div className="flex flex-col rounded-xl bg-white px-6 shadow-lg py-6 w-[22%]">
            <div className="flex items-center justify-center bg-[#02264A] text-white rounded-full w-14 h-14">
              <RiFileTextFill className="text-4xl" />
            </div>
            <div className="w-full flex flex-col gap-2 mt-2">
              <h2 className="text-gray-900 text-3xl font-semibold">123</h2>
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
              <h2 className="text-gray-900 text-3xl font-semibold">25FK78</h2>
              <h4 className="text-gray-400">Kode Referal</h4>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white p-6 shadow-lg rounded-xl">
            <div className="flex w-full justify-between items-center mb-4">
                <h4 className="text-lg font-semibold">Transaksi</h4>
                <Button
                    className="text-black bg-[#FFCC00] hover:bg-[#FFCC00] border-none px-5 py-6 font-medium rounded-2xl"
                >
                    Export To Excel
                </Button>
            </div>
          <Table
            columns={columns}
            dataSource={paginatedData}
            pagination={false}
          />

          {/* Pagination */}
          <div className="flex justify-center mt-6">
            <Pagination
              current={currentPage}
              total={data.length}
              pageSize={pageSize}
              showSizeChanger={false}
              onChange={(page) => setCurrentPage(page)}
              className="pagination"
              itemRender={(page, type) => {
                console.log({page})
                if (type === "prev") {
                  return <Button className="text-gray-700">«</Button>;
                }
                if (type === "next") {
                  return <Button className="text-gray-700">»</Button>;
                }
                if (totalPage > 5) {
                  if (currentPage <= 3) {
                    if (page <= 3 || page === totalPage) {
                      return (
                        <Button
                          className={`${
                            currentPage === page
                              ? " text-black"
                              : "bg-gray-200 text-gray-700"
                          }`}
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </Button>
                      );
                    }
                    if (page === 4) return <span className="mx-2">...</span>;
                    return null;
                  } else if (currentPage >= totalPage - 2) {
                    if (page === 1) return <span className="mx-2">...</span>;
                    if (page >= totalPage - 2) {
                      return (
                        <Button
                          className={`${
                            currentPage === page
                              ? "text-black"
                              : "bg-gray-200 text-gray-700"
                          }`}
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </Button>
                      );
                    }
                    return null;
                  } else {
                    if (page === 1 || page === totalPage) return <span className="mx-2">...</span>;
                    if (Math.abs(currentPage - page) <= 1) {
                      return (
                        <Button
                          className={`${
                            currentPage === page
                              ? "text-black"
                              : "bg-gray-200 text-gray-700"
                          }`}
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </Button>
                      );
                    }
                    return null;
                  }
                }
                return (
                  <Button
                    className={`${
                      currentPage === page
                        ? "border-blue-500 text-black"
                        : "bg-gray-200 text-gray-700"
                    }`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </Button>
                );
              }}
            />
          </div>
        </div>
      </div>
  );
};

export default DashboardAffiliator;
