import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaShieldAlt, FaExclamationTriangle, FaMapMarkedAlt, FaUsers, 
  FaPaperPlane, FaRobot, FaClock, FaCheckCircle, FaSearch, FaAmbulance, 
  FaBoxes, FaUserCheck, FaEye, FaArrowRight 
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const officerIncidentQueue = [
  {
    id: "INC-9042",
    category: "Wildfire",
    severity: "Critical",
    timeReported: "2 mins ago",
    reporter: "Citizen Pranay S.",
    assignedOfficer: "Capt. Sarah Jenkins",
    status: "Unit En Route",
    location: "Sector 7 Corridor"
  },
  {
    id: "INC-8812",
    category: "Flood Surge",
    severity: "High",
    timeReported: "8 mins ago",
    reporter: "Citizen Alex V.",
    assignedOfficer: "Cmdr. Rajesh K.",
    status: "Pending Verification",
    location: "Zone 12 Harbor"
  },
  {
    id: "INC-7401",
    category: "Structural Hazard",
    severity: "Medium",
    timeReported: "14 mins ago",
    reporter: "Officer Drone #4",
    assignedOfficer: "Lt. Michael C.",
    status: "Dispatched",
    location: "ORR Exit 14"
  }
];

const aiActions = [
  { time: "10:42 AM", action: "Auto-routed Fire Squad #4 via Exit 16 North to bypass flood." },
  { time: "10:35 AM", action: "Thermal Anomaly verified at 99.4% confidence score." },
  { time: "10:20 AM", action: "Dispatched SMS alert push to 4,850 Sector 7 residents." }
];

function OfficerDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [aiSearch, setAiSearch] = useState('');
  const [activeIncidentModal, setActiveIncidentModal] = useState(null);

  return (
    <div className="space-y-8 font-sans text-left">
      
      {/* 1. Officer Header Bar with 3 Dedicated Action Buttons */}
      <div className="rounded-3xl bg-slate-800/90 border border-slate-700 p-6 sm:p-8 flex flex-wrap items-center justify-between gap-6 shadow-xl">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className="px-3 py-1 text-xs font-mono font-bold bg-orange-500/20 text-orange-400 border border-orange-500/40 rounded-lg">
              FIRST RESPONDER COMMAND CONSOLE
            </span>
            <span className="text-xs text-emerald-400 font-mono font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              UNIT DISPATCH ACTIVE
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Field Officer Incident Operations
          </h1>
          <p className="text-sm text-slate-300 mt-1">
            Officer: <strong>{user?.name || 'Capt. Sarah Jenkins'}</strong> • Sector: <strong>Sector 7 Corridor</strong>
          </p>
        </div>

        {/* 3 Dedicated Officer Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          
          <Link
            to="/dashboard/officer/team-status"
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-950 border border-slate-700 text-white font-bold text-xs flex items-center gap-2"
          >
            <FaUsers className="text-orange-500" />
            <span>Assign Team</span>
          </Link>

          <Link
            to="/dashboard/officer/incident-verification"
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-950 border border-slate-700 text-white font-bold text-xs flex items-center gap-2"
          >
            <FaUserCheck className="text-cyan-400" />
            <span>Verify Incident</span>
          </Link>

          <Link
            to="/dashboard/officer/dispatch-resources"
            className="px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-sm"
          >
            <FaBoxes className="text-slate-950" />
            <span>Dispatch Resources</span>
          </Link>

          <Link
            to="/dashboard/officer/map"
            className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-orange-400 hover:text-white font-bold text-xs flex items-center gap-2"
          >
            <FaMapMarkedAlt />
            <span>Tactical GIS Map</span>
          </Link>

        </div>
      </div>

      {/* 2. Clickable Navigation Statistics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-mono">
        
        {/* Active Incidents -> /dashboard/officer/incident-queue */}
        <div
          onClick={() => navigate('/dashboard/officer/incident-queue')}
          className="p-6 rounded-2xl bg-slate-800/90 border border-slate-700 hover:border-orange-500 transition-all cursor-pointer shadow-sm group"
        >
          <div className="flex justify-between items-center text-xs text-slate-400">
            <span className="uppercase font-bold">Active Incidents</span>
            <FaArrowRight className="w-3.5 h-3.5 text-orange-500 group-hover:translate-x-1 transition-transform" />
          </div>
          <div className="text-4xl font-extrabold text-orange-500 mt-2">42</div>
          <span className="text-xs text-emerald-400 mt-2 block font-semibold">-14% vs last 24h</span>
        </div>

        {/* Deployed Units -> /dashboard/officer/dispatch-resources */}
        <div
          onClick={() => navigate('/dashboard/officer/dispatch-resources')}
          className="p-6 rounded-2xl bg-slate-800/90 border border-slate-700 hover:border-cyan-500 transition-all cursor-pointer shadow-sm group"
        >
          <div className="flex justify-between items-center text-xs text-slate-400">
            <span className="uppercase font-bold">Deployed Rescue Units</span>
            <FaArrowRight className="w-3.5 h-3.5 text-cyan-400 group-hover:translate-x-1 transition-transform" />
          </div>
          <div className="text-4xl font-extrabold text-cyan-400 mt-2">184</div>
          <span className="text-xs text-cyan-400 mt-2 block font-semibold">98.5% Operational</span>
        </div>

        {/* Evacuated Citizens -> /dashboard/officer/team-status */}
        <div
          onClick={() => navigate('/dashboard/officer/team-status')}
          className="p-6 rounded-2xl bg-slate-800/90 border border-slate-700 hover:border-emerald-500 transition-all cursor-pointer shadow-sm group"
        >
          <div className="flex justify-between items-center text-xs text-slate-400">
            <span className="uppercase font-bold">Evacuated Citizens</span>
            <FaArrowRight className="w-3.5 h-3.5 text-emerald-400 group-hover:translate-x-1 transition-transform" />
          </div>
          <div className="text-4xl font-extrabold text-emerald-400 mt-2">12,850+</div>
          <span className="text-xs text-emerald-400 mt-2 block font-semibold">+1,420 Saved Today</span>
        </div>

        {/* AI Precision -> /dashboard/officer/analytics */}
        <div
          onClick={() => navigate('/dashboard/officer/analytics')}
          className="p-6 rounded-2xl bg-slate-800/90 border border-slate-700 hover:border-amber-500 transition-all cursor-pointer shadow-sm group"
        >
          <div className="flex justify-between items-center text-xs text-slate-400">
            <span className="uppercase font-bold">AI Neural Precision</span>
            <FaArrowRight className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-1 transition-transform" />
          </div>
          <div className="text-4xl font-extrabold text-amber-400 mt-2">99.4%</div>
          <span className="text-xs text-amber-400 mt-2 block font-semibold">&lt; 2.4 min Lead Time</span>
        </div>

      </div>

      {/* 3. Main Operational Grid: Incident Queue (8 cols) + Right AI Panel (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Improved Live Incident Queue (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="rounded-3xl bg-slate-800/90 border border-slate-700 p-6 sm:p-8 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-700">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <FaExclamationTriangle className="text-orange-500" />
                  Live Incident Queue
                </h2>
                <p className="text-xs text-slate-400">Real-time incident feed with priority triage and officer assignments</p>
              </div>
              <span className="text-xs font-mono text-orange-500 font-bold bg-slate-900 px-3 py-1 rounded-lg border border-slate-800">
                3 ACTIVE INCIDENTS
              </span>
            </div>

            {/* Incident Cards */}
            <div className="space-y-4 font-mono text-xs">
              {officerIncidentQueue.map((inc) => (
                <div
                  key={inc.id}
                  className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition-all"
                >
                  {/* Top Bar: ID, Category, Severity, Time */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-orange-500 font-bold text-sm">{inc.id}</span>
                      <span className="px-2.5 py-0.5 rounded text-[10px] bg-slate-900 border border-slate-800 text-white font-sans font-bold">
                        {inc.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                        inc.severity === 'Critical' ? 'bg-red-950 text-red-400 border border-red-800' : 'bg-amber-950 text-amber-400 border border-amber-800'
                      }`}>
                        {inc.severity.toUpperCase()} SEVERITY
                      </span>
                      <span className="text-slate-400">{inc.timeReported}</span>
                    </div>
                  </div>

                  {/* Incident Details: Location, Reporter, Officer */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-2 border-y border-slate-900 text-slate-300 font-sans text-xs">
                    <div>
                      <span className="text-slate-500 block text-[10px]">LOCATION</span>
                      <strong className="text-white">{inc.location}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px]">REPORTER</span>
                      <strong className="text-slate-200">{inc.reporter}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px]">ASSIGNED OFFICER</span>
                      <strong className="text-orange-400">{inc.assignedOfficer}</strong>
                    </div>
                  </div>

                  {/* Quick Action Buttons: View, Dispatch, Resolve */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                    <span className="text-emerald-400 font-semibold">{inc.status}</span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setActiveIncidentModal(inc)}
                        className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <FaEye className="w-3 h-3 text-orange-500" />
                        <span>View</span>
                      </button>

                      <Link
                        to="/dashboard/officer/dispatch-resources"
                        className="px-3 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-slate-950 font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <FaBoxes className="w-3 h-3" />
                        <span>Dispatch</span>
                      </Link>

                      <button
                        onClick={() => alert(`Incident ${inc.id} marked as resolved.`)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-950 hover:bg-emerald-900 border border-emerald-800 text-emerald-400 font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <FaCheckCircle className="w-3 h-3" />
                        <span>Resolve</span>
                      </button>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4. Right-Side AI Assistant Panel (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          <div className="rounded-3xl bg-slate-800/90 border border-slate-700 p-6 space-y-5 shadow-xl font-sans text-xs">
            
            {/* Header */}
            <div className="flex items-center gap-3 pb-3 border-b border-slate-700">
              <div className="p-3 rounded-xl bg-orange-500 text-slate-950 font-bold">
                <FaRobot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">AI Decision Support Panel</h3>
                <span className="text-[11px] text-slate-400">Autonomous multi-agent intelligence</span>
              </div>
            </div>

            {/* Quick AI Search */}
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-3 h-3" />
              <input
                type="text"
                placeholder="Quick AI Search (e.g. Route for INC-9042)"
                value={aiSearch}
                onChange={(e) => setAiSearch(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl pl-9 pr-3 py-2 text-xs outline-none focus:border-orange-500 font-mono"
              />
            </div>

            {/* 1. Incident Summary */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-orange-400 font-bold font-mono block">AI INCIDENT SUMMARY</span>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                High-priority Wildfire INC-9042 confirmed in Sector 7. Wind vectors blowing East at 14 km/h. Gas pipe hazard proximity flagged.
              </p>
            </div>

            {/* 2. AI Recommendations */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-emerald-400 font-bold font-mono block">AI ROUTE RECOMMENDATION</span>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                Reroute Fire Squad #4 via Exit 16 North to bypass flooded underpass on Main Highway. Saves 14 mins.
              </p>
            </div>

            {/* 3. Resource Suggestions */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-cyan-400 font-bold font-mono block">SUGGESTED RESOURCE DISPATCH</span>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                Deploy 1 additional Hydraulic Rescue Cutter and 2 Evacuation Buses to Central Shelter.
              </p>
            </div>

            {/* 4. Recent AI Actions */}
            <div className="space-y-2 pt-2 border-t border-slate-700">
              <span className="text-slate-400 font-mono font-bold block text-[11px]">RECENT AI ACTIONS</span>
              {aiActions.map((act, i) => (
                <div key={i} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 font-mono text-[10px] space-y-0.5">
                  <span className="text-orange-500 font-bold">{act.time}</span>
                  <p className="text-slate-300">{act.action}</p>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>

      {/* Incident Detail Modal */}
      {activeIncidentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm font-sans text-left">
          <div className="max-w-lg w-full rounded-2xl bg-slate-900 border border-slate-700 p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <FaExclamationTriangle className="text-orange-500" />
                {activeIncidentModal.id} — {activeIncidentModal.category}
              </h3>
              <button
                onClick={() => setActiveIncidentModal(null)}
                className="text-slate-400 hover:text-white font-mono text-xs font-bold"
              >
                CLOSE [X]
              </button>
            </div>

            <div className="space-y-2 font-mono text-xs text-slate-300">
              <p><strong>Location:</strong> {activeIncidentModal.location}</p>
              <p><strong>Reporter:</strong> {activeIncidentModal.reporter}</p>
              <p><strong>Assigned Officer:</strong> {activeIncidentModal.assignedOfficer}</p>
              <p><strong>Status:</strong> <span className="text-emerald-400 font-bold">{activeIncidentModal.status}</span></p>
            </div>

            <button
              onClick={() => setActiveIncidentModal(null)}
              className="w-full py-2.5 rounded-xl bg-slate-800 text-white font-bold text-xs hover:bg-slate-700"
            >
              Return to Console
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default OfficerDashboard;
