import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import Swal from 'sweetalert2';
import { Table, Button, Input, Select, Form, Upload, Switch } from "antd";
import { FaChevronRight } from "react-icons/fa";
import { RiAddFill, RiArrowLeftLine } from "react-icons/ri";
import { motion } from "motion/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from 'react-router-dom';
import { createUjian, getUjianById, updateUjian, getUjianBrandsByUjianId, getUjianSoal, deleteSoal } from "../../api/ujian"; 
import { getAllBrands } from "../../api/brand"; 


import { formatRupiah } from "../../utils/rupiahFormat";
import DashboardLayout from "../../Layouts/DashboardLayout";
import { UploadOutlined } from "@ant-design/icons";

const CreateExam = ({ dataProgram }) => {
  
  const { id } = useParams();
  const isEditMode = !!id;
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
  const [imagePreview, setImagePreview] = useState(null); 
  const [isFetchedOnce, setIsFetchedOnce] = useState(false);




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
          <div style={{ display: show === 'exam' ? 'block' : 'none' }}>
            <Exam
              setShow={setShow}
              typeData={typeData}
              questionsListening={questionsListening}
              questionsReading={questionsReading}
              questionsWriting={questionsWriting}
              setTypeData={setTypeData}                
              setQuestionsListening={setQuestionsListening}
              setQuestionsReading={setQuestionsReading}
              setQuestionsWriting={setQuestionsWriting}
              setTimeListening={setTimeListening}
              setTimeReading={setTimeReading}
              setTimeWriting={setTimeWriting}           
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
              imagePreview={imagePreview}
              setImagePreview={setImagePreview}
              level={level}
              setLevel={setLevel}
              programs={programs}
              setPrograms={setPrograms}
              isEditMode={isEditMode}  
              id={id}       
              isFetchedOnce={isFetchedOnce}
              setIsFetchedOnce={setIsFetchedOnce}
            />
          </div>
          <div style={{ display: show === 'listening' ? 'block' : 'none' }}>
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
            ujianId={id}
          />
          </div>
          <div style={{ display: show === 'reading' ? 'block' : 'none' }}>
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
                ujianId={id}
            />
          </div>
          <div style={{ display: show === 'writing' ? 'block' : 'none' }}>
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
              ujianId={id}
            />
          </div>
        </motion.div>
      </DashboardLayout>
    </>
  );
};

  const Exam = ({
    setShow,
    typeData,
    setTypeData,              
    questionsListening,
    setQuestionsListening,   
    questionsReading,
    setQuestionsReading,   
    questionsWriting,
    setQuestionsWriting,    
    title, setTitle,
    examDetails, setExamDetails,
    price, setPrice,
    priceCertif, setPriceCertif,
    discountPrice, setDiscountPrice,
    commission, setCommission,
    imageFile, setImageFile,
    imagePreview, setImagePreview,
    level, setLevel,
    programs, setPrograms,
    isEditMode, id,
    setTimeListening,
    setTimeReading,
    setTimeWriting,
    isFetchedOnce, setIsFetchedOnce
  }) => {
  const [form] = Form.useForm();
  const [programOptions, setProgramOptions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
  form.setFieldsValue({ programs });
  }, [programs]);

  useEffect(() => {
    if (title || examDetails || imagePreview || imageFile) return;

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
      if (examData.imagePreview) {
        setImagePreview(examData.imagePreview);
      }
    }
  }, []);

  useEffect(() => {
    const examData = {
      title,
      examDetails,
      price,
      priceCertif,
      discountPrice,
      commission,
      level,
      programs,
      imagePreview, 
    };
    localStorage.setItem("savedExam", JSON.stringify(examData));
  }, [title, examDetails, price, priceCertif, discountPrice, commission, level, programs, imagePreview]);


  useEffect(() => {
  const fetchProgramOptions = async () => {
    try {
      const res = await getAllBrands(1, 9999);
      console.log({res})
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

  useEffect(() => {
  if (!isEditMode || isFetchedOnce) return;

  const fetchUjian = async () => {
  try {
    const res = await getUjianById(id);
    if (!res.status) throw new Error("Gagal mengambil data ujian");

    const ujian = res.data;

    setTitle(ujian.nama_ujian || "");
    setExamDetails(ujian.desc || "");
    setPrice(ujian.harga_normal || "0");
    setPriceCertif(ujian.harga_certif || "0");
    setDiscountPrice(ujian.harga_diskon || "0");
    setCommission(ujian.commission || "0");
    setLevel(ujian.level || undefined);
    setImagePreview(ujian.ujian_img_url || null);

    const soalRes = await getUjianSoal(id);
    if (soalRes.status && soalRes.data) {
      const tipe = soalRes.data;

      // 🔧 Normalisasi jawaban (["1"] → option.id yang sesuai)
      const normalizeAnswerFromPosition = (questions) => {
        return questions.map((q) => {
          if (q.questionType === 'multiple-choice' && Array.isArray(q.answer)) {
            const newAnswer = q.answer.map(pos => {
              const index = parseInt(pos, 10) - 1;
              const opt = q.options?.[index];
              return opt?.id;
            }).filter(Boolean);
            return { ...q, answer: newAnswer };
          }
          return q;
        });
      };

      setTypeData(prev => ({
        listening: {
          ...prev.listening,
          id: tipe?.listening?.id,
          time: tipe?.listening?.time ?? 0,
          questionCount: tipe?.listening?.questions?.length ?? 0,
        },
        reading: {
          ...prev.reading,
          id: tipe?.reading?.id,
          time: tipe?.reading?.time ?? 0,
          questionCount: tipe?.reading?.questions?.length ?? 0,
        },
        writing: {
          ...prev.writing,
          id: tipe?.writing?.id,
          time: tipe?.writing?.time ?? 0,
          questionCount: tipe?.writing?.questions?.length ?? 0,
        }
      }));

      setQuestionsListening(normalizeAnswerFromPosition(tipe?.listening?.questions || []));
      setQuestionsReading(normalizeAnswerFromPosition(tipe?.reading?.questions || []));
      setQuestionsWriting(normalizeAnswerFromPosition(tipe?.writing?.questions || []));
      setTimeListening(tipe?.listening?.time ?? 0);
      setTimeReading(tipe?.reading?.time ?? 0);
      setTimeWriting(tipe?.writing?.time ?? 0);
    }

    const brandRes = await getUjianBrandsByUjianId(id);
    if (brandRes.status) {
      const brandIds = brandRes.data.map((item) => item.brand_id);
      setPrograms(brandIds);
      form.setFieldsValue({ programs: brandIds });
    }
  } catch (err) {
    console.error("Gagal memuat data ujian:", err);
    Swal.fire("Error", "Gagal memuat data ujian", "error");
  }
};


  fetchUjian().then(() => {
  setIsFetchedOnce(true); // ⬅️ hanya setelah fetch berhasil
});
}, [id]);

  const handleRupiahChange = useCallback((value, setter) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    setter(numericValue);
  }, []);

 const handleSubmit = async () => {
  try {
    await form.validateFields();

    const formData = new FormData();

  const prepareQuestionsWithFileRefs = (questions, tipe) => {
    const tipeId = typeData[tipe]?.id;
    return questions.map((q, idx) => {
      const isNew = !q.isFromDB; // ← pastikan flag soal baru

      const newSoal = {
        ...q,
        ...(isNew ? {} : { id: q.id }), // hanya kirim id jika soal dari DB
        tipe_ujian_id: tipeId,
      };

      if (q.id) {
      newSoal.id = q.id; // ⬅️ kirim ID-nya agar backend tahu ini soal lama
      }

      if (q.fileList && q.fileList.length > 0) {
        const fileNames = [];

        q.fileList.forEach((fileObj, fileIdx) => {
          const filenameRef = `${tipe}_file_${idx}_${fileIdx}`;
          formData.append(filenameRef, fileObj.originFileObj);
          fileNames.push(filenameRef);
        });

        newSoal.image = fileNames; // array of filenames
      }


      return newSoal;
    });
  };

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

    formData.append("ujian_brand", JSON.stringify(programs || []));
    formData.append("tipe_ujian", JSON.stringify(typeData));
    

    const updatedListening = prepareQuestionsWithFileRefs(questionsListening, "listening");
    const updatedReading = prepareQuestionsWithFileRefs(questionsReading, "reading");
    const updatedWriting = prepareQuestionsWithFileRefs(questionsWriting, "writing");

    formData.append("soal", JSON.stringify({
      listening: updatedListening,
      reading: updatedReading,
      writing: updatedWriting,
    }));

    const ujianData = isEditMode
    ? await updateUjian(id, formData)
    : await createUjian(formData);
    // ✅ pakai API helper

    console.log("SOAL YANG DIKIRIM:", {
      listening: updatedListening.length,
      reading: updatedReading.length,
      writing: updatedWriting.length,
    });


    if (!ujianData.status)
      throw new Error("Gagal memperbarui ujian");

    const ujianId = ujianData.data?.id || id;
    console.log("📦 Response update ujian:", ujianData);


    Swal.fire({
  title: "Berhasil!",
  text: isEditMode
    ? "Ujian dan soal berhasil diperbarui."
    : "Ujian dan soal berhasil dibuat.",
  icon: "success",
}).then(() => {
  localStorage.removeItem("savedExam");

  navigate("/dashboard/exam");
});


   } catch (err) {
  console.error("Gagal menyimpan:", err);
    
  // Deteksi kemungkinan bentuk error
    const errorMessage =
      err?.response?.data?.message || // dari axios error
      err?.message || // dari throw new Error()
      "Gagal menyimpan ujian dan soal."; // default

    Swal.fire({
      title: "Validasi Gagal",
      text: errorMessage,
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
                <Select.Option key={1} value={1}>HSK 1</Select.Option>
                <Select.Option key={2} value={2}>HSK 2</Select.Option>
                <Select.Option key={3} value={3}>HSK 3</Select.Option>
                <Select.Option key={4} value={4}>HSK 4</Select.Option>
                <Select.Option key={5} value={5}>HSK 5</Select.Option>
                <Select.Option key={6} value={6}>HSK 6</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="programs"
              label="Program Terkait"
              rules={[{ required: true, message: 'Pilih minimal satu program terkait' }]}
            >
              <Select
                mode="multiple"
                placeholder="Pilih Program Terkait"
                onChange={(val) => {
                  setPrograms(val);
                  form.setFieldsValue({ programs: val }); // sync dengan Form
                }}
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

            <Form.Item label="Harga Certificate" required>
              <Input value={formatRupiah(priceCertif)} onChange={(e) => handleRupiahChange(e.target.value, setPriceCertif)} placeholder="Masukkan Harga Certif" rules={[{ required: true, message: "Harga harus dimasukkan." }]} />
            </Form.Item>

            <Form.Item label="Harga Promo">
              <Input value={formatRupiah(discountPrice)} onChange={(e) => handleRupiahChange(e.target.value, setDiscountPrice)} placeholder="Masukkan Harga Promo (Opsional)" />
            </Form.Item>

            <Form.Item label="Komisi">
              <Input value={formatRupiah(commission)} onChange={(e) => handleRupiahChange(e.target.value, setCommission)} placeholder="Masukkan Harga Promo (Opsional)" />
            </Form.Item>

            <Upload
              maxCount={1}
              beforeUpload={() => false}
              onChange={({ fileList }) => {
                const file = fileList?.[0]?.originFileObj;

                if (file) {
                  const isAllowedType = ['image/jpeg', 'image/png', 'image/webp'].includes(file.type);
                  const isUnderSize = file.size <= 5 * 1024 * 1024;

                  if (!isAllowedType) {
                    alert("File harus berupa JPG, PNG, atau WebP.");
                    return;
                  }

                  if (!isUnderSize) {
                    alert("Ukuran file tidak boleh lebih dari 5MB.");
                    return;
                  }

                  const reader = new FileReader();
                  reader.onload = (e) => {
                    setImagePreview(e.target.result); // Base64 for display
                  };
                  reader.readAsDataURL(file);

                  setImageFile(file); // Asli File untuk submit
                } else {
                  setImageFile(null);
                  setImagePreview(null);
                }
              }}
            >
              <Button icon={<UploadOutlined />}>Pilih File</Button>
            </Upload>
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview Ujian"
                className="mt-2 max-w-xs rounded shadow"
              />
            )}




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

const QuestionComponent = React.memo(({ index, question, number, onChange, onDelete, ujianId }) => {
   const handleDelete = async (index) => {
  try {
    // Jika soal belum punya id dari DB, langsung hapus dari frontend
    if (!question.id || typeof question.id !== "number") {
      onDelete(index);
      return;
    }

    // Jika soal sudah disimpan, hapus dari backend
    const response = await deleteSoal(ujianId, question.id);

    if (response.status) {
      onDelete(index);
      Swal.fire({
        title: 'Soal Dihapus!',
        text: response.message,
        icon: 'success'
      });
    } else {
      Swal.fire({
        title: 'Gagal Menghapus Soal!',
        text: response.message,
        icon: 'error'
      });
    }
  } catch (error) {
    Swal.fire({
      title: 'Error!',
      text: 'Gagal menghapus soal',
      icon: 'error'
    });
  }
};



  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <div className="flex">
        <h4 className="text-xl font-semibold mb-3 w-1/2">
          {question.questionType === 'guide' ? `Panduan` : `Soal ${number}`}
        </h4>
        <div className="w-1/2 flex justify-end mb-3">
          <Button
            danger
            onClick={() => handleDelete(index)}
          >
            Hapus Soal
          </Button>
        </div>
      </div>
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
          multiple
          beforeUpload={() => false}
          fileList={question.fileList || []}
          onChange={({ fileList }) => {
            // Validasi semua file
            const validFiles = fileList.filter(file => {
              const isUnderSize = file.size <= 5 * 1024 * 1024;
              if (!isUnderSize) {
                alert(`${file.name} melebihi ukuran 5MB.`);
                return false;
              }
              return true;
            });

            // Generate preview untuk semua file (hanya jika ingin preview)
            validFiles.forEach(file => {
              const reader = new FileReader();
              reader.onload = (e) => {
                // Catatan: jika kamu hanya simpan `image`, ini akan tertimpa.
                // Lebih baik `image` jadi array base64 jika ingin preview banyak
                // Contoh: onChange(index, 'imagePreviews', [...prev, e.target.result])
              };
              reader.readAsDataURL(file.originFileObj);
            });

            // Simpan fileList yang valid ke state
            onChange(index, 'fileList', validFiles);
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

const DetailExam = ({ show, setShow, sendToParent, questions, setQuestions, time, setTime, ujianId }) => {
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

  const handleDelete = useCallback((index) => {
  setQuestions(prev => {
    const updated = [...prev];
    updated.splice(index, 1); // hapus satu item
    return updated; // ❌ jangan reset id! biarkan tetap pakai id dari DB
  });
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
            onDelete={handleDelete}
            ujianId={ujianId}
          />
        ))}
        <Button type="default" className="w-fit text-blue-500 rounded-2xl" size="large" variant="outlined" onClick={() => setQuestions([...questions, { id: undefined, question: '', questionType: 'essay', explanation: '', options: [], isMultipleAnswer: false, answer: [], image: '', guideForQuestion: { start: 0, end: 0, guide: '' }, point: 0 }])}>
          Tambahkan Soal
        </Button>
      </div>
    </>
  )
}

export default CreateExam;