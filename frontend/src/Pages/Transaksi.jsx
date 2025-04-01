import React, { useState, useEffect } from "react";
import DashboardLayout from "../Layouts/DashboardLayout";
import TransaksiAdmin from "../Components/dashboard/TransaksiAdmin";
import TransaksiUser from "../Components/dashboard/TransaksiUser";
import { getProfile } from "../api/auth";
import { Spin } from "antd";

const Transaksi = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleGetProfile = async () => {
        try {
            const { data } = await getProfile();
            if (data) {
                setUser(data);
            }
        } catch (error) {
            console.error("Error fetching profile:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleGetProfile();
    }, []);

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
            {user && user.Role ? ( // ✅ Cek apakah user dan Role ada
                user.Role.role_name === "admin" ? (
                    <TransaksiAdmin />
                ) : user.Role.role_name === "user" ? (
                    <TransaksiUser />
                ) : (
                    <p>Role Invalid!</p>
                )
            ) : (
                <p>User not found</p> // ✅ Tampilkan ini jika user masih null
            )}
        </DashboardLayout>
    );
};

export default Transaksi;
