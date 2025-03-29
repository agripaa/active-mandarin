import React, { useState } from "react";
import { Table, Input, Modal, Button, Checkbox, Upload } from "antd";
import { RiSearchLine } from "react-icons/ri";
import { UploadOutlined } from "@ant-design/icons";
import DashboardLayout from "../Layouts/DashboardLayout";

const recruitmentData = [
  {
    key: "1",
    name: "Mohammed Hussein",
    email: "nancy.brooks@gmail.com",
    phone: "+62 (648) 958-7603",
    domicile: "Kota Bekasi",
  },
  {
    key: "2",
    name: "Aleksander Nowak",
    email: "woodworkers_51@gmail.com",
    phone: "+62 (510) 432-8766",
    domicile: "Kota Bogor",
  },
  {
    key: "3",
    name: "Cynthia Stewart",
    email: "lisa.jones@gmail.com",
    phone: "+62 (230) 161-1127",
    domicile: "Kabupaten Bogor",
  },
  {
    key: "4",
    name: "Josh Stewart",
    email: "ola.ad6b6y@gmail.com",
    phone: "+62 (826) 587-5118",
    domicile: "Kota Depok",
  },
  {
    key: "5",
    name: "仝思",
    email: "jesús.rodriguez@gmail.com",
    phone: "+62 (423) 937-3835",
    domicile: "Surabaya",
  },
];

const Rekrutmen = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = (candidate) => {
    setSelectedCandidate(candidate);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedCandidate(null);
  };

  const filteredData = recruitmentData.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    { title: "Nama", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "No Telpon", dataIndex: "phone", key: "phone" },
    { title: "Domisili", dataIndex: "domicile", key: "domicile" },
    {
      title: "Aksi",
      key: "action",
      render: (_, record) => (
        <span
          className="text-blue-500 cursor-pointer"
          onClick={() => showModal(record)}
        >
          Selengkapnya
        </span>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <section className="flex flex-col w-full p-4">
        <div className="bg-white p-6 shadow-lg rounded-xl w-full">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-lg font-semibold">Data Rekrutmen</h4>
            <Input
              placeholder="Cari Affiliator, cth: Josh Steward"
              prefix={<RiSearchLine className="text-2xl mr-2" />}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-96 py-2 px-4"
            />
          </div>

          <Table columns={columns} dataSource={filteredData} pagination={false} />
        </div>

        <Modal
          title="Data Rekrutmen"
          open={isModalOpen}
          onCancel={handleCancel}
          footer={null}
        >
          {selectedCandidate && (
            <div className="flex flex-col gap-4">
              <div>
                <h4 className="text-gray-600">Nama</h4>
                <div className="border rounded-md p-2">{selectedCandidate.name}</div>
              </div>
              <div>
                <h4 className="text-gray-600">Email</h4>
                <div className="border rounded-md p-2">{selectedCandidate.email}</div>
              </div>
              <div>
                <h4 className="text-gray-600">No Telpon</h4>
                <div className="border rounded-md p-2">{selectedCandidate.phone}</div>
              </div>
              <div>
                <h4 className="text-gray-600">Domisili</h4>
                <div className="border rounded-md p-2">{selectedCandidate.domicile}</div>
              </div>

              <div>
                <h4 className="text-gray-600 font-semibold">Posisi Pekerjaan Yang Dilamar</h4>
                <div className="flex flex-col gap-2">
                  <Checkbox>Product Development Officer</Checkbox>
                  <Checkbox>Project Officer</Checkbox>
                  <Checkbox>Education Consultant Officer</Checkbox>
                  <Checkbox>Finance Officer</Checkbox>
                  <Checkbox>Mandarin Translator</Checkbox>
                  <Checkbox>Mandarin Tutor</Checkbox>
                  <Checkbox>Mandarin Interpreter</Checkbox>
                </div>
              </div>

              <div>
                <h4 className="text-gray-600 font-semibold">Portofolio/Sertifikasi (Jika Ada)</h4>
                <Input
                  placeholder="Kirim Dalam Bentuk Link, GDrive, One drive, dll"
                  className="border rounded-md p-2"
                />
              </div>

              <div className="flex flex-col">
                <h4 className="text-gray-600 font-semibold">Upload CV/Resume</h4>
                <div className="flex items-center mt-2 gap-2">
                  <Upload>
                    <Button icon={<UploadOutlined />}>Upload File</Button>
                  </Upload>
                  <a href="/cv-sample.pdf" className="text-blue-500">CV.pdf</a>
                </div>
              </div>
            </div>
          )}
        </Modal>
      </section>
    </DashboardLayout>
  );
};

export default Rekrutmen;
