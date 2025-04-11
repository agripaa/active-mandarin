import React, { useState, useEffect } from "react";
import { Modal, Form, Input, InputNumber, Upload, Button, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; 
import { formatRupiah } from "../../../utils/rupiahFormat";

const turunanOptions = [
  { label: "Grow With Us Program", value: "Grow with Us" },
  { label: "Mandarin Premium Program", value: "Premium Mandarin Learning" },
  { label: "General Language Class Program", value: "Kelas HSK" },
  { label: "General Native Class Program", value: "Educonsult S1-S3 Full Cover" },
  { label: "Mentor Scholarship Program", value: "Mentor Scholarship" },
  { label: "Non Degree Program", value: "Non Degree (Kelas Bahasa di China)" },
  { label: "Degree Program", value: "Degree" },
];

const EditProgramModal = ({ isModalOpen, setIsModalOpen, programData, refreshData }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [detailBrand, setDetailBrand] = useState(""); 
  const [imageFile, setImageFile] = useState(null);
  const [fileList, setFileList] = useState([]); 
  const [price, setPrice] = useState("0");
  const [discountPrice, setDiscountPrice] = useState("0");
  const [commission, setCommission] = useState("0");

  useEffect(() => {
    if (programData) {
      setPrice(programData.price?.toString() || "0");
      setDiscountPrice(programData.discount_price?.toString() || "0");
      setCommission(programData.commission?.toString() || "0");
  
      form.setFieldsValue({
        variant: programData.variant || "",
        turunan: programData.turunan || "",
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
    }
  }, [programData, form]);

  const handleFileChange = ({ file }) => {
        const MAX_IMAGE_SIZE = 300 * 1024; // 300 KB
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
    setDetailBrand(""); // Reset editor saat modal ditutup
    setFileList([]);
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
      formData.append("detail_brand", detailBrand); // Menggunakan state WYSIWYG
      formData.append("link_classroom", values.link_classroom || "");
      formData.append("category_brand", "program");

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
    <Modal
      title="Edit Program"
      open={isModalOpen}
      onCancel={handleCancel}
      onOk={handleSave}
      okText="Simpan Perubahan"
      confirmLoading={loading}
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { backgroundColor: "#FFCC00", border: "none", color: "black", fontWeight: "600", width: "100%", padding: "12px" } }}
    >
      <Form form={form} layout="vertical" encType="multipart/form-data">
        <Form.Item name="variant" label="Nama Program" rules={[{ required: true, message: "Nama program wajib diisi!" }]}>
          <Input placeholder="Masukkan Nama Program" className="w-full py-2" />
        </Form.Item>

        {/* Turunan Program sebagai Select Option */}
        <Form.Item name="turunan" label="Turunan Program" rules={[{ required: true, message: "Turunan program wajib diisi!" }]}>
          <Select placeholder="Pilih Turunan Program" className="w-full">
          {turunanOptions.map((option) => (
            <Select.Option key={option.value} value={option.value}>
              {option.label}
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

        {/* 📝 WYSIWYG Editor untuk Detail Program */}
        <Form.Item label="Detail Program">
          <ReactQuill value={detailBrand} onChange={setDetailBrand} theme="snow" />
        </Form.Item>

        <Form.Item name="link_classroom" label="Link Classroom">
          <Input placeholder="Masukkan Link Classroom (Opsional)" className="w-full py-2" />
        </Form.Item>

        <Form.Item name="brand_img" label="Upload Gambar Program (Max 300 KB)">
          <Upload
            maxCount={1}
            beforeUpload={() => false}
            onChange={handleFileChange}
            listType="picture"
            fileList={fileList}
            onRemove={() => setFileList([])} // Hapus gambar jika pengguna ingin mengganti
          >
            <Button icon={<UploadOutlined />}>Pilih Gambar</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditProgramModal;
