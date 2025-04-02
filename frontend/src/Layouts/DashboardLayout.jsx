import { useNavigate } from "react-router-dom";
import Sidebar from "../Components/dashboard/Sidebar";
import { useEffect, useState } from "react";
import { RiWhatsappLine } from "react-icons/ri";
import { getProfile } from "../api/auth";

const DashboardLayout = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    
    const fetchProfile = async () => {
      try {
        const response = await getProfile();
        setUser(response.data);
      } catch (error) {
        console.error(error);
        if(error.status === 400 || error.status === 401 || error.status === 403){
          navigate('/', {replace: true});
          return;
        }
      }
    }

    useEffect(() => {
      fetchProfile();
    }, [])

  return (
    <div className="flex min-h-screen bg-[#F5F8FF]">
      <Sidebar />
      <div className="flex flex-col flex-grow ml-[260px]">
        <main className="p-4">{children}</main>
      </div>
      {user?.Role.role_name == "admin" ? (
        <button className=" fixed bottom-8 right-12 bg-green-500 hover:bg-green-700 rounded-full w-auto p-2 text-white text-4xl transition-all duration-300">
          <RiWhatsappLine />
        </button>
      ) : ""}
    </div>
  );
};

export default DashboardLayout;
