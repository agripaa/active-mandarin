import React, { useState, useEffect, useCallback, useMemo } from "react";
import Swal from 'sweetalert2';
import { Table, Button, Input, Select, Form, Upload, Switch } from "antd";
import { FaChevronRight } from "react-icons/fa";
import { RiAddFill, RiArrowLeftLine } from "react-icons/ri";
import { motion } from "motion/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from 'react-router-dom';
import { createUjian, getUjianById, updateUjian } from "../../api/ujian"; 
import { getUjianBrandByUjianId } from "../../api/ujianBrand"; 
import { getAllBrands } from "../../api/brand"; 
import { createSoal, getSoalByTipeUjianId, updateSoal } from '../../api/soal';
import { createTipeUjian, getTipeUjianByUjianId, updateTipeUjian } from '../../api/tipeUjian';
import { useParams } from 'react-router-dom';

import { formatRupiah } from "../../utils/rupiahFormat";
import DashboardLayout from "../../Layouts/DashboardLayout";
import { UploadOutlined } from "@ant-design/icons";

const CreateExam = ({ dataProgram }) => {
  // type 'exam' | 'listening' | 'reading' | 'writing'
  const [show, setShow] = useState('exam');
  const [questionsListening, setQuestionsListening] = useState([]);
  const [questionsReading, setQuestionsReading] = useState([]);
  const [questionsWriting, setQuestionsWriting] = useState([]);
  const [timeListening, setTimeListening] = useState(0);
  const [timeReading, setTimeReading] = useState(0);
  const [timeWriting, setTimeWriting] = useState(0);

  const [title, setTitle] = useState("");
  const [examDetails, setExamDetails] = useState("");
  const [price, setPrice] = useState("0");
  const [priceCertif, setPriceCertif] = useState("0");
  const [discountPrice, setDiscountPrice] = useState("0");
  const [commission, setCommission] = useState("0");
  const [level, setLevel] = useState(undefined); 
  const [programs, setPrograms] = useState([]);  
  const [imageFile, setImageFile] = useState(null);
  const [previewImageUrl, setPreviewImageUrl] = useState("");


  const [typeData, setTypeData] = useState({
    listening: {
      title: "听力 - Mendengar",
      time: 0,
      questionCount: 0,
    },
    reading: {
      title: "悦读 - Membaca",
      time: 0,
      questionCount: 0,
    },
    writing: {
      title: "书写 - Menulis",
      time: 0,
      questionCount: 0,
    }
  });

  useEffect(() => {
    console.log("Type Data Updated:", questionsListening, questionsReading, questionsWriting, typeData);
  }, [questionsListening, questionsReading, questionsWriting, typeData]);

  return (
    <>
      <DashboardLayout>
        <motion.div
          key={show}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.5 }}
        >
          {show === 'exam' && <Exam
          setShow={setShow}
          typeData={typeData}
          setTypeData={setTypeData} // ✅ tambahkan ini
          isEditMode={true}
          previewImageUrl={previewImageUrl}
          setPreviewImageUrl={setPreviewImageUrl}
          questionsListening={questionsListening}
          setQuestionsListening={setQuestionsListening} // ✅
          questionsReading={questionsReading}
          setQuestionsReading={setQuestionsReading} // ✅
          questionsWriting={questionsWriting}
          setQuestionsWriting={setQuestionsWriting} // ✅
          timeListening={timeListening}
          setTimeListening={setTimeListening} // ✅
          timeReading={timeReading}
          setTimeReading={setTimeReading} // ✅
          timeWriting={timeWriting}
          setTimeWriting={setTimeWriting} // ✅
          title={title}
          setTitle={setTitle}
          examDetails={examDetails}
          setExamDetails={setExamDetails}
          price={price}
          setPrice={setPrice}
          priceCertif={priceCertif}
          setPriceCertif={setPriceCertif}
          discountPrice={discountPrice}
          setDiscountPrice={setDiscountPrice}
          commission={commission}
          setCommission={setCommission}
          imageFile={imageFile}
          setImageFile={setImageFile}
          level={level}
          setLevel={setLevel}
          programs={programs}
          setPrograms={setPrograms}
        />}
          {show === 'listening' && (
            <DetailExam
              show={'listening'}
              setShow={setShow}
              questions={questionsListening}
              setQuestions={setQuestionsListening}
              time={timeListening}
              setTime={setTimeListening}
              sendToParent={(time, questionCount) => setTypeData(prev => ({
                ...prev,
                listening: {
                  ...prev.listening,
                  time: time,
                  questionCount: questionCount,
                }
              }))} 
            />
          )}
          {show === 'reading' && (
            <DetailExam
              show={'reading'}
              setShow={setShow}
              questions={questionsReading}
              setQuestions={setQuestionsReading}
              time={timeReading}
              setTime={setTimeReading}
              sendToParent={(time, questionCount) => setTypeData(prev => ({
                ...prev,
                reading: {
                  ...prev.reading,
                  time: time,
                  questionCount: questionCount,
                }
              }))}
            />
          )}
          {show === 'writing' && (
            <DetailExam
              show={'writing'}
              setShow={setShow}
              questions={questionsWriting}
              setQuestions={setQuestionsWriting}
              time={timeWriting}
              setTime={setTimeWriting}
              sendToParent={(time, questionCount) => setTypeData(prev => ({
                ...prev,
                writing: {
                  ...prev.writing,
                  time: time,
                  questionCount: questionCount,
                }
              }))}
            />
          )}
        </motion.div>
      </DashboardLayout>
    </>
  );
};

  const Exam = ({
  setShow,
  typeData,
  setTypeData, // ✅

  questionsListening,
  setQuestionsListening, // ✅
  questionsReading,
  setQuestionsReading, // ✅
  questionsWriting,
  setQuestionsWriting, // ✅

  timeListening,
  setTimeListening, // ✅
  timeReading,
  setTimeReading, // ✅
  timeWriting,
  setTimeWriting, // ✅

  isEditMode,
  title, setTitle,
  examDetails, setExamDetails,
  price, setPrice,
  priceCertif, setPriceCertif,
  discountPrice, setDiscountPrice,
  commission, setCommission,
  imageFile, setImageFile,
  level, setLevel,
  programs, setPrograms,
  previewImageUrl, setPreviewImageUrl
}) => {

  const [form] = Form.useForm();
  const [programOptions, setProgramOptions] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();


  useEffect(() => {
    // Load saved exam data from localStorage
    const savedExam = localStorage.getItem("savedExam");
    if (savedExam) {
      const examData = JSON.parse(savedExam);
      setTitle(examData.title || "");
      setExamDetails(examData.examDetails || "");
      setPrice(examData.price || "0");
      setPriceCertif(examData.priceCertif || "0");
      setDiscountPrice(examData.discountPrice || "0");
      setCommission(examData.commission || "0");
      setLevel(examData.level || undefined);
      setPrograms(examData.programs || []);
    }
  }, []);

  useEffect(() => {
    // Save exam data to localStorage whenever it changes
    const examData = {
      title,
      examDetails,
      price,
      priceCertif,
      discountPrice,
      commission,
      level,
      programs,
    };
    localStorage.setItem("savedExam", JSON.stringify(examData));
  }, [title, examDetails, price, priceCertif, discountPrice, commission, level, programs]);

  useEffect(() => {
  const fetchProgramOptions = async () => {
    try {
      const res = await getAllBrands();
      if (res.status) {
        const filtered = res.data.filter((brand) => brand.category_brand === "program");
        setProgramOptions(filtered);
      }
    } catch (err) {
      console.error("Gagal memuat data program:", err);
    }
  };

  fetchProgramOptions();
}, []);


  const handleRupiahChange = useCallback((value, setter) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    setter(numericValue);
  }, []);

