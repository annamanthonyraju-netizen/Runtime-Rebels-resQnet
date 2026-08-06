import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaShieldAlt, FaUserShield, FaExclamationTriangle, FaCheckCircle, FaMapMarkerAlt, FaAmbulance, FaBroadcastTower } from 'react-icons/fa';

function DashboardPreviewSection() {
  const [activeTab, setActiveTab] = useState('citizen');

  return (
    <section id="dashboard-preview" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="text-xs font-bold text-orange-500 uppercase tracking-wider block mb-2 font-mono">
          USER EXPERIENCE PREVIEW
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-sans">
          Tailored Dashboards for Every Role
        </h2>
        <p className="mt-3 text-slate-300 text-base">
          Role-optimized interfaces designed specifically for citizens, field officers, and emergency authorities.
        </p>
      </div>

      {/* Role Tabs */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex p-1.5 rounded-2xl bg-slate-800 border border-slate-700 text-sm font-semibold">
          <button
            onClick={() => setActiveTab('citizen')}
            className={`px-5 py-2.5 rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'citizen' ? 'bg-orange-500 text-slate-950 font-bold shadow-sm' : 'text-slate-300 hover:text-white'
            }`}
          >
            <FaUser className="w-4 h-4" />
            <span>Citizen Dashboard</span>
          </button>
          <button
            onClick={() => setActiveTab('officer')}
            className={`px-5 py-2.5 rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'officer' ? 'bg-orange-500 text-slate-950 font-bold shadow-sm' : 'text-slate-300 hover:text-white'
            }`}
          >
            <FaShieldAlt className="w-4 h-4" />
            <span>Officer Dashboard</span>
          </button>
          <button
            onClick={() => setActiveTab('admin')}
            className={`px-5 py-2.5 rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'admin' ? 'bg-orange-500 text-slate-950 font-bold shadow-sm' : 'text-slate-300 hover:text-white'
            }`}
          >
            <FaUserShield className="w-4 h-4" />
            <span>Admin Dashboard</span>
          </button>
        </div>
      </div>

      {/* Dashboard Preview Window */}
      <div className="rounded-3xl bg-slate-900 border border-slate-700 p-6 sm:p-8 shadow-xl">
        
        {/* Mock Window Top Bar */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
            <span className="ml-2 font-bold text-slate-300">
              RESQNET Console — {activeTab.toUpperCase()} MODE
            </span>
          </div>
          <span className="text-emerald-400 font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            CONNECTED (12ms)
          </span>
        </div>

        <AnimatePresence mode="wait">
          {/* Citizen Dashboard Content */}
          {activeTab === 'citizen' && (
            <motion.div
              key="citizen"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-800 border border-slate-700">
                  <span className="text-xs text-slate-400 block font-medium">My Active Report</span>
                  <span className="text-lg font-bold text-orange-500 font-sans mt-1 block">INC-9042 (Wildfire)</span>
                  <span className="text-xs text-emerald-400 font-semibold block mt-1">Status: Drones Dispatched</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-800 border border-slate-700">
                  <span className="text-xs text-slate-400 block font-medium">Nearest Shelter</span>
                  <span className="text-lg font-bold text-white font-sans mt-1 block">Central High School</span>
                  <span className="text-xs text-slate-300 block mt-1">1.2 km away • Open Capacity</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-800 border border-slate-700">
                  <span className="text-xs text-slate-400 block font-medium">Emergency Broadcast</span>
                  <span className="text-lg font-bold text-amber-400 font-sans mt-1 block">Surge Warning Zone 4</span>
                  <span className="text-xs text-slate-300 block mt-1">Evacuate to higher ground</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-3 font-sans">
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <FaExclamationTriangle className="text-orange-500" />
                  Quick SOS Status Tracker
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs font-semibold">
                  <div className="p-3 rounded-lg bg-slate-900 border border-emerald-800 text-emerald-400 flex items-center gap-2">
                    <FaCheckCircle /> 1. Report Submitted
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900 border border-emerald-800 text-emerald-400 flex items-center gap-2">
                    <FaCheckCircle /> 2. AI Verified
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900 border border-orange-500 text-orange-400 flex items-center gap-2 animate-pulse">
                    <FaAmbulance /> 3. Units En Route
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 flex items-center gap-2">
                    4. Evacuation Complete
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Officer Dashboard Content */}
          {activeTab === 'officer' && (
            <motion.div
              key="officer"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6 font-sans"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-800 border border-slate-700">
                  <span className="text-xs text-slate-400 block font-medium">Assigned Unit</span>
                  <span className="text-lg font-bold text-white mt-1 block">Fire Squad 4 (Unit #12)</span>
                  <span className="text-xs text-orange-400 font-semibold block mt-1">Route Auto-Optimized</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-800 border border-slate-700">
                  <span className="text-xs text-slate-400 block font-medium">Target Destination</span>
                  <span className="text-lg font-bold text-white mt-1 block">Sector 7 Mountain Corridor</span>
                  <span className="text-xs text-emerald-400 font-semibold block mt-1">ETA: 4 mins (Bypassing Flood)</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-800 border border-slate-700">
                  <span className="text-xs text-slate-400 block font-medium">Triage Queue</span>
                  <span className="text-lg font-bold text-red-400 mt-1 block">3 High Priority Reports</span>
                  <span className="text-xs text-slate-300 block mt-1">Auto-assigned by AI</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Admin Dashboard Content */}
          {activeTab === 'admin' && (
            <motion.div
              key="admin"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6 font-sans"
            >
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-slate-800 border border-slate-700">
                  <span className="text-xs text-slate-400 block">Total Active Incidents</span>
                  <span className="text-3xl font-black text-orange-500 mt-1 block font-mono">42</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-800 border border-slate-700">
                  <span className="text-xs text-slate-400 block">Deployed Emergency Units</span>
                  <span className="text-3xl font-black text-cyan-400 mt-1 block font-mono">184</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-800 border border-slate-700">
                  <span className="text-xs text-slate-400 block">Verified Saved Citizens</span>
                  <span className="text-3xl font-black text-emerald-400 mt-1 block font-mono">12,850+</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-800 border border-slate-700">
                  <span className="text-xs text-slate-400 block">AI Neural Accuracy</span>
                  <span className="text-3xl font-black text-amber-400 mt-1 block font-mono">99.4%</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}

export default DashboardPreviewSection;
