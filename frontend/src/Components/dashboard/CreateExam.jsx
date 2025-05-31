import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Table, Button, Input, Select, Form, Upload, Switch } from "antd";
import { FaChevronRight } from "react-icons/fa";
import { RiAddFill, RiArrowLeftLine } from "react-icons/ri";
import { motion } from "motion/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

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
          {show === 'exam' && <Exam setShow={setShow} typeData={typeData} />}
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

const Exam = ({ setShow, typeData }) => {
  const [form] = Form.useForm();
  const [title, setTitle] = useState("");
  const [examDetails, setExamDetails] = useState("");
  const [price, setPrice] = useState("0");
  const [priceCertif, setPriceCertif] = useState("0");
  const [discountPrice, setDiscountPrice] = useState("0");
  const [commission, setCommission] = useState("0");

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
    };
    localStorage.setItem("savedExam", JSON.stringify(examData));
  }, [title, examDetails, price, priceCertif, discountPrice, commission]);

  const handleRupiahChange = useCallback((value, setter) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    setter(numericValue);
  }, []);

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
        />
        <Button className="bg-[#FFCC00] text-black" size="large" onClick={() => form.submit()}>
          Simpan
        </Button>
      </div>
      <div className="flex flex-col-reverse xl:flex-row gap-8 p-4">
        <div className="bg-white shadow rounded-xl w-full p-6">
          <Form form={form} layout="vertical">
            <Form.Item label="Detail Produk">
              <ReactQuill value={examDetails} onChange={setExamDetails} theme="snow" />
            </Form.Item>

            <Form.Item name="level" label="Level">
              <Select placeholder="Pilih Level Ujian">
                <Select.Option key={1} value={1}>{1}</Select.Option>
                <Select.Option key={2} value={2}>{2}</Select.Option>
                <Select.Option key={3} value={3}>{3}</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item name="program" label="Program Terkait">
              <Select placeholder="Pilih Program Terkait">
                <Select.Option key={1} value={1}>{1}</Select.Option>
                <Select.Option key={2} value={2}>{2}</Select.Option>
                <Select.Option key={3} value={3}>{3}</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item label="Harga Normal" required>
              <Input value={formatRupiah(price)} onChange={(e) => handleRupiahChange(e.target.value, setPrice)} placeholder="Masukkan Harga Normal" />
            </Form.Item>

            <Form.Item label="Harga + Certif" required>
              <Input value={formatRupiah(priceCertif)} onChange={(e) => handleRupiahChange(e.target.value, setPriceCertif)} placeholder="Masukkan Harga Normal" />
            </Form.Item>

            <Form.Item label="Harga Promo">
              <Input value={formatRupiah(discountPrice)} onChange={(e) => handleRupiahChange(e.target.value, setDiscountPrice)} placeholder="Masukkan Harga Promo (Opsional)" />
            </Form.Item>

            <Form.Item label="Komisi">
              <Input value={formatRupiah(commission)} onChange={(e) => handleRupiahChange(e.target.value, setCommission)} placeholder="Masukkan Harga Promo (Opsional)" />
            </Form.Item>
          </Form>
        </div>
        <div className="bg-white shadow rounded-xl p-6 w-full h-fit xl:w-fit xl:min-w-96">
          {/* detail ujian shows title, total question, and total time in minute */}
          <h2 className="text-xl font-medium">Detail Ujian</h2>
          <div className="mt-4">
            <p className="text-base font-medium flex justify-between">Total Soal <span className="font-semibold">100</span></p>
            <p className="text-base font-medium flex justify-between">Total Waktu (menit) <span className="font-semibold">50</span></p>
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
              const reader = new FileReader();
              reader.onload = (e) => {
                onChange(index, 'image', e.target.result);
              };
              reader.readAsDataURL(file);
            } else {
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
