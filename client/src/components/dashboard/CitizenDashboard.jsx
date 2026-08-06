import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaExclamationTriangle, FaPhoneAlt, FaHome, FaBell, 
  FaWater, FaFire, FaAmbulance, FaHeartbeat, FaMapMarkedAlt, 
  FaPaperPlane, FaRobot, FaSatellite, FaCheckCircle, FaSearch, FaCrosshairs, FaShieldAlt
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const recentReportsData = [
  {
    id: "REP-401",
    category: "Flood",
    title: "Urban Flood Surge & Inundation",
    location: "Kavuri Hills, Madhapur",
    priority: "High",
    status: "Rescue Boat Dispatched",
    time: "4 mins ago",
    icon: FaWater,
    color: "text-blue-400 border-blue-500/40 bg-blue-950/40"
  },
  {
    id: "REP-398",
    category: "Fire",
    title: "Electrical Transformer Fire",
    location: "Gachibowli Junction",
    priority: "High",
    status: "Fire Tender En Route",
    time: "12 mins ago",
    icon: FaFire,
    color: "text-orange-400 border-orange-500/40 bg-orange-950/40"
  },
  {
    id: "REP-385",
    category: "Accident",
    title: "Expressway Highway Collision",
    location: "ORR Exit 17",
    priority: "Medium",
    status: "Ambulance #08 Assigned",
    time: "25 mins ago",
    icon: FaAmbulance,
    color: "text-amber-400 border-amber-500/40 bg-amber-950/40"
  },
  {
    id: "REP-370",
    category: "Medical",
    title: "Critical Cardiac SOS",
    location: "Banjara Hills Rd #12",
    priority: "High",
    status: "Paramedics On Scene",
    time: "40 mins ago",
    icon: FaHeartbeat,
    color: "text-red-400 border-red-500/40 bg-red-950/40"
  }
];

const shelters = [
  { name: "Central High Community Shelter", distance: "0.8 km", capacity: "450 / 600 Space Available", status: "Open" },
  { name: "Indoor Sports Complex Relief Hub", distance: "1.4 km", capacity: "120 / 800 Space Available", status: "Open" },
  { name: "St. Mary Medical Evacuation Camp", distance: "2.5 km", capacity: "Full (Redirecting)", status: "Full" }
];

