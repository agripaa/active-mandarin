import React, { useState } from "react";
import { Modal, Form, Input, InputNumber, Upload, Button, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const turunanOptions = [
  "Comprehensive Chinese Book",
  "E-Flashcard/HSK",
  "Buku Tulis Hanzi",
  "Buku Panduan",
];

const CreateProductModal = ({ isModalOpen, setIsModalOpen, refreshData }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [productDetails, setProductDetails] = useState(""); // WYSIWYG state
  const [imageFile, setImageFile] = useState(null);
  const [productFile, setProductFile] = useState(null);

  const handleImageChange = ({ file }) => {
    setImageFile(file);
  };

  const handleProductFileChange = ({ file }) => {
    setProductFile(file);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
    setProductDetails(""); 
    setImageFile(null);
    setProductFile(null);
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();

      formData.append("variant", values.variant);
      formData.append("turunan", values.turunan);
      formData.append("price", values.price);
      formData.append("discount_price", values.discount_price || "");
      formData.append("commission", values.commission);
      formData.append("detail_brand", productDetails); // Menggunakan state WYSIWYG
      formData.append("category_brand", "product");

      // 🔹 Cek apakah file produk dan gambar produk ada
      if (productFile) {
        formData.append("file_product", productFile);
      } else {
        Swal.fire("Error!", "File produk wajib diunggah!", "error");
        return;
      }

      if (imageFile) {
        formData.append("brand_img", imageFile);
      } else {
        Swal.fire("Error!", "Gambar produk wajib diunggah!", "error");
        return;
      }

      setLoading(true);
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/brand`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setLoading(false);

      if (response.data.status) {
        Swal.fire("Sukses!", "Produk berhasil ditambahkan!", "success");
        refreshData();
      } else {
        Swal.fire("Gagal!", response.data.message, "error");
      }
    } catch (error) {
      setLoading(false);
      Swal.fire("Error!", "Terjadi kesalahan saat menyimpan data!", "error");
    }
  };

  return (
    <Modal
      title="Tambah Produk Baru"
      open={isModalOpen}
      onOk={handleSave}
      onCancel={handleCancel}
      okText="Tambah Produk"
      confirmLoading={loading}
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{
        style: { backgroundColor: "#FFCC00", border: "none", color: "black", fontWeight: "600", width: "100%", padding: "12px" },
      }}
    >
      <Form form={form} layout="vertical">
        <Form.Item name="variant" label="Nama Produk" rules={[{ required: true, message: "Nama produk wajib diisi!" }]}>
          <Input placeholder="Masukkan Nama Produk" className="py-3" />
        </Form.Item>

        <Form.Item name="turunan" label="Turunan Produk" rules={[{ required: true, message: "Nama produk wajib diisi!" }]}>
          <Select placeholder="Pilih Turunan Product" className="w-full">
            {turunanOptions.map((option) => (
              <Select.Option key={option} value={option}>
                {option}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="price" label="Harga Normal" rules={[{ required: true, message: "Harga normal wajib diisi!" }]}>
          <InputNumber placeholder="Masukkan Harga Normal, cth: Rp. 50.000" className="w-full py-2" />
        </Form.Item>

        <Form.Item name="discount_price" label="Harga Promo">
          <InputNumber placeholder="Masukkan Harga Promo (opsional)" className="w-full py-2" />
        </Form.Item>

        <Form.Item name="commission" label="Komisi" rules={[{ required: true, message: "Komisi wajib diisi!" }]}>
          <InputNumber placeholder="Masukkan Komisi Affiliator, cth: Rp. 50.000" className="w-full py-2" />
        </Form.Item>

        {/* WYSIWYG Editor untuk Detail Produk */}
        <Form.Item label="Detail Produk">
          <ReactQuill value={productDetails} onChange={setProductDetails} theme="snow" />
        </Form.Item>

        {/* 🔹 Upload File Produk */}
        <Form.Item name="file_product" label="Upload File Produk" rules={[{ required: true, message: "File produk wajib diunggah!" }]}>
          <Upload maxCount={1} beforeUpload={() => false} onChange={handleProductFileChange}>
            <Button icon={<UploadOutlined />}>Upload File Produk</Button>
          </Upload>
        </Form.Item>

        {/* 🔹 Upload Gambar Produk */}
        <Form.Item name="image" label="Upload Gambar Produk" rules={[{ required: true, message: "Gambar produk wajib diunggah!" }]}>
          <Upload maxCount={1} beforeUpload={() => false} onChange={handleImageChange} listType="picture">
            <Button icon={<UploadOutlined />}>Pilih Gambar</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateProductModal;
