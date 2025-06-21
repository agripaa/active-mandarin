import React, { useState, useEffect, useMemo } from "react";
import { Button, Spin, Input } from "antd";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router";
import { motion } from "motion/react";
import { useLocation } from "react-router-dom";
import ExamLayout from "../Layouts/ExamLayout";
import { getProfile } from "../api/auth";
import { submitUjian, getUjianDetail, getUjianSoal, getJawabanUser, startUjian, progressUjian, finishUjian, checkUjianAccess } from "../api/ujian";
import { getReviewByUjianId } from "../api/jawabanUser";
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
  const [isLastQuestionSubmitted, setIsLastQuestionSubmitted] = useState(false);

  const [reviewData, setReviewData] = useState([]);
  const [loadingReview, setLoadingReview] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const isReviewMode = location.pathname.includes("review-hasil");

  // Group review data by tipe_ujian
  const groupedReview = useMemo(() => {
    const groups = {
      listening: [],
      reading: [],
      writing: [],
    };

    reviewData.forEach(item => {
      if (groups[item.tipe_ujian]) {
        groups[item.tipe_ujian].push(item);
      }
    });

    return groups;
  }, [reviewData]);


  const generateQuestionUrl = (questionNo) => {
  return isReviewMode
    ? `/dashboard/take-exam/${id}/review-hasil?question=${questionNo}`
    : `/dashboard/take-exam/${id}?question=${questionNo}`;
};


  const currentQuestion = useMemo(() => {
    const q = questionList[number] || {};

    if (!isReviewMode || reviewData.length === 0) return q;

    const reviewMatch = reviewData.find((r) => r.soal_id === q.id);
    
    if (reviewMatch) {
    let userAnswer = [];
    let correct = [];
    if (reviewMatch.tipe_soal === "multiple-choice") {
      const inputRaw = reviewMatch.jawaban_user?.input_jawaban || "";
      
      const inputIndexes = inputRaw
        .split(/[;,]/)
        .map(i => parseInt(i.trim()))
        .filter(i => !isNaN(i));

    userAnswer = inputIndexes
      .map(idx => reviewMatch.list_jawaban?.[idx - 1]?.position?.trim()) // << dikurangi 1 karena index mulai dari 1
      .filter(Boolean);
    }

    if (reviewMatch.tipe_soal === "multiple-choice") {
      const inputRaw = reviewMatch.jawaban_user?.input_jawaban || "";
      
      const inputIndexes = inputRaw
        .split(/[;,]/)
        .map(i => parseInt(i.trim()))
        .filter(i => !isNaN(i));
      userAnswer = inputIndexes
      .map(idx => reviewMatch.list_jawaban?.[idx - 1]?.position?.trim()) // << dikurangi 1 karena index mulai dari 1
      .filter(Boolean);
      correct = (reviewMatch.jawaban_benar || []).map(p => p?.replace(/['"]+/g, "").trim());
      reviewMatch.list_jawaban = reviewMatch.list_jawaban.map(j => ({
      ...j,
      position: j.position?.replace(/['"]+/g, "").trim(), 
    }));
  }

  if (reviewMatch.tipe_soal === "order-arrange") {
    correct = reviewMatch.jawaban_benar || [];
    userAnswer = [reviewMatch.jawaban_user?.input_jawaban || ""];
  }

    if (reviewMatch.tipe_soal === "essay") {
    userAnswer = [reviewMatch.jawaban_user?.input_jawaban || ""];
  }

const cleanOptions = (reviewMatch.list_jawaban || []).map((j) => ({
  ...j,
  option: j.option || j.jawaban || "",  // fallback kalau `option` kosong
  position: j.position?.replace(/['"]+/g, "").trim(),
}));

      return {
        ...q,
        correctAnswer: correct,
        answer: userAnswer,
        isCorrect: reviewMatch.jawaban_user?.isTrue,
        jawaban_user: reviewMatch.jawaban_user,
        penjelasan: reviewMatch.penjelasan || "",
        options: cleanOptions,
      };
  }
  return q;
}, [questionList, number, isReviewMode, reviewData]);

  const shuffleArray = (array) => {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  const checkAccess = async () => {
    try {
      const data = await checkUjianAccess(id);
      if (!data.status) {
        throw new Error(data.message || "Akses ditolak");
      }
    } catch (err) {
      Swal.fire("Akses Ditolak", err.message || "Anda tidak memiliki akses ke ujian ini", "error").then(() => {
        navigate("/dashboard");
      });
    }
  };

 useEffect(() => {
  if (isReviewMode) {
    const fetchReview = async () => {
      try {
        const res = await getReviewByUjianId(id); // ✅ gunakan ujian_id (bukan progress id)
        console.log({review: res})
        if (res.status) {
          setReviewData(res.data);
        } else {
          console.warn("❗ Gagal mendapatkan review data:", res.message);
        }
      } catch (err) {
        console.error("❌ Error fetching review data:", err);
      } finally {
        setLoadingReview(false);
      }
    };
    fetchReview();
  }
}, [isReviewMode, id]);

useEffect(() => {
  if (!isReviewMode || !currentQuestion?.phase) return;

  if (examPhase !== currentQuestion.phase) {
    setExamPhase(currentQuestion.phase);
  }
}, [currentQuestion?.phase, isReviewMode]);


  useEffect(() => {
    if (isReviewMode) return; 
    const VIOLATION_KEY = `ujian-violation-${id}`;
    const MAX_VIOLATION = 3;

    let violationCount = parseInt(localStorage.getItem(VIOLATION_KEY)) || 0;

    const handleViolation = () => {
      violationCount += 1;
      localStorage.setItem(VIOLATION_KEY, violationCount);

      if (violationCount >= MAX_VIOLATION) {
        Swal.fire("Ujian Dihentikan", "Anda terlalu sering meninggalkan halaman.", "error").then(async () => {
          await finishUjian({
            user_id: user.id,
            ujian_id: parseInt(id),
            exam_phase: examPhase,
          });
          localStorage.removeItem(VIOLATION_KEY); 
          navigate("/result-exam");
        });
      } else {
        Swal.fire({
          icon: "warning",
          title: "Perhatian!",
          text: `Jangan keluar dari halaman ujian. Kesempatan tersisa: ${MAX_VIOLATION - violationCount}`,
        });
      }
    };

    const handleVisibility = () => {
      if (document.hidden) {
        handleViolation();
      }
    };

    const handleBeforeUnload = (e) => {
      handleViolation();
      e.preventDefault();
      e.returnValue = "";
    };

    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [user.id, id, examPhase, navigate]);


  useEffect(() => {
  const params = new URLSearchParams(location.search);
  const q = parseInt(params.get("question"), 10);

  if (!isNaN(q) && questionList.length > 0) {
    const actualIdx = getQuestionIndexFromNumber(q);
    setNumber(actualIdx);
  }
}, [location.search, questionList.length]);



  const getNextAvailablePhase = (currentPhase) => {
    const order = ["listening", "reading", "writing"];
    const currentIndex = order.indexOf(currentPhase);

    for (let i = currentIndex + 1; i < order.length; i++) {
      const phase = order[i];
      if (allQuestions[phase] && allQuestions[phase].questions.length > 0) {
        return phase;
      }
    }

    return null; 
  };

  useEffect(() => {
    if (isReviewMode) return;

    if (timeLeft <= 0) {
      handlePhaseChange();
    }
  }, [timeLeft]);


  const handlePhaseChange = async () => {
    try {
      await finishUjian({
        user_id: user.id,
        ujian_id: parseInt(id),
        exam_phase: examPhase,
      });

      const nextPhase = getNextAvailablePhase(examPhase);

      if (nextPhase) {
        setExamPhase(nextPhase);
        const nextTime = parseInt(allQuestions[nextPhase]?.time || "1") * 60;
        setTimeLeft(nextTime);
        setQuestionList(allQuestions[nextPhase].questions.map(q => ({ ...q })));
        navigate(generateQuestionUrl(1), { replace: true });
        setNumber(0);
      } else {
        Swal.fire("Ujian selesai", "Semua sesi telah berakhir.", "success").then(() => {
          navigate("/result-exam");
        });
      }
    } catch (err) {
      console.error("❌ Gagal menyelesaikan fase:", err);
      Swal.fire("Error", "Gagal menyelesaikan fase ujian", "error");
    }
  };



    const getQuestionIndexFromNumber = (questionNumber) => {
      return questionNumber - 1; // karena index mulai dari 0
    };
    const getQuestionNumberFromIndex = (index) => {
      return index + 1;
    };

    const getActivePhase = async (userId, ujianId, phases, soalByPhase) => {
      for (const phase of phases) {
        if (!soalByPhase[phase]) continue;

        const progress = await progressUjian({
          user_id: userId,
          ujian_id: ujianId,
          exam_phase: phase,
        });

        if (!progress?.data?.is_done && !progress?.data?.is_checking) {
          return phase;
        }
      }

      return null; // semua selesai
    };

  useEffect(() => {
  const fetchInitialData = async () => {
    try {
      await checkAccess();
      const [userData, ujianData] = await Promise.all([
        getProfile(),
        getUjianDetail(id),
      ]);

      const userId = userData.data.id;
      const ujianId = parseInt(id);

      setUser(userData.data);
      setUjianInfo(ujianData.data);

      const soalData = await getUjianSoal(id);
      const soalByPhase = soalData.data;
      setAllQuestions(soalByPhase);

      if (isReviewMode) {
        const phases = ["listening", "reading", "writing"];
        for (const phase of phases) {
          if (soalByPhase[phase]) {
            const questions = await Promise.all(
              soalByPhase[phase].questions.map(async q => {
                const userAnswer = await getJawabanUser(q.id, userId);
                const input = userAnswer?.data?.input_jawaban || "";

                return {
                  ...q,
                  questionType: q.questionType || q.tipe_soal || "", // ← ini kuncinya!
                  answer: input ? [input] : [],
                  correctAnswer: q.answer,
                  options: q.options?.sort((a, b) => a.position?.localeCompare(b.position)),
                  shuffledOptions: q.options || [],
                  phase,
                };
              })
            );


            if (questions.length > 0) {
              setExamPhase(phase);
              setQuestionList(questions);
              setTotalQuestions(questions.length);
              break;
            }
          }
        }

        setLoading(false);
        return;
      }

      // ORIGINAL TAKE-EXAM LOGIC (dipertahankan)
      const phaseOrder = ["listening", "reading", "writing"];
      const activePhase = await getActivePhase(userId, ujianId, phaseOrder, soalByPhase);

      if (!activePhase) {
        Swal.fire("Ujian selesai", "Sesi telah berakhir.", "success").then(() => {
          navigate('/result-exam');
        });
        return;
      }
        setExamPhase(activePhase);

        // Mulai fase
        let remainingTime = parseInt(soalByPhase[activePhase]?.time || "10") * 60;

        const progress = await progressUjian({
          user_id: userId,
          ujian_id: ujianId,
          exam_phase: activePhase,
        });

        if (progress?.data?.started_at) {
          const startedAt = new Date(progress.data.started_at);
          const now = new Date();
          const elapsed = Math.floor((now - startedAt) / 1000);
          remainingTime = Math.max(0, remainingTime - elapsed);
        } else {
          await startUjian({
            user_id: userId,
            ujian_id: ujianId,
            exam_phase: activePhase,
          });
        }

        setTimeLeft(remainingTime);

        // Proses soal
        const questions = await Promise.all(
          soalByPhase[activePhase].questions.map(async (q) => {
            const processed = {
              ...q,
              options: q.options?.sort((a, b) => a.position?.localeCompare(b.position)),
              shuffledOptions:
                q.questionType === "order-arrange"
                  ? (() => {
                      const rawWords = (q.answer?.[0] || "")
                        .split(";")
                        .map(w => w.trim())
                        .filter(Boolean)
                        .map((opt, idx) => ({ id: idx + 1, option: opt }));

                      return rawWords.length > 1 ? shuffleArray(rawWords) : rawWords;
                    })()
                  : shuffleArray(q.options || []),
              answer: [],
              correctAnswer: q.answer || [],
              phase: activePhase,
            };

            const userAnswer = await getJawabanUser(q.id, userId);
            if (userAnswer?.data?.input_jawaban) {
              const input = userAnswer?.data?.input_jawaban || "";
              if (q.questionType === "multiple-choice") {
                processed.answer = input.split(/[;,]/).map(j => parseInt(j.trim()));
              } else if (q.questionType === "order-arrange") {
                processed.answer = [input];
              } else {
                processed.answer = [input];
              }
            }

            return processed;
          })
        );

        setQuestionList(questions);
        setTotalQuestions(questions.length);

        const params = new URLSearchParams(location.search);
        const q = parseInt(params.get("question"), 10);
        if (!isNaN(q)) {
          setNumber(q - 1);
        }

        setLoading(false);
      } catch (err) {
        console.error("❌ Error loading data:", err);
        Swal.fire("Error", "Gagal memuat ujian", "error");
      }
    };

    fetchInitialData();
  }, [id, isReviewMode]);

  useEffect(() => {
  if (
    currentQuestion?.questionType === "order-arrange" &&
    (!currentQuestion.answer || !currentQuestion.answer[0])
  ) {
    const optionWords = currentQuestion.shuffledOptions?.map(opt => opt.option) || [];
    const initialOrder = optionWords.join("; ");
    setQuestionList(prev =>
      prev.map((q, idx) => (idx === number ? { ...q, answer: [initialOrder] } : q))
    );
  }
}, [number, currentQuestion]);


useEffect(() => {
  const initExamPhase = async () => {
    if (!Object.keys(allQuestions).length || !allQuestions[examPhase]) return;

    // ⬇️ RESET soal & set fase ke masing-masing soal
    setQuestionList(
      allQuestions[examPhase].questions.map(q => ({
        ...q,
        answer: [],
        phase: examPhase,
      }))
    );

    try {
      const ujian_id = parseInt(id);

      // Ambil progres
      const progress = await progressUjian({
        user_id: user.id,
        ujian_id,
        exam_phase: examPhase,
      });

      let remainingTime = parseInt(allQuestions[examPhase].time || "10") * 60;

      if (progress?.data?.started_at) {
        const startedAt = new Date(progress.data.started_at);
        const now = new Date();
        const elapsed = Math.floor((now - startedAt) / 1000); // in seconds
        remainingTime = Math.max(0, remainingTime - elapsed);
      } else {
        // Simpan waktu mulai kalau belum ada
        await startUjian({
          user_id: user.id,
          ujian_id,
          exam_phase: examPhase,
        });
      }

      setTimeLeft(remainingTime);

      // Ambil question dari URL
      const params = new URLSearchParams(location.search);
      const q = parseInt(params.get("question"), 10);
      if (!isNaN(q)) {
        const actualIdx = getQuestionIndexFromNumber(q);
        setNumber(actualIdx);
      } else {
        setNumber(0); // fallback ke nomor pertama
      }
    } catch (error) {
      console.error("❌ Gagal inisialisasi waktu ujian:", error);
      Swal.fire("Error", "Gagal mengatur waktu ujian", "error");
    }
  };

  initExamPhase();
}, [examPhase, allQuestions, user.id]);

  useEffect(() => {
    if (isReviewMode) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handlePhaseChange();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [examPhase, allQuestions, isReviewMode]);

  const mapAnswerToPositionIndex = (answerIds, options) => {
    return answerIds
      .map(id => {
        const idx = options.findIndex(opt => opt.id === id);
        return idx >= 0 ? idx + 1 : null;
      })
      .filter(v => v !== null);
  };

  const nextNumber = async () => {
    const current = questionList[number];

  let inputJawabanFinal = "";

  if (current.questionType === "multiple-choice") {
    inputJawabanFinal = mapAnswerToPositionIndex(current.answer, current.options).join(";");
  } else if (current.questionType === "order-arrange") {
    inputJawabanFinal = current.answer.join("; ");
  } else if (current.questionType === "essay") {
    inputJawabanFinal = current.answer[0]?.trim() || "";
      console.log("📝 Essay Answer:", inputJawabanFinal);
  } else {
    inputJawabanFinal = Array.isArray(current.answer) ? current.answer.join(";") : "";
  }

    try {
     await submitUjian({
      soal_id: current.id,
      input_jawaban: inputJawabanFinal,
      user_id: user.id,

      
    });
    if (current.questionType === "essay" && !inputJawabanFinal) {
      Swal.fire("Jawaban kosong", "Silakan isi jawaban Anda terlebih dahulu.", "warning");
      return;
    }

      let nextIdx = number + 1;

      if (nextIdx < questionList.length) {
        const questionNo = getQuestionNumberFromIndex(nextIdx);
        navigate(generateQuestionUrl(questionNo), { replace: true });
        setNumber(nextIdx);
      } else {
        setIsLastQuestionSubmitted(true); // 👉 Tandai bahwa soal terakhir sudah disubmit
        Swal.fire("Tersimpan", "Jawaban Anda sudah disimpan.", "success");
      }
    } catch (err) {
      console.error("❌ Gagal simpan jawaban:", err);
      Swal.fire("Error", "Gagal menyimpan jawaban.", "error");
    }
  };

  const finishCurrentPhase = async () => {
    try {
      await finishUjian({
        user_id: user.id,
        ujian_id: parseInt(id),
        exam_phase: examPhase,
      });

      const nextPhase = getNextAvailablePhase(examPhase);
      if (nextPhase) {
        setExamPhase(nextPhase);
        setIsLastQuestionSubmitted(false); // reset
        
        // 🔄 Reset ke pertanyaan pertama
        navigate(generateQuestionUrl(1), { replace: true });
        setNumber(0);
      } else {
        const lastPhase = allQuestions[examPhase];
        const hasEssay = lastPhase.questions?.some(q => q.questionType === "essay");

        if (!hasEssay) {
          Swal.fire("Ujian selesai", "Semua sesi telah berakhir. Nilai Anda sedang diproses.", "success").then(() => {
            navigate("/result-exam");
          });
        } else {
          Swal.fire("Ujian selesai", "Jawaban essay Anda akan dinilai secara manual.", "info").then(() => {
            navigate("/result-exam");
          });
        }
      }
    } catch (err) {
      console.error("❌ Gagal menyelesaikan fase:", err);
      Swal.fire("Error", "Gagal menyelesaikan fase ujian", "error");
    }
  };

  const renderQuestion = () => {
    const isEssayOrArrange = ["essay", "order-arrange"].includes(currentQuestion.questionType);
    if (!currentQuestion || !currentQuestion.questionType) return null;

    if (currentQuestion.questionType === "essay") {
      return (
        <div className="flex flex-col gap-2">
          {isReviewMode && (
            <div className="text-sm text-gray-600 font-medium text-right">
              Poin: {currentQuestion?.jawaban_user?.poing ?? 0}
            </div>
          )}
          <Input.TextArea
            // disabled={isReviewMode}
            readOnly={isReviewMode}
            className={`py-3 px-4 ${isReviewMode && currentQuestion?.jawaban_user?.poing > 0 ? "bg-green-100" : "bg-gray-100"} rounded-2xl ${isReviewMode ? "pointer-events-none" : "bg-gray-100"}`}
            value={currentQuestion.answer[0] || ""}
            placeholder="Tulis jawaban Anda di sini"
            autoSize={{ minRows: 3, maxRows: 8 }}
            onChange={(e) => {
              if (isReviewMode) return;
              const val = e.target.value;
              setQuestionList(prev =>
                prev.map((q, idx) => (idx === number ? { ...q, answer: [val] } : q))
              );
            }}
          />
        </div>
      );
    }

    if (currentQuestion.questionType === "multiple-choice") {
      if (!currentQuestion.options || currentQuestion.options.length === 0) {
        return <p className="text-sm text-red-500">Tidak ada pilihan jawaban.</p>;
      }

      return (
        <div className="flex flex-col gap-2">
          {isReviewMode && (
            <div className="text-sm text-gray-600 font-medium text-right">
              Poin: {currentQuestion?.jawaban_user?.poing ?? 0}
            </div>
          )}
          {currentQuestion.options.map((option, idx) => (
              <Button
                key={option.id || idx}
                type={!isReviewMode && currentQuestion.answer.includes(option.id) ? "primary" : "default"}
               className={`py-4 pl-4 pr-10 rounded-2xl text-left w-full mb-2 h-auto 
                ${isReviewMode ? "pointer-events-none" : ""}
                ${
                  isReviewMode
                    ? currentQuestion.answer.includes(option.position?.trim())
                      ? currentQuestion.correctAnswer.includes(option.position?.trim())
                        ? "bg-green-500 text-white border border-green-600" // ✅ benar & dipilih
                        : "bg-red-100 border border-red-300"                // ❌ dipilih & salah
                      : currentQuestion.correctAnswer.includes(option.position?.trim())
                        ? "bg-green-100 border border-green-300"            // ✅ benar tapi tidak dipilih
                        : "bg-white border border-gray-300 text-blue-500"   // ❌ tidak dipilih & salah
                    : currentQuestion.answer.includes(option.id)
                      ? "bg-blue-100 border border-blue-400 text-blue-700"
                      : "bg-white border border-gray-300 text-blue-500"
                }
              `}
                onClick={() => {
                  if (isReviewMode) return;
                  setQuestionList(prev =>
                    prev.map((q, qIdx) => {
                      if (qIdx !== number) return q;

                      let newAnswer = [];
                      if (q.isMultipleAnswer) {
                        // Reset dulu, lalu toggle
                        const currentSet = new Set(q.answer);
                        if (currentSet.has(option.id)) {
                          currentSet.delete(option.id);
                        } else {
                          currentSet.add(option.id);
                        }
                        newAnswer = Array.from(currentSet);
                      } else {
                        // Hanya satu jawaban
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
    const optionWords = currentQuestion.shuffledOptions?.map(opt => opt.option) || [];
    const isCorrect = isReviewMode && currentQuestion?.jawaban_user?.isTrue === true;
    const isWrong = isReviewMode && currentQuestion?.jawaban_user?.isTrue === false;


    const userOrder = currentQuestion.answer[0]
      ? currentQuestion.answer[0].split(";").map(s => s.trim()).filter(Boolean)
      : optionWords;

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
    <div className="flex flex-col gap-2">
      {isReviewMode && (
        <div className="text-sm text-gray-600 font-medium text-right">
          Poin: {currentQuestion?.jawaban_user?.poing ?? 0}
        </div>
      )}
      <h5 className="text-base font-medium">Susun Kata Di Bawah Ini!</h5>
      <div className="flex flex-row flex-wrap gap-2">
        {userOrder.map((word, idx) => (
          <motion.div
            key={word + idx}
            layout
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            draggable={!isReviewMode}
            onDragStart={isReviewMode ? undefined : () => handleDragStart(idx)}
            onDragOver={isReviewMode ? undefined : (e) => handleDragOver(e, idx)}
            onDrop={isReviewMode ? undefined : () => handleDrop(idx)}
            onDragEnd={isReviewMode ? undefined : handleDragEnd}
            style={{
              display: "inline-block",
              opacity: draggedIdx === idx ? 0.5 : 1,
              outline: dragOverIdx === idx && draggedIdx !== null ? "2px dashed #3377FF" : "none",
              cursor: isReviewMode ? "default" : draggedIdx === idx ? "grabbing" : "grab",
            }}
          >
            <Button
              // disabled={isReviewMode}
              className={`rounded-2xl px-6 py-5 mr-2 mb-2 ${isReviewMode ? "pointer-events-none" : ""}
                ${isReviewMode
                  ? currentQuestion?.jawaban_user?.isTrue === true
                    ? "bg-green-100 border border-green-500 text-green-700"
                    : currentQuestion?.jawaban_user?.isTrue === false
                      ? "bg-red-100 border border-red-500 text-red-700"
                      : "bg-white border border-gray-300 text-blue-500"
                  : "bg-white border border-gray-300 text-blue-500"
                }
              `}
              style={{
                minWidth: 100,
                background:
                  dragOverIdx === idx && draggedIdx !== null && !isReviewMode
                    ? "#e6f0ff"
                    : undefined,
              }}
            >
              {word}
            </Button>
          </motion.div>
        ))}
      </div>
      <div className="mt-2 text-xs text-gray-500">
        {isReviewMode ? "* Ini adalah jawaban yang Anda susun" : "* Drag & drop untuk mengurutkan"}
      </div>

      {isReviewMode && currentQuestion?.jawaban_user?.isTrue === false && (
        <div className="mt-6">
          <h5 className="text-base font-medium text-red-500 mb-2">Jawaban yang benar:</h5>
          <div className="flex flex-row flex-wrap gap-2">
            {(currentQuestion.correctAnswer || []).map((word, idx) => (
              <div key={`correct-${idx}`}>
                <Button
                  // disabled
                  className={`bg-green-100 border border-green-500 text-green-700 rounded-2xl px-6 py-5 mr-2 mb-2 ${isReviewMode ? "pointer-events-none" : ""}`}
                  style={{ minWidth: 100 }}
                >
                  {word}
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}


    if (currentQuestion.questionType === "guide") {
      return(
        <div className="flex flex-col gap-2">
          <h5 className="text-2xl font-bold">Arahan Untuk</h5>
          <h6 className="rounded-2xl mr-2 mb-2 text-blue-500">
            Soal {parseInt(currentQuestion.guideForQuestion.start)} - Soal {parseInt(currentQuestion.guideForQuestion.end)} 
          </h6>
          {currentQuestion.questionType !== "guide" && (
            <div className="my-6" dangerouslySetInnerHTML={{ __html: currentQuestion.question }} />
          )}
        </div>
      )
    }


    return <p className="text-gray-400 italic">Soal belum tersedia untuk tipe ini.</p>;
  };

  useEffect(() => {
  if (
    !isReviewMode &&
    currentQuestion.questionType === "order-arrange" &&
    (!currentQuestion.answer || !currentQuestion.answer[0])
  ) {
    const optionWords = currentQuestion.shuffledOptions?.map(opt => opt.option) || [];
    const initialOrder = optionWords.join("; ");
    setQuestionList(prev =>
      prev.map((q, idx) => (idx === number ? { ...q, answer: [initialOrder] } : q))
    );
  }
}, [number, currentQuestion, isReviewMode]);

  const renderMediaPreview = (imageString) => {
  if (!imageString) return null;

  const filePaths = imageString.split(";").map(f => f.trim()).filter(Boolean);

  return (
    <div className="flex flex-col gap-4 mb-4">
      {filePaths.map((filePath, idx) => {
        const url = `${process.env.REACT_APP_API_IMG}${filePath}`;
        const ext = filePath.split('.').pop().toLowerCase();

        if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext)) {
          return (
            <img
              key={idx}
              src={url}
              alt={`Preview ${idx}`}
              className="rounded-xl max-w-full max-h-[300px] object-contain"
            />
          );
        }

        if (["mp3", "wav", "ogg"].includes(ext)) {
          return (
            <audio key={idx} controls className="w-full">
              <source src={url} type={`audio/${ext}`} />
              Browser Anda tidak mendukung elemen audio.
            </audio>
          );
        }

        if (["mp4", "webm", "ogg"].includes(ext)) {
          return (
            <video key={idx} controls className="w-full max-h-[360px] rounded-lg">
              <source src={url} type={`video/${ext}`} />
              Browser Anda tidak mendukung elemen video.
            </video>
          );
        }

        if (ext === "pdf") {
          return (
            <iframe
              key={idx}
              src={url}
              className="w-full h-[400px] rounded-lg border"
              title={`PDF Preview ${idx}`}
            />
          );
        }

        return (
          <div
            key={idx}
            className="bg-gray-100 p-4 rounded-lg text-sm text-gray-600"
          >
            File tidak bisa ditampilkan langsung: <code>{filePath}</code>
          </div>
        );
      })}
    </div>
  );
};
  const totalVisibleQuestions = questionList.filter(q => q.questionType !== "guide").length;
    const currentVisibleNumber = questionList
    .filter(q => q.questionType !== "guide")
    .findIndex(q => q.id === currentQuestion?.id) + 1;

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
        setExamPhase,
        questionList,
      }}>
        <ExamLayout>
          <div className="px-8 py-4 flex flex-col gap-5 min-h-screen pb-28">
            {isReviewMode && (
            <div className="flex flex-wrap justify-end items-center mt-2 mb-4">
              <Button
                onClick={() => navigate(`/result-exam/${id}`)}
                className="rounded-xl bg-gray-100 hover:bg-gray-200 border border-gray-400"
              >
                Kembali ke Hasil Ujian
              </Button>
            </div>
          )}
            {ujianInfo && (
              <div className="mb-4">
                <h2 className="text-xl font-bold">{ujianInfo.nama_ujian}</h2>
                <p className="text-sm text-gray-500" dangerouslySetInnerHTML={{ __html: ujianInfo.desc }} />
              </div>
            )}

            <div className="flex justify-between items-center text-sm text-gray-600">
              <span>No. Soal: {currentVisibleNumber} / {totalVisibleQuestions}</span>
              <span>Tipe Soal: {currentQuestion.questionType}</span>
            </div>

            <div className={`flex ${currentQuestion.questionType === "guide" ? "flex-col-reverse" : "flex-col"}`}>
              {currentQuestion.image && renderMediaPreview(currentQuestion.image)}
              <div className="my-6" dangerouslySetInnerHTML={{ __html: currentQuestion.question }} />
              {currentQuestion.isMultipleAnswer && <h4 className="text-gray-500 text-sm mb-2">Silahkan Pilih Jawaban Lebih Dari Satu!</h4>}
              {renderQuestion()}
              {(isReviewMode && currentQuestion?.penjelasan) && (
                <div className="rounded-lg mb-4 mt-6">
                  <h5 className="text-base font-semibold mb-2">Penjelasan:</h5>
                  <div className="text-sm text-gray-700" dangerouslySetInnerHTML={{ __html: currentQuestion.penjelasan }} />
                </div>
              )}
            </div>

            <div className="fixed bottom-0 left-0 w-full bg-white p-4 shadow-lg flex justify-between items-center z-50">
            <Button
              onClick={() => {
                if (number > 0) {
                  const prevIdx = number - 1;
                  const questionNo = getQuestionNumberFromIndex(prevIdx);
                  navigate(generateQuestionUrl(questionNo), { replace: true });
                  setNumber(prevIdx);
                } else {
                  Swal.fire("Sudah di soal pertama", "", "info");
                }
              }}
              className="rounded-2xl"
            >
              Sebelumnya
            </Button>

            {isReviewMode && (
              <div className="flex gap-2 mt-2 justify-end">
                {Object.keys(allQuestions).map((phaseKey) => {
                  const isVisible = groupedReview[phaseKey]?.length > 0;

                  if (!isVisible) return null; // ❌ sembunyikan jika tidak ada soal untuk fase ini

                  return (
                    <Button
                      key={phaseKey}
                      type={phaseKey === examPhase ? "primary" : "default"}
                      className="rounded-xl"
                      onClick={() => {
                        setExamPhase(phaseKey);
                        const questions = allQuestions[phaseKey]?.questions || [];
                        setQuestionList(questions);
                        setNumber(0);
                        navigate(generateQuestionUrl(1), { replace: true });
                      }}
                    >
                      {phaseKey === "listening" ? "Listening" :
                      phaseKey === "reading" ? "Reading" :
                      phaseKey === "writing" ? "Writing" : phaseKey}
                    </Button>
                  );
                })}
              </div>
            )}
            {number < questionList.length - 1 ? (
              <Button
              onClick={() => {
                if (isReviewMode) {
                  const nextIdx = number + 1;
                  if (nextIdx < questionList.length) {
                    const questionNo = getQuestionNumberFromIndex(nextIdx);
                    navigate(generateQuestionUrl(questionNo), { replace: true });
                    setNumber(nextIdx);
                  }
                } else {
                  nextNumber();
                }
              }}
              className="rounded-2xl"
            >
              Selanjutnya
            </Button>
            ) : (
              <div className="flex gap-2">
                {!isReviewMode && !isLastQuestionSubmitted && (
                  <Button onClick={nextNumber} className="rounded-2xl">
                    Submit
                  </Button>
                )}
                {!isReviewMode && isLastQuestionSubmitted && (
                  <>
                    <Button onClick={nextNumber} className="rounded-2xl">
                      Update Jawaban
                    </Button>
                    <Button onClick={finishCurrentPhase} type="primary" className="rounded-2xl">
                      Selesai Fase
                    </Button>
                  </>
                )}
              </div>
            )}
          </div>
          </div>
        </ExamLayout>
      </ExamContext.Provider>
    )
  );
};

export default TakeExam;