useEffect(() => {
  const fetchEditData = async () => {
    setImageFile(null); // Kosongkan upload baru

    try {
      const res = await getUjianById(id);
      if (res.status) {
        const data = res.data;
        setPreviewImageUrl(data.ujian_img);
        setTitle(data.nama_ujian);
        setExamDetails(data.desc);
        setPrice(String(data.harga_normal));
        setPriceCertif(String(data.harga_certif));
        setDiscountPrice(String(data.harga_diskon));
        setCommission(String(data.commission));
        setLevel(data.level);

        const brandRes = await getUjianBrandByUjianId(id);
        if (brandRes.status) {
          const brandIds = brandRes.data.map((item) => item.brand_id);
          setPrograms(brandIds);
        }

        // Ambil data tipe ujian
        const tipeUjianRes = await getTipeUjianByUjianId(id);
        if (tipeUjianRes.status) {
          const tipeUjianData = tipeUjianRes.data;

          const newTypeData = { ...typeData };

          for (const tipe of tipeUjianData) {
            const { category_ujian, time, total_soal, id: tipeUjianId } = tipe;

            // Update waktu dan jumlah soal
            newTypeData[category_ujian] = {
              ...newTypeData[category_ujian],
              time: time,
              questionCount: total_soal,
            };

            // Ambil soal untuk tipe ujian ini
            const soalRes = await getSoalByTipeUjianId(tipeUjianId);
            if (soalRes.status) {
              const soalData = soalRes.data.map((soal) => ({
                id: soal.id,
                question: soal.pertanyaan,
                questionType: soal.tipe_soal,
                explanation: soal.penjelasan,
                options: soal.options || [],
                isMultipleAnswer: soal.mutiple,
                answer: soal.jawaban_benar ? soal.jawaban_benar.split(';') : [],
                image: soal.file_soal || '',
                guideForQuestion: {
                  start: soal.soal_awal || 0,
                  end: soal.soal_akhir || 0,
                  guide: soal.guide || '',
                },
                point: soal.point_soal || 0,
                tipe_ujian_id: tipeUjianId,
              }));

              // Set state soal berdasarkan kategori
              if (category_ujian === 'listening') {
                setQuestionsListening(soalData);
                setTimeListening(time);
              } else if (category_ujian === 'reading') {
                setQuestionsReading(soalData);
                setTimeReading(time);
              } else if (category_ujian === 'writing') {
                setQuestionsWriting(soalData);
                setTimeWriting(time);
              }
            }
          }

          setTypeData(newTypeData);
        }
      }
    } catch (err) {
      console.error("Gagal memuat data edit:", err);
    }
  };

  if (isEditMode && id && programOptions.length > 0) {
    fetchEditData();
  }
}, [isEditMode, id, programOptions]);
 

