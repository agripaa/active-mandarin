import React, { useState } from "react";
import DashboardLayout from "../Layouts/DashboardLayout";

const Profile = () => {
  const [name, setName] = useState("Dicka Taksa Rabbani");
  const [email, setEmail] = useState("dickataksa@gmail.com");
  const [phone, setPhone] = useState("081388876690");
  const [avatar, setAvatar] = useState("/assets/profile-dummy.png");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col items-start p-6">
        <h1 className="text-4xl font-semibold">Your Profile</h1>
        <p className="text-gray-500 mt-1 text-lg w-[30%]">
          Masukkan informasi yang valid agar proses belajar lebih mudah
        </p>

        <div className="mt-6 p-6 w-full max-w-xl">
          <h2 className="text-lg font-semibold mb-4">My Avatar</h2>
          <div className="flex flex-col items-start">
            <img
              src={avatar}
              alt="Avatar"
              className="w-24 h-24 rounded-full object-cover"
            />
            <label className="mt-2 cursor-pointer bg-transparent border-2 border-gray-300 text-black px-4 py-2 rounded-xl">
              Upload Gambar
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
          </div>

          <div className="mt-6">
            <label className="block text-md font-medium text-gray-700">Nama</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md mt-1 focus:ring focus:ring-yellow-300"
            />
          </div>

          <div className="mt-4">
            <label className="block text-md font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-md mt-1 focus:ring focus:ring-yellow-300"
            />
          </div>

          <div className="mt-4">
            <label className="block text-md font-medium text-gray-700">No Telepon</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-2 border rounded-md mt-1 focus:ring focus:ring-yellow-300"
            />
          </div>

          <button
            className="w-full mt-6 bg-yellow-400 text-black py-3 rounded-xl font-semibold hover:bg-yellow-500"
          >
            Save Your Profile
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
