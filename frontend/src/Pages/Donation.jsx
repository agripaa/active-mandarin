import React, { useState, useEffect } from "react";
import { Table, Input, Modal, Spin, Pagination } from "antd";
import { RiSearchLine } from "react-icons/ri";
import DashboardLayout from "../Layouts/DashboardLayout";
import { getAllDonation, deleteDonation } from "../api/donation";

const Donation = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [donationData, setDonationData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const pageSize = 5;

  useEffect(() => {
    fetchDonations(currentPage);
  }, [currentPage]);

  const fetchDonations = async (page = 1) => {
    setLoading(true);
    try {
      const response = await getAllDonation(page, pageSize);
      setDonationData(response.data);
      setTotalItems(response.total_items); // backend must return this
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const showModal = (donation) => {
    setSelectedDonation(donation);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedDonation(null);
  };

  const showImagePreview = (imageSrc) => {
    setImagePreview(imageSrc);
  };

  const closeImagePreview = () => {
    setImagePreview(null);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDonation(id);
      setIsSuccessModalOpen(true); 
      fetchDonations(currentPage); 
    } catch (error) {
      console.error(error);
    }
  };
  

  const filteredData = donationData.filter((item) =>
    item.nama.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    { title: "Nama", dataIndex: "nama", key: "nama" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Aksi",
      key: "action",
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => showModal(record)}
          >
            Selengkapnya
          </span>
          <span
            className="text-red-500 cursor-pointer"
            onClick={() => handleDelete(record.id)}
          >
            Delete
          </span>
        </div>
        
      ),
    },
  ];

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
      <section className="flex flex-col w-full p-4">
        <div className="bg-white p-6 shadow-lg rounded-xl w-full">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-lg font-semibold">Data Donation</h4>
            <Input
              placeholder="Cari donatur..."
              prefix={<RiSearchLine className="text-2xl mr-2" />}
              onChange={handleSearchChange}
              className="w-8/12 md:w-96 py-2 px-4"
            />
          </div>
          <div className="overflow-x-auto">
            <Table
              columns={columns}
              dataSource={filteredData}
              pagination={false}
              rowKey="id"
            />
          </div>

          {/* Ant Design Pagination */}
          <div className="flex justify-end mt-6">
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

        {/* MODAL DETAIL DONASI */}
        <Modal
          title="Detail Donation"
          open={isModalOpen}
          onCancel={handleCancel}
          footer={null}
        >
          {selectedDonation && (
            <div className="flex flex-col gap-4">
              <div>
                <h4 className="text-gray-600">Nama</h4>
                <div className="border rounded-md p-2">{selectedDonation.nama}</div>
              </div>
              <div>
                <h4 className="text-gray-600">Email</h4>
                <div className="border rounded-md p-2">{selectedDonation.email}</div>
              </div>
              <div>
                <h4 className="text-gray-600">Metode Pembayaran</h4>
                <div className="border rounded-md p-2">
                  {selectedDonation.payment_method}
                </div>
              </div>
              <div>
                <h4 className="text-gray-600">Bukti Transfer</h4>
                <img
                  src={`${process.env.REACT_APP_API_IMG}/public/proof_donation/${selectedDonation.proof_payment}`}
                  className="w-20 h-20 cursor-pointer rounded-md border"
                  onClick={() =>
                    showImagePreview(
                      `${process.env.REACT_APP_API_IMG}/public/proof_donation/${selectedDonation.proof_payment}`
                    )
                  }
                  alt="Bukti Transfer"
                />
              </div>
            </div>
          )}
        </Modal>

        {/* MODAL PREVIEW GAMBAR */}
        <Modal open={!!imagePreview} footer={null} onCancel={closeImagePreview} centered>
          {imagePreview && <img src={imagePreview} alt="Preview" className="w-full" />}
        </Modal>

        {/* MODAL SUCCESS DELETE */}
        <Modal
          open={isSuccessModalOpen}
          onCancel={() => setIsSuccessModalOpen(false)}
          footer={null}
          centered
        >
          <div className="flex flex-col items-center justify-center p-4">
            <h2 className="text-2xl font-semibold text-green-600 mb-4">Berhasil Dihapus!</h2>
            <button
              onClick={() => setIsSuccessModalOpen(false)}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
            >
              Tutup
            </button>
          </div>
        </Modal>

      </section>
    </DashboardLayout>
  );
};

export default Donation;
