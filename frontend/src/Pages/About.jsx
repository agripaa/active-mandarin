import React, { useState, useEffect } from "react";
import Mainlayouts from "../Layouts/MainLayouts";
import { Row, Col } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAbout } from "../Store/Action/getAllDatas";
import { url } from "../Store/Config/url";
import { AiOutlineRight } from "react-icons/ai";

const About = () => {
  const { data, langs } = useSelector((state) => state.LangReducer);
  const { about } = useSelector((state) => state.aboutReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAbout("2023"));
  }, [dispatch]);

  return (
    <Mainlayouts>
      <h1 className="text-4xl text-center mt-11">
        {langs
          ? "The Story Behind Active Mandarin Indonesia"
          : "Kisah di Balik Active Mandarin Indonesia"}
      </h1>
      <div className="font-light text-center capitalize mt-3">
        {langs
          ? "The history of the formation of Active Mandarin Indonesia which is now a place to grow together. #BeActiveWithActive"
          : "Sejarah terbentuknya Active Mandarin Indonesia yang kini menjadi tempat berkembang bersama. #BeActiveWithActive"}
      </div>

      <div className="container mx-auto px-5 md:px-10 py-10">
        <Row gutter={[32, 32]} align="middle">
          {/* Left Column: Image */}
          <Col xs={24} md={10}>
            <div className="relative rounded-xl overflow-hidden shadow-lg">
              <img
                src="assets/about_1.png"
                alt="About"
                className="w-full object-cover"
              />
            </div>
          </Col>
          {/* Right Column: Text */}
          <Col xs={24} md={14}>
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
                  ? "Surya mewakili Perhimpuan Pelajar Indonesia Kota Nanjing untuk ikut serta dalam rapat di KJRI Shanghai dengan bahasan agenda koordinasi region timur.  Di sana, ia bersama teman lainnya membahas beberapa isu serius salah satunya mengenai agen-agen bodong yang saat ini banyak sekali melalukan penipuan terhadap pelajar Indonesia yang ingin berkuliah di luar negeri, khususnya ke Tiongkok & Taiwan"
                  : "Surya represented the Indonesian Student Association of Nanjing City to participate in a meeting at the Indonesian Consulate General in Shanghai with the discussion of the eastern region coordination agenda. There, he and other friends discussed several serious issues, one of which was about fake agents who are currently committing fraud against Indonesian students who want to study abroad, especially in China & Taiwan."}
              </p>
            </div>
          </Col>

          <Col xs={24} md={12}>
            <div className="relative rounded-xl overflow-hidden shadow-lg">
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
            <div className="relative rounded-xl overflow-hidden shadow-lg">
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
                2020
              </div>
              <p className="text-md md:text-lg text-gray-600 text-justify">
                {langs
                  ? "Active Mandarin Indonesia's plan this year will focus on creating products and programs that are beneficial to many people. Support and cooperation from Active Mandarin Indonesia tutors, companies and campuses at home and abroad continue to accompany Active Mandarin Indonesia's steps to grow into a bigger language platform. Language is one way to penetrate the world. Let's #ActiveMakeIt Happen Together!"
                  : "Rencana Active Mandarin Indonesia di tahun ini akan fokus menciptakan produk serta program yang bermanfaat bagi orang banyak. Dukungan dan kerja sama dari para tutor Active Mandarin Indonesia, perusahaan dan kampus dalam maupun luar negeri terus mengiringi langkah Active Mandarin Indonesia untuk tumbuh menjadi platform bahasa yang lebih besar lagi. Bahasa adalah satu cara untuk menembus dunia. Mari bersama #ActiveMewujudkannya!"}
              </p>
            </div>
          </Col>

          <Col xs={24} md={12}>
            <div className="relative rounded-xl overflow-hidden shadow-lg">
              <img
                src="assets/about_5.png"
                alt="About"
                className="w-full object-cover"
              />
            </div>
          </Col>
        </Row>
      </div>
    </Mainlayouts>
  );
};

export default About;
