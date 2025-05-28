import React, { useState, useEffect } from "react";
import { Table, Button, Spin } from "antd";
import Swal from "sweetalert2";
import DashboardLayout from "../Layouts/DashboardLayout";
import { useNavigate } from "react-router";
// import { getAffiliatorStatusFalse, approveAffiliator, rejectAffiliator } from "../api/affiliate";

const NotifikasiUjian = () => {
  // const [affiliators, setAffiliators] = useState([]);
  const [todoEvaluate, setTodoEvaluate] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    // give a mock data for todoEvaluate
    setLoading(true);
    const mockData = [
      { id: 1, exam_name: "Ujian Pasti Bisa", user_name: "John Doe", type: "HSK 1", score: 85 },
      { id: 2, exam_name: "Ujian Pasti Bisa", user_name: "Jane Smith", type: "HSK 1", score: 90 },
    ];

    setTodoEvaluate(mockData);
    setLoading(false);
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
            <Table columns={todoEvaluateColumns} dataSource={todoEvaluate} pagination={false} />
          </div>
        </div>
      </div>

      <div className="p-4">
        {/* Tabel Sudah Dinilai */}
        <div className="bg-white p-6 shadow-lg rounded-xl">
          <h4 className="text-lg font-semibold mb-4">Sudah Dinilai</h4>
          <div className="overflow-x-auto">
            <Table columns={alreadyEvaluatedColumns} dataSource={[]} pagination={false} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default NotifikasiUjian;