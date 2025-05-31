import React, { useState, useEffect, useMemo } from "react";
import Mainlayouts from "../Layouts/MainLayouts";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import {
  Button,
  Checkbox,
  Form,
  Input,
  InputNumber,
  Radio,
  Rate,
  Select,
  Spin,
  Upload,
} from "antd";
import { formatRupiah } from "../utils/rupiahFormat";
import { Link } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";
import {
  RiCheckboxCircleFill,
  RiFileSearchFill,
  RiGroupFill,
  RiHandbagFill,
  RiHandCoinFill,
  RiSpeedMiniFill,
} from "react-icons/ri";
import axios from "axios";
import Swal from "sweetalert2";
import { FaWhatsapp } from "react-icons/fa";

const BecomePartner = () => {
  const { _, langs } = useSelector((state) => state.LangReducer);

  const whyPoints = useMemo(() => {
    return langs
      ? [
          {
            Icon: RiGroupFill,
            color: "#3377FF",
            title: "Easy Access to Quality Talent",
            desc: "Every candidate goes through an intensive selection and training process.",
          },
          {
            Icon: RiSpeedMiniFill,
            color: "#FFCC00",
            title: "Faster Recruitment Process",
            desc: "We speed up the search process until you find the right candidate.",
          },
          {
            Icon: RiHandCoinFill,
            color: "#FF3E3E",
            title: "Full Support",
            desc: "Active Mandarin assists end to end the selected Recruitment Program.",
          },
          {
            Icon: RiHandbagFill,
            color: "#02264A",
            title: "Recruitment Program facilities can be customized",
            desc: "For full-time, part-time, freelance, and special project needs.",
          },
        ]
      : [
          {
            Icon: RiGroupFill,
            color: "#3377FF",
            title: "Akses Mudah ke Talent Berkualitas",
            desc: "Setiap kandidat telah melalui proses seleksi dan pelatihan intensif.",
          },
          {
            Icon: RiSpeedMiniFill,
            color: "#FFCC00",
            title: "Proses Rekrutmen Lebih Cepat",
            desc: "Kami mempercepat proses pencarian hingga Anda menemukan kandidat yang tepat.",
          },
          {
            Icon: RiHandCoinFill,
            color: "#FF3E3E",
            title: "Dukungan Penuh",
            desc: "Active Mandarin mendampingi end to end Program Rekrutmen yang dipilih.",
          },
          {
            Icon: RiHandbagFill,
            color: "#02264A",
            title: "Fasilitas Program Rekrutmen dapat disesuaikan",
            desc: "Untuk kebutuhan full-time, part-time, freelance, hingga proyek khusus.",
          },
        ];
  }, [langs]);

  const heroPoints = useMemo(() => {
    return langs ? [
      "Vacancy Promotion",
      "Administrative Selection",
      "Technical Test",
      "Interview",
      "Training",
      "Hire & Town Hall Meeting",
    ] : [
      "Promosi Lowongan",
      "Seleksi Administrasi",
      "Technical Test",
      "Interview",
      "Training",
      "Hire & Town Hall Meeting",
    ]
  }, [langs]);

  return (
    <Mainlayouts className="bg-background" footerClassName="bg-background">
      <div className="container flex flex-col mx-auto px-5 py-5 gap-16 md:px-[72px] md:py-16 lg:flex-row">
        <div className="w-full lg:w-[57%]">
          <div className="flex flex-col">
            <h1 className="text-fiord-950 text-2xl font-semibold md:text-[32px]">
              {langs
                ? "Smart Solution for Mandarin Talent Needs Fast!"
                : "Solusi Cerdas untuk Kebutuhan Talent Mandarin dengan Cepat!"}
            </h1>
            <p className="text-[#2B313B] mt-4 text-sm md:text-base">
              {langs
                ? "In the ever-growing business world, the need for Chinese-speaking professionals is increasing."
                : "Di dunia bisnis yang terus berkembang, kebutuhan akan tenaga profesional berbahasa Mandarin semakin tinggi."}
              <br/>
              <br/>
              {langs
                ? "We understand how difficult it is to find Chinese translators, mentors, interpreters, or workers who are ready to enter the professional world, especially in large numbers. Active Mandarin Indonesia is here as a catalyst for companies to find the best workforce candidates in the field of Mandarin!"
                : "Kami memahami betapa sulitnya mencari translator, mentor, interpreter, atau tenaga kerja berbahasa Mandarin yang siap terjun ke dunia profesional, terlebih lagi dalam jumlah yang besar. Active Mandarin Indonesia hadir sebagai katalisator perusahaan dalam menemukan kandidat tenaga kerja terbaik di bidang Bahasa Mandarin!"}
            </p>
          </div>
          <div className="flex items-center justify-center mt-8 gap-4 md:justify-start">
            <a href="https://wa.me/+6282279506450" target="_blank">
              <button className="flex gap-2.5 px-6 py-3 md:px-8 md:py-4 w-fit bg-[#FFCC00] tracking-wide mt-2 text-xs text-[#252525] font-semibold rounded-3xl transition-all duration-300 hover:bg-yellow-500 hover:text-black sm:text-sm lg:text-base">
                <FaWhatsapp className="text-md md:text-xl lg:text-2xl"/>
                {langs ? "Free Consultation" : "Konsultasi Gratis"}
              </button>
            </a>
          </div>
        </div>
        <img
          src="/assets/become-partner.png"
          alt="hero"
          className="w-full h-auto lg:w-[43%] object-contain"
        />
      </div>
      <div className="w-full bg-fiord-50 rounded-[32px]">
        <div className="container flex flex-col mx-auto px-5 py-5 lg:max-w-[903px] md:px-[72px] lg:px-5 md:py-16">
          <div className="flex flex-col">
            <h1 className="text-black text-2xl font-semibold leading-10 md:text-[32px] md:text-center">
              {langs
                ? "Much Faster Recruitment!"
                : "Rekrutmen Jauh Lebih Cepat!"}
            </h1>
            <p className="text-[#3377FF] md:text-center font-semibold text-lg md:text-2xl">
              {langs
                ? "With Active Mandarin"
                : "Dengan Active Mandarin"}
            </p>
            <p className="text-fiord-600 md:text-center font-medium text-base md:text-xl mt-2">
              {langs
                ? "We are ready to support your team's entire recruitment process, from start to finish, without taking up your time."
                : "Kami siap mendukung seluruh proses rekrutmen tim Anda secara menyeluruh, dari awal hingga akhir, tanpa menghabiskan waktu Anda."}
            </p>
          </div>
          <div className="flex flex-col md:flex-row mt-8 w-full gap-8 lg:gap-16">
            <div className="flex gap-4 w-max p-4 rounded-2xl bg-white items-center">
              <div className="flex flex-col gap-5">
                {heroPoints.map((point, index) => (
                  <div key={index} className="flex items-center gap-2 w-max">
                    <RiCheckboxCircleFill color='#57D163' className='w-7 h-7 min-w-7 min-h-7' />
                    <p className="text-fiord-950 text-sm font-medium lg:text-xl">{point}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-4 w-full p-4 rounded-2xl bg-white">
              <img src="/assets/become-partner-body.png" className="w-full h-fit" />
            </div>
          </div>
        </div>
      </div>
      <div className="container flex flex-col mx-auto px-5 py-5 items-start md:px-[72px] md:py-16">
        <div className="flex flex-col">
          <h1 className="text-fiord-950 text-2xl font-semibold leading-10 md:text-[32px]">
            {langs
              ? "Why Partner with Active Mandarin?"
              : "Mengapa Bermitra dengan Active Mandarin?"}
          </h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 mt-8 w-full">
          {whyPoints.map((item) => (
            <div className="p-4 flex flex-col lg:flex-row gap-4 items-start bg-white rounded-2xl">
              <div className={`w-11 min-w-11 h-11 min-h-11 bg-[${item.color}] rounded-full flex items-center justify-center`}>
                {<item.Icon className="text-xl text-white" />}
              </div>
              <div className="w-full flex flex-col gap-1">
                <h3 className="text-base font-bold">{item.title}</h3>
                <p className="text-base font-normal">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* <div className="w-full bg-fiord-50 rounded-[32px]">
        <div className="container flex flex-col mx-auto px-5 py-5 md:px-[72px] md:py-16">
          <div className="flex flex-col">
            <h1 className="text-fiord-950 text-2xl font-semibold leading-10 md:text-[32px]">
              {langs ? "Donate Now" : "Daftar Sekarang"}
            </h1>
            <p className="text-fiord-600">
              {langs
                ? "Together, We Can Share & Help More People! 💖"
                : "Bersama, Kita Dapat Berbagi & Membantu Lebih Banyak Orang! 💖"}
            </p>
          </div>
          <div className="mt-8" id="Apply">
            <AffiliateForm />
          </div>
        </div>
      </div> */}
    </Mainlayouts>
  );
};

const AffiliateForm = () => {
  const { _, langs } = useSelector((state) => state.LangReducer);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("QRIS");
  const [imageFile, setImageFile] = useState(null);

  const handleImageFileChange = ({ file }) => {
    setImageFile(file);
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();

      formData.append("nama", values.nama);
      formData.append("email", values.email);
      formData.append("payment_method", paymentMethod);

      if (imageFile) {
        formData.append("proof_payment", imageFile);
      } else {
        Swal.fire("Error!", "Bukti Pembayaran wajib diunggah!", "error");
        return;
      }

      setLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/donation`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setLoading(false);

      if (response.data.status) {
        Swal.fire("Sukses!", "Bukti donasi berhasil diupload!", "success").then(
          () => {
            window.location.href = "/";
          }
        );
      } else {
        Swal.fire("Gagal!", response.data.message, "error");
      }
    } catch (error) {
      setLoading(false);
      Swal.fire(
        "Error!",
        error?.response?.data?.message ??
          "Terjadi kesalahan saat menyimpan data!",
        "error"
      );
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      encType="multipart/form-data"
      className="max-w-[745px] mr-auto"
    >
      <Form.Item
        name="nama"
        label={langs ? "Name" : "Nama"}
        rules={[
          {
            required: true,
            message: langs ? "Name is required!" : "Nama wajib diisi!",
          },
        ]}
        labelCol={{ className: "font-medium" }}
      >
        <Input placeholder="Mohammed Hussein" className="py-3" />
      </Form.Item>

      <Form.Item
        name="email"
        label="Email"
        rules={[
          {
            required: true,
            message: langs ? "Email is required!" : "Email wajib diisi!",
          },
        ]}
        labelCol={{ className: "font-medium" }}
      >
        <Input placeholder="nancy.brooks@gmail.com" className="py-3" />
      </Form.Item>

      <div className="border border-fiord-200 rounded-2xl p-4">
        <label className="font-medium">
          {langs ? "Payment Method" : "Metode Pembayaran"}
        </label>

        <div className="flex items-center mt-4 gap-4 justify-start">
          <button
            onClick={() => setPaymentMethod("QRIS")}
            className={
              paymentMethod === "QRIS"
                ? "px-6 py-3 w-fit bg-[#FFCC00] tracking-wide mt-2 text-xs text-[#252525] font-semibold rounded-xl transition-all duration-300 hover:bg-yellow-500 hover:text-black"
                : "px-6 py-3 w-fit ring-2 ring-fiord-300 tracking-wide mt-2 text-xs text-[#252525] font-semibold rounded-xl transition-all duration-300 hover:bg-yellow-500 hover:text-black"
            }
          >
            QRIS
          </button>
          <button
            onClick={() => setPaymentMethod("Bank Transfer")}
            className={
              paymentMethod === "Bank Transfer"
                ? "px-6 py-3 w-fit bg-[#FFCC00] tracking-wide mt-2 text-xs text-[#252525] font-semibold rounded-xl transition-all duration-300 hover:bg-yellow-500 hover:text-black"
                : "px-6 py-3 w-fit ring-2 ring-fiord-300 tracking-wide mt-2 text-xs text-[#252525] font-semibold rounded-xl transition-all duration-300 hover:bg-yellow-500 hover:text-black"
            }
          >
            {langs ? "Bank Transfer" : "Transfer Bank"}
          </button>
        </div>

        {paymentMethod === "QRIS" ? (
          <div className="w-40 mt-6">
            <img
              src="/assets/qris-dummy.jpg"
              alt="qris"
              className="w-full h-full mt-4"
            />
            <button
              className={
                "px-6 py-3 w-full ring-2 ring-fiord-300 tracking-wide mt-2 text-xs text-[#252525] font-semibold rounded-xl transition-all duration-300 hover:bg-yellow-500 hover:text-black"
              }
            >
              {langs ? "See QRIS" : "Lihat QRIS"}
            </button>
          </div>
        ) : (
          <div className="border p-4 rounded-lg flex items-center gap-4 mt-6">
            <img
              src="/assets/bni.png"
              alt="Bank Transfer"
              className="w-20 h-auto"
            />
            <div className="flex flex-col">
              <p className="text-lg font-semibold">1920120881</p>
              <p className="text-gray-600">A/n PT Active Edulang Global</p>
            </div>
          </div>
        )}

        <Form.Item
          name="proof_payment"
          label={langs ? "Upload Proof of Payment" : "Bukti Pembayaran"}
          rules={[
            {
              required: true,
              message: langs
                ? "Proof of Payment is required!"
                : "Bukti Pembayaran wajib diisi!",
            },
          ]}
          labelCol={{ className: "font-medium" }}
          className="mt-6"
        >
          <Upload
            maxCount={1}
            beforeUpload={() => false}
            onChange={handleImageFileChange}
            listType="picture"
          >
            <Button icon={<UploadOutlined />}>
              {langs ? "Upload Proof of Payment" : "Unggah Bukti Pembayaran"}
            </Button>
          </Upload>
        </Form.Item>
        <button
          type="submit"
          onClick={handleSave}
          disabled={loading}
          className="px-6 py-3 md:px-8 md:py-4 w-full bg-[#FFCC00] tracking-wide mt-6 text-xs text-[#252525] font-semibold rounded-3xl transition-all duration-300 hover:bg-yellow-500 hover:text-black sm:text-sm lg:text-base"
        >
          {loading ? (
            <Spin size="small" className="text-white" />
          ) : langs ? (
            "Donate Now"
          ) : (
            "Donasi Sekarang"
          )}
        </button>
      </div>
    </Form>
  );
};

export default BecomePartner;
