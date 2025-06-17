import { Spin, Table } from "antd";
import { formatRupiah } from "../../utils/rupiahFormat";
import { FaWhatsapp } from "react-icons/fa";
import { getTransactionById } from "../../api/transaksi";
import { getCertificateById } from "../../api/certificate";
import { useEffect, useState } from "react";
import { formatDate } from "../../utils/formatDate";
import { getProfile } from "../../api/auth";
import { html2pdf } from "html2pdf.js";
import PercentileRankData from "../../Store/Constants/PercentileRank";
import { QRCode } from "react-qrcode-logo";
import Swal from "sweetalert2";

const { useParams, Link, useNavigate } = require("react-router-dom");

const levelMap = {
  1: {
    mandarin: "HSK（一级）成绩报告",
    english: "HSK (Level 1) Examination Score Report",
  },
  2: {
    mandarin: "HSK（二级）成绩报告",
    english: "HSK (Level 2) Examination Score Report",
  },
  3: {
    mandarin: "HSK（三级）成绩报告",
    english: "HSK (Level 3) Examination Score Report",
  },
  4: {
    mandarin: "HSK（四级）成绩报告",
    english: "HSK (Level 4) Examination Score Report",
  },
  5: {
    mandarin: "HSK（五级）成绩报告",
    english: "HSK (Level 5) Examination Score Report",
  },
  6: {
    mandarin: "HSK（六级）成绩报告",
    english: "HSK (Level 6) Examination Score Report",
  },
};