const handleSubmit = async () => {
  try {
    await form.validateFields();

    // --- [1] Siapkan form data ujian ---
    const formData = new FormData();
    formData.append("nama_ujian", title);
    formData.append("desc", examDetails);
    formData.append("level", level);
    formData.append("harga_normal", price);
    formData.append("harga_certif", priceCertif);
    formData.append("harga_diskon", discountPrice);
    formData.append("commission", commission);
    formData.append("total_skor", 100);

    if (imageFile instanceof File) {
      formData.append("ujian_img", imageFile);
    }

    formData.append("ujian_brand", JSON.stringify(programs));
    formData.append("tipe_ujian", JSON.stringify(typeData));

    let ujianId;

    // --- [2] Buat atau update ujian ---
    if (isEditMode && id) {
      const ujianUpdate = await updateUjian(id, formData);
      if (!ujianUpdate.status || !ujianUpdate.data?.id) throw new Error("Gagal memperbarui ujian");
      ujianId = ujianUpdate.data.id;
    } else {
      const ujianCreate = await createUjian(formData);
      if (!ujianCreate.status || !ujianCreate.result?.id) throw new Error("Gagal membuat ujian");
      ujianId = ujianCreate.result.id;
    }

    // --- [3] Dapatkan tipe ujian lama (jika edit) ---
      let existingTipeUjian = [];
      if (isEditMode && id) {
        const tipeUjianRes = await getTipeUjianByUjianId(id);
        if (tipeUjianRes.status) {
          // Ambil hanya satu tipe ujian per kategori
          const seen = new Set();
          existingTipeUjian = tipeUjianRes.data.filter((item) => {
            if (seen.has(item.category_ujian)) return false;
            seen.add(item.category_ujian);
            return true;
          });
        }
      }


    // --- [4] Simpan atau update tipe ujian ---
    const tipeUjianResponse = [];
    for (const type of ['listening', 'reading', 'writing']) {
      const tipeLama = existingTipeUjian.find((t) => t.category_ujian === type);
      const tipePayload = {
        category_ujian: type,
        time: typeData[type].time,
        total_soal: typeData[type].questionCount,
        ujian_id: ujianId,
        total_skor_tipe: 0
      };

      let res;
      if (tipeLama) {
        res = await updateTipeUjian(tipeLama.id, tipePayload);
      } else {
        res = await createTipeUjian(tipePayload);
      }

if (!res.status) {
  if (res.message?.includes("sudah ada")) {
    // Ambil tipe yang sudah ada
    const fallback = await getTipeUjianByUjianId(ujianId);
    const match = fallback.data.find(item => item.category_ujian === type);
    if (match) {
      const update = await updateTipeUjian(match.id, tipePayload);
      if (update.status) {
        tipeUjianResponse.push({ type, id: update.data.id });
        continue; // lanjut ke kategori berikutnya
      }
    }
  }
  // Kalau bukan error duplikat, baru munculkan error
  throw new Error(`Gagal menyimpan tipe ujian ${type}`);
}


    }

    const tipeUjianMap = {};
    tipeUjianResponse.forEach(item => {
      tipeUjianMap[item.type] = item.id;
    });

    // --- [5] Siapkan soal berdasarkan tipe ---
    const questionsByType = {
      listening: questionsListening,
      reading: questionsReading,
      writing: questionsWriting
    };

    let soalIndex = 1;

    for (const type of ['listening', 'reading', 'writing']) {
      const questions = questionsByType[type];

      for (const q of questions) {
        if (q.questionType === 'guide') continue;

        const soalForm = new FormData();
        soalForm.append('index_soal', soalIndex++);
        soalForm.append('pertanyaan', q.question);
        soalForm.append('tipe_soal', q.questionType);
        soalForm.append('penjelasan', q.explanation || '');
        soalForm.append('mutiple', q.isMultipleAnswer);
        soalForm.append('point_soal', q.point || 0);
        soalForm.append('jawaban_benar', q.answer.join(';'));
        soalForm.append('soal_awal', q.guideForQuestion?.start || '');
        soalForm.append('soal_akhir', q.guideForQuestion?.end || '');
        soalForm.append('skor_soal', q.point || 0);
        soalForm.append('tipe_ujian_id', q.tipe_ujian_id ?? tipeUjianMap[type]); // ✅ fallback
        soalForm.append('ujian_id', ujianId);

        if (q.file instanceof File) {
          soalForm.append('file_soal', q.file);
        }

const isOldSoal = typeof q.id === 'number' && String(q.id).startsWith('db_');

        // --- [6] Buat atau update soal ---
       if (isEditMode && isOldSoal) {
      const res = await updateSoal(q.id, soalForm);
      if (!res.status) throw new Error(`Gagal update soal: ${q.id}`);
    } else {
      const res = await createSoal(soalForm);
      if (!res.status) throw new Error(`Gagal create soal`);
  }

      }
    }

    // --- [7] Berhasil ---
    Swal.fire({
      title: "Berhasil!",
      text: isEditMode ? "Ujian berhasil diperbarui." : "Ujian berhasil dibuat.",
      icon: "success",
    }).then(() => {
      localStorage.removeItem("savedExam");
      navigate("/dashboard/exam");
    });

  } catch (err) {
    console.error("Gagal menyimpan:", err);
    Swal.fire({
      title: "Validasi Gagal",
      text: err?.message || "Gagal menyimpan ujian dan soal.",
      icon: "error",
    });
  }
};



