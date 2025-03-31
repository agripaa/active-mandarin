import React, { useState } from "react";
import { Modal, Form, Input, InputNumber, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import styles untuk editor

const CreateProgramModal = ({ isModalOpen, setIsModalOpen, refreshData }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [detailBrand, setDetailBrand] = useState(""); // State untuk WYSIWYG
  const [imageFile, setImageFile] = useState(null);

  const handleFileChange = ({ file }) => {
    setImageFile(file);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
    setDetailBrand(""); // Reset editor saat modal ditutup
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
      formData.append("detail_brand", detailBrand); // Menggunakan state WYSIWYG
      formData.append("link_classroom", values.link_classroom || "");
      formData.append("category_brand", "program");
  
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
      title="Tambah Program Baru"
      open={isModalOpen}
      onCancel={handleCancel}
      onOk={handleSave}
      okText="Tambah Program"
      confirmLoading={loading}
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { backgroundColor: "#FFCC00", border: "none", color: "black", fontWeight: "600", width: "100%", padding: "12px" } }}
    >
      <Form form={form} layout="vertical" encType="multipart/form-data">
        <Form.Item name="variant" label="Nama Program" rules={[{ required: true, message: "Nama program wajib diisi!" }]}>
          <Input placeholder="Masukkan Nama Program" className="w-full py-2" />
        </Form.Item>

        <Form.Item name="turunan" label="Turunan Program" rules={[{ required: true, message: "Turunan program wajib diisi!" }]}>
          <Input placeholder="Masukkan Turunan Program" className="w-full py-2" />
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

        {/* 📝 WYSIWYG Editor untuk Detail Program */}
        <Form.Item label="Detail Program" rules={[{ required: true, message: "Detail program wajib diisi!" }]}>
          <ReactQuill value={detailBrand} onChange={setDetailBrand} theme="snow" />
        </Form.Item>

        <Form.Item name="link_classroom" label="Link Classroom">
          <Input placeholder="Masukkan Link Classroom (Opsional)" className="w-full py-2" />
        </Form.Item>

        <Form.Item name="brand_img" label="Upload Gambar Program" rules={[{ required: true, message: "Gambar program wajib diunggah!" }]}>
          <Upload
            maxCount={1}
            beforeUpload={() => false}
            onChange={handleFileChange} // Tambahkan ini
            listType="picture"
          >
            <Button icon={<UploadOutlined />}>Pilih Gambar</Button>
          </Upload>
        </Form.Item>

      </Form>
    </Modal>
  );
};

export default CreateProgramModal;
