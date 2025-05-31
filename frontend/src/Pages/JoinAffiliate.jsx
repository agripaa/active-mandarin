import React, { useState, useEffect, useMemo } from "react";
import Mainlayouts from "../Layouts/MainLayouts";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import { Button, Checkbox, Form, Input, InputNumber, Radio, Rate, Select, Spin, Upload } from "antd";
import { getBrandCategoryTurunan } from "../api/brand";
import { formatRupiah } from "../utils/rupiahFormat";
import { RiCheckboxCircleFill } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import axios from "axios";

const JoinAffiliate = () => {
  const { _, langs } = useSelector((state) => state.LangReducer);
  const location = useLocation();
  
  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location])

  const heroPoints = useMemo(() => {
    return langs ? [
      "Additional Income",
      "Access to the Mandarin Learning Community and Remote Job Information",
      "Opportunity to Join Free Programs from Active Mandarin",
      "Affiliate Development Program",
    ] : [
      "Penghasilan Tambahan",
      "Akses ke Komunitas Belajar Mandarin dan Informasi Kerja Remote",
      "Kesempatan untuk Bergabung dengan Program Gratis dari Active Mandarin",
      "Program Pengembangan Afiliasi",
    ]
  }, [langs]);

  return (
    <Mainlayouts className="bg-background" footerClassName="bg-background">
      <div className="container flex flex-col mx-auto px-5 py-5 gap-16 items-start md:px-[72px] md:py-16 lg:flex-row">
        <div className="w-full lg:w-[57%]">
          <div className="flex flex-col">
            <h1 className="text-fiord-950 text-2xl font-semibold md:text-[32px]">
              {langs
                ? "Join Our Affiliate Program! & Earn extra income"
                : "Gabung Program Afiliasi Kami! & Dapatkan penghasilan tambahan"}
            </h1>
            <p className="text-[#2B313B] mt-4 text-sm md:text-base">
              {langs
                ? "Simply share your referral code on social media or invite friends who want to learn Mandarin and go to China. The more people join, the more commission you earn! Don't miss this opportunity—sign up now and be part of the Active Mandarin Affiliate!"
                : "Bagikan kode referral kamu di media sosial atau ajak teman yang ingin belajar Mandarin dan pergi ke China. Semakin banyak orang yang bergabung, semakin banyak komisi yang kamu dapatkan! Jangan lewatkan kesempatan ini—daftar sekarang dan jadi bagian dari Afiliasi Active Mandarin!"}
            </p>
          </div>
          <div className="mt-8">
            <h2 className="text-lg font-semibold md:text-xl">
              {langs
                ? "Why Become an Affiliate?"
                : "Kenapa Menjadi Afiliasi?"}
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
          src="/assets/affiliate-hero-image.png"
          alt="hero"
          className="w-full h-auto lg:w-[43%] object-contain"
        />
      </div>
      <div className="container flex flex-col mx-auto px-5 py-5 md:px-[72px] md:py-16">
        <div className="flex flex-col">
          <h1 className="text-fiord-950 text-2xl font-semibold leading-10 md:text-[32px]">
            {langs
              ? "How Our Affiliate Program Works"
              : "Cara Kerja Program Afiliasi Kami"}
          </h1>
          <p className="text-fiord-600">
            {langs
              ? "Explore and Earn Commissions! 🎉"
              : "Jelajahi dan Dapatkan Komisi! 🎉"}
          </p>
        </div>
        <img src="/assets/affiliate-banner.png" alt="affiliate banner" className="w-full h-fit mt-8 rounded-3xl" id="Banner" />
      </div>
      <div className="w-full bg-fiord-50 rounded-[32px]">
        <div className="container flex flex-col mx-auto px-5 py-5 md:px-[72px] md:py-16">
          <div className="flex flex-col">
            <h1 className="text-fiord-950 text-2xl font-semibold leading-10 md:text-[32px]">
              {langs
                ? "Sign Up Now & Start Earning!"
                : "Daftar Sekarang & Mulai Dapatkan!"}
            </h1>
            <p className="text-fiord-600">
              {langs
                ? "Join, Share, and Earn Commissions! 🎉"
                : "Gabung, Bagikan, dan Dapatkan Komisi! 🎉"}
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

  const type_options = useMemo(() => {
    return langs ? [
      { value: "Afiliasi Komunitas", label: 'Community Affiliate' },
      { value: "Afiliasi Individu", label: 'Individual Affiliate' },
    ] : [
      { value: "Afiliasi Komunitas", label: 'Afiliasi Komunitas' },
      { value: "Afiliasi Individu", label: 'Afiliasi Individu' },
    ]
  }, [langs]);

  const reason_options = useMemo(() => {
    return langs ? [
      { label: "Earn extra income", value: "Mendapat penghasilan tambahan" },
      { label: "Recommend products you like", value: "Merekomendasikan produk yang disukai" },
      { label: "Flexibility to work from anywhere", value: "Fleksibilitas bekerja dari mana saja" },
      { label: "Be part of the Mandarin learning community", value: "Menjadi bagian dari komunitas pembelajaran bahasa Mandarin" },
      { label: "Interested in joining the scholarship program to China", value: "Tertarik untuk mengikuti program Beasiswa ke Cina" },
    ] : [
      { label: "Mendapat penghasilan tambahan", value: "Mendapat penghasilan tambahan" },
      { label: "Merekomendasikan produk yang disukai", value: "Merekomendasikan produk yang disukai" },
      { label: "Fleksibilitas bekerja dari mana saja", value: "Fleksibilitas bekerja dari mana saja" },
      { label: "Menjadi bagian dari komunitas pembelajaran bahasa Mandarin", value: "Menjadi bagian dari komunitas pembelajaran bahasa Mandarin" },
      { label: "Tertarik untuk mengikuti program Beasiswa ke Cina", value: "Tertarik untuk mengikuti program Beasiswa ke Cina" },
    ]
  }, [langs]);

  const platform_options = useMemo(() => {
    return [
      { label: "Instagram Stories", value: "Instagram Stories" },
      { label: "Instagram Feed", value: "Instagram Feed" },
      { label: "Tiktok", value: "Tiktok" },
      { label: "Twitter", value: "Twitter" },
      { label: "E-Commerce", value: "E-Commerce" },
    ]
  }, []);

  const know_options = useMemo(() => {
    return langs ? [
      { label: 'Active Mandarin Indonesia Website', value: "Website Active Mandarin Indonesia" },
      { label: 'KOL', value: "KOL" },
      { label: 'Word of Mouth', value: "Mulut ke Mulut" },
      { label: 'Active Mandarin Indonesia Social Media', value: "Sosial Media Active Mandarin Indonesia" }
    ] : [
      { label: "Website Active Mandarin Indonesia", value: "Website Active Mandarin Indonesia" },
      { label: "KOL", value: "KOL" },
      { label: "Mulut ke Mulut", value: "Mulut ke Mulut" },
      { label: "Sosial Media Active Mandarin Indonesia", value: "Sosial Media Active Mandarin Indonesia" }
    ]
  }, [langs]);

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();

      formData.append("name", values.name);
      formData.append("username", "");
      formData.append("email", values.email);
      formData.append("type_affiliate", values.type_affiliate);
      formData.append("number", values.number);
      formData.append("reason", values.reason?.join(", "));
      formData.append("platform", values.platform?.join(", "));
      formData.append("know_program", values.know_program?.join(", "));

      setLoading(true);
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register/affiliate`, formData, {
        headers: { "Content-Type": "application/json" },
      });

      setLoading(false);

      if (response.data.status) {
        Swal.fire("Sukses!", "Pendaftaran berhasil!", "success").then(() => {
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
    <Form form={form} layout="vertical" className="max-w-[745px] mr-auto">
      <Form.Item name="name" label={langs ? "Name" : "Nama"} rules={[{ required: true, message: langs ? "Name is required!" : "Nama wajib diisi!" }]} labelCol={{ className: "font-medium" }}>
        <Input placeholder="Mohammed Hussein" className="py-3" />
      </Form.Item>

      <Form.Item name="email" label="Email" rules={[{ required: true, message: langs ? "Email is required!" : "Email wajib diisi!" }]} labelCol={{ className: "font-medium" }}>
        <Input placeholder="nancy.brooks@gmail.com" className="py-3" />
      </Form.Item>

      <Form.Item name="number" label={langs ? "Phone Number" : "No Telpon"} rules={[{ required: true, message: langs ? "Phone Number is required!" : "No Telpon wajib diisi!" }]} labelCol={{ className: "font-medium" }}>
        <Input placeholder="+62 (648) 958-7603" className="w-full py-2" />
      </Form.Item>

      <Form.Item name="type_affiliate" label={langs ? "What Type of Affiliate do you want to register?" : "Apa Jenis Affiliate yang ingin anda daftarkan?"} rules={[{ required: true, message: langs ? "Type Affiliate is required!" : "Jenis Affiliate wajib diisi!" }]} labelCol={{ className: "font-medium" }}>
        <Radio.Group
          className="flex flex-col gap-3.5"
          // value={value}
          options={type_options}
        />
      </Form.Item>

      <Form.Item name="reason" label={langs ? "Why are you interested in joining the Active Mandarin Affiliate Program?" : "Alasan Tertarik Join Affiliate Program Active Mandarin"} rules={[{ required: true, message: langs ? "Reason is required!" : "Alasan wajib diisi!" }]} labelCol={{ className: "font-medium" }}>
        <Checkbox.Group options={reason_options} className="flex flex-col gap-3.5" />
      </Form.Item>

      <Form.Item name="platform" label={langs ? "What Platform do you use to share the affiliate code given by Active Mandarin?" : "Platform Apa Yang Digunakan Untuk Share Kode Affiliate yang Diberikan Active Mandarin?"} rules={[{ required: true, message: langs ? "Platform is required!" : "Platform wajib diisi!" }]} labelCol={{ className: "font-medium" }}>
        <Checkbox.Group options={platform_options} className="flex flex-col gap-3.5" />
      </Form.Item>

      <Form.Item name="know_program" label={langs ? "Where did you find out about the Active Mandarin Affiliate Program?" : "Dari Mana Anda Mengetahui Program Affiliate Active Mandarin?"}
       rules={[{ required: true, message: langs ? "This field is required!" : "Kolom ini wajib diisi!" }]} labelCol={{ className: "font-medium" }}>
        <Checkbox.Group options={know_options} className="flex flex-col gap-3.5" />
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

export default JoinAffiliate;
