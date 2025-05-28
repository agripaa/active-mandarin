import React, { useState, useEffect } from "react";
import { Table, Button, Spin } from "antd";
import Swal from "sweetalert2";
import DashboardLayout from "../Layouts/DashboardLayout";
import { getAffiliatorStatusFalse, approveAffiliator, rejectAffiliator } from "../api/affiliate";

const NotifikasiAffiliator = () => {
  const [affiliators, setAffiliators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState(null);

  useEffect(() => {
    fetchAffiliators();
  }, []);

  const fetchAffiliators = async () => {
    try {
      setLoading(true);
      const response = await getAffiliatorStatusFalse();
      setAffiliators(response.data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmAffiliate = (record) => {
    Swal.fire({
      title: "Detail Calon Affiliator",
      html: `
        <div style="text-align: left">
          <p><strong>Nama</strong><span style="display: inline-block;"></span>: ${record.name}</p>
          <p><strong>Email</strong><span style="display: inline-block;"></span>: ${record.email}</p>
          <p><strong>No. Telepon</strong><span style="display: inline-block;"></span>: ${record.number || "-"}</p>
          <p><strong>Referral Code</strong><span style="display: inline-block;"></span>: ${record.reveral_code || "-"}</p>
          <p><strong>Password Default</strong><span style="display: inline-block;"></span>: <span style="color:red;">NewAffiliatorMandarin</span> (harus segera diganti)</p>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "Approve",
      cancelButtonText: "Cancel",
      showDenyButton: true,
      denyButtonText: "Tolak",
      preConfirm: () => handleApprove(record),
      preDeny: () => handleReject(record),
    });
  };

  const handleApprove = async (record) => {
    if (!record.id) return Swal.fire("Error!", "ID Affiliator tidak ditemukan!", "error");
    setActionLoadingId(record.id);

    Swal.fire({
      title: "Anda yakin ingin menyetujui affiliator ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Setujui",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await approveAffiliator({ userId: record.id });
          Swal.fire("Berhasil!", "Affiliator telah disetujui.", "success");
          fetchAffiliators();
        } catch (error) {
          Swal.fire("Gagal!", "Terjadi kesalahan saat menyetujui affiliator.", "error");
        } finally {
          setActionLoadingId(null);
        }
      }
    });
  };

  const handleReject = async (record) => {
    if (!record.id) return Swal.fire("Error!", "ID Affiliator tidak ditemukan!", "error");
    setActionLoadingId(record.id);

    Swal.fire({
      title: "Masukkan Alasan Penolakan",
      input: "textarea",
      inputPlaceholder: "Tulis alasan penolakan di sini...",
      showCancelButton: true,
      confirmButtonText: "Tolak Affiliator",
      cancelButtonText: "Batal",
      preConfirm: async (reason) => {
        if (!reason) {
          Swal.showValidationMessage("Alasan wajib diisi!");
          return false;
        }
        try {
          await rejectAffiliator(record.id, reason);
          Swal.fire("Ditolak!", "Affiliator telah ditolak.", "success");
          fetchAffiliators();
        } catch (error) {
          Swal.fire("Gagal!", "Terjadi kesalahan saat menolak affiliator.", "error");
        } finally {
          setActionLoadingId(null);
        }
      },
    });
  };

  const affiliatorColumns = [
    { title: "Nama", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "No Telp", dataIndex: "number", key: "number" },
    {
      title: "Aksi",
      key: "action",
      render: (_, record) => (
        <Button className="bg-[#FFCC00] text-black" onClick={() => handleConfirmAffiliate(record)} disabled={actionLoadingId === record.id}>
          {actionLoadingId === record.id ? <Spin size="small" /> : "Konfirmasi"}
        </Button>
      ),
    },
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
        {/* Tabel Verifikasi Calon Affiliator */}
        <div className="bg-white p-6 shadow-lg rounded-xl">
          <h4 className="text-lg font-semibold mb-4">Verifikasi Calon Affiliator</h4>
          <div className="overflow-x-auto">
            <Table columns={affiliatorColumns} dataSource={affiliators} pagination={false} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default NotifikasiAffiliator;