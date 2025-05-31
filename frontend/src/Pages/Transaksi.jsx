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
            {user && user.Role ? ( 
                user.Role.role_name === "admin" ? (
                    <TransaksiAdmin />
                ) : (
                    <TransaksiUser />
                )
            ) : (
                <p>User not found</p> 
            )}
        </DashboardLayout>
    );
};

export default Transaksi;
