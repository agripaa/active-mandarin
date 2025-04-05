import React, { useState, useEffect, useMemo } from "react";
import Mainlayouts from "../Layouts/MainLayouts";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import { Button, Checkbox, Form, Input, InputNumber, Radio, Rate, Select, Spin, Upload } from "antd";
import { formatRupiah } from "../utils/rupiahFormat";
import { Link } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";
import { RiCheckboxCircleFill, RiFileSearchFill, RiGroupFill } from "react-icons/ri";
import axios from "axios";
import Swal from "sweetalert2";

const GiveDonation = () => {
  const { _, langs } = useSelector((state) => state.LangReducer);

  const awardeeImpacts = useMemo(() => {
    return langs ? [
      { title: "Educational Content Creator", desc: "Create inspiring content during their time as awardees in China to motivate young Indonesians to pursue their dreams of studying there." },
      { title: "Mandarin Tutor", desc: "Make a real impact by teaching in the Mandarin learning community established by Active Mandarin." },
      { title: "Active Participation in Active Mandarin Activities", desc: "Alumni will stay involved in various programs and events, sharing experiences and contributing to the community’s growth." },
    ] : [
      { title: "Pembuat Konten Edukasi", desc: "Membuat konten inspiratif selama masa beasiswa di China untuk memotivasi generasi muda Indonesia mengejar impian belajar di sana." },
      { title: "Pengajar Bahasa Mandarin", desc: "Memberikan dampak nyata dengan mengajar di komunitas pembelajar bahasa Mandarin yang dibangun oleh Active Mandarin." },
      { title: "Partisipasi Aktif dalam Kegiatan Active Mandarin", desc: "Alumni akan tetap terlibat dalam berbagai program dan acara, berbagi pengalaman, dan berkontribusi pada pertumbuhan komunitas." },
    ]
  }, [langs])

  return (
    <Mainlayouts className="bg-background" footerClassName="bg-background">
      <div className="container flex flex-col mx-auto px-5 py-5 gap-16 md:px-[72px] md:py-16 lg:flex-row">
        <div className="w-full lg:w-[57%]">
          <div className="flex flex-col">
            <h1 className="text-fiord-950 text-2xl font-semibold md:text-[32px]">
              {langs
                ? "A Big Impact Starts with a Small Step"
                : "Dampak Besar Dimulai dari Langkah Kecil"}
            </h1>
            <p className="text-[#2B313B] mt-4 text-sm md:text-base">
              {langs
                ? "Through this donation, we open opportunities for Indonesia's young talents to pursue their dreams of studying in China—gaining knowledge, valuable experiences, and bringing back insights to contribute to the nation through education. Upon their return, awardees will not only bring success stories but also a passion to inspire and empower the Mandarin learning community, creating a greater impact for future generations."
                : "Melalui donasi ini, kami membuka peluang bagi talenta muda Indonesia untuk mengejar impian belajar di China—mendapatkan ilmu, pengalaman berharga, dan membawa wawasan untuk berkontribusi bagi bangsa melalui pendidikan. Setibanya di tanah air, penerima beasiswa tidak hanya membawa kisah sukses tetapi juga semangat untuk menginspirasi dan memberdayakan komunitas pembelajar bahasa Mandarin, menciptakan dampak yang lebih besar bagi generasi mendatang."}
            </p>
          </div>
          <div className='flex items-center justify-center mt-8 gap-4 md:justify-start'>
            <a href='#Apply'>
              <button
                className="px-6 py-3 md:px-8 md:py-4 w-fit bg-[#FFCC00] tracking-wide mt-2 text-xs text-[#252525] font-semibold rounded-3xl transition-all duration-300 hover:bg-yellow-500 hover:text-black sm:text-sm lg:text-base"
              >
                {langs ? "Donate Now" : "Donasi Sekarang"}
              </button>
            </a>
            <a href='#Banner'>
              <button
                className="px-6 py-3 md:px-8 md:py-4 w-fit border-2 border-[#8493AC] tracking-wide mt-2 text-xs text-[#252525] font-semibold rounded-3xl transition-all duration-300 hover:bg-yellow-500 hover:text-black sm:text-sm lg:text-base"
              >
                {langs ? "How It Works" : "Cara Kerjanya"}
              </button>
            </a>
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
          <h1 className="text-fiord-950 text-2xl font-semibold leading-10 md:text-[32px] md:text-center">
            {langs
              ? "Awardee Management Program"
              : "Awardee Management Program"}
          </h1>
          <p className="text-fiord-600 md:text-center">
            {langs
              ? "After completing their studies, alumni will be empowered to continue making an impact in the following roles"
              : "Setelah menyelesaikan studi, alumni akan diberdayakan untuk terus memberikan dampak dalam peran berikut"}
          </p>
        </div>
        <div className="grid grid-cols-12 mt-8 w-full gap-8">
          <div className="flex gap-4 w-full p-4 rounded-2xl bg-white col-span-12">
            <div className="p-2.5 bg-[#F9CA24] h-fit rounded-full">
              <RiGroupFill className="w-6 h-6 min-w-6 min-h-6" color="#000000" />
            </div>
            <div className="w-full">
              <h3 className="text-xl text-[#2B313B] font-semibold">Awardee Impact</h3>
              <div className="mt-1 flex flex-col gap-4">
                {awardeeImpacts.map((impact, index) => (
                  <div key={index} className="flex gap-2 items-start">
                    <RiCheckboxCircleFill className="w-5 h-5 min-w-5 min-h-5" color="#57D163" />
                    <p className="text-[#201F1F]">
                      <span className="font-bold">{impact.title}:</span>{' '}{impact.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-4 w-full p-4 rounded-2xl bg-white col-span-12">
            <div className="p-2.5 bg-[#F53B57] h-fit rounded-full">
              <RiFileSearchFill className="w-6 h-6 min-w-6 min-h-6" color="#FFFFFF" />
            </div>
            <div className="w-full">
              <h3 className="text-xl text-[#2B313B] font-semibold">Awardee Benefit</h3>
              <p className="text-[#201F1F] mt-1">
                {langs
                  ? "Through this program, alumni will also have the opportunity for career development. At the same time, they can make an impact through educational programs in the fields of Language and Study Abroad designed by Active Mandarin Indonesia."
                  : "Melalui program ini, alumni juga akan memiliki kesempatan untuk pengembangan karir. Sembari itu, mereka dapat memberikan dampak melalui program pendidikan di bidang Bahasa dan Studi Luar Negeri yang dirancang oleh Active Mandarin Indonesia."}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container flex flex-col mx-auto px-5 py-5 md:px-[72px] md:py-16">
        <div className="flex flex-col">
          <h1 className="text-fiord-950 text-2xl font-semibold leading-10 md:text-[32px]">
            {langs
              ? "Make an Impact in 5 Easy Steps!"
              : "Buat Dampak dalam 5 Langkah Mudah!"}
          </h1>
          <p className="text-fiord-600">
            {langs
              ? "Choose, Donate, and Change Lives! ❤️"
              : "Pilih, Donasi, dan Ubah Hidup! ❤️"}
          </p>
        </div>
        <img src="/assets/donate-banner.png" alt="donate banner" className="w-full h-fit mt-8 rounded-3xl" id="Banner" />
      </div>
      <div className="w-full bg-fiord-50 rounded-[32px]">
        <div className="container flex flex-col mx-auto px-5 py-5 md:px-[72px] md:py-16">
          <div className="flex flex-col">
            <h1 className="text-fiord-950 text-2xl font-semibold leading-10 md:text-[32px]">
              {langs
                ? "Donate Now"
                : "Daftar Sekarang"}
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
      </div>
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
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/donation`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setLoading(false);

      if (response.data.status) {
        Swal.fire("Sukses!", "Bukti donasi berhasil diupload!", "success").then(() => {
          window.location.href = "/";
        });
      } else {
        Swal.fire("Gagal!", response.data.message, "error");
      }
    } catch (error) {
      setLoading(false);
      Swal.fire("Error!", error?.response?.data?.message ?? "Terjadi kesalahan saat menyimpan data!", "error");
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

      <div className="border border-fiord-200 rounded-2xl p-4">
        <label className="font-medium">
          {langs
            ? "Payment Method"
            : "Metode Pembayaran"}
        </label>

        <div className='flex items-center mt-4 gap-4 justify-start'>
          <button
            onClick={() => setPaymentMethod("QRIS")}
            className={
              paymentMethod === "QRIS"
                ? "px-6 py-3 w-fit bg-[#FFCC00] tracking-wide mt-2 text-xs text-[#252525] font-semibold rounded-xl transition-all duration-300 hover:bg-yellow-500 hover:text-black"
                : "px-6 py-3 w-fit ring-2 ring-fiord-300 tracking-wide mt-2 text-xs text-[#252525] font-semibold rounded-xl transition-all duration-300 hover:bg-yellow-500 hover:text-black"}
          >
            QRIS
          </button>
          <button
            onClick={() => setPaymentMethod("Bank Transfer")}
            className={
              paymentMethod === "Bank Transfer"
                ? "px-6 py-3 w-fit bg-[#FFCC00] tracking-wide mt-2 text-xs text-[#252525] font-semibold rounded-xl transition-all duration-300 hover:bg-yellow-500 hover:text-black"
                : "px-6 py-3 w-fit ring-2 ring-fiord-300 tracking-wide mt-2 text-xs text-[#252525] font-semibold rounded-xl transition-all duration-300 hover:bg-yellow-500 hover:text-black"}
          >
            {langs ? "Bank Transfer" : "Transfer Bank"}
          </button>
        </div>
        
        {paymentMethod === "QRIS" ? (
          <div className="w-40 mt-6">
            <img src="/assets/qris-dummy.png" alt="qris" className="w-full h-fit mt-4" />
            <button className={"px-6 py-3 w-full ring-2 ring-fiord-300 tracking-wide mt-2 text-xs text-[#252525] font-semibold rounded-xl transition-all duration-300 hover:bg-yellow-500 hover:text-black"}>
              {langs ? "See QRIS" : "Lihat QRIS"}
            </button>
          </div>
        ) : (
          <div className="border p-4 rounded-lg flex items-center gap-4 mt-6">
            <img src="/assets/bni.png" alt="Bank Transfer" className="w-20 h-auto" />
            <div className="flex flex-col">
              <p className="text-lg font-semibold">1920120881</p>
              <p className="text-gray-600">A/n PT Active Edulang Global</p>
            </div>
          </div>
        )}

        <Form.Item name="proof_payment" label={langs ? "Upload Proof of Payment" : "Bukti Pembayaran"} rules={[{ required: true, message: langs ? "Proof of Payment is required!" : "Bukti Pembayaran wajib diisi!" }]} labelCol={{ className: "font-medium" }} className="mt-6">
          <Upload
            maxCount={1}
            beforeUpload={() => false}
            onChange={handleImageFileChange}
            listType="picture"
          >
            <Button icon={<UploadOutlined />}>
              {langs
                ? "Upload Proof of Payment"
                : "Unggah Bukti Pembayaran"}
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
          ) : (
            langs ? "Donate Now" : "Donasi Sekarang"
          )}
        </button>
      </div>
    </Form>
  )
}

export default GiveDonation;
