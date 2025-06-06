import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { RiDashboardFill, RiFileTextLine, RiNotification4Line, RiCheckboxCircleLine, RiLogoutBoxLine, RiUserLine, RiHome4Line, RiSoundModuleLine, RiArrowDownSLine, RiListUnordered } from "react-icons/ri";
import { MdCoPresent, MdOutlineDashboardCustomize } from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";
import { getProfile } from "../../api/auth";

const SidebarExam = ({ onClose }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [name, setName] = useState("");
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

    const capitalize = (str) => {
        if (!str) return "-";
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    return (
        <aside className="w-[260px] h-screen fixed top-0 left-0 z-50 bg-white shadow-lg overflow-y-auto transition-transform py-6">
              {onClose && (
                    <button
                    onClick={onClose}
                    className="lg:hidden absolute top-4 right-4 z-50 text-gray-600 hover:text-black text-2xl"
                    >
                    ✕
                    </button>
                )}
            <div className="flex justify-center mb-4">
                <img src="/assets/active_logo.png" alt="Metalog Logo" className="w-[140px]" />
            </div>

            {/* Profile User */}
            <div className="px-4 pt-3 pb-6">
                <div className="flex flex-col items-center justify-center">
                    <img src={profileImg} alt="profile user" className="w-[100px] h-[100px] rounded-full object-cover" />
                    <h5 className="text-xl text-gray-800 mt-2 font-medium text-center w-full">{name}</h5>
                    <h5 className="text-md text-white bg-[#3377FF] px-4 py-1 rounded-2xl text-center font-medium">
                        {capitalize(role)}
                    </h5>
                </div>
            </div>

            <div className="px-4">
                <hr className="mb-4" />
            </div>

            {/* Sidebar Menu */}
            <div className="flex flex-col justify-between h-auto px-4">
                {/* Question Type */}
                <div className="flex flex-col gap-2 mb-4">
                    <p className="text-base font-medium text-fiord-950">Tipe Soal</p>
                    <h3 className="text-xl font-semibold">听力 - Mendengar</h3>
                </div>

                {/* Question Type */}
                <div className="flex flex-col gap-2 mb-4">
                    <p className="text-base font-medium text-fiord-950">Sisa Waktu</p>
                    <div className="rounded-full bg-background py-2.5">
                        <p className="text-xl font-medium text-[#3377FF] text-center">23:59</p>
                    </div>
                </div>
            </div>

            <div className="px-4">
                <hr className="mb-4" />
            </div>
            
            {/* Question Navigation */}
            <div className="flex flex-row flex-wrap gap-1.5 px-4">
                {[...Array(10)].map((_, index) => (
                    <button
                        key={index}
                        className={`w-10 h-10 rounded-lg flex items-center justify-center font-medium transition-colors ${
                            location.search.includes(`question=${index + 1}`)
                                ? "bg-[#3377FF] text-white"
                                : "bg-white hover:bg-fiord-200 text-fiord-950"
                        }`}
                        onClick={() => navigate(`/dashboard/take-exam/1?question=${index + 1}`)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </aside>
    );
};

const SidebarItem = ({ to, icon, label, location, isMenuItem = false }) => (
    <li
        className={`flex items-center gap-2 ${isMenuItem ? "px-2 py-3" : "p-4"} rounded-2xl cursor-pointer transition ${
            location.pathname === to.split("?")[0]
                ? "bg-[#3377FF] text-white"
                : "hover:bg-gray-100 text-[#505E79]"
        }`}
    >
        <NavLink to={to} className={`flex items-center w-full font-medium`}>
            <span className="text-2xl">{icon}</span>
            <span className="ml-2 text-sm font-medium">{label}</span>
        </NavLink>
    </li>
);

const SidebarMenuSub = ({ title, icon, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    // Clone children and pass isMenuItem=true to SidebarItem
    const clonedChildren = React.Children.map(children, child =>
        React.isValidElement(child)
            ? React.cloneElement(child, { isMenuItem: true })
            : child
    );

    return (
        <div>
            <button
                className={`flex items-center justify-between gap-2 w-full p-4 text-left rounded-2xl transition relative hover:bg-gray-100 text-[#505E79]`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex items-center gap-2">
                    <span className="text-2xl">{icon}</span>
                    <span className="text-sm font-medium">{title}</span>
                </div>
                <RiArrowDownSLine className={`text-2xl transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>
            <div
                className={`overflow-hidden relative transition-all duration-300 ${
                    isOpen ? "max-h-96" : "max-h-0"
                }`}
            >
                {/* Left line indicator */}
                <div className={`absolute left-6 top-1/2 transform -translate-y-1/2 w-0.5 py-4 h-full rounded transition-all duration-300 ${
                    isOpen ? "opacity-100" : "opacity-0"
                }`}>
                    <div
                        className={`w-0.5 h-full bg-fiord-300`}
                    />
                </div>
                <ul className="pl-10 mt-2">{clonedChildren}</ul>
            </div>
        </div>
    );
};

export default SidebarExam;
