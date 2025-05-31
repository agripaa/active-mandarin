import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { RiMenu3Line } from "react-icons/ri";
import { getProfile } from "../api/auth";
import SidebarExam from "../Components/dashboard/SidebarExam";

const ExamLayout = ({ children }) => {
  const [user, setUser] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const response = await getProfile();
      setUser(response.data);
    } catch (error) {
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
        <SidebarExam />
      </div>

      {/* Sidebar mobile */}
      <div className={`lg:hidden fixed top-0 left-0 w-full h-full z-50 transition-transform duration-300 ${showSidebar ? 'translate-x-0' : '-translate-x-full'}`}>
        <SidebarExam onClose={() => setShowSidebar(false)} />
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
    </div>

  );
};

export default ExamLayout;
