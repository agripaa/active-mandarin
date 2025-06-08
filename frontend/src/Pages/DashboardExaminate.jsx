import React, { useState, useEffect, useMemo } from "react";
import { Table, Button, Spin, Input } from "antd";
import Swal from "sweetalert2";
import DashboardLayout from "../Layouts/DashboardLayout";
import { useNavigate, useParams } from "react-router";
import { getEssayJawabanByUserUjianProgress, examineEssayJawaban } from "../api/jawabanUser";
import { getUserById } from "../api/user";

const DashboardExaminate = () => {
  const [loading, setLoading] = useState(true);
  const [profileImg, setProfileImg] = useState("/assets/profile-dummy.webp");
  const [questionList, setQuestionList] = useState([]);
  const [maxScore, setMaxScore] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  const questionNumberArray = useMemo(() => {
    let count = 0;
    return questionList.reduce((acc, question) => {
      if (question.questionType === 'guide') {
        acc.push(null);
        return acc;
      }
      count++;
      acc.push(count);
      return acc;
    }, []);
  }, [questionList]);

  useEffect(() => {
    setLoading(true);
    getEssayJawabanByUserUjianProgress(id)
      .then(async (res) => {
        const data = res.data.map((jawaban) => ({
          id: jawaban.id,
          question: jawaban.Soal?.pertanyaan || "",
          questionType: jawaban.Soal?.tipe_soal || "essay",
          explanation: jawaban.Soal?.penjelasan || "",
          options: [],
          isMultipleAnswer: false,
          answer: [jawaban.input_jawaban || "Tidak ada jawaban"],
          image: "",
          guideForQuestion: { start: 0, end: 0, guide: "" },
          point: jawaban.poing || 0,
        }));
        console.log("Fetched data:", data);
        setQuestionList(data);
        setMaxScore(res.maxScore);
        setCurrentScore(res.currentScore);
        if (res.user) {
          setUserName(res.user.name);
          setUserRole(res.user.role || "");
          // Fetch user detail for profile image
          try {
            const userDetail = await getUserById(res.user.id);
            setProfileImg(userDetail.data.profile_img || "/assets/profile-dummy.webp");
          } catch {
            setProfileImg("/assets/profile-dummy.webp");
          }
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        Swal.fire("Error", err.message || "Gagal memuat data.", "error");
      });
  }, [id]);

  // Handler for point change
  const handlePointChange = (index, value) => {
    const newList = [...questionList];
    const oldPoint = newList[index].point || 0;
    const newPoint = Number(value) || 0;
    newList[index].point = newPoint;
    setQuestionList(newList);
    setCurrentScore((prev) => prev - oldPoint + newPoint);
  };

  const handleExamine = async () => {
    try {
      const points = questionList.map(q => ({ jawabanUserId: q.id, poing: q.point }));
      await examineEssayJawaban(id, points);
      Swal.fire("Sukses", "Pemeriksaan berhasil disimpan!", "success").then(() => {
        navigate("/verifikasi/ujian");
      });
    } catch (err) {
      Swal.fire("Error", err.message || "Gagal menyimpan pemeriksaan.", "error");
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-[80vh]">
          <Spin size="large" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-4 flex flex-row justify-between items-center">
        <div className="flex flex-row gap-5 items-center">
          <img
            src={profileImg}
            alt="Profile"
            className="w-16 h-w-16 rounded-full object-cover"
          />
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-medium">{userName || "-"}</h2>
            <div className="inline-flex items-center px-2 py-0.5 text-white bg-blue-500 rounded-full text-xs font-medium">
              {userRole || "Mandarin Juara"}
            </div>
            <div className="text-xs mt-1">Skor: {currentScore} / {maxScore}</div>
          </div>
        </div>
        <Button className="bg-[#FFCC00] text-black rounded-2xl" size="large" onClick={handleExamine}>
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
                    value={question.point}
                    onChange={e => handlePointChange(index, e.target.value)}
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
    </DashboardLayout>
  );
};

export default DashboardExaminate;