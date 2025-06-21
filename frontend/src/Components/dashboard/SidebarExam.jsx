import React, { useState, useEffect, useContext } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { RiArrowDownSLine } from "react-icons/ri";
import { getProfile } from "../../api/auth";
import ExamContext from "../../context/ExamContext";
import { useParams } from "react-router-dom";

const SidebarExam = ({ onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams(); 
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [name, setName] = useState("");
  const [profileImg, setProfileImg] = useState("/assets/profile-dummy.webp");
  const [loading, setLoading] = useState(true);
  const isReviewMode = location.pathname.includes("review-hasil");

  const { timeLeft, totalQuestions, examPhase, questionList } = useContext(ExamContext);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/", { replace: true });
      return;
    }

    const handleGetProfile = async () => {
      try {
        const response = await getProfile();

        if (!response.status) {
          localStorage.removeItem("token");
          navigate("/", { replace: true });
          return;
        }

        setUser(response.data);
        setName(response.data?.name || "-");
        setRole(response.data?.Role?.role_name || "-");
        setProfileImg(response.data?.profile_img ? `${process.env.REACT_APP_API_IMG}${response.data.profile_img}` : "/assets/profile-dummy.webp");
      } catch (error) {
        localStorage.removeItem("token");
        navigate("/", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    handleGetProfile();
  }, [navigate]);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  };

  const capitalize = (str) => {
    if (!str) return "-";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60).toString().padStart(2, "0");
    const sec = (seconds % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
  };

  const getPhaseLabel = (phase) => {
    switch (phase) {
      case "listening":
        return "听力 - Mendengar";
      case "reading":
        return "阅读 - Membaca";
      case "writing":
        return "写作 - Menulis";
      default:
        return capitalize(phase);
    }
  };

    const getCurrentQuestionNumber = () => {
    const searchParams = new URLSearchParams(location.search);
    const value = parseInt(searchParams.get("question"), 10);
    return isNaN(value) ? 1 : value; // fallback ke 1 kalau tidak ada
    };

  const currentQuestionNumber = getCurrentQuestionNumber();

  return (
    <aside className="w-[260px] h-screen fixed top-0 left-0 z-50 bg-white shadow-lg overflow-y-auto transition-transform py-6">
      {onClose && (
        <button
          onClick={onClose}
          className="lg:hidden absolute top-4 right-4 z-50 text-gray-600 hover:text-black text-2xl"
        >
          ✕
        </button>
      )}
      <div className="flex justify-center mb-4">
        <img src="/assets/active_logo.png" alt="Metalog Logo" className="w-[140px]" />
      </div>

      <div className="px-4 pt-3 pb-6">
        <div className="flex flex-col items-center justify-center">
          <img src={profileImg} alt="profile user" className="w-[100px] h-[100px] rounded-full object-cover" />
          <h5 className="text-xl text-gray-800 mt-2 font-medium text-center w-full">{name}</h5>
          <h5 className="text-md text-white bg-[#3377FF] px-4 py-1 rounded-2xl text-center font-medium">
            {capitalize(role)}
          </h5>
        </div>
      </div>

      <div className="px-4">
        <hr className="mb-4" />
      </div>

      <div className="flex flex-col justify-between h-auto px-4">
        <div className="flex flex-col gap-2 mb-4">
          <p className="text-base font-medium text-fiord-950">Tipe Soal</p>
          <h3 className="text-xl font-semibold">{getPhaseLabel(examPhase)}</h3>
        </div>

        {!isReviewMode && (
          <div className="flex flex-col gap-2 mb-4">
            <p className="text-base font-medium text-fiord-950">Sisa Waktu</p>
            <div className="rounded-full bg-background py-2.5">
              <p className="text-xl font-medium text-[#3377FF] text-center">{formatTime(timeLeft)}</p>
            </div>
          </div>
        )}
      </div>

      <div className="px-4">
        <hr className="mb-4" />
      </div>

    <div className="flex flex-row flex-wrap gap-1.5 px-4">
    {Array.isArray(questionList) &&
        (() => {
          let numberCounter = 1;
        return questionList.map((q, index) => {
            const isGuide = q.questionType === "guide";
            const displayLabel = isGuide ? "!" : numberCounter++;
            const isActive = index === currentQuestionNumber - 1;

            const isAnswered = !isReviewMode &&
              q.phase === examPhase && // ← hanya periksa soal aktif
              Array.isArray(q.answer) &&
              (
                q.questionType === "essay"
                  ? q.answer[0]?.trim()?.length > 0
                  : q.answer.length > 0
              );


            return (
              <button
                key={index}
                className={`w-10 h-10 rounded-lg flex items-center justify-center font-medium transition-colors
                  ${isGuide
                    ? "bg-yellow-300 text-black"
                    : isActive
                      ? "bg-[#3377FF] text-white"
                      : isAnswered
                        ? "bg-gray-300 text-black"
                        : "bg-white hover:bg-fiord-200 text-fiord-950"
                  }
                `}
                onClick={() => {
                  const targetUrl = isReviewMode
                    ? `/dashboard/take-exam/${id}/review-hasil?question=${index + 1}`
                    : `/dashboard/take-exam/${id}?question=${index + 1}`;

                  navigate(targetUrl);
                }}
              >
              {displayLabel}
            </button>
            );
        });
        })()
    }
    </div>

    </aside>
  );
};

export default SidebarExam;
