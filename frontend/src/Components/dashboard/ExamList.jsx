import React, { useState, useEffect } from "react";
import DashboardLayout from "../../Layouts/DashboardLayout";
import { getUserTransactionsByCategory } from "../../api/user"; // sesuaikan path
import { Spin } from "antd";
import { useNavigate } from "react-router-dom";

const ExamList = () => {
  const navigate = useNavigate();
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserExams();
  }, []);

  const fetchUserExams = async () => {
    try {
      const response = await getUserTransactionsByCategory("ujian");
      if (response.status) {
        setExams(response.data);
      }
    } catch (error) {
      console.error("Gagal mengambil data ujian:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-screen">
          <Spin size="large" />
        </div>
      </DashboardLayout>
    );
  }


  return (
    <DashboardLayout>
      <div className="flex flex-col w-full min-h-screen p-6">
        <section className="mb-8 bg-white p-4 rounded-xl">
          <h2 className="text-xl font-semibold mb-4">Ujian Saya</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {exams.length > 0 ? exams.map((exam, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-xl shadow-md flex flex-col items-start"
              >
                <img
                  src={exam.ujian_img ? `${process.env.REACT_APP_API_IMG}${exam.ujian_img}` : "/assets/product-default.png"}
                  alt={exam.item}
                  className="rounded-lg mb-4 w-full object-cover"
                />
                <div className="gap-2 flex flex-col w-full">
                  <h3 className="text-xl font-semibold">{exam.item}</h3>
                  <p className="text-sm text-gray-600">Level: {exam.level}</p>
                  <div className="flex flex-col items-start mt-4 gap-2 w-full">
                  {exam.UjianProgresses && exam.UjianProgresses.length > 0 ? (() => {
                    const allDone = exam.UjianProgresses.every(p => p.is_done);
                    const anyChecking = exam.UjianProgresses.some(p => p.is_checking);

                    if (allDone) {
                      return (
                        <button disabled className="w-full bg-gray-200 text-gray-500 px-4 py-2 rounded-xl cursor-not-allowed">
                          Ujian Telah Selesai
                        </button>
                      );
                    }

                    if (anyChecking) {
                      return (
                        <button disabled className="w-full bg-yellow-100 text-yellow-600 px-4 py-2 rounded-xl cursor-not-allowed">
                          Sedang Direview
                        </button>
                      );
                    }

                    return (
                      <button
                        onClick={() => navigate(`/dashboard/take-exam/${exam.ujian_id}`)}
                        className="w-full bg-[#FFCC00] text-black px-4 py-2 rounded-xl"
                      >
                        Kerjakan Ujian
                      </button>
                    );
                  })() : (
                    <button
                      onClick={() => navigate(`/dashboard/take-exam/${exam.ujian_id}`)}
                      className="w-full bg-[#FFCC00] text-black px-4 py-2 rounded-xl"
                    >
                      Kerjakan Ujian
                    </button>
                  )}
                </div>
                </div>
              </div>
            )) : (
              <div>
                <p className="text-red-500">Belum ada ujian yang tersedia.</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default ExamList;
