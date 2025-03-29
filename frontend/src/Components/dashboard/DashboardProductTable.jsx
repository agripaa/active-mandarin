import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, InputNumber, Upload } from "antd";
import { EditOutlined, DeleteOutlined, UploadOutlined } from "@ant-design/icons";
import { RiSearchLine } from "react-icons/ri";
import Swal from "sweetalert2";

const initialData = [
  {
    key: "1",
    image: "/assets/product2.png",
    name: "E-Flashcard HSK 1",
    normalPrice: "Rp 50.000",
    promoPrice: "Rp 40.000",
    totalSold: 17,
    details: "Lorem ipsum d...",
    commission: "Rp 10.000",
  },
  {
    key: "2",
    image: "/assets/product2.png",
    name: "E-Flashcard HSK 2",
    normalPrice: "Rp 50.000",
    promoPrice: "Rp 40.000",
    totalSold: 17,
    details: "Lorem ipsum d...",
    commission: "Rp 10.000",
  },
  {
    key: "3",
    image: "/assets/product2.png",
    name: "Buku Kotak-Kotak",
    normalPrice: "Rp 50.000",
    promoPrice: "Rp 40.000",
    totalSold: 17,
    details: "Lorem ipsum d...",
    commission: "Rp 10.000",
  },
];

const ProductTable = () => {
  const [data, setData] = useState(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [form] = Form.useForm();

  const showModal = (product) => {
    Swal.fire({
      title: "Edit Produk?",
      text: "Apakah Anda yakin ingin mengedit produk ini?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#FFCC00",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Edit",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        setEditingProduct(product);
        form.setFieldsValue(product || {});
        setIsModalOpen(true);
      }
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
    form.resetFields();
  };

  const handleSave = () => {
    form.validateFields().then((values) => {
      if (editingProduct) {
        setData((prevData) =>
          prevData.map((item) =>
            item.key === editingProduct.key ? { ...item, ...values } : item
          )
        );
      } else {
        const newKey = (data.length + 1).toString();
        setData([...data, { key: newKey, image: "/assets/product2.png", ...values }]);
      }
      handleCancel();
    });
  };

  const handleDelete = (key) => {
    Swal.fire({
      title: "Hapus Produk?",
      text: "Produk ini akan dihapus secara permanen.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        setData((prevData) => prevData.filter((item) => item.key !== key));
        Swal.fire("Dihapus!", "Produk telah dihapus.", "success");
      }
    });
  };

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: "Gambar",
      dataIndex: "image",
      key: "image",
      render: (image) => <img src={image} alt="Product" className="w-18 h-12 rounded-md" />,
    },
    {
      title: "Nama Produk",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Harga Normal",
      dataIndex: "normalPrice",
      key: "normalPrice",
    },
    {
      title: "Harga Promo",
      dataIndex: "promoPrice",
      key: "promoPrice",
    },
    {
      title: "Total Terjual",
      dataIndex: "totalSold",
      key: "totalSold",
    },
    {
      title: "Detail Produk",
      dataIndex: "details",
      key: "details",
    },
    {
      title: "Komisi",
      dataIndex: "commission",
      key: "commission",
    },
    {
      title: "Aksi",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-2">
          <Button
            icon={<EditOutlined />}
            onClick={() => showModal(record)}
            className="bg-[#FFCC00] text-black"
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.key)}
            className="bg-red-500 text-white"
          />
        </div>
      ),
    },
  ];

  return (
    <div className="p-4 bg-white shadow-lg rounded-xl w-full">
      <div className="flex justify-between w-full items-center mb-4">
        <h4 className="text-lg font-semibold">List Produk</h4>
          <Input
            placeholder="Cari Produk, cth: E-Flashcard"
            prefix={<RiSearchLine className="text-2xl mr-2" />}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-1/2 py-2 px-4"
          />
        <div className="flex items-center gap-2">
          <Button
            className="text-black bg-[#FFCC00] border-none px-5 py-6 font-medium rounded-2xl"
            onClick={() => showModal(null)}
          >
            Tambah Produk
          </Button>
        </div>
      </div>
      <Table columns={columns} dataSource={filteredData} pagination={false} />

      <Modal
        title={editingProduct ? "Ubah Produk" : "Tambahkan Produk"}
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={handleSave}
        okText={editingProduct ? "Edit Produk" : "Tambah Produk"}
        cancelButtonProps={{ style: { display: "none" } }} 
        okButtonProps={{ style: { backgroundColor: "#FFCC00", border: "none", color: "black", fontWeight: "600", width: "100%", padding: "20px" } }} 
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Nama Produk" rules={[{ required: true, message: "Nama produk wajib diisi" }]}>
            <Input placeholder="Masukkan Nama Produk" className="w-full py-2"/>
          </Form.Item>

          <Form.Item name="normalPrice" label="Harga Normal" rules={[{ required: true, message: "Harga normal wajib diisi" }]}>
            <InputNumber placeholder="Masukkan Harga Normal, cth: Rp. 50.000" className="w-full py-2" />
          </Form.Item>

          <Form.Item name="promoPrice" label="Harga Promo" rules={[{ required: true, message: "Harga promo wajib diisi" }]}>
            <InputNumber placeholder="Masukkan Harga Promo, cth: Rp. 50.000" className="w-full py-2" />
          </Form.Item>

          <Form.Item name="commission" label="Komisi" rules={[{ required: true, message: "Komisi wajib diisi" }]}>
            <InputNumber placeholder="Masukkan Komisi Affiliator, cth: Rp. 50.000" className="w-full py-2" />
          </Form.Item>

          <Form.Item name="details" label="Detail Produk">
            <Input.TextArea rows={3} placeholder="Masukkan deskripsi produk" />
          </Form.Item>

          <Form.Item name="image" label="File Produk">
            <Upload>
              <Button icon={<UploadOutlined />}>Upload File</Button>
            </Upload>
          </Form.Item>

          <Form.Item name="image" label="Upload Gambar">
            <Upload>
              <Button icon={<UploadOutlined />}>Upload Gambar</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductTable;
