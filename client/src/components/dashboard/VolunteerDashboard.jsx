import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaHandsHelping, FaCheckCircle, FaMapMarkerAlt, FaBoxOpen, 
  FaComments, FaBell, FaToggleOn, FaToggleOff, FaExclamationTriangle, FaPaperPlane 
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const assignedTasks = [
  { id: "TASK-102", title: "Water Bottle & Food Packet Distribution", location: "Central High Shelter", status: "In Progress", urgency: "High" },
  { id: "TASK-098", title: "Medical Kit Inventory Sorting", location: "Red Cross Depot 3", status: "Pending", urgency: "Medium" }
];

const pickupLocations = [
  { name: "Central Relief Logistics Hub", items: "500 Drinking Water Pouches, 100 Blankets", distance: "1.2 km" },
  { name: "Red Cross Supply Depot #2", items: "First Aid Kits & Emergency Flashlights", distance: "2.1 km" }
];

function VolunteerDashboard() {
  const { user } = useAuth();
  const [isAvailable, setIsAvailable] = useState(true);
  const [msgInput, setMsgInput] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'Command Lead', text: 'Volunteer Squad #4, please prioritize water distribution at Central High.' }
  ]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!msgInput.trim()) return;
    setMessages(prev => [...prev, { sender: user?.name || 'Volunteer Rajesh', text: msgInput }]);
    setMsgInput('');
  };

  return (
    <div className="space-y-8 font-sans text-left">
      
      {/* Header & Availability Toggle */}
      <div className="rounded-3xl bg-slate-800/90 border border-slate-700 p-6 sm:p-8 flex flex-wrap items-center justify-between gap-6 shadow-xl">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className="px-3 py-1 text-xs font-mono font-bold bg-orange-500/20 text-orange-400 border border-orange-500/40 rounded-lg uppercase">
              VOLUNTEER RELIEF NETWORK
            </span>
            <span className="text-xs text-emerald-400 font-mono font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              SQUAD ACTIVE
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Volunteer Disaster Dispatch
          </h1>
          <p className="text-sm text-slate-300 mt-1">
            Volunteer ID: <strong>VOL-4029</strong> • Assigned Base: <strong>Central Relief Hub</strong>
          </p>
        </div>

        {/* Availability Toggle */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center gap-4">
          <div>
            <span className="text-xs font-mono text-slate-400 block font-bold">DEPLOYMENT STATUS</span>
            <span className={`text-sm font-bold font-mono ${isAvailable ? 'text-emerald-400' : 'text-slate-400'}`}>
              {isAvailable ? 'AVAILABLE FOR DISPATCH' : 'OFF-DUTY'}
            </span>
          </div>
          <button
            onClick={() => setIsAvailable(!isAvailable)}
            className="text-3xl cursor-pointer transition-transform hover:scale-110"
          >
            {isAvailable ? (
              <FaToggleOn className="text-emerald-400" />
            ) : (
              <FaToggleOff className="text-slate-600" />
            )}
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Assigned Tasks & Pickup Locations (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Assigned Tasks */}
          <div className="rounded-3xl bg-slate-800/90 border border-slate-700 p-6 sm:p-8 space-y-4 shadow-xl">
            <h2 className="text-xl font-bold text-white flex items-center gap-2 pb-3 border-b border-slate-700">
              <FaHandsHelping className="text-orange-500" />
              Assigned Relief Tasks
            </h2>

            <div className="space-y-3 font-mono text-xs sm:text-sm">
              {assignedTasks.map(t => (
                <div key={t.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <span className="text-orange-500 font-bold">{t.id} • {t.urgency} Urgency</span>
                    <h3 className="text-base font-bold text-white font-sans mt-0.5">{t.title}</h3>
                    <span className="text-slate-400 text-xs">{t.location}</span>
                  </div>

                  <button className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs">
                    Mark Completed
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Resource Pickup Locations */}
          <div className="rounded-3xl bg-slate-800/90 border border-slate-700 p-6 sm:p-8 space-y-4 shadow-xl">
            <h2 className="text-xl font-bold text-white flex items-center gap-2 pb-3 border-b border-slate-700">
              <FaBoxOpen className="text-cyan-400" />
              Resource Pickup Locations
            </h2>

            <div className="space-y-3 font-mono text-xs sm:text-sm">
              {pickupLocations.map((p, i) => (
                <div key={i} className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <span className="text-white font-bold block font-sans">{p.name}</span>
                    <span className="text-slate-400 text-xs">{p.items}</span>
                  </div>
                  <span className="text-emerald-400 font-bold">{p.distance}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Communication Panel (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="rounded-3xl bg-slate-800/90 border border-slate-700 p-6 space-y-4 shadow-xl">
            <h2 className="text-lg font-bold text-white flex items-center gap-2 pb-3 border-b border-slate-700">
              <FaComments className="text-orange-500" />
              Squad Communication Channel
            </h2>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 min-h-[220px] max-h-[300px] overflow-y-auto space-y-2 font-sans text-xs">
              {messages.map((m, i) => (
                <div key={i} className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-orange-400 font-bold block">{m.sender}</span>
                  <p className="text-slate-200">{m.text}</p>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                placeholder="Broadcast to squad..."
                value={msgInput}
                onChange={(e) => setMsgInput(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-700 text-white rounded-xl px-3 py-2 text-xs outline-none"
              />
              <button type="submit" className="p-2.5 rounded-xl bg-orange-500 text-slate-950 font-bold">
                <FaPaperPlane className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}

export default VolunteerDashboard;
