import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Modal } from 'antd'
import { useSelector } from "react-redux";

const Affiliate = ({ text }) => {
  const {data, langs} = useSelector(state => state.LangReducer);
  const [isModalVisible, setIsModalVisible] = useState(false)

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  return (
    <div className='container mx-auto my-24 relative w-full'>
      <div className='flex items-center justify-center w-full h-full'>
        <div
          className='relative w-9/12 flex bg-[#02264A] rounded-2xl py-10 px-14 overflow-hidden'
          style={{
            backgroundImage: "url('/assets/card-texture.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <img
            src="/assets/affiliate89.png"
            alt="Affiliate"
            className='absolute top-0 left-20 h-auto w-[30%] object-cover z-30 rounded-full'
          />

          <div className='flex flex-col justify-center text-white w-7/12 ml-auto'>
            <h2 className='font-semibold text-4xl'>{text.title}</h2>
            <p className='mt-4 text-lg font-light'>{text.desc}</p>
            <div className='mt-6'>
              <button
                onClick={showModal}
                className="px-8 py-4 bg-[#FFCC00] tracking-wide mt-2 text-base text-[#252525] font-semibold rounded-3xl transition-all duration-300 hover:bg-yellow-500 hover:text-black"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal
  visible={isModalVisible}
  onCancel={handleCancel}
  footer={null}
  className="rounded-lg"
  width={800}
  title={langs ? "Affiliate Program by Active Mandarin Indonesia" : "Program Afiliasi oleh Active Mandarin Indonesia"}
>
  <div className="p-6">
    <p className="mb-4">
      <strong>
        {langs
          ? "What is the Active Mandarin Indonesia Affiliate Program?"
          : "Apa itu Program Afiliasi Active Mandarin Indonesia?"}
      </strong>
      <br />
      {langs
        ? "The Active Mandarin Indonesia Affiliate Program allows you to earn commissions by promoting the programs and products offered by Active Mandarin Indonesia. This program is simple, flexible, and offers many benefits while helping others achieve their goals."
        : "Program Afiliasi Active Mandarin Indonesia memungkinkan Anda mendapatkan komisi dengan mempromosikan program dan produk yang ditawarkan oleh Active Mandarin Indonesia. Program ini sederhana, fleksibel, dan menawarkan banyak keuntungan sambil membantu orang lain mencapai tujuan mereka."}
    </p>
    <p className="mb-4">
      <strong>
        {langs
          ? "How the Active Mandarin Indonesia Affiliate Program Works"
          : "Cara Kerja Program Afiliasi Active Mandarin Indonesia"}
      </strong>
      <br />
      <em>{langs ? "Step-by-Step Guide" : "Panduan Langkah Demi Langkah"}</em>
      <br />
      <br />
      {langs
        ? "Joining our Affiliate Program is easy! Follow these four steps to start earning commissions by promoting Active Mandarin Indonesia’s programs and products."
        : "Bergabung dengan Program Afiliasi kami sangat mudah! Ikuti empat langkah ini untuk mulai mendapatkan komisi dengan mempromosikan program dan produk Active Mandarin Indonesia."}
    </p>
    <ol className="mb-4 list-decimal ml-5">
      <li>
        <strong>{langs ? "Register" : "Daftar"}</strong>
        <br />
        {langs
          ? "Join as an Affiliate and unlock your earning potential by registering now! You’ll be directed to chat with the admin."
          : "Bergabunglah sebagai Afiliasi dan buka potensi penghasilan Anda dengan mendaftar sekarang! Anda akan diarahkan untuk berbicara dengan admin."}
      </li>
      <li>
        <strong>
          {langs
            ? "Learn About Our Programs & Products"
            : "Pelajari Program & Produk Kami"}
        </strong>
        <br />
        {langs
          ? "Get to know our outstanding programs, such as:"
          : "Kenali program luar biasa kami, seperti:"}
        <ul className="list-disc ml-5">
          <li>{langs ? "Mandarin Language Program" : "Program Bahasa Mandarin"}</li>
          <li>{langs ? "Mentor Scholarship Program" : "Program Beasiswa Mentor"}</li>
          <li>
            {langs
              ? "University Application Assistance Service for China"
              : "Layanan Bantuan Aplikasi Universitas ke China"}
          </li>
          <li>
            {langs
              ? "Notebooks, Flashcards, and Comprehensive Books"
              : "Buku Catatan, Flashcard, dan Buku Komprehensif"}
          </li>
        </ul>
      </li>
      <li>
        <strong>{langs ? "Promote" : "Promosikan"}</strong>
        <br />
        {langs
          ? "Share information about Active Mandarin Indonesia through your network, social media, or community. Each successful registration helps you earn commissions while benefiting others."
          : "Bagikan informasi tentang Active Mandarin Indonesia melalui jaringan Anda, media sosial, atau komunitas. Setiap pendaftaran yang berhasil membantu Anda mendapatkan komisi sambil memberi manfaat kepada orang lain."}
      </li>
      <li>
        <strong>{langs ? "Earn Commissions" : "Dapatkan Komisi"}</strong>
        <br />
        {langs
          ? "Earn recurring commissions for every successful registration. The more you recommend, the greater your learnings!"
          : "Dapatkan komisi berulang untuk setiap pendaftaran yang berhasil. Semakin banyak Anda merekomendasikan, semakin besar penghasilan Anda!"}
      </li>
    </ol>
    <div className="text-center mt-10">
      <a
        href="https://wa.me/+6282223369246"
        target="_blank"
        rel="noopener noreferrer"
        className="px-8 py-4 bg-[#FFCC00] text-base text-[#252525] font-semibold rounded-3xl hover:bg-yellow-500 transition-all duration-300"
      >
        {langs ? "Join Now" : "Gabung Sekarang"}
      </a>
    </div>
  </div>
</Modal>

    </div>
  )
}

export default Affiliate
