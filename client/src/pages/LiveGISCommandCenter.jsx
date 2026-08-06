import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaMapMarkedAlt, FaSearch, FaFilter, FaLayerGroup, FaAmbulance, 
  FaHospital, FaShieldAlt, FaFireExtinguisher, FaHome, FaUsers, 
  FaExclamationTriangle, FaCheckCircle, FaRobot, FaCompress, 
  FaExpand, FaCrosshairs, FaPaperPlane, FaTimes, FaTrafficLight, FaFire 
} from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

// Default GIS Markers
const INITIAL_INCIDENTS = [
  {
    id: "INC-9042",
    title: "Wildfire Cluster #4B",
    category: "Fire",
    severity: "Critical", // Red
    status: "Dispatched",
    location: { lat: 17.4455, lng: 78.3770, address: "Sector 7 Corridor, Hyderabad" },
    reporter: "Citizen Pranay S.",
    time: "2 mins ago",
    assignedOfficer: "Capt. Sarah Jenkins",
    assignedResources: "Fire Squad #4 (12 Drones)",
    color: "#EF4444" // Red
  },
  {
    id: "INC-8812",
    title: "Coastal Surge Level 2",
    category: "Flood",
    severity: "High", // Orange
    status: "Pending",
    location: { lat: 17.4200, lng: 78.4100, address: "Zone 12 Harbor Area" },
    reporter: "Citizen Alex V.",
    time: "8 mins ago",
    assignedOfficer: "Cmdr. Rajesh Kumar",
    assignedResources: "Rescue Boat #2",
    color: "#F97316" // Orange
  },
  {
    id: "INC-7401",
    title: "Structural Bridge Crack",
    category: "Building Collapse",
    severity: "Medium", // Yellow
    status: "Verified",
    location: { lat: 17.4500, lng: 78.3600, address: "ORR Exit 14 Flyover" },
    reporter: "Officer Drone #4",
    time: "14 mins ago",
    assignedOfficer: "Lt. Michael C.",
    assignedResources: "Structural Squad #1",
    color: "#EAB308" // Yellow
  },
  {
    id: "INC-6590",
    title: "Minor Gas Odor Leak",
    category: "Chemical Leak",
    severity: "Low", // Green
    status: "Resolved",
    location: { lat: 17.4350, lng: 78.3850, address: "Madhapur Block C" },
    reporter: "Citizen Meera R.",
    time: "25 mins ago",
    assignedOfficer: "Officer David P.",
    assignedResources: "Hazmat Team #3",
    color: "#10B981" // Green
  }
];

const STATIONS_AND_RESOURCES = [
  { id: "HOSP-01", name: "Apollo Emergency Hospital", type: "Hospital", lat: 17.4300, lng: 78.4050, beds: "42 Beds Available", icon: FaHospital, color: "#06B6D4" },
  { id: "HOSP-02", name: "KIMS Trauma Care Center", type: "Hospital", lat: 17.4600, lng: 78.3700, beds: "18 Beds Available", icon: FaHospital, color: "#06B6D4" },
  { id: "POL-01", name: "Madhapur Police Command Station", type: "Police", lat: 17.4400, lng: 78.3800, units: "8 Squad Cars Active", icon: FaShieldAlt, color: "#3B82F6" },
  { id: "FIRE-01", name: "Gachibowli Fire & Thermal Station", type: "FireStation", lat: 17.4480, lng: 78.3650, tenders: "6 Fire Tenders Deployed", icon: FaFireExtinguisher, color: "#EF4444" },
  { id: "AMB-01", name: "108 SOS Ambulance Dispatch Depot", type: "Ambulance", lat: 17.4380, lng: 78.3900, status: "5 Units On Call", icon: FaAmbulance, color: "#EC4899" },
  { id: "SHELTER-01", name: "Central High Evacuation Shelter", type: "Shelter", lat: 17.4520, lng: 78.3820, capacity: "450 / 600 Open Space", icon: FaHome, color: "#10B981" }
];

