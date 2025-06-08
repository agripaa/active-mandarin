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
      const raw = response.data || [];
      const filtered = raw.filter(tx => {
        return tx.type_transaction !== "ujian" || !tx.isFromProgram;
      });
      setTransactions(filtered);
    } catch (error) {
      console.error("Gagal fetch transaksi:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = (record) => {
    // Hindari popup untuk baris sertifikat
    if (record.isCertif) return;

    setLastRecord(record);

    const isBrand = !!record.Brand;
    const isUjian = !!record.Ujian;

    const namaProduk = isBrand
      ? record.Brand?.variant || "-"
      : record.Ujian?.nama_ujian || "-";

    const hargaProduk = (() => {
      if (record.Ujian) {
        const hargaDiskon = parseInt(record.Ujian.harga_diskon || record.Ujian.harga_normal || 0);
        const hargaCertif = record.include_certif ? parseInt(record.Ujian.harga_certif || 0) : 0;
        return formatRupiah(hargaDiskon + hargaCertif);
      } else if (record.Brand) {
        return record.Brand?.discount_price
          ? formatRupiah(parseInt(record.Brand?.discount_price))
          : formatRupiah(parseInt(record.Brand.price));
      }
      return "Rp 0";
    })();


    const kategoriLabel = isBrand
      ? record.Brand?.category_brand === "product"
        ? "Produk"
        : "Program"
      : "Ujian";

    const extraUserInfo =
      isBrand && record.Brand?.category_brand === "product"
        ? `
          <p><strong>Alamat</strong>: ${record?.User?.address || "-"}</p>
          <p><strong>Email</strong>: ${record?.User?.email || "-"}</p>
          <p><strong>No Telp</strong>: ${record?.User?.number || "-"}</p>
        `
        : "";

    Swal.fire({
      title: "Konfirmasi Pembayaran",
      html: `
        <div style="text-align: left">
          <p><strong>Nama Pembeli</strong>: ${record?.User?.name || "-"}</p>
          ${extraUserInfo}
          <p><strong>Nama ${kategoriLabel}</strong>: ${namaProduk}</p>
          <p><strong>Harga</strong>: ${hargaProduk}</p>
          ${isUjian && record.include_certif ? `
            <p><strong>Include Sertifikat</strong>: Ya</p>
          ` : "<p><strong>Include Sertifikat</strong>: Tidak</p>"}
          <p><strong>Metode Pembayaran</strong>: ${record.payment_method || "-"}</p>
          <p><strong>Waktu Pembelian</strong>: ${formatDate(record.transaction_date) || "-"}</p>
          <img src="${process.env.REACT_APP_API_IMG}${record.proof_transaction}" 
              alt="Bukti Pembayaran"
              style="width: 100%; border-radius: 10px; margin-top: 10px; cursor: pointer;"
              onclick="window.showImageOverlay && window.showImageOverlay('${process.env.REACT_APP_API_IMG}${record.proof_transaction}')"
          />
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
    {
      title: "Nama Pembeli",
      dataIndex: "User",
      key: "user",
      render: (user) => user?.name || "-",
    },
    {
      title: "Nama Produk",
      key: "produk",
      render: (record) =>
        record.type_transaction === "ujian"
          ? record.Ujian?.nama_ujian || "-"
          : record.Brand?.variant || "-",
    },
    {
      title: "Tipe Transaksi",
      key: "type_transaction",
      render: (record) => {
        if (record.type_transaction === "ujian") return "Ujian";
        if (record.Brand?.category_brand === "product") return "Produk";
        if (record.Brand?.category_brand === "program") return "Program";
        return "-";
      },
    },
    {
      title: "Harga",
      key: "harga",
      render: (record) => {
        let totalHarga = 0;

        if (record.Ujian) {
          const hargaDiskon = parseInt(record.Ujian.harga_diskon || record.Ujian.harga_normal || 0);
          const hargaCertif = record.include_certif ? parseInt(record.Ujian.harga_certif || 0) : 0;
          totalHarga = hargaDiskon + hargaCertif;
        } else if (record.Brand) {
          totalHarga = parseInt(record.Brand?.discount_price || record.Brand.price || 0);
        }

        return formatRupiah(totalHarga);
      },
    },
    {
      title: "Waktu Pembelian",
      dataIndex: "transaction_date",
      key: "transaction_date",
      render: (date) => formatDate(date),
    },
    {
      title: "Metode Pembayaran",
      dataIndex: "payment_method",
      key: "payment_method",
    },
    {
      title: "Aksi",
      key: "action",
      render: (_, record) =>
        <Button
          onClick={() => handleConfirm(record)}
          className="bg-[#FFCC00] text-black"
          disabled={actionLoadingId === record.id}
        >
          {actionLoadingId === record.id ? <Spin size="small" /> : "Konfirmasi"}
        </Button>,
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