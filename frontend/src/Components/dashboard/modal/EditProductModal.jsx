import React, { useState, useEffect } from "react";
import { Modal, Form, Input, InputNumber, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; 

const EditProductModal = ({ isModalOpen, setIsModalOpen, productData, refreshData }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [productDetails, setProductDetails] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [productFile, setProductFile] = useState(null);
  
  // 🔹 Menyimpan URL untuk preview file
  const [imagePreview, setImagePreview] = useState([]);
  const [filePreview, setFilePreview] = useState([]);

  useEffect(() => {
    if (productData) {
      form.setFieldsValue({
        variant: productData.variant,
        turunan: productData.turunan,
        price: productData.price,
        discount_price: productData.discount_price,
        commission: productData.commission,
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
      formData.append("discount_price", values.discount_price);
      formData.append("commission", values.commission);
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
          <Input placeholder="Masukkan Turunan Produk" className="py-3" />
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