function LiveGISCommandCenter() {
  const { user } = useAuth();
  
  // State
  const [incidents, setIncidents] = useState(INITIAL_INCIDENTS);
  const [selectedIncident, setSelectedIncident] = useState(INITIAL_INCIDENTS[0]);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Layer Toggles
  const [showIncidents, setShowIncidents] = useState(true);
  const [showStations, setShowStations] = useState(true);
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [showTraffic, setShowTraffic] = useState(false);
  const [mapType, setMapType] = useState('satellite'); // 'satellite' | 'roadmap'

  // Filter State
  const [severityFilter, setSeverityFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // Filter logic
  const filteredIncidents = incidents.filter(inc => {
    const matchSearch = inc.title.toLowerCase().includes(searchQuery.toLowerCase()) || inc.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchSev = severityFilter === 'All' || inc.severity === severityFilter;
    const matchStat = statusFilter === 'All' || inc.status === statusFilter;
    return matchSearch && matchSev && matchStat;
  });

  // Handle Dispatch Button Action
  const handleDispatchAction = (incId) => {
    setIncidents(prev => prev.map(inc => {
      if (inc.id === incId) {
        return {
          ...inc,
          status: 'Dispatched',
          assignedResources: 'Rescue Boat #2 & 108 Ambulance Unit #4'
        };
      }
      return inc;
    }));

    if (selectedIncident && selectedIncident.id === incId) {
      setSelectedIncident(prev => ({
        ...prev,
        status: 'Dispatched',
        assignedResources: 'Rescue Boat #2 & 108 Ambulance Unit #4'
      }));
    }

    alert(`[GIS DISPATCH CONFIRMED] Rescue units dispatched for ${incId}`);
  };

  return (
    <div className="w-full h-[calc(100vh-100px)] flex flex-col font-sans text-left bg-slate-950 text-white rounded-3xl overflow-hidden border border-slate-800 shadow-2xl relative">
      
      {/* Top GIS Command Control Bar */}
      <div className="h-16 bg-slate-900 border-b border-slate-800 px-6 flex items-center justify-between z-20">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-orange-500 text-slate-950 font-bold">
            <FaMapMarkedAlt className="w-5 h-5 text-slate-950" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
              Tactical GIS Command Center
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold">
                LIVE SOCKET.IO SYNCED
              </span>
            </h1>
          </div>
        </div>

        {/* Layer & Map Controls */}
        <div className="flex items-center gap-2 font-mono text-xs">
          <button
            onClick={() => setMapType(mapType === 'satellite' ? 'roadmap' : 'satellite')}
            className={`px-3 py-1.5 rounded-xl border font-bold transition-all cursor-pointer ${
              mapType === 'satellite' ? 'bg-orange-500 text-slate-950 border-orange-400' : 'bg-slate-950 text-slate-300 border-slate-800'
            }`}
          >
            {mapType === 'satellite' ? '📡 Satellite View' : '🗺️ Map View'}
          </button>

          <button
            onClick={() => setShowHeatmap(!showHeatmap)}
            className={`px-3 py-1.5 rounded-xl border font-bold transition-all cursor-pointer ${
              showHeatmap ? 'bg-red-950 text-red-400 border-red-800' : 'bg-slate-950 text-slate-400 border-slate-800'
            }`}
          >
            🔥 Thermal Heatmap {showHeatmap ? 'ON' : 'OFF'}
          </button>

          <button
            onClick={() => setShowTraffic(!showTraffic)}
            className={`px-3 py-1.5 rounded-xl border font-bold transition-all cursor-pointer ${
              showTraffic ? 'bg-amber-950 text-amber-400 border-amber-800' : 'bg-slate-950 text-slate-400 border-slate-800'
            }`}
          >
            🚥 Traffic Layer {showTraffic ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>

      {/* Main 3-Column Interactive GIS Workspace */}
      <div className="flex-1 flex min-h-0 relative">
        
        {/* LEFT COLUMN: Filters & Search Sidebar (320px) */}
        <div className="w-80 bg-slate-900 border-r border-slate-800 p-4 space-y-4 font-mono text-xs overflow-y-auto z-10 hidden md:block">
          
          {/* Search Input */}
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-3.5 h-3.5" />
            <input
              type="text"
              placeholder="Search Incident ID or Location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 focus:border-orange-500 text-white placeholder-slate-500 rounded-xl pl-9 pr-3 py-2.5 outline-none font-sans text-xs"
            />
          </div>

          {/* Severity Filter */}
          <div className="space-y-1.5">
            <span className="text-slate-400 font-bold uppercase text-[11px]">Severity Triage Filter</span>
            <div className="grid grid-cols-5 gap-1 text-[10px] font-bold">
              {['All', 'Critical', 'High', 'Medium', 'Low'].map(sev => (
                <button
                  key={sev}
                  onClick={() => setSeverityFilter(sev)}
                  className={`py-1.5 rounded-lg border text-center transition-all cursor-pointer ${
                    severityFilter === sev
                      ? 'bg-orange-500 text-slate-950 border-orange-400 font-extrabold'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  {sev}
                </button>
              ))}
            </div>
          </div>

          {/* Status Filter */}
          <div className="space-y-1.5">
            <span className="text-slate-400 font-bold uppercase text-[11px]">Status Filter</span>
            <div className="grid grid-cols-4 gap-1 text-[10px] font-bold">
              {['All', 'Pending', 'Dispatched', 'Resolved'].map(stat => (
                <button
                  key={stat}
                  onClick={() => setStatusFilter(stat)}
                  className={`py-1.5 rounded-lg border text-center transition-all cursor-pointer ${
                    statusFilter === stat
                      ? 'bg-orange-500 text-slate-950 border-orange-400 font-extrabold'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  {stat}
                </button>
              ))}
            </div>
          </div>

          {/* Layer Visibility Toggles */}
          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-sans text-xs">
            <span className="text-orange-400 font-bold font-mono block border-b border-slate-800 pb-1">GIS MAP LAYERS</span>
            <label className="flex items-center justify-between text-slate-300 cursor-pointer">
              <span className="flex items-center gap-2">🚨 Incident Markers ({filteredIncidents.length})</span>
              <input type="checkbox" checked={showIncidents} onChange={() => setShowIncidents(!showIncidents)} className="accent-orange-500" />
            </label>
            <label className="flex items-center justify-between text-slate-300 cursor-pointer">
              <span className="flex items-center gap-2">🏥 Stations &amp; Depots ({STATIONS_AND_RESOURCES.length})</span>
              <input type="checkbox" checked={showStations} onChange={() => setShowStations(!showStations)} className="accent-orange-500" />
            </label>
          </div>

          {/* Incident Feed List */}
          <div className="space-y-2">
            <span className="text-slate-400 font-bold uppercase text-[11px]">Active Incident Pins ({filteredIncidents.length})</span>
            {filteredIncidents.map(inc => (
              <div
                key={inc.id}
                onClick={() => setSelectedIncident(inc)}
                className={`p-3 rounded-xl border transition-all cursor-pointer space-y-1 font-sans ${
                  selectedIncident?.id === inc.id
                    ? 'bg-slate-950 border-orange-500 shadow-md'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex justify-between items-center font-mono">
                  <span className="font-bold text-orange-400">{inc.id}</span>
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: inc.color }}
                  ></span>
                </div>
                <h4 className="text-xs font-bold text-white leading-tight">{inc.title}</h4>
                <p className="text-[11px] text-slate-400 font-mono">{inc.location.address}</p>
              </div>
            ))}
          </div>

        </div>

        {/* CENTER COLUMN: Google Maps Canvas Simulation Area */}
        <div className="flex-1 bg-slate-950 relative overflow-hidden flex items-center justify-center">
          
          {/* Simulated Tactical Map Canvas Background */}
          <div className="absolute inset-0 bg-slate-950 opacity-90">
            {/* Map Grid Pattern simulation */}
            <div className="w-full h-full bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-40"></div>
          </div>

          {/* Thermal Heatmap Overlay Simulation */}
          {showHeatmap && (
            <div className="absolute top-1/3 left-1/3 w-80 h-80 rounded-full bg-red-600/20 blur-3xl pointer-events-none animate-pulse"></div>
          )}

          {/* User Current Location Marker (Pulsing Blue) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
            <div className="w-6 h-6 rounded-full bg-cyan-500/30 border-2 border-cyan-400 flex items-center justify-center animate-ping"></div>
            <div className="w-4 h-4 rounded-full bg-cyan-400 border-2 border-white shadow-lg relative -mt-5"></div>
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-cyan-300 text-[10px] font-mono font-bold mt-1 shadow-md">
              YOU (User Location)
            </span>
          </div>

          {/* Incident Map Markers */}
          {showIncidents && filteredIncidents.map((inc, idx) => {
            const offsets = [
              { top: '35%', left: '42%' },
              { top: '60%', left: '30%' },
              { top: '28%', left: '68%' },
              { top: '65%', left: '62%' }
            ];
            const pos = offsets[idx % offsets.length];
            const isSelected = selectedIncident?.id === inc.id;

            return (
              <div
                key={inc.id}
                onClick={() => setSelectedIncident(inc)}
                style={{ top: pos.top, left: pos.left }}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group"
              >
                <div className={`p-2 rounded-2xl border flex items-center gap-1.5 shadow-xl transition-transform ${
                  isSelected ? 'scale-110 ring-4 ring-orange-500/50' : 'hover:scale-105'
                }`} style={{ backgroundColor: '#0F172A', borderColor: inc.color }}>
                  <FaExclamationTriangle className="w-4 h-4" style={{ color: inc.color }} />
                  <span className="text-xs font-mono font-bold text-white">{inc.id}</span>
                </div>
              </div>
            );
          })}

          {/* Service Stations & Depots Markers */}
          {showStations && STATIONS_AND_RESOURCES.map((st, idx) => {
            const posList = [
              { top: '20%', left: '25%' },
              { top: '75%', left: '20%' },
              { top: '45%', left: '75%' },
              { top: '20%', left: '55%' },
              { top: '70%', left: '45%' },
              { top: '50%', left: '25%' }
            ];
            const pos = posList[idx % posList.length];
            const Icon = st.icon;

            return (
              <div
                key={st.id}
                style={{ top: pos.top, left: pos.left }}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
              >
                <div className="p-1.5 rounded-xl bg-slate-900 border border-slate-700 flex items-center gap-1 text-[10px] font-mono font-bold text-slate-200 shadow-md">
                  <Icon style={{ color: st.color }} />
                  <span>{st.name.split(' ')[0]}</span>
                </div>
              </div>
            );
          })}

          {/* Map Controls Floating Overlay */}
          <div className="absolute bottom-4 right-4 flex flex-col gap-2 z-20 font-mono text-xs">
            <button className="p-3 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold hover:bg-slate-800 cursor-pointer shadow-lg">
              <FaCrosshairs className="w-4 h-4 text-orange-500" />
            </button>
          </div>

        </div>

        {/* RIGHT COLUMN: Selected Incident Command Panel (360px) */}
        <AnimatePresence>
          {selectedIncident && (
            <motion.div
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }}
              className="w-90 bg-slate-900 border-l border-slate-800 p-6 space-y-5 font-sans text-xs overflow-y-auto z-20 shadow-2xl"
            >
              {/* Header */}
              <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-orange-500 font-mono font-bold text-sm">{selectedIncident.id}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                      selectedIncident.severity === 'Critical' ? 'bg-red-950 text-red-400 border border-red-800' : 'bg-amber-950 text-amber-400 border border-amber-800'
                    }`}>
                      {selectedIncident.severity.toUpperCase()}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white mt-1">{selectedIncident.title}</h3>
                </div>
                
                <button
                  onClick={() => setSelectedIncident(null)}
                  className="text-slate-400 hover:text-white p-1"
                >
                  <FaTimes className="w-4 h-4" />
                </button>
              </div>

              {/* Location & Metadata */}
              <div className="space-y-2 font-mono text-[11px] text-slate-300">
                <p><strong>Location:</strong> {selectedIncident.location.address}</p>
                <p><strong>Reporter:</strong> {selectedIncident.reporter} ({selectedIncident.time})</p>
                <p><strong>Assigned Officer:</strong> <span className="text-orange-400">{selectedIncident.assignedOfficer}</span></p>
                <p><strong>Assigned Resources:</strong> <span className="text-cyan-400">{selectedIncident.assignedResources}</span></p>
                <p><strong>Status:</strong> <span className="text-emerald-400 font-bold">{selectedIncident.status}</span></p>
              </div>

              {/* AI Recommendation Placeholder Box */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1 font-mono text-[11px]">
                <span className="text-orange-400 font-bold block flex items-center gap-1">
                  <FaRobot /> AI DISPATCH RECOMMENDATION
                </span>
                <p className="text-slate-300">
                  Reroute Fire Tender #4 via Exit 16 North to bypass flooded underpass. Save 14 mins.
                </p>
              </div>

              {/* Dispatch Action Button */}
              <button
                onClick={() => handleDispatchAction(selectedIncident.id)}
                className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <FaPaperPlane />
                <span>DISPATCH EMERGENCY RESCUE UNITS</span>
              </button>

            </motion.div>
          )}
        </AnimatePresence>

      </div>

    </div>
  );
}

export default LiveGISCommandCenter;
