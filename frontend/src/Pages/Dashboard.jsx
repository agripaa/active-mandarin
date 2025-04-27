import React, { useState, useEffect } from "react";
import DashboardLayout from "../Layouts/DashboardLayout";
import DashboardAdmin from "../Components/dashboard/DashboardAdmin";
import DashboardAffiliator from "../Components/dashboard/DashboardAffiliator";
import DashboardUser from "../Components/dashboard/DashboardUser";
import { getProfile } from "../api/auth";
import { Spin } from "antd";

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleGetProfile = async () => {
        try {
            const { data } = await getProfile();
            if (data) {
                setUser(data);
            }
        } catch (error) {
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
                    <DashboardAdmin />
                ) : user.Role.role_name === "affiliator" ? (
                    <DashboardAffiliator />
                ) : user.Role.role_name === "user" ? (
                    <DashboardUser />
                ) : (
                    <p>Role Invalid!</p>
                )
            ) : (
                <p>User not found</p> // ✅ Tambahkan kondisi default jika user masih null
            )}
        </DashboardLayout>
    );
};

export default Dashboard;
