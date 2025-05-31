import React, { useState, useEffect, useMemo } from "react";
import { Table, Button, Spin, Input } from "antd";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router";
import ExamLayout from "../Layouts/ExamLayout";

const TakeExam = () => {
  const [loading, setLoading] = useState(true);
  const [profileImg, setProfileImg] = useState("/assets/profile-dummy.webp");
  const [questionList, setQuestionList] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams();

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
      <div className="p-4 flex flex-row justify-between items-center">
        <div className="flex flex-row gap-5 items-center">
          <img
            src={profileImg}
            alt="Profile"
            className="w-16 h-w-16 rounded-full object-cover"
          />
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-medium">Udin Paco</h2>
            <div className="inline-flex items-center px-2 py-0.5 text-white bg-blue-500 rounded-full text-xs font-medium">
              Mandarin Juara
            </div>
          </div>
        </div>
        <Button className="bg-[#FFCC00] text-black rounded-2xl" size="large" onClick={() => {}}>
          Kirim
        </Button>
      </div>

      <div className="p-4 flex flex-col gap-5">
        {questionList.map((question, index) => (
          <div key={question.id} className="bg-white p-6 shadow rounded-2xl">
            <h4 className="text-xl font-semibold mb-4">
              {questionNumberArray[index] ? (
                `Soal ${questionNumberArray[index]}`
              ) : "Panduan"}
            </h4>
            {question.questionType !== "guide" ? (
              <div
                className="my-4 py-3 px-4 bg-fiord-100 rounded-2xl"
                dangerouslySetInnerHTML={{ __html: question.question }}
              />
            ) : (
              <div
                className="my-4 py-3 px-4 bg-fiord-100 rounded-2xl"
                dangerouslySetInnerHTML={{ __html: question.guideForQuestion.guide }}
              />
            )}
            {question.questionType === "essay" && (
              <div className="flex flex-col my-4 gap-2">
                <h5 className="text-base font-medium">Jawaban</h5>
                <div
                  className="py-3 px-4 bg-fiord-100 rounded-2xl"
                  dangerouslySetInnerHTML={{ __html: question.answer[0] || "Tidak ada jawaban" }}
                />
              </div>
            )}
            {question.questionType === "multiple-choice" && (
              <div className="flex flex-col gap-2">
                <h5 className="text-base font-medium">Jawaban</h5>
                {question.options.map((option, idx) => (
                  <div
                    key={option.id}
                    className={`py-2 px-4 rounded-2xl ${
                      question.answer.includes(option.id) ? "bg-blue-100" : "bg-fiord-100"
                    }`}
                  >
                    {option.option}
                  </div>
                ))}
                {question.explanation && (
                  <div
                    className="mt-4 p-3 bg-fiord-200 rounded-lg"
                    dangerouslySetInnerHTML={{ __html: question.explanation }}
                  />
                )}
              </div>
            )}
            {question.questionType === "order-arrange" && (
              <div className="flex flex-col gap-2">
                <h5 className="text-base font-medium">Jawaban</h5>
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
              </div>
            )}
            {question.questionType !== "guide" && (
              <>
                <div className="w-full h-0.5 bg-fiord-200 my-4" />
                <div className="flex flex-row items-center gap-2">
                  <Input
                    value={question.questionType === 'multiple-choice' || question.questionType === 'order-arrange' ? question.point : undefined}
                    disabled={question.questionType === "multiple-choice" || question.questionType === "order-arrange"}
                    type="number"
                    placeholder="cth: 15"
                    className="w-24 rounded-2xl"
                  />
                  <span className="text-sm font-medium">Poin</span>
                </div>
              </>
            )}
          </div>
        ))}
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
        "answer": ['Ini jawaban dari kevin thanes'],
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
        "answer": [
            2
        ],
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
        "question": "",
        "questionType": "guide",
        "explanation": "",
        "options": [],
        "isMultipleAnswer": false,
        "answer": [],
        "image": "",
        "guideForQuestion": {
            "start": 0,
            "end": 0,
            "guide": "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum mollis nunc a molestie dictum. Mauris venenatis, felis scelerisque aliquet lacinia, nulla nisi venenatis odio, id blandit mauris ipsum id sapien. Vestibulum malesuada orci sit amet pretium facilisis. In lobortis congue augue, a commodo libero tincidunt scelerisque.</p>"
        },
        "point": 0
    },
    {
        "id": 4,
        "question": "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum mollis nunc a molestie dictum. Mauris venenatis, felis scelerisque aliquet lacinia, nulla nisi venenatis odio, id blandit mauris ipsum id sapien. Vestibulum malesuada orci sit amet pretium facilisis. In lobortis congue augue, a commodo libero tincidunt scelerisque.</p>",
        "questionType": "order-arrange",
        "explanation": "",
        "options": [],
        "isMultipleAnswer": false,
        "answer": [
            "Urutan 1; Urutan 2; Urutan 3; Urutan 4; Urutan 5"
        ],
        "image": "",
        "guideForQuestion": {
            "start": 0,
            "end": 0,
            "guide": ""
        },
        "point": 20
    },
]