const Certificate = () => {
  const { id, examNo } = useParams();
  const [certificate, setCertificate] = useState(null);
  const token = localStorage.getItem("token");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const response = await getProfile();
      setUser(response.data);
    } catch (error) {
      if ([400, 401, 403].includes(error.status)) {
        navigate("/", { replace: true });
        return;
      }
    }
  };

  const handleDownloadPDF = () => {
    const element = document.getElementById("certificate-content");

    import("html2pdf.js").then((module) => {
      const html2pdf = module.default;

      const opt = {
        margin: 0,
        filename: `Certificate-${certificate?.exam_no}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };

      html2pdf().set(opt).from(element).save();
    });
  };

  const fetchCertificate = async () => {
    try {
      const response = await getCertificateById(id, examNo);
      setCertificate(response.data);
      console.log(response.data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Failed to fetch certificate",
      }).then(() => {
        navigate("/dashboard", { replace: true });
      });
      if ([400, 401, 403].includes(error.status)) {
        navigate("/", { replace: true });
        return;
      }
    }
  };

  function toDataURL(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result);
        console.log(reader.result);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.withCredentials = false;
    xhr.send();
  }

  useEffect(() => {
    fetchCertificate();
    fetchProfile();
  }, []);

  if (!certificate) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <Spin size="large" />
      </div>
    );
  }

  // if (!token) {
  //   navigate("/", { replace: true });
  //   return;
  // }

  return (
    <>
      <div
        id="certificate-content"
        className="container w-full mx-auto max-w-[880px] my-8 px-5"
      >
        <header className="flex flex-col w-full">
          <img
            src="/assets/active_logo.png"
            alt="logo"
            className="h-16 w-fit"
          />
          <div className="flex flex-col items-center text-center mt-3">
            <h1 className="text-lg leading-[30px] font-semibold uppercase">
              汉语水平测试模拟成绩单
            </h1>
            <p className="text-base">HSK Mock Test Score Report</p>
          </div>
          <div className="flex flex-col items-center text-center mt-3">
            <h1 className="text-lg leading-[30px] font-semibold uppercase">
              {levelMap[certificate?.exam_level]?.mandarin}
            </h1>
            <p className="text-base">
              {levelMap[certificate?.exam_level]?.english}
            </p>
          </div>
        </header>
        <main className="w-full mt-3">
          <div className="flex flex-col md:flex-row gap-6 w-full">
            <div className="flex flex-col gap-2 grow">
              {/* Name */}
              <div className="flex flex-row gap-3 items-center">
                <div className="flex flex-col">
                  <p className="font-semibold text-base w-max">姓名:</p>
                  <p className="font-normal text-xs w-max">Name</p>
                </div>
                <p className="border-b border-black w-full text-center uppercase">
                  {certificate?.User?.name}
                </p>
              </div>
              {/* Gender and Nationality */}
              <div className="flex flex-row gap-3 items-center">
                <div className="flex flex-row gap-3 items-center">
                  <div className="flex flex-col">
                    <p className="font-semibold text-base w-max">性别:</p>
                    <p className="font-normal text-xs w-max">Gender</p>
                  </div>
                  <p className="border-b border-black w-full text-center px-5">
                    {certificate?.gender === "Male" ? "男" : "女"}
                  </p>
                </div>
                <div className="flex flex-row gap-3 items-center w-full">
                  <div className="flex flex-col">
                    <p className="font-semibold text-base w-max">国籍:</p>
                    <p className="font-normal text-xs w-max">Nationality</p>
                  </div>
                  <p className="border-b border-black w-full text-center">
                    {certificate?.nationality}
                  </p>
                </div>
              </div>
              {/* Date */}
              <div className="flex flex-row gap-3 items-center">
                <div className="flex flex-row gap-3 items-center">
                  <div className="flex flex-col">
                    <p className="font-semibold text-base w-max">考试日期:</p>
                    <p className="font-normal text-xs w-max">
                      Examination Date
                    </p>
                  </div>
                  <p className="border-b border-black w-full text-center px-5">
                    {certificate?.exam_date?.split("-")[0]}
                  </p>
                  <div className="flex flex-col items-center text-center">
                    <p className="font-semibold text-base w-max">年</p>
                    <p className="font-normal text-xs w-max">Year</p>
                  </div>
                </div>
                <div className="flex flex-row gap-3 items-center w-full">
                  <p className="border-b border-black w-full text-center">
                    {certificate?.exam_date?.split("-")[1]}
                  </p>
                  <div className="flex flex-col items-center text-center">
                    <p className="font-semibold text-base w-max">月</p>
                    <p className="font-normal text-xs w-max">Month</p>
                  </div>
                </div>
                <div className="flex flex-row gap-3 items-center w-full">
                  <p className="border-b border-black w-full text-center">
                    {certificate?.exam_date?.split("-")[2]}
                  </p>
                  <div className="flex flex-col items-center text-center">
                    <p className="font-semibold text-base w-max">日</p>
                    <p className="font-normal text-xs w-max">Day</p>
                  </div>
                </div>
              </div>
              {/* Number */}
              <div className="flex flex-row gap-3 items-center">
                <div className="flex flex-col">
                  <p className="font-semibold text-base w-max">编号:</p>
                  <p className="font-normal text-xs w-max">No</p>
                </div>
                <p className="border-b border-black w-full text-center">
                  {certificate?.exam_no || "N/A"}
                </p>
              </div>
            </div>
            <img
              id="Img1"
              src={
                certificate?.User?.profile_img ? `${process.env.REACT_APP_API_IMG}${certificate?.User?.profile_img}` : "/assets/profile-dummy.webp"
              }
              alt="profile"
              className="h-auto w-full max-w-[200px]"
            />
          </div>
          <hr className="w-full my-5" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="overflow-x-auto border border-slate-300 rounded-xl col-span-1 lg:col-span-5">
              <table className="w-full h-full table-auto border-collapse rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-slate-200 text-left">
                    <th className="px-4 py-1"></th>
                    <th className="px-4 py-1 w-max text-center">
                      <span className="font-semibold">满分</span>
                      <br />
                      <span className="font-normal w-max text-xs">
                        Full Score
                      </span>
                    </th>
                    <th className="px-4 py-1 w-max text-center">
                      <span className="font-semibold">你的成绩</span>
                      <br />
                      <span className="font-normal w-max text-xs">
                        Your Score
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {certificate?.exam_level > 2
                    ? [
                        {
                          subject: "听力",
                          english: "Listening",
                          score: certificate?.listening_score,
                          maxScore: 100,
                        },
                        {
                          subject: "阅读",
                          english: "Reading",
                          score: certificate?.reading_score,
                          maxScore: 100,
                        },
                        {
                          subject: "写作",
                          english: "Writing",
                          score: certificate?.writing_score,
                          maxScore: 100,
                        },
                        {
                          subject: "总分",
                          english: "Total Score",
                          score: certificate?.total_score,
                          maxScore: 300,
                        },
                      ].map((item, index) => (
                        <tr key={index} className="text-left font-normal">
                          <td className="px-4">
                            <span className="font-semibold">
                              {item.subject}
                            </span>
                            <br />
                            <span className="font-normal pb-2 text-xs">
                              {item.english}
                            </span>
                          </td>
                          <td className="px-4 text-center pb-2 pt-1 text-sm">
                            {item.maxScore}
                          </td>
                          <td className="px-4 text-center pb-2 pt-1 text-sm">
                            {item.score}
                          </td>
                        </tr>
                      ))
                    : [
                        {
                          subject: "听力",
                          english: "Listening",
                          score: certificate?.listening_score,
                          maxScore: 100,
                        },
                        {
                          subject: "阅读",
                          english: "Reading",
                          score: certificate?.reading_score,
                          maxScore: 100,
                        },
                        {
                          subject: "总分",
                          english: "Total Score",
                          score: certificate?.total_score,
                          maxScore: 200,
                        },
                      ].map((item, index) => (
                        <tr key={index} className="text-left font-normal">
                          <td className="px-4">
                            <span className="font-semibold">
                              {item.subject}
                            </span>
                            <br />
                            <span className="font-normal pb-2 text-xs">
                              {item.english}
                            </span>
                          </td>
                          <td className="px-4 text-center pb-2 pt-1 text-sm">
                            {item.maxScore}
                          </td>
                          <td className="px-4 text-center pb-2 pt-1 text-sm">
                            {item.score}
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
            <div className="overflow-x-auto border border-slate-300 rounded-xl col-span-1 w-full lg:col-span-7">
              <table className="w-full table-auto border-collapse rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-slate-200 text-left">
                    <th className="px-4 py-1 w-max text-center">
                      <span className="font-semibold">听力</span>
                      <br />
                      <span className="font-normal w-max text-xs">
                        Listening
                      </span>
                    </th>
                    <th className="px-4 py-1 w-max text-center">
                      <span className="font-semibold">阅读</span>
                      <br />
                      <span className="font-normal w-max text-xs">Reading</span>
                    </th>
                    {certificate?.exam_level > 2 ? (
                      <th className="px-4 py-1 w-max text-center">
                        <span className="font-semibold">满分</span>
                        <br />
                        <span className="font-normal w-max text-xs">
                          Writing
                        </span>
                      </th>
                    ) : null}
                    <th className="px-4 py-1 w-max text-center">
                      <span className="font-semibold">总分</span>
                      <br />
                      <span className="font-normal w-max text-xs">
                        Total Score
                      </span>
                    </th>
                    <th className="px-4 py-1 w-max text-center">
                      <span className="font-semibold">百分等级</span>
                      <br />
                      <span className="font-normal w-max text-xs">
                        Percentile Rank
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {PercentileRankData[
                    certificate?.exam_level
                  ]?.percentile_ranks.map((item, index) => (
                    <tr key={index} className="text-center font-normal">
                      <td className="px-4 pt-1 pb-2 text-sm">{item.Listening}</td>
                      <td className="px-4 pt-1 pb-2 text-sm">{item.Reading}</td>
                      {certificate?.exam_level > 2 ? (
                        <td className="px-4 pt-1 pb-2 text-sm">{item.Writing}</td>
                      ) : null}
                      <td className="px-4 pt-1 pb-2 text-sm">{item.Total}</td>
                      <td className="px-4 pt-1 pb-2 text-sm">{item.Percentile}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex flex-row items-center gap-1 mt-4 mb-4">
            <p className="font-semibold">
              总分{certificate?.passing_score}分为合格
            </p>
            <p className="font-normal text-sm">
              (Passing Score: {certificate?.passing_score})
            </p>
          </div>
        </main>
        <div className="flex flex-col justify-between mt-6 container w-full mx-auto max-w-[880px] my-8 px-5 gap-5 lg:flex-row">
          <div className="flex flex-col">
          {certificate?.exam_no && certificate.ujian_id && (
            <QRCode
              value={`${window.location.origin}/certificate-table/${certificate.ujian_id}/${certificate.exam_no}`}
              style={{ width: 128, height: 128, aspectRatio: 1 }}
            />
          )}
            <p>南京市 • 中国</p>
            <p>Nanjing • China</p>
          </div>
          <img
            src="/assets/sign.png"
            alt="QR Code"
            className="w-56 h-fit mt-2 lg:mr-12"
          />
        </div>
      </div>
      <div className="flex items-center justify-start mt-6 my-8 px-5 gap-2 max-w-[880px] mx-auto w-full">
        <Link to="/dashboard">
          <button className="px-6 py-4 w-fit border-2 border-fiord-300 tracking-wide text-xs text-fiord-950 font-medium rounded-2xl transition-all duration-300 hover:bg-yellow-500 hover:text-black sm:text-sm lg:text-base">
            Go To Dashboard
          </button>
        </Link>
        <button
          onClick={handleDownloadPDF}
          className="px-6 py-4 w-fit bg-yellow-400 tracking-wide text-xs text-black font-medium rounded-2xl transition-all duration-300 hover:bg-yellow-600 hover:text-black sm:text-sm lg:text-base"
        >
          Download
        </button>
      </div>
    </>
  );
};

export default Certificate;
