import React, { useState, useEffect } from "react";
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

const EditProductModal = ({ isModalOpen, setIsModalOpen, productData, refreshData }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [productDetails, setProductDetails] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [productFile, setProductFile] = useState(null);
  const [price, setPrice] = useState("0");
  const [discountPrice, setDiscountPrice] = useState("0");
  const [commission, setCommission] = useState("0");
  
  const [imagePreview, setImagePreview] = useState([]);
  const [filePreview, setFilePreview] = useState([]);

  useEffect(() => {
    if (productData) {
      setPrice(productData.price?.toString() || "0");
      setDiscountPrice(productData.discount_price?.toString() || "0");
      setCommission(productData.commission?.toString() || "0");
  
      form.setFieldsValue({
        variant: productData.variant || "",
        turunan: productData.turunan || "",
        link_classroom: productData.link_classroom || "",
      });

      setProductDetails(productData.detail_brand || "");

      // 🔹 Jika ada gambar, tampilkan preview
      if (productData.brand_img) {
        setImagePreview([
          {
            uid: "-1",
            name: "brand_img",
            status: "done",
            url: `${process.env.REACT_APP_API_IMG}${productData.brand_img}`,
          },
        ]);
      } else {
        setImagePreview([]);
      }

      // 🔹 Jika ada file produk, tampilkan preview
      if (productData.file_product) {
        setFilePreview([
          {
            uid: "-2",
            name: productData.file_product.split("/").pop(), // Ambil nama file
            status: "done",
            url: `${process.env.REACT_APP_API_IMG}${productData.file_product}`,
          },
        ]);
      } else {
        setFilePreview([]);
      }
    }
  }, [productData, form]);

  const handleImageChange = ({ file }) => {
    setImageFile(file);
  };

  const handleRupiahChange = (value, setter) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    setter(numericValue);
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
      formData.append("price", Number(price));
      formData.append("discount_price", Number(discountPrice));
      formData.append("commission", Number(commission));
      formData.append("detail_brand", productDetails);

      if (productFile) {
        formData.append("file_product", productFile);
      }

      if (imageFile) {
        formData.append("brand_img", imageFile);
      }

      setLoading(true);
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/brand/${productData.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setLoading(false);

      if (response.data.status) {
        Swal.fire("Sukses!", "Produk berhasil diperbarui!", "success");
        handleCancel();
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
      title="Edit Produk"
      open={isModalOpen}
      onCancel={handleCancel}
      onOk={handleSave}
      okText="Simpan Perubahan"
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
            placeholder="Masukkan Harga Normal"
            className="w-full py-2"
          />
        </Form.Item>

        <Form.Item label="Harga Promo">
          <Input
            value={formatRupiah(discountPrice)}
            onChange={(e) => handleRupiahChange(e.target.value, setDiscountPrice)}
            placeholder="Masukkan Harga Promo (Opsional)"
            className="w-full py-2"
          />
        </Form.Item>

        <Form.Item label="Komisi" required>
          <Input
            value={formatRupiah(commission)}
            onChange={(e) => handleRupiahChange(e.target.value, setCommission)}
            placeholder="Masukkan Komisi Affiliator"
            className="w-full py-2"
          />
        </Form.Item>

        {/* WYSIWYG Editor untuk Detail Produk */}
        <Form.Item label="Detail Produk">
          <ReactQuill value={productDetails} onChange={setProductDetails} theme="snow" />
        </Form.Item>

        {/* 🔹 Upload File Produk dengan Preview */}
        <Form.Item name="file_product" label="Upload File Produk">
          <Upload
            maxCount={1}
            beforeUpload={() => false}
            onChange={handleProductFileChange}
            defaultFileList={filePreview}
          >
            <Button icon={<UploadOutlined />}>Upload File Produk</Button>
          </Upload>
        </Form.Item>

        {/* 🔹 Upload Gambar Produk dengan Preview */}
        <Form.Item name="brand_img" label="Upload Gambar Produk">
          <Upload
            maxCount={1}
            beforeUpload={() => false}
            onChange={handleImageChange}
            defaultFileList={imagePreview}
            listType="picture"
          >
            <Button icon={<UploadOutlined />}>Pilih Gambar</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditProductModal;