const totalSoal = typeData.listening.questionCount + typeData.reading.questionCount + typeData.writing.questionCount;
const totalWaktu = Number(typeData.listening.time) + Number(typeData.reading.time) + Number(typeData.writing.time);



  return (
    <>
      <div className="flex flex-row justify-between gap-5 pt-2 pb-6 px-4 lg:gap-10">
        {/* judul ujian */}
        <Input
          className="w-full"
          placeholder="Masukkan Judul Ujian"
          value={title}
          size="large"
          onChange={(e) => setTitle(e.target.value)}
          rules={[{ required: true, message: "Judul ujian harus dipilih." }]}
        />
        <Button className="bg-[#FFCC00] text-black" size="large" onClick={handleSubmit}>
          Simpan
        </Button>
      </div>
      <div className="flex flex-col-reverse xl:flex-row gap-8 p-4">
        <div className="bg-white shadow rounded-xl w-full p-6">
          <Form form={form} layout="vertical">
            <Form.Item label="Detail Produk">
              <ReactQuill value={examDetails} onChange={setExamDetails} theme="snow" />
            </Form.Item>

            <Form.Item label="Level">
              <Select placeholder="Pilih Level Ujian" value={level} onChange={(val) => setLevel(val)}>
                <Select.Option key={1} value={1}>{1}</Select.Option>
                <Select.Option key={2} value={2}>{2}</Select.Option>
                <Select.Option key={3} value={3}>{3}</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              // name="programs"
              label="Program Terkait"
              // initialValue={programs}
            >
             <Select
                mode="multiple"
                placeholder="Pilih Program Terkait"
                value={programs}
                onChange={(val) => setPrograms(val)}
                allowClear
              >
                {programOptions.map((brand) => (
                  <Select.Option key={brand.id} value={brand.id}>
                    {brand.variant || brand.nama_brand || `Brand ${brand.id}`}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>


            <Form.Item label="Harga Normal" required>
              <Input value={formatRupiah(price)} onChange={(e) => handleRupiahChange(e.target.value, setPrice)} placeholder="Masukkan Harga Normal" rules={[{ required: true, message: "Harga normal harus dimasukkan." }]} />
            </Form.Item>

            <Form.Item label="Harga + Certif" required>
              <Input value={formatRupiah(priceCertif)} onChange={(e) => handleRupiahChange(e.target.value, setPriceCertif)} placeholder="Masukkan Harga Certif" rules={[{ required: true, message: "Harga harus dimasukkan." }]} />
            </Form.Item>

            <Form.Item label="Harga Promo">
              <Input value={formatRupiah(discountPrice)} onChange={(e) => handleRupiahChange(e.target.value, setDiscountPrice)} placeholder="Masukkan Harga Promo (Opsional)" />
            </Form.Item>

            <Form.Item label="Komisi">
              <Input value={formatRupiah(commission)} onChange={(e) => handleRupiahChange(e.target.value, setCommission)} placeholder="Masukkan Harga Promo (Opsional)" />
            </Form.Item>

            {/* Bagian upload image belum ada */}
            <Form.Item label="Upload Gambar Ujian">
              <Upload
                maxCount={1}
                beforeUpload={() => false}
                fileList={
                  imageFile
                    ? [{ uid: "-1", name: imageFile.name, status: "done" }]
                    : previewImageUrl
                    ? [{
                        uid: "-1",
                        name: previewImageUrl.split("/").pop(), // ✅ ambil nama file dari URL
                        status: "done",
                        url: previewImageUrl
                      }]
                    : []
                }
                onChange={(info) => {
                  if (info.fileList.length > 0) {
                    const file = info.fileList[0].originFileObj;
                    setImageFile(file); // user upload baru
                    setPreviewImageUrl(""); // hapus preview lama
                  } else {
                    setImageFile(null);
                  }
                }}
                onPreview={() => {
                  if (previewImageUrl) {
                    window.open(previewImageUrl, "_blank");
                  }
                }}
              >
                <Button icon={<UploadOutlined />}>Pilih File</Button>
              </Upload>
            </Form.Item>

          </Form>
        </div>
        <div className="bg-white shadow rounded-xl p-6 w-full h-fit xl:w-fit xl:min-w-96">
          {/* detail ujian shows title, total question, and total time in minute */}
          <h2 className="text-xl font-medium">Detail Ujian</h2>
          <div className="mt-4">
            <p className="text-base font-medium flex justify-between">Total Soal <span className="font-semibold">{totalSoal}</span></p>
            <p className="text-base font-medium flex justify-between">Total Waktu (menit) <span className="font-semibold">{totalWaktu}</span></p>
          </div>
        </div>
      </div>
      <div className="p-4 flex flex-col gap-4">
        <h2 className="text-fiord-600 font-semibold">Tipe Ujian</h2>
        <div className="flex flex-col gap-4">
          <div className="bg-white p-6 w-full flex flex-col justify-between items-center rounded-3xl shadow gap-4 sm:gap-0 sm:flex-row">
            <h3 className="text-base lg:text-xl font-semibold">听力 - Mendengar</h3>
            <div className="flex items-center gap-4">
              <Button size="large" className="rounded-2xl">
                {typeData.listening.time} Menit
              </Button>
              <Button size="large" className="rounded-2xl">
                {typeData.listening.questionCount} Soal
              </Button>
              <Button size="large" onClick={() => setShow('listening')} className="rounded-2xl p-2.5 aspect-1 text-blue-500">
                <FaChevronRight className="text-base" />
              </Button>
            </div>
          </div>
          <div className="bg-white p-6 w-full flex flex-col justify-between items-center rounded-3xl shadow gap-4 sm:gap-0 sm:flex-row">
            <h3 className="text-base lg:text-xl font-semibold">悦读 - Membaca</h3>
            <div className="flex items-center gap-4">
              <Button size="large" className="rounded-2xl">
                {typeData.reading.time} Menit
              </Button>
              <Button size="large" className="rounded-2xl">
                {typeData.reading.questionCount} Soal
              </Button>
              <Button size="large" onClick={() => setShow('reading')} className="rounded-2xl p-2.5 aspect-1 text-blue-500">
                <FaChevronRight className="text-base" />
              </Button>
            </div>
          </div>
          <div className="bg-white p-6 w-full flex flex-col justify-between items-center rounded-3xl shadow gap-4 sm:gap-0 sm:flex-row">
            <h3 className="text-base lg:text-xl font-semibold">书写 - Menulis</h3>
            <div className="flex items-center gap-4">
              <Button size="large" className="rounded-2xl">
                {typeData.writing.time} Menit
              </Button>
              <Button size="large" className="rounded-2xl">
                {typeData.writing.questionCount} Soal
              </Button>
              <Button size="large" onClick={() => setShow('writing')} className="rounded-2xl p-2.5 aspect-1 text-blue-500">
                <FaChevronRight className="text-base" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const QuestionComponent = React.memo(({ index, question, number, onChange }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h4 className="text-xl font-semibold mb-3">
        {question.questionType === 'guide' ? `Panduan` : `Soal ${number}`}
      </h4>
      {question.questionType === 'essay' && (
        <>
          <ReactQuill
            value={question.question}
            onChange={(value) => onChange(index, 'question', value)}
            theme="snow"
          />
        </>
      )}
      {question.questionType === 'multiple-choice' && (
        <>
          <ReactQuill
            value={question.question}
            onChange={(value) => onChange(index, 'question', value)}
            theme="snow"
          />
          <div className="w-full my-4">
            <div className="flex flex-col gap-2">
              {question.options.map((option, optIndex) => (
                <div key={option.id} className="flex items-center gap-2">
                  <input
                    type={question.isMultipleAnswer ? 'checkbox' : 'radio'}
                    name={`correct-answer-${index}`}
                    checked={question.answer.includes(option.id)}
                    onChange={() => {
                      const newAnswer = question.isMultipleAnswer
                        ? question.answer.includes(option.id)
                          ? question.answer.filter(id => id !== option.id)
                          : [...question.answer, option.id]
                        : [option.id];
                      onChange(index, 'answer', newAnswer);
                    }}
                    className="cursor-pointer accent-blue-500"
                  />
                  <Input
                    value={option.option}
                    onChange={(e) => {
                      const newOptions = [...question.options];
                      newOptions[optIndex].option = e.target.value;
                      onChange(index, 'options', newOptions);
                    }}
                    placeholder={`Pilihan ${optIndex + 1}`}
                    className="w-full"
                  />
                  <Button
                    type="link"
                    danger
                    onClick={() => {
                      const newOptions = question.options.filter((_, i) => i !== optIndex);
                      // If the deleted option was the correct answer, reset answer
                      const newAnswer = question.answer === option.id ? [] : [question.answer];
                      onChange(index, 'options', newOptions);
                      onChange(index, 'answer', newAnswer);
                    }}
                    >
                    Hapus
                  </Button>
                </div>
              ))}
            </div>
            <Button
              type="link"
              onClick={() => {
                const newOption = { id: question.options.length + 1, option: '' };
                onChange(index, 'options', [...question.options, newOption]);
              }}
              icon={<RiAddFill />}
            >
              Tambahkan Pilihan
            </Button>
          </div>
          <div className="w-full my-4 flex flex-col gap-2">
            <label className="text-base font-medium">Penjelasan</label>
            <ReactQuill
              value={question.explanation}
              onChange={(value) => onChange(index, 'explanation', value)}
              theme="snow"
            />
          </div>
        </>
      )}
      {question.questionType === 'order-arrange' && (
        <>
          <ReactQuill
            value={question.question}
            onChange={(value) => onChange(index, 'question', value)}
            theme="snow"
          />
          <div className="w-full my-4 flex flex-col gap-2">
            <label className="text-base font-medium">Jawaban</label>
            <div className="flex flex-row flex-wrap">
              {question.answer[0]?.split('; ').map((ans, ansIndex) => (
                ans && (
                  <Button
                    key={ansIndex}
                    className="rounded-2xl px-6 py-5 mr-2 mb-2 text-blue-500"
                    // size="middle"
                    onClick={() => {}}
                  >
                    {ans}
                  </Button>
                )
              ))}
            </div>
            <Input.TextArea
              value={question.answer}
              onChange={(e) => {
                onChange(index, 'answer', [e.target.value]);
              }}
              placeholder="Masukkan jawaban yang benar dengan setiap kata dipisahkan dengan titik koma (;). cth: Active; Mandarin; Indonesia"
            />
          </div>
        </>
      )}
      {question.questionType === 'guide' && (
        <>
          <ReactQuill
            value={question.guideForQuestion.guide}
            onChange={(value) => onChange(index, 'guideForQuestion', { ...question.guideForQuestion, guide: value })}
            theme="snow"
          />
        </>
      )}
      <div className="w-full h-0.5 bg-fiord-200 my-4" />
      <div className="flex flex-col justify-start items-start gap-2 md:gap-6 md:flex-row md:items-center">
       <Upload
          maxCount={1}
          beforeUpload={() => false}
          onChange={(info) => {
            if (info.fileList.length > 0) {
              const file = info.fileList[0].originFileObj;
              onChange(index, 'file', file); // ✅ Tambah baris ini untuk menyimpan file
              const reader = new FileReader();
              reader.onload = (e) => {
                onChange(index, 'image', e.target.result); // tetap tampilkan preview jika perlu
              };
              reader.readAsDataURL(file);
            } else {
              onChange(index, 'file', null); // ✅ Tambah ini untuk reset
              onChange(index, 'image', '');
            }
          }}
        >
          <Button icon={<UploadOutlined />}>Upload File</Button>
        </Upload>
        {question.questionType === 'multiple-choice' && (
          <div className="flex flex-row items-center">
            <Switch
              checked={question.isMultipleAnswer}
              onChange={(checked) => {
                onChange(index, 'isMultipleAnswer', checked);
                onChange(index, 'answer', checked ? [question.answer[0]] : []); // Reset answer if switching to single answer
              }}
              className="mr-2"
            />
            <span className="text-sm font-medium">Jawaban Banyak</span>
          </div>
        )}
        {question.questionType === 'guide' && (
          <div className="flex flex-row items-center gap-2">
            <Input
              type="number"
              value={question.guideForQuestion.start}
              onChange={(e) => onChange(index, 'guideForQuestion', { ...question.guideForQuestion, start: e.target.value })}
              placeholder="cth: 15"
              className="w-24"
            />
            <span className="text-sm font-medium">-</span>
            <Input
              type="number"
              value={question.guideForQuestion.end}
              onChange={(e) => onChange(index, 'guideForQuestion', { ...question.guideForQuestion, end: e.target.value })}
              placeholder="cth: 15"
              className="w-24"
            />
            <span className="text-sm font-medium">Tampilkan pada soal</span>
          </div>
        )}
        {(question.questionType === 'multiple-choice' || question.questionType === 'order-arrange') && (
          <div className="flex flex-row items-center gap-2">
            <Input
              type="number"
              value={question.point}
              onChange={(e) => onChange(index, 'point', e.target.value)}
              placeholder="cth: 15"
              className="w-24"
            />
            <span className="text-sm font-medium">Poin</span>
          </div>
        )}
        <div className="flex flex-row items-center gap-2">
          <Select
            value={question.questionType}
            onChange={(value) => onChange(index, 'questionType', value)}
            className="w-40"
            options={[
              { label: 'Essay', value: 'essay' },
              { label: 'Pilihan Ganda', value: 'multiple-choice' },
              { label: 'Urutkan', value: 'order-arrange' },
              { label: 'Panduan', value: 'guide' },
            ]}
          />
          <span className="text-sm font-medium">
            Tipe Ujian
          </span>
        </div>
      </div>
    </div>
  );
});

const DetailExam = ({ show, setShow, sendToParent, questions, setQuestions, time, setTime }) => {
  /**
   * State to manage questions and time for the exam.
   * {
   *    id: number;
   *    question: string;
   *    questionType: 'essay' | 'multiple-choice' | 'order-arrange' | 'guide';
   *    explanation: string; //  for multiple-choice
   *    options: {id: number; option: string}[]; // for multiple-choice
   *    isMultipleAnswer: boolean; // for multiple-choice
   *    answer: number[]; // for multiple-choice, the correct answer(s) id
   *    image: string; // optional, for image question
   *    guideForQuestion: {start: number; end: number; guide: string}; // for guide questions
   *    point: number; // optional, for scoring
   * }
   */

  const questionLength = useMemo(() => questions.length, [questions]);
  // Used to avoid question with 'guide' type to be included in the question number
  const questionNumberArray = useMemo(() => {
    let count = 0;
    return questions.reduce((acc, question) => {
      if (question.questionType === 'guide') {
        acc.push(null); // Push null for guide questions to skip them in numbering
        return acc;
      }
      count++;
      acc.push(count);
      return acc;
    }, []);
  }, [questions]);

  useEffect(() => {
    sendToParent(time ?? 0, questionNumberArray.filter(num => num !== null).length);
  }, [questionNumberArray, time]);

  const title = useMemo(() => {
    switch (show) {
      case 'listening':
        return '听力 - Mendengar';
      case 'reading':
        return '悦读 - Membaca';
      case 'writing':
        return '书写 - Menulis';
      default:
        return '';
    }
  }, [show]);

  // Function to handle all changes
  const onChange = useCallback((index, field, value) => {
    setQuestions(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    })
  }, []);

  return (
    <>
      <div className="flex flex-col gap-4 p-4 items-start">
        <Button type="link" onClick={() => setShow('exam')} className="items-center text-sm font-medium">
          <RiArrowLeftLine className="text-lg" /> Kembali
        </Button>
        <div className="bg-white p-6 w-full flex flex-col justify-between items-center rounded-3xl shadow gap-4 sm:gap-0 sm:flex-row">
          <h3 className="text-base lg:text-xl font-semibold">{title}</h3>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Input size="large" className="rounded-2xl w-24" placeholder="cth: 15" type="number" value={time} onChange={(e => setTime(e.target.value))} />
              <span className="text-sm font-medium">Menit</span>
            </div>
            <Button size="large" className="rounded-2xl">
              {questionNumberArray.filter(num => num !== null).length} Soal
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 p-4">
        {questions.map((q, index) => (
          <QuestionComponent
            key={q.id}
            index={index}
            question={q}
            number={questionNumberArray[index]}
            onChange={onChange}
          />
        ))}
        <Button type="default" className="w-fit text-blue-500 rounded-2xl" size="large" variant="outlined" onClick={() => setQuestions([...questions, { id: questionLength + 1, question: '', questionType: 'essay', explanation: '', options: [], isMultipleAnswer: false, answer: [], image: '', guideForQuestion: { start: 0, end: 0, guide: '' }, point: 0 }])}>
          Tambahkan Soal
        </Button>
      </div>
    </>
  )
}

export default CreateExam;
