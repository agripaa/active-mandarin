import React from 'react';
import DashboardLayout from '../Layouts/DashboardLayout';
import DashboardAdmin from '../Components/dashboard/DashboardAdmin';
import DashboardAffiliator from '../Components/dashboard/DashboardAffiliator';
import DashboardUser from '../Components/dashboard/DashboardUser';


const Dashboard = () => {
    return (
        <DashboardLayout>
            {
                process.env.REACT_APP_ROLE === "admin" ? 
                    <DashboardAdmin /> 
                : process.env.REACT_APP_ROLE === "affiliator" ?
                    <DashboardAffiliator />
                : process.env.REACT_APP_ROLE === "user" ? 
                    <DashboardUser />
                : "Role Invalid!"
            }
        </DashboardLayout>
    );
};

export default Dashboard;
