import React, { useState } from "react";
import { Modal, Form, Input, InputNumber, Upload, Button, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { formatRupiah } from "../../../utils/rupiahFormat";

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
  const [price, setPrice] = useState("0");
  const [discountPrice, setDiscountPrice] = useState("0");
  const [commission, setCommission] = useState("0");

  const handleImageChange = ({ file }) => {
    const MAX_IMAGE_SIZE = 300 * 1024; // 300 KB
    if (file.size > MAX_IMAGE_SIZE) {
      Swal.fire("Ukuran Gambar Terlalu Besar", "Gambar maksimum 300KB.", "error");
      return;
    }
    setImageFile(file);
  };

  const handleProductFileChange = ({ file }) => {
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
    if (file.size > MAX_FILE_SIZE) {
      Swal.fire("Ukuran File Produk Terlalu Besar", "File maksimum 5MB.", "error");
      return;
    }
    setProductFile(file);
  };
  

  const handleRupiahChange = (value, setter) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    setter(numericValue);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
    setProductDetails(""); 
    setImageFile(null);
    setProductFile(null);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const values = await form.validateFields();
      const formData = new FormData();

      formData.append("variant", values.variant);
      formData.append("turunan", values.turunan);
      formData.append("price", Number(price));
      formData.append("discount_price", Number(discountPrice) || "");
      formData.append("commission", Number(commission));      
      formData.append("detail_brand", productDetails); // Menggunakan state WYSIWYG
      formData.append("category_brand", "product");

      // 🔹 Cek apakah file produk dan gambar produk ada
      if (productFile) {
        formData.append("file_product", productFile);
      }

      if (imageFile) {
        formData.append("brand_img", imageFile);
      } else {
        Swal.fire("Error!", "Gambar produk wajib diunggah!", "error");
        return;
      }
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/brand`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.status) {
        Swal.fire("Sukses!", "Produk berhasil ditambahkan!", "success");
        refreshData();
        handleCancel(); 
        window.location.reload();
      } else {
        Swal.fire("Gagal!", response.data.message, "error");
      }
    } catch (error) {
      setLoading(false);
    
      Swal.fire("Error!", "Terjadi kesalahan saat menyimpan data! Harap Perhatikan Size File Data (Max 5MB)", "error");
    } finally{
      setLoading(false);
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

        <Form.Item label="Harga Normal" required>
          <Input
            value={formatRupiah(price)}
            onChange={(e) => handleRupiahChange(e.target.value, setPrice)}
            className="w-full py-2"
            placeholder="Masukkan Harga Normal"
          />
        </Form.Item>

        <Form.Item label="Harga Promo">
          <Input
            value={formatRupiah(discountPrice)}
            onChange={(e) => handleRupiahChange(e.target.value, setDiscountPrice)}
            className="w-full py-2"
            placeholder="Masukkan Harga Promo (Opsional)"
          />
        </Form.Item>

        <Form.Item label="Komisi" required>
          <Input
            value={formatRupiah(commission)}
            onChange={(e) => handleRupiahChange(e.target.value, setCommission)}
            className="w-full py-2"
            placeholder="Masukkan Komisi Affiliator"
          />
        </Form.Item>

        {/* WYSIWYG Editor untuk Detail Produk */}
        <Form.Item label="Detail Produk">
          <ReactQuill value={productDetails} onChange={setProductDetails} theme="snow" />
        </Form.Item>

        {/* 🔹 Upload File Produk */}
        <Form.Item name="file_product" label="Upload File Produk (Max 5 MB)" rules={[{ required: false, message: "File produk wajib diunggah!" }]}>
          <Upload maxCount={1} beforeUpload={() => false} onChange={handleProductFileChange}>
            <Button icon={<UploadOutlined />}>Upload File Produk</Button>
          </Upload>
        </Form.Item>

        {/* 🔹 Upload Gambar Produk */}
        <Form.Item name="image" label="Upload Gambar Produk (Max 300 KB)" rules={[{ required: true, message: "Gambar produk wajib diunggah!" }]}>
          <Upload maxCount={1} beforeUpload={() => false} onChange={handleImageChange} listType="picture">
            <Button icon={<UploadOutlined />}>Pilih Gambar</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateProductModal;