function CitizenDashboard() {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showShelterModal, setShowShelterModal] = useState(false);
  const [showContactsModal, setShowContactsModal] = useState(false);
  
  // AI Assistant Chat State
  const [aiPrompt, setAiPrompt] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { sender: 'ai', text: "Hello! I am your ResQnet AI Emergency Assistant. Describe your situation or type your location for immediate help." }
  ]);
  const [aiThinking, setAiThinking] = useState(false);

  // Dynamic Greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const citizenName = user?.name || 'Pranay';

  const filteredReports = selectedCategory === 'All'
    ? recentReportsData
    : recentReportsData.filter(r => r.category.toLowerCase() === selectedCategory.toLowerCase());

  const handleAiSubmit = (e) => {
    e.preventDefault();
    if (!aiPrompt.trim()) return;

    const userText = aiPrompt;
    setChatMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setAiPrompt('');
    setAiThinking(true);

    setTimeout(() => {
      let aiReply = "I've logged your emergency details. High priority dispatch units in your sector have been alerted. Stay in a safe, elevated location.";
      if (userText.toLowerCase().includes('water') || userText.toLowerCase().includes('flood')) {
        aiReply = "⚠️ FLOOD ALERT INGESTED: Move to higher ground immediately. Central High Community Shelter is 0.8 km away. Rescue boats have been notified.";
      } else if (userText.toLowerCase().includes('fire') || userText.toLowerCase().includes('smoke')) {
        aiReply = "🔥 FIRE ALERT INGESTED: Evacuate the structure immediately. Cover your mouth with a damp cloth. Fire Squad #4 is en route.";
      }

      setChatMessages(prev => [...prev, { sender: 'ai', text: aiReply }]);
      setAiThinking(false);
    }, 1000);
  };

  return (
    <div className="space-y-8 font-sans text-left">
      
      {/* 1. Header Greeting & Quick Shortcuts Banner */}
      <div className="rounded-3xl bg-slate-800/90 border border-slate-700 p-6 sm:p-8 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-700">
          <div>
            <span className="text-xs font-mono font-bold text-orange-500 uppercase tracking-wider block mb-1">
              CITIZEN EMERGENCY COMMAND
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
              {getGreeting()}, <span className="text-orange-500">{citizenName}</span>
            </h1>
            <p className="text-sm text-slate-300 mt-1">
              Location: <strong>Hyderabad Central Sector</strong> • Status: <strong className="text-emerald-400">SAFE ZONE</strong>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-800 text-xs font-mono font-bold text-emerald-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              24/7 AI NODE ACTIVE
            </span>
          </div>
        </div>

        {/* 4 Main Shortcut Action Buttons */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          
          {/* Report Emergency */}
          <Link
            to="/dashboard/citizen/report"
            className="p-5 rounded-2xl bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold hover:scale-[1.02] transition-all flex flex-col justify-between shadow-md group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-slate-950/30">
                <FaExclamationTriangle className="w-6 h-6 text-white group-hover:animate-bounce" />
              </div>
              <span className="text-[10px] font-mono font-extrabold bg-slate-950/40 px-2 py-0.5 rounded">SOS</span>
            </div>
            <div>
              <span className="text-lg font-extrabold block">Report Emergency</span>
              <span className="text-xs text-red-100 font-medium block mt-0.5">Instant AI SOS Dispatch</span>
            </div>
          </Link>

          {/* Emergency Contacts */}
          <button
            onClick={() => setShowContactsModal(true)}
            className="p-5 rounded-2xl bg-slate-900 border border-slate-700 text-slate-200 hover:border-slate-500 hover:text-white transition-all text-left flex flex-col justify-between cursor-pointer"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-slate-800 text-orange-400">
                <FaPhoneAlt className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono font-bold bg-slate-800 text-slate-300 px-2 py-0.5 rounded">112 / 108</span>
            </div>
            <div>
              <span className="text-lg font-bold text-white block">Emergency Contacts</span>
              <span className="text-xs text-slate-400 block mt-0.5">Police, Fire &amp; Ambulance</span>
            </div>
          </button>

          {/* Nearby Shelters */}
          <button
            onClick={() => setShowShelterModal(true)}
            className="p-5 rounded-2xl bg-slate-900 border border-slate-700 text-slate-200 hover:border-slate-500 hover:text-white transition-all text-left flex flex-col justify-between cursor-pointer"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-slate-800 text-emerald-400">
                <FaHome className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono font-bold bg-slate-800 text-slate-300 px-2 py-0.5 rounded">0.8 km</span>
            </div>
            <div>
              <span className="text-lg font-bold text-white block">Nearby Shelters</span>
              <span className="text-xs text-slate-400 block mt-0.5">Evacuation Hub Finder</span>
            </div>
          </button>

          {/* Current Alerts */}
          <a
            href="#alerts-section"
            className="p-5 rounded-2xl bg-slate-900 border border-slate-700 text-slate-200 hover:border-slate-500 hover:text-white transition-all text-left flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-slate-800 text-amber-400">
                <FaBell className="w-5 h-5 animate-pulse" />
              </div>
              <span className="text-[10px] font-mono font-bold bg-amber-950 text-amber-400 px-2 py-0.5 rounded border border-amber-800">2 ACTIVE</span>
            </div>
            <div>
              <span className="text-lg font-bold text-white block">Current Alerts</span>
              <span className="text-xs text-slate-400 block mt-0.5">Local Warning Broadcasts</span>
            </div>
          </a>

        </div>
      </div>

      {/* 2. Recent Reports Section */}
      <div className="rounded-3xl bg-slate-800/90 border border-slate-700 p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-700">
          <div>
            <h2 className="text-2xl font-bold text-white">Recent Emergency Reports</h2>
            <p className="text-xs text-slate-400 mt-0.5">Real-time citizen SOS &amp; authority incident updates in your area</p>
          </div>

          {/* Category Filter Pills: Flood, Fire, Accident, Medical */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-900 p-1.5 rounded-2xl border border-slate-700 text-xs font-semibold">
            {['All', 'Flood', 'Fire', 'Accident', 'Medical'].map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-orange-500 text-slate-950 font-bold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredReports.map((rep) => {
            const Icon = rep.icon;
            return (
              <div key={rep.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-700 flex flex-col justify-between space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-xl border ${rep.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-mono text-orange-500 font-bold">{rep.id} • {rep.category}</span>
                      <h3 className="text-base font-bold text-white">{rep.title}</h3>
                      <span className="text-xs text-slate-400">{rep.location}</span>
                    </div>
                  </div>

                  <span className="text-xs font-mono font-bold text-red-400 bg-red-950/60 px-2.5 py-1 rounded border border-red-800">
                    {rep.priority}
                  </span>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-semibold">
                  <span className="text-emerald-400">{rep.status}</span>
                  <span className="text-slate-400">{rep.time}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Live Disaster Map Section */}
      <div className="rounded-3xl bg-slate-800/90 border border-slate-700 p-6 sm:p-8 space-y-4 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-slate-700">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <FaMapMarkedAlt className="text-orange-500" />
              Live Disaster GIS Map
            </h2>
            <p className="text-xs text-slate-400">Interactive satellite radar &amp; evacuation route overlay</p>
          </div>

          <Link
            to="/map"
            className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-bold text-orange-400 hover:text-white transition-all"
          >
            Open Full Screen GIS Map
          </Link>
        </div>

        {/* Map Canvas Preview Container */}
        <div className="rounded-2xl bg-slate-950 border border-slate-800 p-6 relative min-h-[320px] flex flex-col justify-between overflow-hidden">
          <div className="absolute inset-0 bg-cyber-grid opacity-25 pointer-events-none"></div>

          <div className="relative z-10 flex items-center justify-between text-xs font-mono">
            <span className="text-orange-500 font-bold flex items-center gap-1.5">
              <FaCrosshairs className="w-3.5 h-3.5 text-orange-500 animate-spin" />
              GPS LOCATED: HYDERABAD SECTOR 7
            </span>
            <span className="text-emerald-400 font-bold">3 SATELLITES IN VIEW</span>
          </div>

          <div className="relative z-10 my-auto text-center space-y-3 py-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-900 border border-orange-500/40 text-orange-500 shadow-md">
              <FaSatellite className="w-8 h-8 animate-pulse" />
            </div>
            <h3 className="text-lg font-bold text-white">Live Orbital &amp; Drone Map Stream</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Real-time thermal hazard heatmaps, citizen SOS markers, and open evacuation corridors.
            </p>
          </div>

          <div className="relative z-10 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>SHELTER OVERLAY: <strong className="text-emerald-400">ENABLED</strong></span>
            <span>LATENCY: <strong className="text-orange-500">12ms</strong></span>
          </div>
        </div>
      </div>

      {/* 4. AI Assistant Section */}
      <div className="rounded-3xl bg-slate-800/90 border border-slate-700 p-6 sm:p-8 space-y-4 shadow-xl">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-700">
          <div className="p-3 rounded-xl bg-orange-500 text-slate-950 font-bold">
            <FaRobot className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">ResQnet AI Emergency Assistant</h2>
            <p className="text-xs text-slate-400">Natural language emergency triage &amp; safety instructions</p>
          </div>
        </div>

        {/* Chat Stream Window */}
        <div className="rounded-2xl bg-slate-950 border border-slate-800 p-4 min-h-[200px] max-h-[300px] overflow-y-auto space-y-3 font-sans text-sm">
          {chatMessages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`p-3.5 rounded-2xl max-w-xl text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-orange-500 text-slate-950 font-semibold rounded-tr-none'
                    : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {aiThinking && (
            <div className="flex gap-2 text-xs text-orange-400 font-mono items-center">
              <span className="w-2 h-2 rounded-full bg-orange-400 animate-ping"></span>
              <span>AI is analyzing emergency situation &amp; route guidance...</span>
            </div>
          )}
        </div>

        {/* Chat Input Form */}
        <form onSubmit={handleAiSubmit} className="flex gap-3">
          <input
            type="text"
            placeholder="Describe your emergency... (e.g. Water is rising rapidly near my house)"
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            className="flex-1 bg-slate-950 border border-slate-700 focus:border-orange-500 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm outline-none font-sans"
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-slate-950 font-bold text-sm transition-all flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <FaPaperPlane className="w-4 h-4 text-slate-950" />
            <span className="hidden sm:inline">Ask AI</span>
          </button>
        </form>
      </div>

      {/* Emergency Contacts Modal */}
      {showContactsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="max-w-md w-full rounded-2xl bg-slate-900 border border-slate-700 p-6 space-y-4 font-sans text-left">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <FaPhoneAlt className="text-orange-500" />
                Emergency Hotline Directory
              </h3>
              <button onClick={() => setShowContactsModal(false)} className="text-slate-400 hover:text-white text-xs font-bold font-mono">
                CLOSE [X]
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center">
                <span>National Emergency Response:</span>
                <a href="tel:112" className="text-orange-400 font-bold text-sm font-mono">112</a>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center">
                <span>Police Command:</span>
                <a href="tel:100" className="text-orange-400 font-bold text-sm font-mono">100</a>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center">
                <span>Fire &amp; Rescue Services:</span>
                <a href="tel:101" className="text-orange-400 font-bold text-sm font-mono">101</a>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center">
                <span>Ambulance SOS Triage:</span>
                <a href="tel:108" className="text-orange-400 font-bold text-sm font-mono">108</a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Nearby Shelters Modal */}
      {showShelterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="max-w-lg w-full rounded-2xl bg-slate-900 border border-slate-700 p-6 space-y-4 font-sans text-left">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <FaHome className="text-emerald-400" />
                Nearby Evacuation Shelters
              </h3>
              <button onClick={() => setShowShelterModal(false)} className="text-slate-400 hover:text-white text-xs font-bold font-mono">
                CLOSE [X]
              </button>
            </div>

            <div className="space-y-3 text-xs">
              {shelters.map((sh, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <div className="flex justify-between items-center font-bold text-sm text-white">
                    <span>{sh.name}</span>
                    <span className="text-emerald-400 text-xs">{sh.distance}</span>
                  </div>
                  <div className="flex justify-between text-slate-400 text-xs">
                    <span>Capacity: {sh.capacity}</span>
                    <span className="text-emerald-400 font-semibold">{sh.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default CitizenDashboard;
