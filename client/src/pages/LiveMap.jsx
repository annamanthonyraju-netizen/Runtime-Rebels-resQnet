import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaMapMarkedAlt, FaSearch, FaCrosshairs, FaHospital, 
  FaShieldAlt, FaFireExtinguisher, FaHome, FaAmbulance, FaArrowLeft, FaLayerGroup, FaDirections 
} from 'react-icons/fa';
import Navbar from '../components/common/Navbar';

const MAP_MARKERS = [
  { id: 1, type: 'incident', label: '🔥 Wildfire Cluster #4B', coords: '17.4455, 78.3770', status: 'High Priority', color: 'text-orange-500' },
  { id: 2, type: 'incident', label: '🌊 Urban Flood Surge', coords: '17.4520, 78.3810', status: 'Active Evacuation', color: 'text-blue-400' },
  { id: 3, type: 'hospital', label: '🏥 Apollo Emergency Hospital', coords: '17.4350, 78.4010', status: '12 ICUs Available', color: 'text-emerald-400' },
  { id: 4, type: 'police', label: '🛡️ Gachibowli Police HQ', coords: '17.4410, 78.3650', status: 'Dispatched 4 Patrols', color: 'text-cyan-400' },
  { id: 5, type: 'fire', label: '🚒 Station #12 Fire & Rescue', coords: '17.4500, 78.3700', status: '6 Tenders Deployed', color: 'text-red-400' },
  { id: 6, type: 'shelter', label: '🏠 Central High Community Shelter', coords: '17.4480, 78.3720', status: 'Capacity: 450/600', color: 'text-amber-400' }
];

function LiveMap() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeOverlay, setActiveOverlay] = useState('Thermal Radar');

  const filteredMarkers = MAP_MARKERS.filter(m => {
    if (selectedCategory !== 'All' && m.type !== selectedCategory) return false;
    if (searchQuery && !m.label.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-12 px-4 sm:px-6 lg:px-8 w-full max-w-[1700px] mx-auto space-y-6 text-left">
        
        {/* Header Bar */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-700 flex flex-wrap items-center justify-between gap-6 shadow-xl">
          <div>
            <Link to="/dashboard" className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white mb-2">
              <FaArrowLeft /> Return to Command Console
            </Link>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-3">
              <FaMapMarkedAlt className="text-orange-500" />
              Live Tactical GIS &amp; Google Maps Radar
            </h1>
            <p className="text-xs text-slate-400 mt-1">Real-time incident markers, rescue unit trajectories, and hospital capacities.</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-3.5 h-3.5" />
              <input
                type="text"
                placeholder="Search location, hospital, or squad..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-slate-950 border border-slate-800 focus:border-orange-500 text-white text-xs rounded-xl pl-9 pr-4 py-2.5 outline-none w-64"
              />
            </div>
          </div>
        </div>

        {/* Map Control Bar & Layers */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900 p-2 rounded-2xl border border-slate-800 text-xs font-semibold">
          
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            {['All', 'incident', 'hospital', 'police', 'fire', 'shelter'].map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer uppercase font-mono ${
                  selectedCategory === cat
                    ? 'bg-orange-500 text-slate-950 font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* GIS Overlay Selector */}
          <div className="flex items-center gap-2 font-mono">
            <FaLayerGroup className="text-orange-400" />
            <span className="text-slate-400">GIS OVERLAY:</span>
            <select
              value={activeOverlay}
              onChange={(e) => setActiveOverlay(e.target.value)}
              className="bg-slate-950 border border-slate-700 text-white rounded-lg px-2.5 py-1 text-xs outline-none"
            >
              <option value="Thermal Radar">Thermal Hazard Heatmap</option>
              <option value="Flood Submersion">Flood Depth Contours</option>
              <option value="Evacuation Routes">Evacuation Corridors</option>
            </select>
          </div>

        </div>

        {/* Map Display Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Map Viewer Canvas (9 cols) */}
          <div className="lg:col-span-9 rounded-3xl bg-slate-900 border border-slate-700 p-6 min-h-[500px] relative flex flex-col justify-between overflow-hidden shadow-xl">
            <div className="absolute inset-0 bg-cyber-grid opacity-20 pointer-events-none"></div>

            {/* Top Bar Overlay */}
            <div className="relative z-10 flex items-center justify-between text-xs font-mono">
              <span className="text-orange-500 font-bold flex items-center gap-2 bg-slate-950/80 px-3 py-1.5 rounded-xl border border-slate-800">
                <FaCrosshairs className="w-3.5 h-3.5 text-orange-500 animate-spin" />
                CENTER: HYDERABAD (17.4455, 78.3770)
              </span>
              <span className="text-emerald-400 font-bold bg-slate-950/80 px-3 py-1.5 rounded-xl border border-slate-800">
                OVERLAY: {activeOverlay.toUpperCase()} ACTIVE
              </span>
            </div>

            {/* Map Pin Highlights */}
            <div className="relative z-10 my-auto py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {filteredMarkers.map(m => (
                <div key={m.id} className="p-3.5 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-1 backdrop-blur-md hover:border-orange-500 transition-all">
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-bold font-sans ${m.color}`}>{m.label}</span>
                  </div>
                  <div className="flex justify-between text-[11px] font-mono text-slate-400">
                    <span>{m.coords}</span>
                    <span className="text-emerald-400 font-semibold">{m.status}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Route Status Bar */}
            <div className="relative z-10 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5 text-orange-400 font-bold">
                <FaDirections /> ROUTE OPTIMIZATION: ACTIVE (NO BLOCKAGES)
              </span>
              <span>MAP ENGINE: GOOGLE MAPS &amp; POSTGIS MESH</span>
            </div>
          </div>

          {/* Marker Details List Panel (3 cols) */}
          <div className="lg:col-span-3 rounded-3xl bg-slate-900 border border-slate-700 p-6 space-y-4 shadow-xl font-mono text-xs">
            <h3 className="text-sm font-bold text-white uppercase border-b border-slate-800 pb-3">
              Active Map Markers ({filteredMarkers.length})
            </h3>

            <div className="space-y-3 max-h-[420px] overflow-y-auto">
              {filteredMarkers.map(m => (
                <div key={m.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-white font-bold block font-sans">{m.label}</span>
                  <p className="text-slate-400 text-[11px]">{m.status}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}

export default LiveMap;
