import React, { useState, useEffect } from "react";
import { Table, Input, Modal, Button, Spin } from "antd";
import { RiSearchLine } from "react-icons/ri";
import DashboardLayout from "../Layouts/DashboardLayout";
import { getAllRecruitment } from "../api/recruitment";

const Rekrutmen = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recruitmentData, setRecruitmentData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRecruitments();
  }, []);

  const fetchRecruitments = async () => {
    setLoading(true);
    try {
      const response = await getAllRecruitment();
      setRecruitmentData(response.data);
    } catch (error) {
      console.error("Error fetching recruitment data:", error);
    } finally {
      setLoading(false);
    }
  };

  const showModal = (candidate) => {
    setSelectedCandidate(candidate);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedCandidate(null);
  };

  const filteredData = recruitmentData.filter((item) =>
    item.nama.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    { title: "Nama", dataIndex: "nama", key: "nama" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "No Telpon", dataIndex: "telepon", key: "telepon" },
    { title: "Domisili", dataIndex: "domisili", key: "domisili" },
    {
      title: "Aksi",
      key: "action",
      render: (_, record) => (
        <span
          className="text-blue-500 cursor-pointer"
          onClick={() => showModal(record)}
        >
          Selengkapnya
        </span>
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
            <h4 className="text-lg font-semibold">Data Rekrutmen</h4>
            <Input
              placeholder="Cari kandidat..."
              prefix={<RiSearchLine className="text-2xl mr-2" />}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-96 py-2 px-4"
            />
          </div>
            <Table columns={columns} dataSource={filteredData} pagination={false} rowKey="id" />
        </div>

        <Modal
          title="Detail Rekrutmen"
          open={isModalOpen}
          onCancel={handleCancel}
          footer={null}
        >
          {selectedCandidate && (
            <div className="flex flex-col gap-4">
              <div>
                <h4 className="text-gray-600">Nama</h4>
                <div className="border rounded-md p-2">{selectedCandidate.nama}</div>
              </div>
              <div>
                <h4 className="text-gray-600">Email</h4>
                <div className="border rounded-md p-2">{selectedCandidate.email}</div>
              </div>
              <div>
                <h4 className="text-gray-600">No Telpon</h4>
                <div className="border rounded-md p-2">{selectedCandidate.telepon}</div>
              </div>
              <div>
                <h4 className="text-gray-600">Domisili</h4>
                <div className="border rounded-md p-2">{selectedCandidate.domisili}</div>
              </div>
              <div>
                <h4 className="text-gray-600">Posisi Dilamar</h4>
                <div className="border rounded-md p-2">{selectedCandidate.posisi}</div>
              </div>
              <div>
                <h4 className="text-gray-600">Portofolio</h4>
                {selectedCandidate.portofolio ? (
                  <a
                    href={selectedCandidate.portofolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                  >
                    Lihat Portofolio
                  </a>
                ) : (
                  <div className="border rounded-md p-2 text-gray-400">Tidak ada</div>
                )}
              </div>
              <div>
                <h4 className="text-gray-600">CV/Resume</h4>
                <a
                  href={`${process.env.REACT_APP_API_IMG}/public/cv/${selectedCandidate.cv_file}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500"
                >
                  Lihat CV
                </a>
              </div>
            </div>
          )}
        </Modal>
      </section>
    </DashboardLayout>
  );
};

export default Rekrutmen;
