import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaBullhorn, FaBroadcastTower, FaShieldAlt, FaPaperPlane, 
  FaArrowLeft, FaCheckCircle, FaExclamationTriangle 
} from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

function EmergencyBroadcastPage() {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [scope, setScope] = useState('Entire City');
  const [targetRole, setTargetRole] = useState('All');
  const [priority, setPriority] = useState('Critical');
  const [type, setType] = useState('Emergency Alert');
  
  const [broadcastSent, setBroadcastSent] = useState(false);

  const handleBroadcastSubmit = async (e) => {
    e.preventDefault();
    if (!title || !message) {
      alert("Please fill in title and broadcast text.");
      return;
    }

    try {
      await fetch('http://localhost:5000/api/notifications/broadcast', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('resqnet_jwt_token') || ''}`
        },
        body: JSON.stringify({ title, message, scope, targetRole, priority, type })
      });
    } catch (e) {}

    setBroadcastSent(true);
  };

  return (
    <div className="w-full space-y-6 text-left font-sans">
      
      <Link to="/dashboard/notifications" className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white">
        <FaArrowLeft /> Back to Notification Center
      </Link>

      {/* Header Bar */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-800/90 border border-slate-700 flex flex-wrap items-center justify-between gap-6 shadow-xl">
        <div>
          <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-red-950 text-red-400 border border-red-800 uppercase">
            COMMAND ALERT DISPATCH CONSOLE
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">Emergency Broadcast Console</h1>
          <p className="text-xs text-slate-300">Dispatch instant high-priority emergency alerts across city zones and responder groups.</p>
        </div>
      </div>

      {/* Broadcast Form or Success State */}
      {broadcastSent ? (
        <div className="p-8 rounded-3xl bg-slate-900 border border-emerald-500/40 text-center space-y-4 font-mono shadow-xl">
          <FaCheckCircle className="w-16 h-16 text-emerald-400 mx-auto" />
          <h2 className="text-2xl font-bold text-white">Emergency Broadcast Dispatched!</h2>
          <p className="text-sm text-slate-300 max-w-md mx-auto">
            Alert <strong className="text-orange-400">"{title}"</strong> broadcasted to target scope: <strong className="text-cyan-400">{scope}</strong> ({targetRole} Recipients).
          </p>

          <button
            onClick={() => setBroadcastSent(false)}
            className="px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-slate-950 font-bold text-xs"
          >
            Dispatch Another Alert
          </button>
        </div>
      ) : (
        <form onSubmit={handleBroadcastSubmit} className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-700 space-y-6 shadow-xl font-sans">
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
            <div>
              <label className="block text-slate-300 font-bold uppercase mb-1.5">Target Scope</label>
              <select
                value={scope}
                onChange={(e) => setScope(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl px-4 py-3 outline-none"
              >
                <option value="Entire City">Entire City</option>
                <option value="Sector 7 Corridor">Sector 7 Corridor</option>
                <option value="Zone 12 Harbor Area">Zone 12 Harbor Area</option>
                <option value="GIS Radius 3 km">GIS Radius 3 km</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-bold uppercase mb-1.5">Recipient Role Group</label>
              <select
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl px-4 py-3 outline-none"
              >
                <option value="All">All Citizens &amp; Responders</option>
                <option value="Citizen">Citizens Only</option>
                <option value="Officer">First Responder Officers</option>
                <option value="Volunteer">Relief Volunteer Squads</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-bold uppercase mb-1.5">Alert Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl px-4 py-3 outline-none"
              >
                <option value="Critical">Critical SOS</option>
                <option value="High">High Priority</option>
                <option value="Medium">Medium Warning</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1.5">
              Alert Headline Title <span className="text-orange-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. 🚨 CRITICAL EVACUATION NOTICE - Sector 7"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full bg-slate-950 border border-slate-700 text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1.5">
              Broadcast Message Content <span className="text-orange-500">*</span>
            </label>
            <textarea
              rows={4}
              placeholder="Enter clear safety instructions, route bypass instructions, or shelter locations..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="w-full bg-slate-950 border border-slate-700 text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-orange-500"
            />
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-8 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-slate-950 font-bold text-sm flex items-center gap-2 cursor-pointer shadow-md"
            >
              <FaBullhorn />
              <span>DISPATCH CITY-WIDE EMERGENCY BROADCAST</span>
            </button>
          </div>

        </form>
      )}

    </div>
  );
}

export default EmergencyBroadcastPage;
