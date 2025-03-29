import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { RiDashboardFill, RiFileTextLine, RiNotification4Line, RiContactsLine, RiHandHeartLine, RiGroupLine, RiLogoutBoxLine, RiUserLine } from 'react-icons/ri';

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-[260px] h-screen fixed left-0 top-0 p-4 bg-white shadow-lg">
      <div className="flex justify-center mb-8">
        <img src="/assets/active_logo.png" alt="Metalog Logo" className="w-[140px]" />
      </div>

      <div className="p-4 mb-8 border-b border-gray-300">
        <div className="flex flex-col items-center gap-2">
          
        </div>
        <div className="flex flex-col my-4">
          <div className="flex flex-col items-center justify-center gap-2">
                <img src="/assets/profile-dummy.png" alt="profile user" className='w-[100px] rounded-full' />
                <h5 className="text-xl text-gray-800 mt-1 font-medium">Dicka Taksa</h5>
                <h5 className="text-md text-white bg-[#3377FF] px-4 py-1 rounded-2xl font-medium">{process.env.REACT_APP_ROLE}</h5>
          </div>
        </div>
      </div>

      <nav>
        {process.env.REACT_APP_ROLE === "admin" ? (
          <ul>
            <SidebarItem to={`/dashboard`} icon={<RiDashboardFill />} label="Dashboard" location={location} />
            <SidebarItem to={`/transaksi`} icon={<RiFileTextLine />} label="Transaksi" location={location} />
            <SidebarItem to={`/notifikasi`} icon={<RiNotification4Line />} label="Notifikasi" location={location} />
            <SidebarItem to={`/affiliate`} icon={<RiContactsLine />} label="Data Affiliate" location={location} />
            <SidebarItem to={`/donasi`} icon={<RiHandHeartLine />} label="Data Donasi" location={location} />
            <SidebarItem to={`/rekrutmen`} icon={<RiGroupLine />} label="Data Rekrutmen" location={location} />
          </ul>
        ) : process.env.REACT_APP_ROLE === "affiliator" ? (
          <ul>
            <SidebarItem to={`/dashboard`} icon={<RiDashboardFill />} label="Dashboard" location={location} />
            <SidebarItem to={`/profile`} icon={<RiUserLine />} label="Profile" location={location} />
          </ul>
        ) : (
            <ul>
            <SidebarItem to={`/dashboard`} icon={<RiDashboardFill />} label="Dashboard" location={location} />
            <SidebarItem to={`/transaksi`} icon={<RiFileTextLine />} label="Transaksi" location={location} />
            <SidebarItem to={`/profile`} icon={<RiUserLine />} label="Profile" location={location} />
          </ul>
        )}
      </nav>

      <button className='absolute bottom-[5%] left-6 mt-6 text-red-400 hover:text-red-600 text-md font-semibold flex items-center'><RiLogoutBoxLine className='mr-1 text-2xl'/> Keluar</button>
    </aside>
  );
};

const SidebarItem = ({ to, icon, label, location }) => (
  <li className={`flex items-center gap-2 p-2 py-4 rounded-lg cursor-pointer transition ${location.pathname === to.split('?')[0] ? 'bg-[#3377FF] text-white' : 'hover:bg-gray-100 text-[#505E79]'}`}>  
    <NavLink to={to} className="flex items-center w-full px-2 font-medium">
      <span className="text-2xl">{icon}</span>
      <span className="ml-2 text-sm font-medium">{label}</span>
    </NavLink>
  </li>
);

export default Sidebar;
