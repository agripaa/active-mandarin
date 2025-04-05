import React, { useState, useEffect, useMemo } from "react";
import Mainlayouts from "../Layouts/MainLayouts";
import { Row, Col } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAbout } from "../Store/Action/getAllDatas";
import { url } from "../Store/Config/url";
import { AiOutlineRight } from "react-icons/ai";
import { RiCheckboxCircleFill, RiFocus2Fill, RiFocus3Fill } from "react-icons/ri";

const About = () => {
  const { data, langs } = useSelector((state) => state.LangReducer);
  const { about } = useSelector((state) => state.aboutReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAbout("2023"));
  }, [dispatch]);

  const missions = useMemo(() => (
    langs ? [
      "Provide structured, effective, and accessible Mandarin learning programs.",
      "Facilitate learning with native tutors to enhance fluency and cultural understanding.",
      "Help students prepare for study and career opportunities in Mandarin-speaking environments.",
      "Offer mentorship programs to support academic and professional growth.",
      "Provide guidance and resources for those pursuing higher education in China.",
      "Build an active, collaborative, and supportive learning community to help  students achieve their goals.",
    ] : [
      "Menyediakan program pembelajaran bahasa mandarin yang terstruktur, efektif, dan mudah diakses.",
      "Memfasilitasi pembelajaran dengan tutor penutur asli untuk meningkatkan kefasihan dan pemahaman budaya.",
      "Membantu siswa mempersiapkan peluang studi dan karir di lingkungan berbahasa mandarin.",
      "Menawarkan program bimbingan untuk mendukung pertumbuhan akademis dan profesional.",
      "Memberikan panduan dan sumber daya bagi mereka yang mengejar pendidikan tinggi di Tiongkok.",
      "Membangun komunitas belajar yang aktif, kolaboratif, dan mendukung untuk membantu siswa mencapai tujuan mereka.",
    ]
  ), [langs])

  return (
    <Mainlayouts>
    <div className="flex flex-col mx-auto bg-[#F5F8FF] gap-8 py-8 px-5 md:px-16 lg:flex-row">
      <div className="w-full lg:w-[54%]">
        <h1 className="text-2xl font-semibold md:text-3xl lg:text-[32px]">
          Active Mandarin Indonesia
        </h1>
        <p className="mt-6 text-[#201F1F]">
          {langs
            ? "Active Mandarin Indonesia is a Mandarin education platform that connects students with academic opportunities, global careers, and mentorship. We provide high-quality learning programs with professional tutors, including native speakers, and a supportive community to help students grow."
            : "Active Mandarin Indonesia adalah platform pendidikan bahasa mandarin yang menghubungkan siswa dengan peluang akademis, karir global, dan bimbingan. Kami menyediakan program pembelajaran berkualitas tinggi dengan tutor profesional, termasuk penutur asli, dan komunitas yang mendukung untuk membantu siswa tumbuh."}
        </p>
        <div className="flex mt-6 gap-4 w-full p-4 rounded-2xl bg-white">
          <div className="p-2.5 bg-[#3377FF] h-fit rounded-full">
            <RiFocus3Fill className="w-6 h-6 min-w-6 min-h-6" color="#FFFFFF" />
          </div>
          <div className="w-full">
            <h3 className="text-xl text-[#2B313B] font-semibold">Our Vision</h3>
            <p className="text-[#201F1F] mt-1">
              {langs
                ? "To become the leading Mandarin education platform that not only equips students with language skills but also opens doors to academic opportunities, global careers, and mentorship for professional development."
                : "Menjadi platform pendidikan bahasa mandarin terdepan yang tidak hanya membekali siswa dengan keterampilan bahasa tetapi juga membuka pintu untuk peluang akademis, karir global, dan bimbingan untuk pengembangan profesional."}
            </p>
          </div>
        </div>
        <div className="flex mt-6 gap-4 w-full p-4 rounded-2xl bg-white">
          <div className="p-2.5 bg-[#FFCC00] h-fit rounded-full">
            <RiFocus2Fill className="w-6 h-6 min-w-6 min-h-6" color="#22262F" />
          </div>
          <div className="w-full">
            <h3 className="text-xl text-[#2B313B] font-semibold">Our Mission</h3>
            <div className="mt-1 flex flex-col gap-4">
              {missions?.map((mission, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <RiCheckboxCircleFill className="w-6 h-6 min-w-6 min-h-6" color="#57D163" />
                  <p className="text-[#201F1F]">{mission}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-[46%] grid grid-cols-12 gap-4 items-start justify-start">
        <img src="assets/about-top-1.png" alt="about 1" className="col-span-12 w-full rounded-2xl order-2 lg:order-1" />
        <div className="grid grid-cols-12 col-span-12 gap-4 order-1 lg:order-2">
          <img src="assets/about-top-3.png" alt="about 3" className="col-span-5 w-full h-full object-cover rounded-2xl" />
          <img src="assets/about-top-2.png" alt="about 2" className="col-span-7 w-full h-full object-cover rounded-2xl" />
        </div>
        <div className="grid grid-cols-12 col-span-12 gap-4 order-3">
          <img src="assets/about-top-5.png" alt="about 5" className="col-span-7 w-full h-full object-cover rounded-2xl" />
          <img src="assets/about-top-4.png" alt="about 4" className="col-span-5 w-full h-full object-cover rounded-2xl" />
        </div>
      </div>
    </div>
      
      <h1 className="text-2xl md:text-4xl text-center mt-11 px-5 md:px-10">
        {langs
          ? "The Story Behind Active Mandarin Indonesia"
          : "Kisah di Balik Active Mandarin Indonesia"}
      </h1>
      <div className="font-light text-sm text-center capitalize mt-3 px-5 sm:text-base md:px-10">
        {langs
          ? "The history of the formation of Active Mandarin Indonesia which is now a place to grow together. #BeActiveWithActive"
          : "Sejarah terbentuknya Active Mandarin Indonesia yang kini menjadi tempat berkembang bersama. #BeActiveWithActive"}
      </div>

      <div className="container mx-auto px-5 md:px-10 py-10">
        <Row gutter={[32, 32]} align="middle">
          <Col xs={24} md={11} lg={10} className="hidden md:block">
            <div className="relative rounded-xl overflow-hidden shadow-lg">
              <img
                src="assets/about_1.png"
                alt="About"
                className="w-full object-cover"
              />
            </div>
          </Col>
          <Col xs={24} md={13} lg={14}>
            <div className="sp">
              <h1 className="text-xl md:text-xl font-bold text-[#02264A]">
                {langs
                  ? "Representing Indonesia to Participate in Mandarin Language Competition"
                  : "Mewakili Negara Indonesia Untuk Mengikuti Lomba Bahasa Mandarin"}
              </h1>
              <div className="bg-blue-500 text-slate-50 text-md font-semibold inline-block rounded-lg px-3 py-1 mt-3 mb-3">
                <AiOutlineRight className="inline-block mr-2" />
                2019
              </div>
              <Col xs={24} md={11} lg={10} className="block md:hidden my-8">
                <div className="relative rounded-[32px] overflow-hidden shadow-lg">
                  <img
                    src="assets/about_1.png"
                    alt="About"
                    className="w-full object-cover"
                  />
                </div>
              </Col>
              <p
                className="text-md md:text-lg text-gray-600 text-justify"
                dangerouslySetInnerHTML={{
                  __html: langs
                    ? "<b className='text-slate-950'>Surya Pratama Januarvi</b>, Founder of Active Mandarin Indonesia, is someone who has an interest in the world of languages ​​and often participates in foreign language competitions to represent Indonesia. <br/><br/>In 2019, Surya Pratama Januarvi won the Mandarin character writing competition and the Mandarin speech competition. Not only active in academics, but he is also active in many youth organizations that he has participated in. Through the organization, he also teaches his Mandarin language skills to his juniors."
                    : "<b className='text-slate-950'>Surya Pratama Januarvi</b>, Founder dari Active Mandarin Indonesia, ia adalah seorang yang memiliki ketertarikan dalam dunia bahasa dan sering mengikuti perlombaan bahasa asing untuk mewakili Indonesia. <br/><br/>Pada tahun 2019, Surya Pratama Januarvi berhasil meraih juara dalam ajang lomba menulis karakter bahasa mandarin dan lomba pidato dalam bahasa mandarin. Tidak hanya aktif dalam bidang akademis, akan tetapi ia juga aktif dalam organisasi kepemudaan yang banyak ia ikuti. Melalui organisasi, ia juga mengajarkan ilmu bahasa mandarin yang ia punya kepada adik-adik tingkatnya. ",
                }}
              ></p>
            </div>
          </Col>

          {/* Right Column: Text */}
          <Col xs={24} md={12}>
            <div className="sp">
              <h1 className="text-xl md:text-xl font-bold text-[#02264A]">
                {langs
                  ? "Coordination Meeting Regarding Organization and Fraud of Scholarship Agents"
                  : "Rapat Koordinasi Perihal Organisasi Dan Penipuan Agen Bodong Beasiswa"}
              </h1>
              <div className="bg-blue-500 text-slate-50 text-md font-semibold inline-block rounded-lg px-3 py-1 mt-3 mb-3">
                <AiOutlineRight className="inline-block mr-2" />
                2020
              </div>
              <p className="text-md md:text-lg text-gray-600 text-justify">
                {langs
                  ? "Surya represented the Indonesian Student Association of Nanjing City to participate in a meeting at the Indonesian Consulate General in Shanghai with the discussion of the eastern region coordination agenda. There, he and other friends discussed several serious issues, one of which was about fake agents who are currently committing fraud against Indonesian students who want to study abroad, especially in China & Taiwan."
                  : "Surya mewakili Perhimpuan Pelajar Indonesia Kota Nanjing untuk ikut serta dalam rapat di KJRI Shanghai dengan bahasan agenda koordinasi region timur.  Di sana, ia bersama teman lainnya membahas beberapa isu serius salah satunya mengenai agen-agen bodong yang saat ini banyak sekali melalukan penipuan terhadap pelajar Indonesia yang ingin berkuliah di luar negeri, khususnya ke Tiongkok & Taiwan"}
              </p>
            </div>
          </Col>

          <Col xs={24} md={12}>
            <div className="relative rounded-[32px] overflow-hidden shadow-lg">
              <img
                src="assets/about_2.png"
                alt="About"
                className="w-full object-cover"
              />
            </div>
          </Col>

          <Col xs={24} md={24}>
            <h1 className="text-xl md:text-xl font-bold text-[#02264A] block w-full">
              {langs
                ? "Pandemic and a Glimmer of Dream"
                : "Pandemi dan Secercah Mimpi"}
            </h1>
            <div className="bg-blue-500 text-slate-50 text-md font-semibold inline-block rounded-lg px-3 py-1 mt-3">
              <AiOutlineRight className="inline-block mr-2" />
              2021
            </div>
          </Col>

          <Col xs={24} md={12}>
            <div className="relative rounded-[32px] overflow-hidden shadow-lg">
              <img
                src="assets/about_3.png"
                alt="About"
                className="w-full object-cover"
              />
            </div>
          </Col>

          <Col xs={24} md={12}>
            <div className="sp">
              <p className="text-md md:text-lg text-gray-600 text-justify">
                {langs
                  ? "The Covid 19 pandemic required foreign students studying in China to return to their home country. Lectures continued with online methods. Therefore, many activities could not be carried out as before. Surya filled his free time while in Indonesia by opening a Mandarin language class. The enthusiasm was quite good from several students he taught, especially from Indonesian friends themselves and even from foreign friends who also participated in his study classes. He also joined several language platforms to hone his teaching skills as a tutor. This was the beginning of the formation of Active Mandarin Indonesia."
                  : "Pandemi Covid 19 mengharuskan mahasiswa asing yang bersekolah di Tiongkok kembali ke tanah air. Perkuliahan dilanjutkan dengan metode daring. Oleh karena itu, banyak kegiatan-kegiatan yang tidak bisa dilakukan seperti sebelumnya. Surya mengisi waktu luang selama di Indonesia dengan membuka kelas bahasa mandarin. Antusias yang cukup baik dari beberapa murid yang ia ajar, terutama dari teman-teman Indonesia itu sendiri bahkan dari teman-teman luar negeri yang juga ikut dalam kelas belajarnya. Ia juga bergabung dengan beberapa platform bahasa untuk mengasah kemampuan mengajarnya sebagai tutor. Hal inilah yang menjadi awal mula terbentuknya Active Mandarin Indonesia. "}
              </p>
            </div>
          </Col>

          <Col xs={24} md={24}>
            <h1 className="text-xl md:text-xl font-bold text-[#02264A] block w-full mt-5">
              {langs
                ? "Join the 1000 National Startup Movement KOMINFO"
                : "Tergabung Dalam Gerakan 1000 Startup Nasional KOMINFO"}
            </h1>
            <div className="bg-blue-500 text-slate-50 text-md font-semibold inline-block rounded-lg px-3 py-1 mt-3">
              <AiOutlineRight className="inline-block mr-2" />
              2022
            </div>
          </Col>

          <Col xs={24} md={24}>
            <p className="text-md md:text-lg text-gray-600 text-justify">
              {langs
                ? "With persistence and hard work, Active Mandarin Indonesia succeeded in becoming the representative of Bangka Belitung Province in the 1000 Startup Hub 4 Movement program held by KOMINFO. This is certainly inseparable from the extraordinary spirit of the Active Mandarin Indonesia team."
                : "Dengan kegigihan dan kerja keras, Active Mandarin Indonesia berhasil menjadi perwakilan Provinsi Bangka Belitung dalam program Gerakan 1000 Startup Hub 4 yang diadakan oleh KOMINFO. Hal ini tentunya tidak terlepas dari semangat yang luar biasa dari tim Active Mandarin Indonesia."}
            </p>
            <img
              src="assets/about_4.png"
              alt="About"
              className="w-full object-cover mt-5"
            />
          </Col>

          {/* Right Column: Text */}
          <Col xs={24} md={12}>
            <div className="sp">
              <h1 className="text-xl md:text-xl font-bold text-[#02264A]">
                {langs
                  ? "Breaking Through World Boundaries with Active Mandarin Indonesia"
                  : "Menembus Batas Dunia Bersama Active Mandarin Indonesia"}
              </h1>
              <div className="bg-blue-500 text-slate-50 text-md font-semibold inline-block rounded-lg px-3 py-1 mt-3 mb-3">
                <AiOutlineRight className="inline-block mr-2" />
                2023
              </div>
              <p className="text-md md:text-lg text-gray-600 text-justify">
                {langs
                  ? "Active Mandarin Indonesia's plan this year will focus on creating products and programs that are beneficial to many people. Support and cooperation from Active Mandarin Indonesia tutors, companies and campuses at home and abroad continue to accompany Active Mandarin Indonesia's steps to grow into a bigger language platform. Language is one way to penetrate the world. Let's #ActiveMakeIt Happen Together!"
                  : "Rencana Active Mandarin Indonesia di tahun ini akan fokus menciptakan produk serta program yang bermanfaat bagi orang banyak. Dukungan dan kerja sama dari para tutor Active Mandarin Indonesia, perusahaan dan kampus dalam maupun luar negeri terus mengiringi langkah Active Mandarin Indonesia untuk tumbuh menjadi platform bahasa yang lebih besar lagi. Bahasa adalah satu cara untuk menembus dunia. Mari bersama #ActiveMewujudkannya!"}
              </p>
            </div>
          </Col>

          <Col xs={24} md={12}>
            <div className="relative rounded-[32px] overflow-hidden shadow-lg">
              <img
                src="assets/about_5.png"
                alt="About"
                className="w-full object-cover"
              />
            </div>
          </Col>

          <Col xs={24} md={11} lg={10} className="hidden md:block">
            <div className="relative rounded-xl overflow-hidden shadow-lg">
              <img
                src="assets/about_6.png"
                alt="About"
                className="w-full object-cover"
              />
            </div>
          </Col>
          <Col xs={24} md={13} lg={14}>
            <div className="sp">
              <h1 className="text-xl md:text-xl font-bold text-[#02264A]">
                {langs
                  ? "Spreading Wings to Focus on Active Indonesian Mandarin Language Program"
                  : "Mengepakan Sayap Demi Fokus Terhadap Program Active Mandarin Indonesia"}
              </h1>
              <div className="bg-blue-500 text-slate-50 text-md font-semibold inline-block rounded-lg px-3 py-1 mt-3 mb-3">
                <AiOutlineRight className="inline-block mr-2" />
                2024
              </div>
              <Col xs={24} md={11} lg={10} className="block md:hidden my-8">
                <div className="relative rounded-[32px] overflow-hidden shadow-lg">
                  <img
                    src="assets/about_6.png"
                    alt="About"
                    className="w-full object-cover"
                  />
                </div>
              </Col>
              <p
                className="text-md md:text-lg text-gray-600 text-justify"
                dangerouslySetInnerHTML={{
                  __html: langs
                    ? "Active Mandarin Indonesia Collaborates with Several Parties in China, This Collaboration Includes Collaboration in Scholarship Programs and Career Programs at Active Mandarin Indonesia, So That With This Program We Can Provide the Best Services and Solutions for Job Hunters, Especially in the Field of Mandarin and Also Scholarship Seekers in China and Taiwan"
                    : "Active Mandarin Indonesia Melakukan Kerjasama Dengan Beberapa Pihak Yang Ada Di China, Kerjasama Ini Meliputi Kerjasama Dalam Program Scholarship Dan Juga Program Karier Yang Ada Di Active Mandarin Indonesia, Sehingga Dengan Program Ini Kami Dapat Memberikan Pelayanan Dan Juga Solusi Terbaik Bagi Para Pemburu Kerja Khususnya Di Bidang Bahasa Mandarin Dan Juga Pencari Beasiswa Di China Maupun Taiwan",
                }}
              ></p>
            </div>
          </Col>
        </Row>
      </div>
    </Mainlayouts>
  );
};

export default About;
