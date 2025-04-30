import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Upload, Button, Select, Space } from "antd";
import { UploadOutlined, PlusOutlined, CloseCircleOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { formatRupiah } from "../../../utils/rupiahFormat";

const EditProgramModal = ({ isModalOpen, setIsModalOpen, programData, refreshData }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [detailBrand, setDetailBrand] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [price, setPrice] = useState("0");
  const [discountPrice, setDiscountPrice] = useState("0");
  const [commission, setCommission] = useState("0");

  // Turunan handling
  const [turunanOptions, setTurunanOptions] = useState([]);
  const [searchTurunan, setSearchTurunan] = useState("");
  const [turunanName, setTurunanName] = useState("");
  const [selectedTurunan, setSelectedTurunan] = useState(null);
  const [isCustomTurunan, setIsCustomTurunan] = useState(false);
  const [isAddTurunanModalOpen, setIsAddTurunanModalOpen] = useState(false);
  const [newTurunan, setNewTurunan] = useState({ title: "", sub_title: "" });

  useEffect(() => {
    if (isModalOpen) {
      fetchTurunanOptions("");
    }
  }, [isModalOpen]);

  useEffect(() => {
    if (programData) {
      setPrice(programData.price?.toString() || "0");
      setDiscountPrice(programData.discount_price?.toString() || "0");
      setCommission(programData.commission?.toString() || "0");

      form.setFieldsValue({
        variant: programData.variant || "",
        link_classroom: programData.link_classroom || "",
      });

      setDetailBrand(programData.detail_brand || "");

      if (programData.brand_img) {
        setFileList([
          {
            uid: "-1",
            name: "Gambar Program",
            status: "done",
            url: `${process.env.REACT_APP_API_IMG}${programData.brand_img}`,
          },
        ]);
      } else {
        setFileList([]);
      }

      if (programData.turunan_id) {
        setSelectedTurunan({ value: programData.turunan_id, label: programData.turunan });
      } else {
        setIsCustomTurunan(true);
        setSearchTurunan(programData.turunan || "");
      }
    }
  }, [programData, form]);

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

  const handleAddTurunan = () => {
    setIsAddTurunanModalOpen(true);
    setTurunanName(searchTurunan);
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
    setSelectedTurunan(null);
    setSearchTurunan("");
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
    setFileList([]);
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
      }

      setLoading(true);

      const response = await axios.put(`${process.env.REACT_APP_API_URL}/brand/${programData.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setLoading(false);

      if (response.data.status) {
        Swal.fire("Sukses!", "Program berhasil diperbarui!", "success");
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
        title="Edit Program"
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={handleSave}
        okText="Simpan Perubahan"
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

          <Form.Item label="Detail Program">
            <ReactQuill value={detailBrand} onChange={setDetailBrand} theme="snow" />
          </Form.Item>

          <Form.Item name="link_classroom" label="Link Classroom">
            <Input placeholder="Masukkan Link Classroom (Opsional)" />
          </Form.Item>

          <Form.Item name="brand_img" label="Upload Gambar Program (Max 300 KB)">
            <Upload
              maxCount={1}
              beforeUpload={() => false}
              onChange={handleFileChange}
              listType="picture"
              fileList={fileList}
              onRemove={() => setFileList([])}
            >
              <Button icon={<UploadOutlined />}>Pilih Gambar</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal Tambah Turunan Baru */}
      <Modal
        title="Tambah Turunan Baru"
        open={isAddTurunanModalOpen}
        onOk={handleSaveTurunan}
        onCancel={() => setIsAddTurunanModalOpen(false)}
        okText="Simpan"
        cancelText="Batal"
      >
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

export default EditProgramModal;
