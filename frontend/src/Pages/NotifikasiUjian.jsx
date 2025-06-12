import React, { useState, useEffect } from "react";
import { Table, Button, Spin } from "antd";
import Swal from "sweetalert2";
import DashboardLayout from "../Layouts/DashboardLayout";
import { useNavigate } from "react-router";
import { getExamUserResults } from "../api/jawabanUser";

const NotifikasiUjian = () => {
  const [todoEvaluate, setTodoEvaluate] = useState({ belum: [], sudah: [] }); 
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await getExamUserResults();
        // res is expected to be { status: true, data: [...] }
        const data = res.data || [];
        // Split into belum dinilai (is_checking) and sudah dinilai (is_done)
        console.log("Fetched exam results:", data);
        const belum = data.filter(item => item.status === 'is_checking' || item.status === true || item.status === 1).map((item, index) => ({
          key: `belum-${index}`,
          id: item.id, // id progress
          exam_name: item.nama_ujian,
          user_name: item.nama_peserta,
          type: item.tipe_ujian,
          score: item.nilai_sementara,
          user_id: item.user_id,
        }));
        const sudah = data.filter(item => item.status === 'is_done' || item.status === false || item.status === 0).map((item, index) => ({
          key: `sudah-${index}`,
          id: item.id,
          exam_name: item.nama_ujian,
          user_name: item.nama_peserta,
          type: item.tipe_ujian,
          score: item.nilai_final || item.nilai_sementara,
          user_id: item.user_id,
        }));
        setTodoEvaluate({ belum, sudah });
      } catch (error) {
        console.log("Error fetching exam results:", error);
        Swal.fire("Gagal", "Gagal mengambil data hasil ujian", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleConfirm = (record) => {
    navigate(`/dashboard/examinate/${record.id}`)
  };

  const todoEvaluateColumns = [
    { title: "Nama Ujian", dataIndex: "exam_name", key: "exam_name" },
    { title: "Nama Peserta", dataIndex: "user_name", key: "user_name" },
    { title: "Tipe Ujian", dataIndex: "type", key: "type" },
    { title: "Nilai Sementara", dataIndex: "score", key: "score" },
    {
      title: "Aksi",
      key: "action",
      render: (_, record) => (
        <Button className="bg-[#FFCC00] text-black" onClick={() => handleConfirm(record)} disabled={actionLoadingId === record.id}>
          {actionLoadingId === record.id ? <Spin size="small" /> : "Lihat Jawaban"}
        </Button>
      ),
    },
  ];

  const alreadyEvaluatedColumns = [
    { title: "Nama Ujian", dataIndex: "exam_name", key: "exam_name" },
    { title: "Nama Peserta", dataIndex: "user_name", key: "user_name" },
    { title: "Tipe Ujian", dataIndex: "type", key: "type" },
    { title: "Nilai Final", dataIndex: "score", key: "score" },
  ];

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
      <div className="p-4">
        {/* Tabel Belum Dinilai */}
        <div className="bg-white p-6 shadow-lg rounded-xl">
          <h4 className="text-lg font-semibold mb-4">Belum Dinilai</h4>
          <div className="overflow-x-auto">
            <Table columns={todoEvaluateColumns} dataSource={todoEvaluate.belum} pagination={false} />
          </div>
        </div>
      </div>

      <div className="p-4">
        {/* Tabel Sudah Dinilai */}
        <div className="bg-white p-6 shadow-lg rounded-xl">
          <h4 className="text-lg font-semibold mb-4">Sudah Dinilai</h4>
          <div className="overflow-x-auto">
            <Table columns={alreadyEvaluatedColumns} dataSource={todoEvaluate.sudah} pagination={false} /> 
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default NotifikasiUjian;