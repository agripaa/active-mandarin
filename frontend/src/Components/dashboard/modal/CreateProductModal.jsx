import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Upload, Button, Select, Space } from "antd";
import { UploadOutlined, PlusOutlined, CloseCircleOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { formatRupiah } from "../../../utils/rupiahFormat";

const tipeProduct = ["Digital", "Fisik"];

const CreateProductModal = ({ isModalOpen, setIsModalOpen, refreshData }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [productDetails, setProductDetails] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [productFile, setProductFile] = useState(null);
  const [price, setPrice] = useState("0");
  const [discountPrice, setDiscountPrice] = useState("0");
  const [commission, setCommission] = useState("0");
  const [turunanOptions, setTurunanOptions] = useState([]);
  const [searchTurunan, setSearchTurunan] = useState("");
  const [selectedTurunan, setSelectedTurunan] = useState(null);
  const [isCustomTurunan, setIsCustomTurunan] = useState(false);
  const [isAddTurunanModalOpen, setIsAddTurunanModalOpen] = useState(false);
  const [newTurunan, setNewTurunan] = useState({ title: "", sub_title: "" });

  useEffect(() => {
    if (isModalOpen) fetchTurunanOptions("");
  }, [isModalOpen]);

  const fetchTurunanOptions = async (search = "") => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/turunan-brand/`, {
        params: { search },
      });
  
      if (response.data.status) {
        const options = response.data.data.map((item) => ({
          label: item.turunan, // label = turunan
          value: item.id,       // value = id
        }));
        setTurunanOptions(options);
      }
    } catch (error) {
      console.error("Error fetching turunan:", error);
    }
  };
  

  const handleSave = async () => {
    setLoading(true);
    try {
      const values = await form.validateFields();
      const formData = new FormData();

      formData.append("variant", values.variant);
      formData.append("price", Number(price));
      formData.append("discount_price", Number(discountPrice) || "");
      formData.append("commission", Number(commission));
      formData.append("detail_brand", productDetails);
      formData.append("category_brand", "product");
      formData.append("type_product", values.type_product);

      if (isCustomTurunan) {
        formData.append("title", newTurunan.title);
        formData.append("sub_title", newTurunan.sub_title);
        formData.append("turunan", searchTurunan);
      } else {
        formData.append("turunan_id", selectedTurunan?.value);
      }

      if (productFile) formData.append("file_product", productFile);
      if (imageFile) formData.append("brand_img", imageFile);
      else {
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
      console.error(error);
      Swal.fire("Error!", "Terjadi kesalahan saat menyimpan data!", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleRupiahChange = (value, setter) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    setter(numericValue);
  };

  const handleImageChange = ({ file }) => {
    if (file.size > 300 * 1024) {
      Swal.fire("Ukuran Gambar Terlalu Besar", "Gambar maksimum 300KB.", "error");
      return;
    }
    setImageFile(file);
  };

  const handleProductFileChange = ({ file }) => {
    if (file.size > 5 * 1024 * 1024) {
      Swal.fire("Ukuran File Produk Terlalu Besar", "File maksimum 5MB.", "error");
      return;
    }
    setProductFile(file);
  };

  const handleAddTurunan = () => {
    setIsCustomTurunan(true);
    setIsAddTurunanModalOpen(true);
    setNewTurunan({ title: "", sub_title: "" });
  };

  const handleSaveTurunan = () => {
    if (!newTurunan.title || !newTurunan.sub_title) {
      Swal.fire("Error!", "Title dan Sub Title tidak boleh kosong!", "error");
      return;
    }
    setIsAddTurunanModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
    setProductDetails("");
    setImageFile(null);
    setProductFile(null);
    setNewTurunan({ title: "", sub_title: "" });
    setSelectedTurunan(null);
    setSearchTurunan("");
    setIsCustomTurunan(false);
  };

  const handleResetTurunan = () => {
    setIsCustomTurunan(false);
    setSelectedTurunan(null);
    setSearchTurunan("");
  };

  return (
    <>
      <Modal title="Tambah Produk Baru" open={isModalOpen} onOk={handleSave} onCancel={handleCancel} okText="Tambah Produk" confirmLoading={loading}>
        <Form form={form} layout="vertical">
          <Form.Item name="variant" label="Nama Produk" rules={[{ required: true, message: "Nama produk wajib diisi!" }]}>
            <Input placeholder="Masukkan Nama Produk" />
          </Form.Item>

          <Form.Item label="Turunan Produk" required>
            {isCustomTurunan ? (
              <Space style={{ width: "100%" }}>
                <Input
                  placeholder="Masukkan Turunan Baru"
                  value={searchTurunan}
                  onChange={(e) => setSearchTurunan(e.target.value)}
                />
                <Button icon={<CloseCircleOutlined />} onClick={handleResetTurunan} />
              </Space>
            ) : (
              <Select
                showSearch
                labelInValue
                placeholder="Pilih Turunan Product"
                options={turunanOptions}
                onSearch={(value) => {
                  setSearchTurunan(value);
                  fetchTurunanOptions(value);
                }}
                onChange={(option) => {
                  setSelectedTurunan(option);
                  setIsCustomTurunan(false);
                }}
                filterOption={false}
                value={selectedTurunan}
                notFoundContent={searchTurunan ? (
                  <Button icon={<PlusOutlined />} onClick={handleAddTurunan}>
                    Tambahkan Turunan "{searchTurunan}"
                  </Button>
                ) : null}
              />
            )}
          </Form.Item>

          <Form.Item name="type_product" label="Tipe Produk" rules={[{ required: true, message: "Tipe Produk wajib diisi!" }]}>
            <Select placeholder="Pilih Tipe Produk">
              {tipeProduct.map((option) => (
                <Select.Option key={option} value={option}>{option}</Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Harga Normal" required>
            <Input value={formatRupiah(price)} onChange={(e) => handleRupiahChange(e.target.value, setPrice)} placeholder="Masukkan Harga Normal" />
          </Form.Item>

          <Form.Item label="Harga Promo">
            <Input value={formatRupiah(discountPrice)} onChange={(e) => handleRupiahChange(e.target.value, setDiscountPrice)} placeholder="Masukkan Harga Promo (Opsional)" />
          </Form.Item>

          <Form.Item label="Komisi" required>
            <Input value={formatRupiah(commission)} onChange={(e) => handleRupiahChange(e.target.value, setCommission)} placeholder="Masukkan Komisi Affiliator" />
          </Form.Item>

          <Form.Item label="Detail Produk">
            <ReactQuill value={productDetails} onChange={setProductDetails} theme="snow" />
          </Form.Item>

          <Form.Item name="file_product" label="Upload File Produk (Max 5 MB)">
            <Upload maxCount={1} beforeUpload={() => false} onChange={handleProductFileChange}>
              <Button icon={<UploadOutlined />}>Upload File Produk</Button>
            </Upload>
          </Form.Item>

          <Form.Item name="image" label="Upload Gambar Produk (Max 300 KB)" rules={[{ required: true, message: "Gambar produk wajib diunggah!" }]}>
            <Upload maxCount={1} beforeUpload={() => false} onChange={handleImageChange} listType="picture">
              <Button icon={<UploadOutlined />}>Pilih Gambar</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>

      <Modal title="Tambah Turunan Baru" open={isAddTurunanModalOpen} onOk={handleSaveTurunan} onCancel={() => setIsAddTurunanModalOpen(false)} okText="Simpan" cancelText="Batal">
        <Form layout="vertical">
          <Form.Item label="Title" required>
            <Input value={newTurunan.title} onChange={(e) => setNewTurunan(prev => ({ ...prev, title: e.target.value }))} placeholder="Masukkan Title Turunan" />
          </Form.Item>
          <Form.Item label="Sub Title" required>
            <Input value={newTurunan.sub_title} onChange={(e) => setNewTurunan(prev => ({ ...prev, sub_title: e.target.value }))} placeholder="Masukkan Sub Title" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateProductModal;
