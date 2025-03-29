import React from "react";
import { Table, Button } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import DashboardLayout from "../Layouts/DashboardLayout";

const pembayaranData = [
  {
    key: "1",
    buyer: "輝玉",
    product: "E-Flashcard HSK 1",
    price: "Rp 50.000",
    date: "25 Mar 2025",
    paymentMethod: "QRIS",
    affiliate: "Milani Kasongo",
    commission: "Rp 10.000",
  },
  {
    key: "2",
    buyer: "Vuong Duyen Duy...",
    product: "E-Flashcard HSK 2",
    price: "Rp 50.000",
    date: "25 Mar 2025",
    paymentMethod: "Transfer Bank",
    affiliate: "-",
    commission: "-",
  },
  {
    key: "3",
    buyer: "Dasa Gandi Rajata",
    product: "Buku Kotak-Kotak",
    price: "Rp 50.000",
    date: "25 Mar 2025",
    paymentMethod: "QRIS",
    affiliate: "-",
    commission: "-",
  },
  {
    key: "4",
    buyer: "杜建輝",
    product: "Buku Kotak-Kotak",
    price: "Rp 50.000",
    date: "25 Mar 2025",
    paymentMethod: "Transfer Bank",
    affiliate: "-",
    commission: "-",
  },
  {
    key: "5",
    buyer: "Eva Hodžić",
    product: "Buku Kotak-Kotak",
    price: "Rp 50.000",
    date: "25 Mar 2025",
    paymentMethod: "QRIS",
    affiliate: "-",
    commission: "-",
  },
];

const affiliatorData = [
  {
    key: "1",
    name: "Mohammed Hussein",
    email: "nancy.brooks@gmail.com",
    phone: "+62 (648) 958-7603",
    verified: true,
  },
  {
    key: "2",
    name: "Aleksander Nowak",
    email: "friable_woodworkers_51@gmail.com",
    phone: "+62 (510) 432-8766",
    verified: false,
  },
  {
    key: "3",
    name: "Cynthia Stewart",
    email: "lisa.jones@gmail.com",
    phone: "+62 (230) 161-1127",
    verified: false,
  },
  {
    key: "4",
    name: "Josh Stewart",
    email: "ola.ad6b6y@gmail.com",
    phone: "+62 (826) 587-5118",
    verified: false,
  },
  {
    key: "5",
    name: "仝思",
    email: "jesús.rodriguez@gmail.com",
    phone: "+62 (423) 937-3835",
    verified: true,
  },
];

const Notifikasi = () => {
  const pembayaranColumns = [
    { title: "Nama Pembeli", dataIndex: "buyer", key: "buyer" },
    { title: "Nama Produk", dataIndex: "product", key: "product" },
    { title: "Harga", dataIndex: "price", key: "price" },
    { title: "Waktu Pembelian", dataIndex: "date", key: "date" },
    { title: "Metode Pembayaran", dataIndex: "paymentMethod", key: "paymentMethod" },
    { title: "Affiliator", dataIndex: "affiliate", key: "affiliate" },
    { title: "Komisi", dataIndex: "commission", key: "commission" },
    {
      title: "Aksi",
      key: "action",
      render: () => (
        <div className="flex gap-3">
            <Button className="bg-transparent border-2 border-neutral-300 text-black rounded-xl">
                Konfirmasi
            </Button>
        </div>
      ),
    },
  ];

  const affiliatorColumns = [
    { title: "Nama", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "No Telp", dataIndex: "phone", key: "phone" },
    {
      title: "Aksi",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-3">
            <Button className="bg-transparent border-2 border-neutral-300 text-black rounded-xl">
                Konfirmasi
            </Button>
        </div>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <div className="p-4">
        {/* Tabel Verifikasi Pembayaran */}
        <div className="bg-white p-6 shadow-lg rounded-xl mb-6">
          <h4 className="text-lg font-semibold mb-4">Verifikasi Pembayaran</h4>
          <Table
            columns={pembayaranColumns}
            dataSource={pembayaranData}
            pagination={false}
          />
        </div>

        {/* Tabel Verifikasi Calon Affiliator */}
        <div className="bg-white p-6 shadow-lg rounded-xl">
          <h4 className="text-lg font-semibold mb-4">Verifikasi Calon Affiliator</h4>
          <Table
            columns={affiliatorColumns}
            dataSource={affiliatorData}
            pagination={false}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Notifikasi;
