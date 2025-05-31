import React, { useState, useEffect } from "react";
import { Table, Button, Input, Select } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import CreateProductModal from "./modal/CreateProductModal";
import EditProductModal from "./modal/EditProductModal";
import { getBrandById, softDeleteBrand } from "../../api/brand";
import { getDashboardData } from "../../api/transaksi";
import { stripHtml } from "../../utils/stripHtml";
import { RiSearchLine } from "react-icons/ri";
import { truncateText } from "../../utils/truncateText";
import { formatRupiah } from "../../utils/rupiahFormat";

const ProductTable = ({ dataProduct, turunanOptions }) => {
  const [allData, setAllData] = useState([]);
  const [displayedData, setDisplayedData] = useState([]);
  const [selectedTurunan, setSelectedTurunan] = useState("All");
  const [searchText, setSearchText] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    const allItems = Object.entries(dataProduct || {}).flatMap(([_, items]) => items);
    setAllData(allItems); 
    setDisplayedData(allItems);
  }, [dataProduct]);

  const filterData = (text, turunan) => {
    let filtered = allData;
    if (turunan && turunan !== "All") {
      filtered = filtered.filter((item) => item.turunan === turunan);
    }
    if (text) {
      filtered = filtered.filter((item) =>
        item.variant?.toLowerCase().includes(text.toLowerCase())
      );
    }
    setDisplayedData(filtered);
  };

  const handleSearchChange = (value) => {
    setSearchText(value);
    filterData(value, selectedTurunan);
  };

  const handleTurunanChange = (value) => {
    setSelectedTurunan(value);
    filterData(searchText, value);
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Hapus Produk?",
      text: "Produk ini akan dihapus secara permanen.",
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
          setDisplayedData((prev) => prev.filter((item) => item.id !== id));
          Swal.fire("Dihapus!", "Produk telah dihapus.", "success").then(() => {
            window.location.reload();
          });
        } catch {
          Swal.fire("Gagal!", "Terjadi kesalahan saat menghapus.", "error");
        }
      }
    });
  };

  const handleEdit = async (id) => {
    const { data } = await getBrandById(id);
    setEditingProduct(data);
    setIsEditModalOpen(true);
  };

  const capitalize = (str) => str ? str.charAt(0).toUpperCase() + str.slice(1) : "-";

  const columns = [
    {
      title: "Gambar",
      dataIndex: "brand_img",
      key: "brand_img",
      render: (img) => (
        <img src={`${process.env.REACT_APP_API_IMG}${img}`} alt="Product" className="w-18 h-12 rounded-md" />
      ),
    },
    { title: "Nama Produk", dataIndex: "variant", key: "variant" },
    {
      title: "Tipe",
      dataIndex: "type_product",
      key: "type_product",
      render: (val) => capitalize(val),
    },
    {
      title: "Harga Normal",
      dataIndex: "price",
      key: "price",
      render: (val) => `Rp ${parseInt(val).toLocaleString()}`,
    },
    {
      title: "Harga Promo",
      dataIndex: "discount_price",
      key: "discount_price",
      render: (val) => val ? `Rp ${parseInt(val).toLocaleString()}` : "-",
    },
    { title: "Total Terjual", dataIndex: "sold_sum", key: "sold_sum" },
    {
      title: "Komisi",
      dataIndex: "commission",
      key: "commission",
      render: (val) => formatRupiah(val),
    },
    {
      title: "Detail Produk",
      dataIndex: "detail_brand",
      key: "detail_brand",
      render: (val) => {
        const clean = stripHtml(val || "-");
        return <span title={clean}>{truncateText(clean)}</span>;
      },
    },
    {
      title: "Aksi",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-2">
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record.id)} className="bg-[#FFCC00]" />
          <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)} className="bg-red-500 text-white" />
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="p-4 bg-white shadow-lg rounded-xl w-full">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-2">
          <h4 className="text-lg font-semibold">List Produk</h4>
          <div className="flex gap-2 w-full md:w-auto">
            <Select
              className="min-w-[180px]"
              placeholder="Filter Turunan"
              onChange={handleTurunanChange}
              value={selectedTurunan}
            >
              <Select.Option value="All">Semua Turunan</Select.Option>
              {turunanOptions?.map((item) => (
                <Select.Option key={item} value={item}>{item}</Select.Option>
              ))}
            </Select>
            <Input
              placeholder="Cari Produk"
              prefix={<RiSearchLine />}
              value={searchText}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
            <Button className="bg-[#FFCC00]" onClick={() => setIsCreateModalOpen(true)}>Tambah Produk</Button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table columns={columns} dataSource={displayedData} pagination={false} />
        </div>
      </div>

      <CreateProductModal
        isModalOpen={isCreateModalOpen}
        setIsModalOpen={setIsCreateModalOpen}
        refreshData={getDashboardData}
      />
      <EditProductModal
        isModalOpen={isEditModalOpen}
        setIsModalOpen={setIsEditModalOpen}
        productData={editingProduct}
        refreshData={getDashboardData}
      />
    </>
  );
};

export default ProductTable;
