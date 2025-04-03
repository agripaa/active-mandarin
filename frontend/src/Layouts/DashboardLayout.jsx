import { useNavigate } from "react-router-dom";
import Sidebar from "../Components/dashboard/Sidebar";
import { useEffect, useState } from "react";
import { RiWhatsappLine, RiMenu3Line } from "react-icons/ri";
import { getProfile } from "../api/auth";

const DashboardLayout = ({ children }) => {
  const [user, setUser] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const response = await getProfile();
      setUser(response.data);
    } catch (error) {
      console.error(error);
      if (error.status === 400 || error.status === 401 || error.status === 403) {
        navigate("/", { replace: true });
        return;
      }
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="flex min-h-screen bg-[#F5F8FF] relative">
      {/* Sidebar wrapper */}
      <div className="hidden lg:flex">
        <Sidebar />
      </div>

      {/* Sidebar mobile */}
      <div className={`lg:hidden fixed top-0 left-0 w-full h-full z-50 transition-transform duration-300 ${showSidebar ? 'translate-x-0' : '-translate-x-full'}`}>
        <Sidebar onClose={() => setShowSidebar(false)} />
      </div>

      {/* Button toggle sidebar mobile */}
      <button
        className={`lg:hidden fixed top-4 left-4 z-50 bg-white shadow-md p-2 rounded-full ${showSidebar ? "hidden" : ""}`}
        onClick={() => setShowSidebar(!showSidebar)}
      >
        <RiMenu3Line size={24} />
      </button>

      {/* Main content */}
      <div className="flex flex-col flex-grow w-full lg:ml-[260px]">
        <main className="p-4 bg-[#F5F8FF]">{children}</main>
      </div>

      {/* WA button */}
      {user?.Role.role_name !== "admin" && (
        <button className="fixed bottom-3 lg:bottom-8 right-3 lg:right-12 bg-green-500 hover:bg-green-700 rounded-full w-auto p-2 text-white text-4xl transition-all duration-300">
          <RiWhatsappLine />
        </button>
      )}
    </div>

  );
};

export default DashboardLayout;
