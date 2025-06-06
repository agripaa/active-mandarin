import React, { useState, useEffect, useMemo } from "react";
import { Table, Button, Spin, Input } from "antd";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router";
import { motion } from "motion/react";
import ExamLayout from "../Layouts/ExamLayout";

const TakeExam = () => {
  const [loading, setLoading] = useState(true);
  const [profileImg, setProfileImg] = useState("/assets/profile-dummy.webp");
  const [questionList, setQuestionList] = useState([]);
  const [number, setNumber] = useState(0);
  const [draggedIdx, setDraggedIdx] = useState(null);
  const [dragOverIdx, setDragOverIdx] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();

  const currentQuestion = useMemo(() => {
    return questionList[number] || {};
  }, [questionList, number]);

  const questionNumberArray = useMemo(() => {
    let count = 0;
    return questionList.reduce((acc, question) => {
      if (question.questionType === 'guide') {
        acc.push(null); // Push null for guide questions to skip them in numbering
        return acc;
      }
      count++;
      acc.push(count);
      return acc;
    }, []);
  }, [questionList]);

  useEffect(() => {
    setTimeout(() => {
      // Simulate fetching data
      setQuestionList(DATA);
      setLoading(false);
    }, 1000);
  }, []);

  const nextNumber = () => {
    if (number < questionList.length - 1) {
      setNumber(number + 1);
    } else {
      Swal.fire({
        title: "Selesai",
        text: "Anda telah menyelesaikan ujian ini.",
        icon: "success",
        confirmButtonText: "Kembali ke Dashboard",
        showCancelButton: true,
        cancelButtonText: "Tetap di sini",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/dashboard");
        }
      });
    }
  };

  const prevNumber = () => {
    if (number > 0) {
      setNumber(number - 1);
    } else {
      Swal.fire({
        title: "Tidak Bisa Mundur",
        text: "Anda sudah berada di soal pertama.",
        icon: "info",
        confirmButtonText: "OK",
      });
    }
  };

  if (loading) {
    return (
      <ExamLayout>
        <div className="flex justify-center items-center h-[80vh]">
          <Spin size="large" />
        </div>
      </ExamLayout>
    );
  }

  return (
    <ExamLayout>
      <div className="px-8 py-4 flex flex-col gap-5 min-h-screen">
        <div>
          {currentQuestion.questionType !== "guide" ? (
            <div
              className="my-6"
              dangerouslySetInnerHTML={{ __html: currentQuestion.question }}
            />
          ) : (
            <div
              className="my-6"
              dangerouslySetInnerHTML={{ __html: currentQuestion.guideForQuestion.guide }}
            />
          )}
          {currentQuestion.questionType === "essay" && (
            <div className="flex flex-col my-4 gap-2">
              <Input.TextArea
                className="py-3 px-4 bg-fiord-100 rounded-2xl"
                value={currentQuestion.answer[0] || ""}
                placeholder="Tulis jawaban Anda di sini"
                autoSize={{ minRows: 3, maxRows: 8 }}
                onChange={e => {
                  const newAnswer = [e.target.value];
                  setQuestionList(prev =>
                    prev.map((q, idx) =>
                      idx === number ? { ...q, answer: newAnswer } : q
                    )
                  );
                }}
              />
            </div>
          )}
          {currentQuestion.questionType === "multiple-choice" && (
            <div className="flex flex-col gap-2">
              {currentQuestion.options.map((option, idx) => (
                <Button
                  key={option.id}
                  className={`py-4 pl-4 pr-10 rounded-2xl text-left w-full mb-2 h-auto items-center justify-start`}
                  type={currentQuestion.answer.includes(option.id) ? "primary" : "default"}
                  onClick={() => {
                    setQuestionList(prev =>
                      prev.map((q, qIdx) => {
                        if (qIdx !== number) return q;
                        let newAnswer;
                        if (q.isMultipleAnswer) {
                          if (q.answer.includes(option.id)) {
                            newAnswer = q.answer.filter(a => a !== option.id);
                          } else {
                            newAnswer = [...q.answer, option.id];
                          }
                        } else {
                          newAnswer = [option.id];
                        }
                        return { ...q, answer: newAnswer };
                      })
                    );
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full justify-center items-center flex ${currentQuestion.answer.includes(option.id) ? "bg-blue-100 text-[#3377FF]" : "bg-background text-[#3377FF]"}`}>
                      {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'][idx] || String.fromCharCode(65 + idx)}
                    </div>
                    {option.option}
                  </div>
                </Button>
              ))}
            </div>
          )}
          {currentQuestion.questionType === "order-arrange" && (
            <div className="flex flex-col gap-2">
              <h5 className="text-base font-medium">Susun Kata Di Bawah Ini!</h5>
              <div className="flex flex-row flex-wrap gap-2">
                {(() => {
                  // Ambil kata-kata dari options[0]
                  const originalOrder = currentQuestion.options[0]
                    ? currentQuestion.options[0].split("; ").map(s => s.trim())
                    : [];
                  // Ambil jawaban user, jika belum ada pakai urutan awal
                  const userOrder = currentQuestion.answer[0]
                    ? currentQuestion.answer[0].split("; ").map(s => s.trim())
                    : originalOrder;

                  const handleDragStart = idx => setDraggedIdx(idx);
                  const handleDragOver = (e, idx) => {
                    e.preventDefault();
                    setDragOverIdx(idx);
                  };
                  const handleDrop = idx => {
                    if (draggedIdx === null || draggedIdx === idx) {
                      setDraggedIdx(null);
                      setDragOverIdx(null);
                      return;
                    }
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

                  // For smooth animation, use motion.div
                  return (
                    <React.Fragment>
                      {userOrder.map((ans, ansIndex) => (
                        <motion.div
                          key={ans}
                          layout
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          draggable
                          onDragStart={() => handleDragStart(ansIndex)}
                          onDragOver={e => handleDragOver(e, ansIndex)}
                          onDrop={() => handleDrop(ansIndex)}
                          onDragEnd={handleDragEnd}
                          style={{
                            display: "inline-block",
                            opacity: draggedIdx === ansIndex ? 0.5 : 1,
                            zIndex: draggedIdx === ansIndex ? 10 : 1,
                            outline: dragOverIdx === ansIndex && draggedIdx !== null ? "2px dashed #3377FF" : "none",
                            cursor: draggedIdx === ansIndex ? "grabbing" : "grab",
                          }}
                        >
                          <Button
                            className={`rounded-2xl px-6 py-5 mr-2 mb-2 text-blue-500`}
                            style={{
                              touchAction: "none",
                              userSelect: "none",
                              minWidth: 100,
                              background: dragOverIdx === ansIndex && draggedIdx !== null ? "#e6f0ff" : undefined,
                              cursor: draggedIdx === ansIndex ? "grabbing" : "grab",
                            }}
                          >
                            {ans}
                          </Button>
                        </motion.div>
                      ))}
                    </React.Fragment>
                  );
                })()}
              </div>
              <div className="mt-2 text-xs text-gray-500">* Drag & drop untuk mengurutkan</div>
            </div>
          )}
        </div>
      </div>

      <div className="sticky bottom-0 left-0 w-full bg-white p-4 shadow-lg flex justify-between items-center">
        <Button
          type="primary"
          onClick={prevNumber}
          disabled={number === 0}
          className="rounded-2xl"
        >
          Sebelumnya
        </Button>
        <Button
          type="primary"
          onClick={nextNumber}
          className="rounded-2xl"
        >
          {number < questionList.length - 1 ? "Selanjutnya" : "Selesai"}
        </Button>
      </div>
    </ExamLayout>
  );
};

export default TakeExam;

const DATA = [
    {
        "id": 1,
        "question": "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum mollis nunc a molestie dictum. Mauris venenatis, felis scelerisque aliquet lacinia, nulla nisi venenatis odio, id blandit mauris ipsum id sapien. Vestibulum malesuada orci sit amet pretium facilisis. In lobortis congue augue, a commodo libero tincidunt scelerisque.</p>",
        "questionType": "essay",
        "explanation": "",
        "options": [],
        "isMultipleAnswer": false,
        "answer": [],
        "image": "",
        "guideForQuestion": {
            "start": 0,
            "end": 0,
            "guide": ""
        },
        "point": 0
    },
    {
        "id": 2,
        "question": "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum mollis nunc a molestie dictum. Mauris venenatis, felis scelerisque aliquet lacinia, nulla nisi venenatis odio, id blandit mauris ipsum id sapien. Vestibulum malesuada orci sit amet pretium facilisis. In lobortis congue augue, a commodo libero tincidunt scelerisque.</p>",
        "questionType": "multiple-choice",
        "explanation": "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum mollis nunc a molestie dictum. Mauris venenatis, felis scelerisque aliquet lacinia, nulla nisi venenatis odio, id blandit mauris ipsum id sapien. Vestibulum malesuada orci sit amet pretium facilisis. In lobortis congue augue, a commodo libero tincidunt scelerisque.</p>",
        "options": [
            {
                "id": 1,
                "option": "Pilihan 1"
            },
            {
                "id": 2,
                "option": "Pilihan 2"
            },
            {
                "id": 3,
                "option": "Pilihan 3"
            }
        ],
        "isMultipleAnswer": false,
        "answer": [],
        "image": "",
        "guideForQuestion": {
            "start": 0,
            "end": 0,
            "guide": ""
        },
        "point": 15
    },
    {
        "id": 3,
        "question": "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum mollis nunc a molestie dictum. Mauris venenatis, felis scelerisque aliquet lacinia, nulla nisi venenatis odio, id blandit mauris ipsum id sapien. Vestibulum malesuada orci sit amet pretium facilisis. In lobortis congue augue, a commodo libero tincidunt scelerisque.</p>",
        "questionType": "order-arrange",
        "explanation": "",
        "options": [
          "Urutan 5; Urutan 1; Urutan 3; Urutan 2; Urutan 4"
        ],
        "isMultipleAnswer": false,
        "answer": [],
        "image": "",
        "guideForQuestion": {
            "start": 0,
            "end": 0,
            "guide": ""
        },
        "point": 20
    },
]