import Sidebar from "../Components/dashboard/Sidebar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-[#F5F8FF]">
      <Sidebar />
      <div className="flex flex-col flex-grow ml-[260px]">
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
