import React, { useState, useEffect } from "react";
import DashboardLayout from "../Layouts/DashboardLayout";
import { editProfile, getProfile } from "../api/auth";
import { RiLockPasswordFill, RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import Swal from "sweetalert2";
import { Spin } from "antd";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState("/assets/profile-dummy.webp");
  const [selectedFile, setSelectedFile] = useState(null);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await getProfile();
      setName(response.data.name);
      setEmail(response.data.email);
      setPhone(response.data.number);
      if (response.data.profile_img) {
        setAvatar(`${process.env.REACT_APP_API_IMG}${response.data.profile_img}`);
      }
    } catch (error) {
      Swal.fire("Error", "Gagal mengambil data profil", "error");
    } finally {
      setLoading(false); 
    }
  };

  if (loading) {
    return (
        <DashboardLayout>
            <div className="flex justify-center items-center h-[80vh]">
                <Spin size="large" />
            </div>
        </DashboardLayout>
    );
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
      setSelectedFile(file);
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("number", phone);
      if (selectedFile) {
        formData.append("profile_img", selectedFile);
      }

      if (showPasswordChange) {
        if (!oldPassword || !newPassword) {
          return Swal.fire("Error", "Masukkan password lama dan baru!", "error");
        }
        formData.append("oldPassword", oldPassword);
        formData.append("newPassword", newPassword);
      }

      await editProfile(formData);
      Swal.fire("Success", "Profil berhasil diperbarui!", "success");
      fetchProfile();
    } catch (error) {
      Swal.fire("Error", error.error || "Gagal memperbarui profil", "error");
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col items-start p-6">
        <h1 className="text-4xl font-semibold">Your Profile</h1>
        <p className="text-gray-500 mt-1 text-lg w-full lg:w-[35%]">
          Masukkan informasi yang valid agar proses belajar lebih mudah
        </p>

        <div className="mt-6 p-6 w-full max-w-xl">
          <h2 className="text-lg font-semibold mb-4">My Avatar</h2>
          <div className="flex flex-col items-start">
            <img
              src={avatar}
              alt="Avatar"
              className="w-24 h-24 rounded-full object-cover border"
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
              value={phone != "null" ? phone : ""}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-2 border rounded-md mt-1 focus:ring focus:ring-yellow-300"
            />
          </div>

          {/* Change Password Section */}
          <div className="pt-4 mt-4 border-t border-gray-300">
            <button
                className="flex items-center text-blue-500 hover:text-blue-700 text-md font-medium"
                onClick={() => setShowPasswordChange(!showPasswordChange)}
            >
                <RiLockPasswordFill className="mr-2 text-xl" />
                Ubah Password
            </button>
            {showPasswordChange && (
                <div className="mt-4 flex flex-col gap-2">
                    <div className="relative">
                      <input
                          type={showOldPassword ? "text" : "password"}
                          placeholder="Password Lama"
                          className="border p-2 rounded-md w-full pr-10"
                          value={oldPassword}
                          onChange={(e) => setOldPassword(e.target.value)}
                      />
                      <button
                          type="button"
                          className="absolute right-3 top-3 text-gray-500"
                          onClick={() => setShowOldPassword(!showOldPassword)}
                      >
                          {showOldPassword ? <RiEyeOffLine /> : <RiEyeLine />}
                      </button>
                    </div>

                    <div className="relative">
                      <input
                          type={showNewPassword ? "text" : "password"}
                          placeholder="Password Baru"
                          className="border p-2 rounded-md w-full pr-10"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                      />
                      <button
                          type="button"
                          className="absolute right-3 top-3 text-gray-500"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                          {showNewPassword ? <RiEyeOffLine /> : <RiEyeLine />}
                      </button>
                    </div>
                </div>
            )}
          </div>

          <button onClick={handleSave} className="w-full mt-6 bg-yellow-400 text-black py-3 rounded-xl font-semibold hover:bg-yellow-500">
            Save Your Profile
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
