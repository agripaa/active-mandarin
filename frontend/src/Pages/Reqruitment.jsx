import React, { useState, useEffect, useMemo } from "react";
import Mainlayouts from "../Layouts/MainLayouts";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import { Button, Checkbox, Form, Input, InputNumber, Radio, Rate, Select, Spin, Upload } from "antd";
import { getBrandCategoryTurunan } from "../api/brand";
import { formatRupiah } from "../utils/rupiahFormat";
import { RiCheckboxCircleFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import Swal from "sweetalert2";

const Reqruitment = () => {
  const { _, langs } = useSelector((state) => state.LangReducer);

  const heroPoints = useMemo(() => {
    return langs ? [
      "Personal Development",
      "Fresh Money",
      "Networking",
      "Career Development",
    ] : [
      "Pengembangan Diri",
      "Uang Saku",
      "Jaringan",
      "Pengembangan Karir",
    ]
  }, [langs]);

  return (
    <Mainlayouts className="bg-background" footerClassName="bg-background">
      <div className="container flex flex-col mx-auto px-5 py-5 gap-16 md:px-[72px] md:py-16 lg:flex-row">
        <div className="w-full lg:w-[57%]">
          <div className="flex flex-col">
            <h1 className="text-fiord-950 text-2xl font-semibold md:text-[32px]">
              {langs
                ? "Join Our Team & Grow Together"
                : "Bergabunglah Bersama Kami & Berkembang Bersama"}
            </h1>
            <p className="text-[#2B313B] mt-4 text-sm md:text-base">
              {langs
                ? "Hi, Active Mandarin Friends!"
                : "Hai, Sobat Active Mandarin!"}
              <br />
              <br />
              {langs
                ? "Do you have a passion for education and want to grow in a dynamic environment? 🚀 Active Mandarin Career is an opportunity for you to join our team and contribute to the world of Mandarin language education."
                : "Punya passion di dunia edukasi dan ingin berkembang di lingkungan yang dinamis? 🚀 Active Mandarin Career adalah kesempatan buat kamu yang ingin bergabung dengan tim kami dan berkontribusi dalam dunia pendidikan bahasa Mandarin."}
              <br />
              <br />
              {langs
                ? "#GrowWithActiveMandarin #CareerOpportunities"
                : "#GrowWithActiveMandarin #CareerOpportunities"}
            </p>
          </div>
          <div className="mt-8">
            <h2 className="text-lg font-semibold md:text-xl">
              {langs
                ? "Why Become Our Team?"
                : "Mengapa Bergabung Bersama Kami?"}
            </h2>
            <div className="flex flex-col mt-4 gap-4">
              {heroPoints.map((point, index) => (
                <div key={index} className="flex items-center gap-2">
                  <RiCheckboxCircleFill color='#57D163' className='w-5 h-5 min-w-5 min-h-5' />
                  <p className="text-fiord-950 text-sm">{point}</p>
                </div>
              ))}
            </div>
          </div>
          <div className='flex items-center justify-center mt-8 gap-4 md:justify-start'>
            <a href='#Apply'>
              <button
                className="px-6 py-3 md:px-8 md:py-4 w-fit bg-[#FFCC00] tracking-wide mt-2 text-xs text-[#252525] font-semibold rounded-3xl transition-all duration-300 hover:bg-yellow-500 hover:text-black sm:text-sm lg:text-base"
              >
                {langs ? "Apply Now" : "Daftar Sekarang"}
              </button>
            </a>
            <Link to='#'>
              <button
                className="px-6 py-3 md:px-8 md:py-4 w-fit border-2 border-[#8493AC] tracking-wide mt-2 text-xs text-[#252525] font-semibold rounded-3xl transition-all duration-300 hover:bg-yellow-500 hover:text-black sm:text-sm lg:text-base"
              >
                {langs ? "How It Works" : "Cara Kerjanya"}
              </button>
            </Link>
          </div>
        </div>
        <img
          src="/assets/donation-hero.png"
          alt="hero"
          className="w-full h-fit lg:w-[43%]"
        />
      </div>
      <div className="container flex flex-col mx-auto px-5 py-5 md:px-[72px] md:py-16">
        <div className="flex flex-col">
          <h1 className="text-fiord-950 text-2xl font-semibold leading-10 md:text-[32px]">
            {langs
              ? "Join Our Team in 3 Simple Steps!"
              : "Bergabunglah Bersama Kami dalam 3 Langkah Mudah!"}
          </h1>
          <p className="text-fiord-600">
            {langs
              ? "Apply, Get Selected, and Start Your Career! 🚀"
              : "Gabung, Diterima, dan Mulai Karir Anda! 🚀"}
          </p>
        </div>
        <div className="mt-8 w-full rounded-3xl h-96 bg-[#D9D9D9]" />
      </div>
      <div className="w-full bg-fiord-50 rounded-[32px]">
        <div className="container flex flex-col mx-auto px-5 py-5 md:px-[72px] md:py-16">
          <div className="flex flex-col">
            <h1 className="text-fiord-950 text-2xl font-semibold leading-10 md:text-[32px]">
              {langs
                ? "Apply Now"
                : "Daftar Sekarang"}
            </h1>
            <p className="text-fiord-600">
              {langs
                ? "Take the First Step Toward Your Future!"
                : "Ambil Langkah Pertama Menuju Masa Depan Anda!"}
            </p>
          </div>
          <div className="mt-8" id="Apply">
            <AffiliateForm />
          </div>
        </div>
      </div>
    </Mainlayouts>
  );
};

const AffiliateForm = () => {
  const { _, langs } = useSelector((state) => state.LangReducer);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [cvFile, setCvFile] = useState(null);

  const position_options = useMemo(() => {
    return [
      { value: "Product Development Officer", label: 'Product Development Officer' },
      { value: "Project Officer", label: 'Project Officer' },
      { value: "Education Consultant Officer", label: 'Education Consultant Officer' },
      { value: "Finance Officer", label: 'Finance Officer' },
      { value: "Mandarin Translator", label: 'Mandarin Translator' },
      { value: "Mandarin Tutor", label: 'Mandarin Tutor' },
      { value: "Mandarin Interpreter", label: 'Mandarin Interpreter' },
    ]
  }, []);

  const handleCvFileChange = ({ file }) => {
    setCvFile(file);
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();

      formData.append("nama", values.nama);
      formData.append("email", values.email);
      formData.append("telepon", values.telepon);
      formData.append("domisili", values.domisili);
      formData.append("posisi", values.posisi);
      formData.append("portofolio", values.portofolio);

      if (cvFile) {
        formData.append("cv_file", cvFile);
      } else {
        Swal.fire("Error!", "CV/Resume is required!", "error");
        return;
      }

      setLoading(true);
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/recruitment`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setLoading(false);

      if (response.data.status) {
        Swal.fire("Sukses!", "Pendaftaran berhasil!", "success").then(() => {
          window.location.href = "/";
        });
      } else {
        Swal.fire("Gagal!", response.data.error, "error");
      }
    } catch (error) {
      setLoading(false);
      Swal.fire("Error!", error?.response?.data?.error ?? "Terjadi kesalahan saat menyimpan data!", "error");
    }
  };

  return (
    <Form form={form} layout="vertical" encType="multipart/form-data" className="max-w-[745px] mr-auto">
      <Form.Item name="nama" label={langs ? "Name" : "Nama"} rules={[{ required: true, message: langs ? "Name is required!" : "Nama wajib diisi!" }]} labelCol={{ className: "font-medium" }}>
        <Input placeholder="Mohammed Hussein" className="py-3" />
      </Form.Item>

      <Form.Item name="email" label="Email" rules={[{ required: true, message: langs ? "Email is required!" : "Email wajib diisi!" }]} labelCol={{ className: "font-medium" }}>
        <Input placeholder="nancy.brooks@gmail.com" className="py-3" />
      </Form.Item>

      <Form.Item name="telepon" label={langs ? "Phone Number" : "No Telpon"} rules={[{ required: true, message: langs ? "Phone Number is required!" : "No Telpon wajib diisi!" }]} labelCol={{ className: "font-medium" }}>
        <Input placeholder="+62 (648) 958-7603" className="w-full py-2" />
      </Form.Item>

      <Form.Item name="domisili" label={langs ? "Domicile" : "Domisili" } rules={[{ required: true, message: langs ? "Domisili is required!" : "Domisili wajib diisi!" }]} labelCol={{ className: "font-medium" }}>
        <Input.TextArea className="py-3" />
      </Form.Item>

      <Form.Item name="posisi" label={langs ? "Job Position Applied for" : "Posisi Pekerjaan Yang Dilamar"} rules={[{ required: true, message: langs ? "Job Position Applied for is required!" : "Posisi Pekerjaan Yang Dilamar wajib diisi!" }]} labelCol={{ className: "font-medium" }}>
        <Radio.Group
          className="flex flex-col gap-3.5"
          options={position_options}
          onChange={(props) => console.log(props)}
        />
      </Form.Item>

      <Form.Item name="portfolio" label={langs ? "Portfolio/Certification (If Any)": "Portofolio/Sertifikasi (Jika Ada)"} rules={[{ required: false }]} labelCol={{ className: "font-medium" }}>
        <Input className="py-3" />
      </Form.Item>

      <Form.Item name="cv_file" label={langs ? "Upload CV/Resume" : "Unggah CV/Resume"} rules={[{ required: true, message: "CV/Resume is required!" }]} labelCol={{ className: "font-medium" }}>
        <Upload
          maxCount={1}
          beforeUpload={() => false}
          onChange={handleCvFileChange}
        >
          <Button icon={<UploadOutlined />}>Upload File</Button>
        </Upload>
      </Form.Item>

      <button
        type="submit"
        onClick={handleSave}
        disabled={loading}
        className="px-6 py-3 md:px-8 md:py-4 w-full bg-[#FFCC00] tracking-wide mt-2 text-xs text-[#252525] font-semibold rounded-3xl transition-all duration-300 hover:bg-yellow-500 hover:text-black sm:text-sm lg:text-base"
      >
        {loading ? (
          <Spin size="small" className="text-white" />
        ) : (
          langs ? "Sign Up" : "Daftar"
        )}
      </button>
    </Form>
  )
}

export default Reqruitment;
