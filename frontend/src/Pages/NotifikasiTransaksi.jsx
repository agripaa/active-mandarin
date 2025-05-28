import React, { useState, useEffect } from "react";
import { Table, Button, Spin } from "antd";
import Swal from "sweetalert2";
import DashboardLayout from "../Layouts/DashboardLayout";
import { getPendingTransactions, updateTransaction } from "../api/transaksi";
import { formatRupiah } from "../utils/rupiahFormat";
import { formatDate } from "../utils/formatDate";

const NotifikasiTransaksi = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState(null);
  const [lastRecord, setLastRecord] = useState(null);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await getPendingTransactions();
      setTransactions(response.data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = (record) => {
    setLastRecord(record);
    Swal.fire({
      title: "Konfirmasi Pembayaran",
      html: `
        <div style="text-align: left">
          <p><strong>Nama Pembeli</strong><span style="display: inline-block;"></span>: ${record?.User.name || "-"}</p>
          ${record?.Brand.category_brand === "product" ? `
            <p><strong>Alamat</strong><span style="display: inline-block;"></span>: ${record?.User.address || "-"}</p>
            <p><strong>Email</strong><span style="display: inline-block;"></span>: ${record?.User.email || "-"}</p>
            <p><strong>No Telp</strong><span style="display: inline-block;"></span>: ${record?.User.number || "-"}</p>
          ` : ""} 
          <p><strong>Nama ${record?.Brand.category_brand === "product" ? "Produk" : "Program"}</strong><span style="display: inline-block;"></span>: ${record?.Brand.variant || "-"}</p>
          <p><strong>Harga</strong><span style="display: inline-block;"></span>: ${record?.Brand.discount_price ? formatRupiah(record?.Brand.discount_price) : formatRupiah(record?.Brand.price) || "-"}</p>
          <p><strong>Metode Pembayaran</strong><span style="display: inline-block;"></span>: ${record.payment_method || "-"}</p>
          <p><strong>Waktu Pembelian</strong><span style="display: inline-block;"></span>: ${formatDate(record.transaction_date) || "-"}</p>
          <img src="${process.env.REACT_APP_API_IMG}${record.proof_transaction}" alt="Bukti Pembayaran" style="width: 100%; border-radius: 10px; margin-top: 10px; cursor: pointer;" onclick="window.showImageOverlay && window.showImageOverlay('${process.env.REACT_APP_API_IMG}${record.proof_transaction}')" />
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "Approve",
      cancelButtonText: "Cancel",
      showDenyButton: true,
      denyButtonText: "Tolak",
      preConfirm: () => approvePayment(record.id),
      preDeny: () => rejectPayment(record.id),
    });
  };

  useEffect(() => {
    window.showImageOverlay = (src) => {
      Swal.fire({
        imageUrl: src,
        imageAlt: "Bukti Pembayaran",
        showCloseButton: true,
        showConfirmButton: false,
        width: "auto",
        willClose: () => {
          if (lastRecord) {
            handleConfirm(lastRecord);
          }
        },
      });
    };
  }, [lastRecord]);

  const approvePayment = async (id) => {
    setActionLoadingId(id);
    Swal.fire({
      title: "Anda yakin ingin menyetujui pembayaran ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Setujui",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const data = { status_transaction: "success" };
          await updateTransaction(id, data);
          Swal.fire("Berhasil!", "Pembayaran telah disetujui.", "success");
          fetchTransactions();
        } catch (error) {
          Swal.fire("Gagal!", "Terjadi kesalahan saat menyetujui pembayaran.", "error");
        } finally {
          setActionLoadingId(null);
        }
      }
    });
  };

  const rejectPayment = async (id) => {
    setActionLoadingId(id);
    Swal.fire({
      title: "Masukkan Alasan Pembatalan",
      input: "textarea",
      inputPlaceholder: "Tulis alasan pembatalan di sini...",
      showCancelButton: true,
      confirmButtonText: "Tolak Pembayaran",
      cancelButtonText: "Batal",
      preConfirm: async (reason) => {
        if (!reason) {
          Swal.showValidationMessage("Alasan wajib diisi!");
          return false;
        }
        try {
          const data = { status_transaction: "cancel", summary_cancel: reason };
          await updateTransaction(id, data);
          Swal.fire("Ditolak!", "Pembayaran telah dibatalkan.", "success");
          fetchTransactions();
        } catch (error) {
          Swal.fire("Gagal!", "Terjadi kesalahan saat membatalkan pembayaran.", "error");
        } finally {
          setActionLoadingId(null);
        }
      },
    });
  };

  const pembayaranColumns = [
    { title: "Nama Pembeli", dataIndex: "User", key: "user", render: (user) => user?.name || "-" },
    { title: "Nama Produk", dataIndex: "Brand", key: "variant", render: (brand) => brand?.variant || "-" },
    { title: "Harga", dataIndex: "Brand", key: "price", render: (_, record) => record?.Brand?.discount_price ? formatRupiah(record?.Brand?.discount_price) : formatRupiah(record?.Brand?.price) || "-" },
    { title: "Waktu Pembelian", dataIndex: "transaction_date", key: "transaction_date", render: (date) => formatDate(date) },
    { title: "Metode Pembayaran", dataIndex: "payment_method", key: "payment_method" },
    {
      title: "Aksi",
      key: "action",
      render: (_, record) => (
        <Button onClick={() => handleConfirm(record)} className="bg-[#FFCC00] text-black" disabled={actionLoadingId === record.id}>
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
        {/* Tabel Verifikasi Pembayaran */}
        <div className="bg-white p-6 shadow-lg rounded-xl mb-6">
          <h4 className="text-lg font-semibold mb-4">Verifikasi Pembayaran</h4>
          <div className="overflow-x-auto">
            <Table columns={pembayaranColumns} dataSource={transactions} pagination={false} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default NotifikasiTransaksi;