import React, { useState, useEffect, useMemo } from "react";
import { Button, Spin, Input } from "antd";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router";
import { motion } from "motion/react";
import { useLocation } from "react-router-dom";
import ExamLayout from "../Layouts/ExamLayout";
import { getProfile } from "../api/auth";
import { submitUjian, getUjianDetail, getUjianSoal, getJawabanUser, startUjian, progressUjian } from "../api/ujian";
import ExamContext from "../context/ExamContext"; 

const TakeExam = () => {
  const [loading, setLoading] = useState(true);
  const [questionList, setQuestionList] = useState([]);
  const [number, setNumber] = useState(0);
  const [draggedIdx, setDraggedIdx] = useState(null);
  const [dragOverIdx, setDragOverIdx] = useState(null);
  const [user, setUser] = useState({});
  const [examPhase, setExamPhase] = useState("listening");
  const [timeLeft, setTimeLeft] = useState(600);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [time, setTime] = useState(600);
  const [allQuestions, setAllQuestions] = useState({});
  const [ujianInfo, setUjianInfo] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const currentQuestion = useMemo(() => questionList[number] || {}, [questionList, number]);
  const shuffleArray = (array) => {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = parseInt(params.get("question"), 10);
    if (!isNaN(q) && q > 0 && q <= questionList.length) {
      setNumber(q - 1);
    }
  }, [location.search, questionList.length]);


  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [userData, ujianData, soalData] = await Promise.all([
          getProfile(),
          getUjianDetail(id),
          getUjianSoal(id)
        ]);

        setUser(userData.data);
        setUjianInfo(ujianData.data);

        const soalByPhase = soalData.data;
        const combinedQuestions = [];

        for (const phase in soalByPhase) {
          soalByPhase[phase].questions = await Promise.all(
            soalByPhase[phase].questions.map(async (q) => {
              const processed = {
                ...q,
                options: q.options?.sort((a, b) => a.position?.localeCompare(b.position)),
                answer: [],
                correctAnswer: q.answer || [],
                phase
              };

              const userAnswer = await getJawabanUser(q.id, userData.data.id);
              if (userAnswer && userAnswer.data?.input_jawaban) {
                const input = userAnswer.data.input_jawaban;
                if (q.questionType === "multiple-choice") {
                  processed.answer = input.split(',').map(j => isNaN(j) ? j : parseInt(j));
                } else if (q.questionType === "order-arrange" || q.questionType === "essay") {
                  processed.answer = [input];
                }
              } else if (q.questionType === "order-arrange" && processed.correctAnswer.length > 0) {
                const originalWords = processed.correctAnswer[0].split(";").map(s => s.trim()).filter(Boolean);
                const shuffled = shuffleArray(originalWords);
                processed.answer = [shuffled.join("; ")];
              }

              return processed;
            })
          );

          combinedQuestions.push(...soalByPhase[phase].questions);
        }

        setAllQuestions(soalByPhase);
        setQuestionList(combinedQuestions);
        setTotalQuestions(combinedQuestions.length);
        setTimeLeft(parseInt(soalByPhase[examPhase]?.time || 1) * 60);
        setLoading(false);
      } catch (error) {
        console.error("❌ Error loading exam:", error);
        Swal.fire("Gagal Memuat", "Soal atau data ujian tidak tersedia.", "error");
      }
    };

    fetchInitialData();
  }, [id]);

  useEffect(() => {
    if (!allQuestions[examPhase]) return;
    setQuestionList(allQuestions[examPhase].questions.map(q => ({ ...q }))); // keep existing answers
    setTimeLeft(parseInt(allQuestions[examPhase].time) * 60);
    setNumber(0);
  }, [examPhase]);

  useEffect(() => {
    if (timeLeft <= 0) {
      if (examPhase === "listening") {
        setExamPhase("reading");
      } else if (examPhase === "reading") {
        setExamPhase("writing");
      } else {
        Swal.fire("Ujian selesai", "Semua sesi telah berakhir.", "success");
      }
    }
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, examPhase]);

  const nextNumber = async () => {
    const current = questionList[number];
    try {
      await submitUjian({
        soal_id: current.id,
        input_jawaban: Array.isArray(current.answer) ? current.answer.join(",") : current.answer,
        user_id: user.id
      });
      navigate(`/dashboard/take-exam/${id}?question=${number + 2}`);
    } catch (err) {
      console.error("❌ Gagal simpan jawaban:", err);
      Swal.fire("Error", "Gagal menyimpan jawaban.", "error");
    }

    if (number < questionList.length - 1) {
      setNumber(number + 1);
    } else {
      Swal.fire({
        title: "Selesai",
        text: "Anda telah menyelesaikan sesi ini.",
        icon: "success",
        confirmButtonText: "Lanjut",
      }).then(() => {
        if (examPhase === "listening") {
          setExamPhase("reading");
        } else if (examPhase === "reading") {
          setExamPhase("writing");
        } else {
          navigate("/dashboard");
        }
      });
    }
  };

  const prevNumber = () => {
    if (number > 0) {
      setNumber(number - 1);
      navigate(`/dashboard/take-exam/${id}?question=${number}`);
    } else {
      Swal.fire("Sudah di soal pertama", "", "info");
    }
  };

  const renderQuestion = () => {
    if (!currentQuestion || !currentQuestion.questionType) return null;

    if (currentQuestion.questionType === "essay") {
      return (
        <Input.TextArea
          className="py-3 px-4 bg-fiord-100 rounded-2xl"
          value={currentQuestion.answer[0] || ""}
          placeholder="Tulis jawaban Anda di sini"
          autoSize={{ minRows: 3, maxRows: 8 }}
          onChange={e => {
            const newAnswer = [e.target.value];
            setQuestionList(prev =>
              prev.map((q, idx) => (idx === number ? { ...q, answer: newAnswer } : q))
            );
          }}
        />
      );
    }

    if (currentQuestion.questionType === "multiple-choice") {
      if (!currentQuestion.options || currentQuestion.options.length === 0) {
        return <p className="text-sm text-red-500">Tidak ada pilihan jawaban.</p>;
      }

      return (
        <div className="flex flex-col gap-2">
          {currentQuestion.options.map((option, idx) => (
            <Button
              key={option.id || idx}
              className="py-4 pl-4 pr-10 rounded-2xl text-left w-full mb-2 h-auto"
              type={currentQuestion.answer.includes(option.id) ? "primary" : "default"}
              onClick={() => {
                setQuestionList(prev =>
                  prev.map((q, qIdx) => {
                    if (qIdx !== number) return q;
                    let newAnswer;
                    if (q.isMultipleAnswer) {
                      newAnswer = q.answer.includes(option.id)
                        ? q.answer.filter(a => a !== option.id)
                        : [...q.answer, option.id];
                    } else {
                      newAnswer = [option.id];
                    }
                    return { ...q, answer: newAnswer };
                  })
                );
              }}
            >
              <div className="flex items-center w-full justify-start gap-4">
                <div className={`w-10 h-10 rounded-full flex justify-center items-center bg-blue-100 text-[#3377FF]`}>
                  {option.position}
                </div>
                {option.option || `Pilihan ${idx + 1}`}
              </div>
            </Button>
          ))}
        </div>
      );
    }

    if (currentQuestion.questionType === "order-arrange") {
      return (
        <div className="flex flex-col gap-2">
          <h5 className="text-base font-medium">Susun Kata Di Bawah Ini!</h5>
          <div className="flex flex-row flex-wrap gap-2">
            {(() => {
              const userOrder = currentQuestion.answer[0]
                ? currentQuestion.answer[0].split(";").map(s => s.trim()).filter(Boolean)
                : [];

              const handleDragStart = idx => setDraggedIdx(idx);
              const handleDragOver = (e, idx) => {
                e.preventDefault();
                setDragOverIdx(idx);
              };
              const handleDrop = idx => {
                if (draggedIdx === null || draggedIdx === idx) return;
                setQuestionList(prev =>
                  prev.map((q, qIdx) => {
                    if (qIdx !== number) return q;
                    const arr = [...userOrder];
                    const [moved] = arr.splice(draggedIdx, 1);
                    arr.splice(idx, 0, moved);
                    return { ...q, answer: [arr.join("; ")] };
                  })
                );
                setDraggedIdx(null);
                setDragOverIdx(null);
              };
              const handleDragEnd = () => {
                setDraggedIdx(null);
                setDragOverIdx(null);
              };

              return (
                <>
                  {userOrder.map((word, idx) => (
                    <motion.div
                      key={word + idx}
                      layout
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      draggable
                      onDragStart={() => handleDragStart(idx)}
                      onDragOver={e => handleDragOver(e, idx)}
                      onDrop={() => handleDrop(idx)}
                      onDragEnd={handleDragEnd}
                      style={{
                        display: "inline-block",
                        opacity: draggedIdx === idx ? 0.5 : 1,
                        outline: dragOverIdx === idx && draggedIdx !== null ? "2px dashed #3377FF" : "none",
                        cursor: draggedIdx === idx ? "grabbing" : "grab",
                      }}
                    >
                      <Button
                        className="rounded-2xl px-6 py-5 mr-2 mb-2 text-blue-500"
                        style={{
                          minWidth: 100,
                          background: dragOverIdx === idx && draggedIdx !== null ? "#e6f0ff" : undefined,
                        }}
                      >
                        {word}
                      </Button>
                    </motion.div>
                  ))}
                </>
              );
            })()}
          </div>
          <div className="mt-2 text-xs text-gray-500">* Drag & drop untuk mengurutkan</div>
        </div>
      );
    }

    return <p className="text-gray-400 italic">Soal belum tersedia untuk tipe ini.</p>;
  };

  return (
    loading ? (
      <ExamLayout>
        <div className="flex justify-center items-center h-[80vh]">
          <Spin size="large" />
        </div>
      </ExamLayout>
    ) : (
      <ExamContext.Provider value={{
        timeLeft,
        totalQuestions,
        examPhase,
        setTimeLeft,
        setTotalQuestions,
        setExamPhase
      }}>
        <ExamLayout>
          <div className="px-8 py-4 flex flex-col gap-5 min-h-screen pb-28">
            {ujianInfo && (
              <div className="mb-4">
                <h2 className="text-xl font-bold">{ujianInfo.nama_ujian}</h2>
                <p className="text-sm text-gray-500" dangerouslySetInnerHTML={{ __html: ujianInfo.desc }} />
              </div>
            )}

            <div className="flex justify-between items-center text-sm text-gray-600">
              <span>No. Soal: {number + 1} / {questionList.length}</span>
              <span>Tipe Soal: {currentQuestion.questionType}</span>
            </div>

            <div className="my-6" dangerouslySetInnerHTML={{ __html: currentQuestion.question }} />
            {renderQuestion()}

            <div className="fixed bottom-0 left-0 w-full bg-white p-4 shadow-lg flex justify-between items-center z-50">
              <Button onClick={prevNumber} disabled={number === 0} className="rounded-2xl">
                Sebelumnya
              </Button>
              <Button onClick={nextNumber} className="rounded-2xl">
                {number < questionList.length - 1 ? "Selanjutnya" : "Selesai"}
              </Button>
            </div>
          </div>
        </ExamLayout>
      </ExamContext.Provider>
    )
  );
};

export default TakeExam;