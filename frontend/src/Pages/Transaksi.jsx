import React from "react";
import DashboardLayout from "../Layouts/DashboardLayout";
import TransaksiAdmin from "../Components/dashboard/TransaksiAdmin";
import TransaksiUser from "../Components/dashboard/TransaksiUser";

const Transaksi = () => {
  return (
    <DashboardLayout>
                  {
                process.env.REACT_APP_ROLE === "admin" ? 
                    <TransaksiAdmin /> 
                : process.env.REACT_APP_ROLE === "user" ? 
                    <TransaksiUser />
                : "Role Invalid!"
            }
    </DashboardLayout>
  );
};

export default Transaksi;
