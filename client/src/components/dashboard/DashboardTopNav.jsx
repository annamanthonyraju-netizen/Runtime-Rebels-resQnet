import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FaSearch, FaBell, FaBars, FaSignOutAlt, FaShieldAlt, FaCircle, FaBroadcastTower } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { useSocket } from '../../context/SocketContext';

function DashboardTopNav({ setMobileOpen }) {
  const { user, logout } = useAuth();
  const { isConnected, unreadCount, setUnreadCount, userStatus, changeUserStatus } = useSocket();

  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  // Active role detection from path or user
  let activeRole = user?.role || 'Citizen';
  if (location.pathname.includes('/dashboard/officer')) activeRole = 'Officer Command';
  else if (location.pathname.includes('/dashboard/volunteer')) activeRole = 'Volunteer Relief';
  else if (location.pathname.includes('/dashboard/admin')) activeRole = 'Administrator';
  else if (location.pathname.includes('/dashboard/citizen')) activeRole = 'Citizen';

  return (
    <header className="sticky top-0 z-30 w-full h-20 bg-slate-900 border-b border-slate-800 px-4 sm:px-8 flex items-center justify-between font-sans">
      
      {/* Left: Mobile Toggle & Search Bar */}
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <button
          onClick={() => setMobileOpen(true)}
          className="lg:hidden p-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
        >
          <FaBars className="w-5 h-5" />
        </button>

        <div className="relative w-full">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search incidents, rescue units, shelters..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 focus:border-orange-500 text-white placeholder-slate-500 text-xs sm:text-sm rounded-xl pl-10 pr-4 py-2.5 outline-none font-sans"
          />
        </div>
      </div>

      {/* Right: Socket.IO Status, User Status, Notification Bell, Profile */}
      <div className="flex items-center gap-3">
        
        {/* Real-Time WebSocket Connection Indicator */}
        <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px]">
          <FaBroadcastTower className={isConnected ? "text-emerald-400 animate-pulse" : "text-slate-600"} />
          <span className="text-slate-400 font-bold">EOC SYNC:</span>
          <span className={isConnected ? "text-emerald-400 font-bold" : "text-amber-400 font-bold"}>
            {isConnected ? 'ONLINE' : 'LOCAL'}
          </span>
        </div>

        {/* Online Status Toggle (Available, Busy, Offline) */}
        <div className="hidden sm:flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 font-mono text-xs">
          {['Available', 'Busy', 'Offline'].map(status => (
            <button
              key={status}
              onClick={() => changeUserStatus(status)}
              className={`px-2 py-0.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                userStatus === status
                  ? status === 'Available' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : status === 'Busy' ? 'bg-amber-950 text-amber-400 border border-amber-800' : 'bg-slate-800 text-slate-400'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Role Badge */}
        <div className="hidden sm:flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 font-mono text-xs">
          <FaShieldAlt className="text-orange-500 w-3.5 h-3.5" />
          <span className="text-orange-500 font-bold uppercase">{activeRole}</span>
        </div>

        {/* Real-Time Notifications Bell */}
        <div className="relative">
          <button
            onClick={() => {
              setNotificationsOpen(!notificationsOpen);
              setUnreadCount(0);
            }}
            className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 hover:text-white relative cursor-pointer"
          >
            <FaBell className="w-4 h-4 text-amber-400" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white font-mono font-bold text-[10px] flex items-center justify-center border-2 border-slate-900">
                {unreadCount}
              </span>
            )}
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-3 w-80 rounded-2xl bg-slate-900 border border-slate-700 p-4 shadow-xl space-y-3 z-50 font-sans text-xs text-left">
              <div className="flex justify-between items-center pb-2 border-b border-slate-800 font-bold text-white">
                <span>Real-Time EOC Notifications</span>
                <span className="text-orange-500 font-mono">LIVE FEED</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="font-bold text-red-400 block">🚨 Wildfire Alert - Sector 7</span>
                <p className="text-slate-300 text-[11px]">12 Drone Squadrons Dispatched. Air quality warning active.</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="font-bold text-amber-400 block">⚠️ Flood Surge - Zone 12</span>
                <p className="text-slate-300 text-[11px]">Water level reached 1.4m. Evacuation routes optimized.</p>
              </div>
            </div>
          )}
        </div>

        {/* Profile Menu */}
        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-800 border border-slate-700 hover:border-slate-600 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-orange-500 text-slate-950 flex items-center justify-center font-bold font-mono">
              {user?.name ? user.name.charAt(0) : 'P'}
            </div>
            <span className="hidden md:inline font-bold text-xs text-white">
              {user?.name || 'Pranay'}
            </span>
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-3 w-56 rounded-2xl bg-slate-900 border border-slate-700 p-3 shadow-xl space-y-2 z-50 font-sans text-xs text-left">
              <div className="px-3 py-2 border-b border-slate-800">
                <span className="font-bold text-white block">{user?.name || 'Pranay Sharma'}</span>
                <span className="text-[11px] text-orange-400 font-mono block">{activeRole}</span>
              </div>
              <button
                onClick={logout}
                className="w-full text-left px-3 py-2 rounded-xl text-red-400 hover:bg-slate-950 font-bold flex items-center gap-2 cursor-pointer"
              >
                <FaSignOutAlt className="w-3.5 h-3.5" />
                <span>Logout Session</span>
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}

export default DashboardTopNav;
