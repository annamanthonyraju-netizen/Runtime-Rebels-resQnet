import { Link, useLocation } from 'react-router-dom';
import { FaShieldAlt, FaPlus, FaMapMarked, FaSignOutAlt, FaBroadcastTower, FaUsers, FaChartLine, FaCheckCircle, FaUser } from 'react-icons/fa';
import CitizenDashboard from '../components/dashboard/CitizenDashboard';
import { useAuth } from '../context/AuthContext';

function Dashboard() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const roleParam = searchParams.get('role');

  const activeRole = roleParam ? (roleParam.charAt(0).toUpperCase() + roleParam.slice(1)) : (user?.role || 'Citizen');

  return (
    <div className="w-full space-y-8">
      
      {/* Render Citizen Dashboard layout if role is Citizen */}
      {activeRole.toLowerCase() === 'citizen' ? (
        <CitizenDashboard />
      ) : (
        <>
          {/* Command Header Bar for Responder / Admin / Officer */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-800/90 border border-slate-700 flex flex-wrap items-center justify-between gap-6 shadow-xl text-left">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 text-xs font-mono font-bold bg-orange-500/20 text-orange-400 border border-orange-500/40 rounded-lg uppercase">
                  ROLE: {activeRole.toUpperCase()}
                </span>
                <span className="text-xs text-emerald-400 flex items-center gap-1.5 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  COMMAND NODE AUTHENTICATED
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
                Welcome, <span className="text-orange-500">{user?.name || 'Officer Pranay'}</span>
              </h1>
              <p className="text-xs font-mono text-slate-400">
                Authenticated Session ID: <span className="text-slate-300">{user?.id || 'USR-894102'}</span> • Email: <span className="text-orange-400">{user?.email || 'officer@resqnet.ai'}</span>
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/dashboard/map"
                className="px-5 py-3 rounded-xl bg-slate-950 border border-slate-700 text-orange-400 hover:text-white text-sm font-bold transition-all flex items-center gap-2"
              >
                <FaMapMarked className="w-4 h-4 text-orange-500" />
                <span>Tactical GIS Map</span>
              </Link>

              <Link
                to="/dashboard/citizen/report"
                className="px-5 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-slate-950 font-bold text-sm transition-all flex items-center gap-2 shadow-sm"
              >
                <FaPlus className="w-4 h-4" />
                <span>Report Incident</span>
              </Link>

              <button
                onClick={logout}
                className="px-4 py-3 rounded-xl bg-slate-950 border border-red-500/40 text-red-400 hover:bg-red-950 text-sm font-bold transition-all flex items-center gap-2 cursor-pointer"
              >
                <FaSignOutAlt className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            <div className="p-6 rounded-2xl bg-slate-800/90 border border-slate-700">
              <span className="text-xs font-mono text-slate-400 uppercase">Active Incidents</span>
              <div className="text-4xl font-extrabold text-orange-500 mt-2 font-mono">42</div>
              <span className="text-xs text-emerald-400 mt-2 block font-semibold">-14% vs last 24h</span>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/90 border border-slate-700">
              <span className="text-xs font-mono text-slate-400 uppercase">Deployed Units</span>
              <div className="text-4xl font-extrabold text-cyan-400 mt-2 font-mono">184</div>
              <span className="text-xs text-cyan-400 mt-2 block font-semibold">98.5% Operational</span>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/90 border border-slate-700">
              <span className="text-xs font-mono text-slate-400 uppercase">Evacuated Citizens</span>
              <div className="text-4xl font-extrabold text-emerald-400 mt-2 font-mono">12,850+</div>
              <span className="text-xs text-emerald-400 mt-2 block font-semibold">+1,420 Saved Today</span>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/90 border border-slate-700">
              <span className="text-xs font-mono text-slate-400 uppercase">AI Neural Precision</span>
              <div className="text-4xl font-extrabold text-amber-400 mt-2 font-mono">99.4%</div>
              <span className="text-xs text-amber-400 mt-2 block font-semibold">&lt; 2.4 min Lead Time</span>
            </div>
          </div>

          {/* Tactical Feed Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
            <div className="lg:col-span-8 p-6 rounded-3xl bg-slate-800/90 border border-slate-700 space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-slate-700">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <FaChartLine className="text-orange-500" />
                  Live Incident Dispatch Queue
                </h2>
                <span className="text-xs text-orange-500 font-bold font-mono">REAL-TIME STREAM</span>
              </div>

              <div className="space-y-3 font-mono text-sm">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-orange-500 font-bold">INC-9042</span>
                    <p className="text-white font-semibold mt-0.5">Wildfire Cluster #4B - Sector 7 Corridor</p>
                  </div>
                  <span className="px-3 py-1 rounded bg-amber-950 text-amber-400 border border-amber-800 text-xs font-bold">
                    12 Drones Dispatched
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-orange-500 font-bold">INC-8812</span>
                    <p className="text-white font-semibold mt-0.5">Coastal Storm Surge - Zone 12 Geo-Fence</p>
                  </div>
                  <span className="px-3 py-1 rounded bg-cyan-950 text-cyan-400 border border-cyan-800 text-xs font-bold">
                    Evacuation Active
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 p-6 rounded-3xl bg-slate-800/90 border border-slate-700 space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2 pb-4 border-b border-slate-700">
                <FaCheckCircle className="text-emerald-400" />
                System Security Status
              </h2>

              <div className="space-y-3 text-xs font-mono text-slate-300">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <span>ENCRYPTION:</span>
                  <strong className="text-emerald-400">256-BIT MESH</strong>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <span>AUTHENTICATION:</span>
                  <strong className="text-orange-500">CONTEXT SESSION ACTIVE</strong>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <span>STORAGE MESH:</span>
                  <strong className="text-cyan-400">LOCAL &amp; SESSION SYNCED</strong>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

    </div>
  );
}

export default Dashboard;
