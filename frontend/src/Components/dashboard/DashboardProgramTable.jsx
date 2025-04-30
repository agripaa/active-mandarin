import React, { useState, useEffect } from "react";
import { Table, Button, Input, Select } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { RiSearchLine } from "react-icons/ri";
import Swal from "sweetalert2";
import CreateProgramModal from "./modal/CreateProgramModal";
import EditProgramModal from "./modal/EditProgramModal";
import { getDashboardData } from "../../api/transaksi";
import { softDeleteBrand, getBrandById } from "../../api/brand";
import { stripHtml } from '../../utils/stripHtml';
import { truncateText } from '../../utils/truncateText';
import { formatRupiah } from "../../utils/rupiahFormat";

const ProgramTable = ({ dataProgram }) => {
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState({});
  const [turunanOptions, setTurunanOptions] = useState([]);
  const [selectedTurunan, setSelectedTurunan] = useState("Semua");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProgram, setEditingProgram] = useState(null);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (dataProgram) {
      setAllData(dataProgram);
      const options = Object.keys(dataProgram);
      setTurunanOptions(["Semua", ...options]);
      setData(options.flatMap(key => dataProgram[key]));
    }
  }, [dataProgram]);

  const handleFilterTurunan = (value) => {
    setSelectedTurunan(value);
    if (value === "Semua") {
      const all = Object.keys(allData).flatMap(key => allData[key]);
      setData(all);
    } else {
      setData((allData[value] || []).slice());
    }
  };

  const showEditModal = (programId) => {
    Swal.fire({
      title: "Edit Program?",
      text: "Apakah Anda yakin ingin mengedit program ini?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#FFCC00",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Edit",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data } = await getBrandById(programId);
        setEditingProgram(data);
        setIsEditModalOpen(true);
      }
    });
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Hapus Program?",
      text: "Program ini akan dihapus secara permanen.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, Hapus",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await softDeleteBrand(id);
          setData(prev => prev.filter((item) => item.id !== id));
          Swal.fire("Dihapus!", "Program telah dihapus.", "success").then(() => {
            window.location.reload();
          });
        } catch (error) {
          Swal.fire("Gagal!", "Terjadi kesalahan saat menghapus.", "error");
        }
      }
    });
  };

  const filteredData = data.filter((item) =>
    item.variant?.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: "Gambar",
      dataIndex: "brand_img",
      key: "brand_img",
      render: (image) => (
        <img src={`${process.env.REACT_APP_API_IMG}${image}`} alt="Program" className="w-18 h-12 rounded-md" />
      ),
    },
    {
      title: "Nama Program",
      dataIndex: "variant",
      key: "variant",
    },
    {
      title: "Harga Normal",
      dataIndex: "price",
      key: "price",
      render: (price) => `Rp ${parseInt(price).toLocaleString()}`,
    },
    {
      title: "Harga Promo",
      dataIndex: "discount_price",
      key: "discount_price",
      render: (price) => (price ? `Rp ${parseInt(price).toLocaleString()}` : "-"),
    },
    {
      title: "Total Terjual",
      dataIndex: "sold_sum",
      key: "sold_sum",
    },
    {
      title: "Komisi",
      dataIndex: "commission",
      key: "commission",
      render: (komisi) => (komisi ? formatRupiah(komisi) : "-"),
    },
    {
      title: "Detail Program",
      dataIndex: "detail_brand",
      key: "detail_brand",
      render: (detail) => {
        const cleanText = stripHtml(detail || "-");
        return <span title={cleanText}>{truncateText(cleanText)}</span>;
      },
    },
    {
      title: "Aksi",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-2">
          <Button icon={<EditOutlined />} onClick={() => showEditModal(record.id)} className="bg-[#FFCC00] text-black" />
          <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)} className="bg-red-500 text-white" />
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="p-4 bg-white shadow-lg rounded-xl w-full">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
          <h4 className="text-lg font-semibold">List Program</h4>
          <div className="flex flex-wrap gap-2 items-center w-full md:w-auto">
            <Select
              value={selectedTurunan}
              onChange={handleFilterTurunan}
              options={turunanOptions.map(tur => ({ label: tur, value: tur }))}
              style={{ width: 200 }}
            />
            <Input
              placeholder="Cari Program"
              prefix={<RiSearchLine className="text-2xl mr-2" />}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-60"
            />
            <Button
              className="bg-[#FFCC00] text-black px-4 py-2 rounded-xl"
              onClick={() => setIsCreateModalOpen(true)}
            >
              Tambah Program
            </Button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table columns={columns} dataSource={filteredData} rowKey="id" pagination={false} />
        </div>
      </div>

      <CreateProgramModal
        isModalOpen={isCreateModalOpen}
        setIsModalOpen={setIsCreateModalOpen}
        refreshData={getDashboardData}
      />

      <EditProgramModal
        isModalOpen={isEditModalOpen}
        setIsModalOpen={setIsEditModalOpen}
        programData={editingProgram}
        refreshData={getDashboardData}
      />
    </>
  );
};

export default ProgramTable;
