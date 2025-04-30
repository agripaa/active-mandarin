import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Upload, Button, Select, Space } from "antd";
import { UploadOutlined, PlusOutlined, CloseCircleOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { formatRupiah } from "../../../utils/rupiahFormat";

const CreateProgramModal = ({ isModalOpen, setIsModalOpen, refreshData }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [detailBrand, setDetailBrand] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [price, setPrice] = useState("0");
  const [discountPrice, setDiscountPrice] = useState("0");
  const [commission, setCommission] = useState("0");

  // Turunan handling
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
        params: { search, category_brand: "program" },
      });

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

  const handleFileChange = ({ file }) => {
    const MAX_IMAGE_SIZE = 300 * 1024;
    if (file.size > MAX_IMAGE_SIZE) {
      Swal.fire("Ukuran Gambar Terlalu Besar", "Gambar maksimum 300KB.", "error");
      return;
    }
    setImageFile(file);
  };

  const handleRupiahChange = (value, setter) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    setter(numericValue);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
    setDetailBrand("");
    setImageFile(null);
    setSearchTurunan("");
    setSelectedTurunan(null);
    setIsCustomTurunan(false);
    setNewTurunan({ title: "", sub_title: "" });
  };

  const handleAddTurunan = () => {
    setIsAddTurunanModalOpen(true);
    setNewTurunan({ title: "", sub_title: "" });
  };

  const handleSaveTurunan = () => {
    if (!newTurunan.title || !newTurunan.sub_title) {
      Swal.fire("Error!", "Title dan Sub Title tidak boleh kosong!", "error");
      return;
    }
    setSearchTurunan(newTurunan.title);
    setIsCustomTurunan(true);
    setIsAddTurunanModalOpen(false);
  };

  const handleResetTurunan = () => {
    setIsCustomTurunan(false);
    setSearchTurunan("");
    setSelectedTurunan(null);
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();

      formData.append("variant", values.variant);
      formData.append("price", Number(price));
      formData.append("discount_price", Number(discountPrice) || "");
      formData.append("commission", Number(commission));
      formData.append("detail_brand", detailBrand);
      formData.append("link_classroom", values.link_classroom || "");
      formData.append("category_brand", "program");

      if (isCustomTurunan) {
        formData.append("turunan", searchTurunan);
        formData.append("title", newTurunan.title);
        formData.append("sub_title", newTurunan.sub_title);
      } else {
        formData.append("turunan_id", selectedTurunan?.value);
      }

      if (imageFile) {
        formData.append("brand_img", imageFile);
      } else {
        Swal.fire("Error!", "Gambar program wajib diunggah!", "error");
        return;
      }

      setLoading(true);

      const response = await axios.post(`${process.env.REACT_APP_API_URL}/brand`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setLoading(false);

      if (response.data.status) {
        Swal.fire("Sukses!", "Program berhasil ditambahkan!", "success");
        handleCancel();
        refreshData();
        window.location.reload();
      } else {
        Swal.fire("Gagal!", response.data.message, "error");
      }
    } catch (error) {
      setLoading(false);
      Swal.fire("Error!", "Terjadi kesalahan saat menyimpan data!", "error");
    }
  };

  return (
    <>
      <Modal
        title="Tambah Program Baru"
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={handleSave}
        okText="Tambah Program"
        confirmLoading={loading}
      >
        <Form form={form} layout="vertical" encType="multipart/form-data">
          <Form.Item name="variant" label="Nama Program" rules={[{ required: true, message: "Nama program wajib diisi!" }]}>
            <Input placeholder="Masukkan Nama Program" />
          </Form.Item>

          <Form.Item label="Turunan Program" required>
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
                placeholder="Pilih Turunan Program"
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

          <Form.Item label="Harga Normal" required>
            <Input value={formatRupiah(price)} onChange={(e) => handleRupiahChange(e.target.value, setPrice)} placeholder="Masukkan Harga Normal" />
          </Form.Item>

          <Form.Item label="Harga Promo">
            <Input value={formatRupiah(discountPrice)} onChange={(e) => handleRupiahChange(e.target.value, setDiscountPrice)} placeholder="Masukkan Harga Promo (Opsional)" />
          </Form.Item>

          <Form.Item label="Komisi" required>
            <Input value={formatRupiah(commission)} onChange={(e) => handleRupiahChange(e.target.value, setCommission)} placeholder="Masukkan Komisi Affiliator" />
          </Form.Item>

          <Form.Item label="Detail Program" required>
            <ReactQuill value={detailBrand} onChange={setDetailBrand} theme="snow" />
          </Form.Item>

          <Form.Item name="link_classroom" label="Link Classroom">
            <Input placeholder="Masukkan Link Classroom (Opsional)" />
          </Form.Item>

          <Form.Item name="brand_img" label="Upload Gambar Program (Max 300 KB)" rules={[{ required: true, message: "Gambar wajib diunggah!" }]}>
            <Upload
              maxCount={1}
              beforeUpload={() => false}
              onChange={handleFileChange}
              listType="picture"
            >
              <Button icon={<UploadOutlined />}>Pilih Gambar</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal Tambah Turunan */}
      <Modal
        title="Tambah Turunan Baru"
        open={isAddTurunanModalOpen}
        onOk={handleSaveTurunan}
        onCancel={() => setIsAddTurunanModalOpen(false)}
        okText="Simpan"
        cancelText="Batal"
      >
        <Form layout="vertical">
          <Form.Item label="Title Turunan" required>
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

export default CreateProgramModal;
