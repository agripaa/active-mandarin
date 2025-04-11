import React, { useState, useEffect } from "react";
import { Table, Button, Input } from "antd";
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

const ProductTable = ({ dataProduct }) => {
  const [data, setData] = useState(dataProduct);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    setData((dataProduct || []).slice().reverse());
  }, [dataProduct]);

  // 🔹 Handle Edit Modal
  const showEditModal = async (productId) => {
    try {
      const { data } = await getBrandById(productId);
      setEditingProduct(data);
      setIsEditModalOpen(true);
    } catch (error) {}
  };

  // 🔹 Handle Delete
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
          setData((prevData) => prevData.filter((item) => item.id !== id));
          Swal.fire("Dihapus!", "Product telah dihapus.", "success").then(() => {
            window.location.reload();
          });
          getDashboardData();
          Swal.fire("Dihapus!", "Produk telah dihapus.", "success");
        } catch (error) {
          Swal.fire("Gagal!", "Terjadi kesalahan saat menghapus.", "error");
        }
      }
    });
  };

  // 🔹 Filter Data berdasarkan input pencarian
  const filteredData = data.filter((item) =>
    item.variant?.toLowerCase().includes(searchText.toLowerCase())
  );

  // 🔹 Table Columns
  const columns = [
    {
      title: "Gambar",
      dataIndex: "brand_img",
      key: "brand_img",
      render: (brand_img) => (
        <img src={`${process.env.REACT_APP_API_IMG}${brand_img}`} alt="Product" className="w-18 h-12 rounded-md" />
      ),
    },
    {
      title: "Nama Produk",
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
      render: (price) => price ? `Rp ${parseInt(price).toLocaleString()}` : "-",
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
      render: (komisi) => komisi ? formatRupiah(komisi) : "-"
    },
    {
      title: "Detail Produk",
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
          <Button
            icon={<EditOutlined />}
            onClick={() => showEditModal(record.id)}
            className="bg-[#FFCC00] text-black"
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
            className="bg-red-500 text-white"
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="p-4 bg-white shadow-lg rounded-xl w-full">
        <div className="flex flex-col md:flex-row gap-2 md:gap-0 justify-between w-full items-center mb-4">
          <h4 className="text-lg font-semibold w-full md:w-[20%]">List Produk</h4>
          <div className="flex items-center gap-2 w-full md:justify-end">    
            <Input
              placeholder="Cari Produk, cth: E-Flashcard"
              prefix={<RiSearchLine className="text-2xl mr-2" />}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-1/2 py-2 px-4"
            />
            <Button
              className="text-black bg-[#FFCC00] border-none px-5 py-6 font-medium rounded-2xl"
              onClick={() => setIsCreateModalOpen(true)}
            >
              Tambah Produk
            </Button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table columns={columns} dataSource={filteredData} pagination={false} />
        </div>
      </div>

      {/* Modal Create */}
      <CreateProductModal
        isModalOpen={isCreateModalOpen}
        setIsModalOpen={setIsCreateModalOpen}
        refreshData={getDashboardData}
      />

      {/* Modal Edit */}
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
