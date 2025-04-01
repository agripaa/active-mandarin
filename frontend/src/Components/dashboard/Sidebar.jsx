import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { RiDashboardFill, RiFileTextLine, RiNotification4Line, RiContactsLine, RiHandHeartLine, RiGroupLine, RiLogoutBoxLine, RiUserLine, RiHome4Line } from "react-icons/ri";
import { getProfile } from "../../api/auth";

const Sidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [name, setName] = useState("User");
    const [profileImg, setProfileImg] = useState("/assets/profile-dummy.webp");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/", { replace: true });
            return;
        }

        const handleGetProfile = async () => {
            try {
                const response = await getProfile();

                if (!response.status) {
                    localStorage.removeItem("token");
                    navigate("/", { replace: true });
                    return;
                }

                setUser(response.data);
                setName(response.data?.name || "-");
                setRole(response.data?.Role?.role_name || "-");
                setProfileImg(response.data?.profile_img ? `${process.env.REACT_APP_API_IMG}${response.data.profile_img}` : "/assets/profile-dummy.webp");
            } catch (error) {
                console.error("Error fetching profile:", error);
                localStorage.removeItem("token"); 
                navigate("/", { replace: true });
            } finally {
                setLoading(false);
            }
        };

        handleGetProfile();
    }, [navigate]);

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        navigate("/", { replace: true });
    };

    const handleDirectHomepage = (e) => {
        e.preventDefault();
        navigate("/", { replace: true });
    };

    return (
        <aside className="w-[260px] h-screen fixed left-0 top-0 p-4 bg-white shadow-lg">
            <div className="flex justify-center mb-8">
                <img src="/assets/active_logo.png" alt="Metalog Logo" className="w-[140px]" />
            </div>

            {/* Profile User */}
            <div className="p-4 mb-4 border-b border-gray-300">
                <div className="flex flex-col items-center my-4">
                    <img src={profileImg} alt="profile user" className="w-[100px] h-[100px] rounded-full object-cover" />
                    <h5 className="text-xl text-gray-800 mt-2 font-medium">{name}</h5>
                    <h5 className="text-md text-white bg-[#3377FF] px-4 py-1 rounded-2xl font-medium">
                        {role}
                    </h5>
                </div>
            </div>

            {/* Sidebar Menu */}
            <nav>
                {role === "admin" ? (
                    <ul>
                        <SidebarItem to={`/dashboard`} icon={<RiDashboardFill />} label="Dashboard" location={location} />
                        <SidebarItem to={`/transaksi`} icon={<RiFileTextLine />} label="Transaksi" location={location} />
                        <SidebarItem to={`/notifikasi`} icon={<RiNotification4Line />} label="Notifikasi" location={location} />
                        <SidebarItem to={`/affiliate`} icon={<RiContactsLine />} label="Data Affiliate" location={location} />
                        <SidebarItem to={`/donasi`} icon={<RiHandHeartLine />} label="Data Donasi" location={location} />
                        <SidebarItem to={`/rekrutmen`} icon={<RiGroupLine />} label="Data Rekrutmen" location={location} />
                        <SidebarItem to={`/`} icon={<RiHome4Line />} label="Homepage" location={location} />
                    </ul>
                ) : role === "affiliator" ? (
                    <ul>
                        <SidebarItem to={`/dashboard`} icon={<RiDashboardFill />} label="Dashboard" location={location} />
                        <SidebarItem to={`/profile`} icon={<RiUserLine />} label="Profile" location={location} />
                        <SidebarItem to={`/`} icon={<RiHome4Line />} label="Homepage" location={location} />
                    </ul>
                ) : (
                    <ul>
                        <SidebarItem to={`/dashboard`} icon={<RiDashboardFill />} label="Dashboard" location={location} />
                        <SidebarItem to={`/transaksi`} icon={<RiFileTextLine />} label="Transaksi" location={location} />
                        <SidebarItem to={`/profile`} icon={<RiUserLine />} label="Profile" location={location} />
                        <SidebarItem to={`/`} icon={<RiHome4Line />} label="Homepage" location={location} />
                    </ul>
                )}
            </nav>

            {/* Logout */}
            <div className="absolute bottom-[5%] left-6 font-semibold flex flex-col">
                <button 
                    className="mt-3 text-red-400 hover:text-red-600 text-md flex items-center"
                    onClick={handleLogout}
                >
                    <RiLogoutBoxLine className="mr-1 text-2xl" /> Keluar
                </button>
            </div>
        </aside>
    );
};

const SidebarItem = ({ to, icon, label, location }) => (
    <li className={`flex items-center gap-2 p-2 py-4 rounded-lg cursor-pointer transition ${location.pathname === to.split("?")[0] ? "bg-[#3377FF] text-white" : "hover:bg-gray-100 text-[#505E79]"}`}>
        <NavLink to={to} className="flex items-center w-full px-2 font-medium">
            <span className="text-2xl">{icon}</span>
            <span className="ml-2 text-sm font-medium">{label}</span>
        </NavLink>
    </li>
);

export default Sidebar;
