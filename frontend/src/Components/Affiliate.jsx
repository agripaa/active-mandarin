import React, { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import { Modal } from 'antd'
import { useSelector } from "react-redux";
import { RiCheckboxCircleFill } from 'react-icons/ri';

const Affiliate = ({ text }) => {
  const {data, langs} = useSelector(state => state.LangReducer);
  const [isModalVisible, setIsModalVisible] = useState(false)

  const showModal = useCallback(() => {
    setIsModalVisible(true)
  }, [])

  const handleCancel = useCallback(() => {
    setIsModalVisible(false)
  }, [])

  return (
    <div className='container mx-auto py-16 px-5 relative w-full md:px-16'>
      <div className='flex items-center justify-center w-full h-full'>
        <div
          className='relative w-full flex justify-center bg-[#02264A] rounded-2xl p-10 md:p-14 lg:px-20'
          style={{
            backgroundImage: "url('/assets/card-texture.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <img
            src="/assets/affiliate-cropped.png"
            alt="Affiliate"
            className='absolute bottom-0 left-[-2%] h-auto w-[50%] object-cover z-10 hidden lg:block xl:w-[46%]'
          />
          <div className='absolute overflow-hidden w-full h-full top-0 left-0'>
            <div className='hidden absolute left-[-3%] -bottom-[19%] h-[83%] aspect-square rounded-full bg-[#FFCC00] lg:block xl:-bottom-[32%] xl:h-[112%] 2xl:-bottom-[50%] 2xl:h-[140%]' />
          </div>

          <div className='w-0 lg:w-[48%] xl:w-[45%]' />

          <div className='flex flex-col justify-center text-white w-full z-20 lg:max-w-lg lg:w-7/12'>
            <h2 className='font-semibold text-2xl md:text-[32px]'>{text.title}</h2>
            <ul className='flex flex-col gap-4 mt-6'>
              <li className='flex gap-2.5 items-center'>
                <RiCheckboxCircleFill color='#57D163' className='w-5 h-5 min-w-5 min-h-5' />
                <p>{langs ? "Additional Income" : "Penghasilan Tambahan"}</p>
              </li>
              <li className='flex gap-2.5 items-center'>
                <RiCheckboxCircleFill color='#57D163' className='w-5 h-5 min-w-5 min-h-5' />
                <p>{langs ? "Access to the Mandarin Learning Community and Remote Job Information" : "Akses ke Komunitas Belajar Mandarin dan Informasi Pekerjaan Jarak Jauh"}</p>
              </li>
              <li className='flex gap-2.5 items-center'>
                <RiCheckboxCircleFill color='#57D163' className='w-5 h-5 min-w-5 min-h-5' />
                <p>{langs ? "Opportunity to Join Free Programs from Active Mandarin" : "Kesempatan Bergabung dengan Program Gratis dari Active Mandarin"}</p>
              </li>
              <li className='flex gap-2.5 items-center'>
                <RiCheckboxCircleFill color='#57D163' className='w-5 h-5 min-w-5 min-h-5' />
                <p>{langs ? "Affiliate Development Program" : "Program Pengembangan Afiliasi"}</p>
              </li>
            </ul>
            <div className='mt-6'>
              <Link to={'/join-affiliate'} className='block'>
                <button
                  className="px-8 py-4 w-full bg-[#FFCC00] tracking-wide mt-2 text-base text-[#252525] font-semibold rounded-3xl transition-all duration-300 hover:bg-yellow-500 hover:text-black"
                >
                  {langs ? "Join Us" : "Gabung Sekarang"}
                </button>
              </Link>
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
  title={<span className='font-semibold text-xl'>{langs ? "Affiliate Program by Active Mandarin Indonesia" : "Program Afiliasi oleh Active Mandarin Indonesia"}</span>}
>
  <div className='pt-6'>
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
    <div className="text-start mt-4 mb-4">
      <h2 className='mb-6 font-semibold text-xl'>{langs ? "Join Our Affiliate By Active Mandarin Indonesia" : "Bergabunglah dengan Afiliasi Kami Dengan Active Mandarin Indonesia"}</h2>
      <a
        href="https://wa.me/+6282279506450"
        target="_blank"
        rel="noopener noreferrer"
        className="px-8 py-4 bg-[#FFCC00] text-base text-[#252525] font-semibold rounded-3xl hover:bg-yellow-500 transition-all duration-300"
      >
        {langs ? "Join Us" : "Gabung Sekarang"}
      </a>
    </div>
  </div>
</Modal>

    </div>
  )
}

export default Affiliate
