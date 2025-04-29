import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Upload, Button, Select, Space } from "antd";
import { UploadOutlined, PlusOutlined, CloseCircleOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { formatRupiah } from "../../../utils/rupiahFormat";

const tipeProduct = ["Digital", "Fisik"];

const EditProductModal = ({ isModalOpen, setIsModalOpen, productData, refreshData }) => {
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
  const [turunanName, setTurunanName] = useState(""); // <-- untuk input manual
  const [selectedTurunan, setSelectedTurunan] = useState(null);
  const [isCustomTurunan, setIsCustomTurunan] = useState(false);
  const [isAddTurunanModalOpen, setIsAddTurunanModalOpen] = useState(false);
  const [newTurunan, setNewTurunan] = useState({ title: "", sub_title: "" });
  const [imagePreview, setImagePreview] = useState([]);
  const [filePreview, setFilePreview] = useState([]);

  console.log({searchTurunan, newTurunan, turunanName })

  const fetchTurunanOptions = async (search = "") => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/turunan-brand`, { params: { search } });
      if (response.data.status) {
        const options = response.data.data.map((item) => ({
          label: item.turunan,
          value: item.id,
        }));
        setTurunanOptions(options);
      }
    } catch (error) {
      console.error("Error fetching turunan:", error);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      fetchTurunanOptions("");
    }
  }, [isModalOpen]);

  useEffect(() => {
    if (productData) {
      setPrice(productData.price?.toString() || "0");
      setDiscountPrice(productData.discount_price?.toString() || "0");
      setCommission(productData.commission?.toString() || "0");
      form.setFieldsValue({
        variant: productData.variant || "",
        type_product: productData.type_product ? productData.type_product.charAt(0).toUpperCase() + productData.type_product.slice(1) : "",
      });
      setProductDetails(productData.detail_brand || "");
      if (productData.brand_img) {
        setImagePreview([{ uid: "-1", name: "brand_img", status: "done", url: `${process.env.REACT_APP_API_IMG}${productData.brand_img}` }]);
      } else {
        setImagePreview([]);
      }
      if (productData.file_product) {
        setFilePreview([{ uid: "-2", name: productData.file_product.split("/").pop(), status: "done", url: `${process.env.REACT_APP_API_IMG}${productData.file_product}` }]);
      } else {
        setFilePreview([]);
      }
      if (productData.turunan_id) {
        setSelectedTurunan({ value: productData.turunan_id, label: productData.turunan });
      } else {
        setIsCustomTurunan(true);
        setSearchTurunan(productData.turunan || "");
      }
    }
  }, [productData, form]);

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();

      formData.append("variant", values.variant);
      formData.append("price", Number(price));
      formData.append("discount_price", Number(discountPrice));
      formData.append("commission", Number(commission));
      formData.append("detail_brand", productDetails);
      formData.append("type_product", values.type_product);
      formData.append("category_brand", "product");

      if (isCustomTurunan) {
        formData.append("turunan", turunanName); // <-- ini untuk select turunan
        formData.append("title", newTurunan.title); // <-- beda!
        formData.append("sub_title", newTurunan.sub_title);
      } else {
        formData.append("turunan_id", selectedTurunan?.value);
      }      

      if (productFile) formData.append("file_product", productFile);
      if (imageFile) formData.append("brand_img", imageFile);

      setLoading(true);
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/brand/${productData.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setLoading(false);

      if (response.data.status) {
        Swal.fire("Sukses!", "Produk berhasil diperbarui!", "success");
        handleCancel();
        refreshData();
        window.location.reload();
      } else {
        Swal.fire("Gagal!", response.data.message, "error");
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      Swal.fire("Error!", "Terjadi kesalahan saat menyimpan data!", "error");
    }
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
    setSearchTurunan("");
    setSelectedTurunan(null);
    setIsCustomTurunan(false);
    setNewTurunan({ title: "", sub_title: "" });
  };

  const handleAddTurunan = () => {
    setIsAddTurunanModalOpen(true);
    setSearchTurunan(searchTurunan)
    setTurunanName(searchTurunan)
    setNewTurunan({ title: "", sub_title: "" });
  };

  const handleSaveTurunan = () => {
    if (!newTurunan.title || !newTurunan.sub_title) {
      Swal.fire("Error!", "Title dan Sub Title tidak boleh kosong!", "error");
      return;
    }
  
    setIsCustomTurunan(true);
    setIsAddTurunanModalOpen(false);
  };
  

  const handleResetTurunan = () => {
    setIsCustomTurunan(false);
    setSearchTurunan("");
    setSelectedTurunan(null);
  };

  return (
    <>
      <Modal title="Edit Produk" open={isModalOpen} onOk={handleSave} onCancel={handleCancel} okText="Simpan Perubahan" confirmLoading={loading}>
        <Form form={form} layout="vertical">
          <Form.Item name="variant" label="Nama Produk" rules={[{ required: true, message: "Nama produk wajib diisi!" }]}>
            <Input placeholder="Masukkan Nama Produk" />
          </Form.Item>

          <Form.Item label="Turunan Produk" required>
            {isCustomTurunan ? (
              <Space style={{ width: "100%" }}>
                <Input
                  placeholder="Masukkan Turunan Baru"
                  value={turunanName}
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
            />
          </Form.Item>

          <Form.Item label="Harga Promo">
            <Input
              value={formatRupiah(discountPrice)}
              onChange={(e) => handleRupiahChange(e.target.value, setDiscountPrice)}
              placeholder="Masukkan Harga Promo"
            />
          </Form.Item>

          <Form.Item label="Komisi" required>
            <Input
              value={formatRupiah(commission)}
              onChange={(e) => handleRupiahChange(e.target.value, setCommission)}
              placeholder="Masukkan Komisi Affiliator"
            />
          </Form.Item>

          <Form.Item label="Detail Produk">
            <ReactQuill value={productDetails} onChange={setProductDetails} theme="snow" />
          </Form.Item>

          <Form.Item name="file_product" label="Upload File Produk (Max 5 MB)">
            <Upload maxCount={1} beforeUpload={() => false} onChange={handleProductFileChange} defaultFileList={filePreview}>
              <Button icon={<UploadOutlined />}>Upload File Produk</Button>
            </Upload>
          </Form.Item>

          <Form.Item name="brand_img" label="Upload Gambar Produk (Max 300 KB)">
            <Upload maxCount={1} beforeUpload={() => false} onChange={handleImageChange} defaultFileList={imagePreview} listType="picture">
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

export default EditProductModal;
