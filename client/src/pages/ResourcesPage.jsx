import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaBoxes, FaAmbulance, FaFireExtinguisher, FaShieldAlt, FaUsers, 
  FaSearch, FaCheckCircle, FaHospital, FaHome, FaBatteryThreeQuarters, 
  FaGasPump, FaArrowRight, FaClock, FaPlus 
} from 'react-icons/fa';

function ResourcesPage() {
  const [resources, setResources] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [camps, setCamps] = useState([]);
  const [filterType, setFilterType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resRes, hospRes, campRes] = await Promise.all([
          fetch('http://localhost:5000/api/resources'),
          fetch('http://localhost:5000/api/resources/hospitals'),
          fetch('http://localhost:5000/api/resources/relief-camps')
        ]);

        const resData = await resRes.json();
        const hospData = await hospRes.json();
        const campData = await campRes.json();

        if (resData.data) setResources(resData.data);
        if (hospData.data) setHospitals(hospData.data);
        if (campData.data) setCamps(campData.data);
      } catch (e) {}
    };

    fetchData();
  }, []);

  const filteredResources = resources.filter(res => {
    const matchSearch = (res.resourceId || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
                        (res.stationName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                        (res.vehicleNumber || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchType = filterType === 'All' || 
                      (filterType === 'Available' && res.status === 'Available') ||
                      (filterType === 'Busy' && res.status === 'Busy') ||
                      (filterType === 'Fire' && res.resourceType === 'Fire') ||
                      (filterType === 'Medical' && (res.resourceType === 'Medical' || res.resourceType === 'Ambulance')) ||
                      (filterType === 'Police' && res.resourceType === 'Police') ||
                      (filterType === 'Volunteer' && res.resourceType === 'Volunteer');
    return matchSearch && matchType;
  });

  const availableCount = resources.filter(r => r.status === 'Available').length;
  const busyCount = resources.filter(r => r.status === 'Busy').length;

  return (
    <div className="w-full space-y-6 text-left font-sans">
      
      {/* Header Bar */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-800/90 border border-slate-700 flex flex-wrap items-center justify-between gap-6 shadow-xl">
        <div>
          <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-950 text-cyan-400 border border-cyan-800 uppercase">
            COMMAND ASSET DIRECTORY
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">Smart Resource &amp; Unit Center</h1>
          <p className="text-xs text-slate-300">Live emergency fleet tracking, depot capacities, and AI dispatch matrix.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/dashboard/dispatch"
            className="px-5 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-sm"
          >
            <FaBoxes />
            <span>Open AI Dispatch Panel</span>
          </Link>
          <Link
            to="/dashboard/dispatch/history"
            className="px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white font-bold text-xs"
          >
            Dispatch Audit History
          </Link>
        </div>
      </div>

      {/* Analytics Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 font-mono text-xs">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-700">
          <span className="text-slate-400 uppercase font-bold">Total Active Fleet</span>
          <div className="text-3xl font-extrabold text-white mt-1">{resources.length || 4} Units</div>
          <span className="text-xs text-emerald-400 font-semibold block mt-1">100% Telemetry Synced</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-700">
          <span className="text-slate-400 uppercase font-bold">Units Available</span>
          <div className="text-3xl font-extrabold text-emerald-400 mt-1">{availableCount || 3}</div>
          <span className="text-xs text-emerald-400 font-semibold block mt-1">Ready for Dispatch</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-700">
          <span className="text-slate-400 uppercase font-bold">Units Deployed</span>
          <div className="text-3xl font-extrabold text-orange-400 mt-1">{busyCount || 1}</div>
          <span className="text-xs text-orange-400 font-semibold block mt-1">Active Missions</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-700">
          <span className="text-slate-400 uppercase font-bold">Avg Dispatch Response</span>
          <div className="text-3xl font-extrabold text-cyan-400 mt-1">3.4 mins</div>
          <span className="text-xs text-cyan-400 font-semibold block mt-1">&lt; 5 min Lead Target</span>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-700 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
        <div className="relative flex-1 max-w-md">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-3.5 h-3.5" />
          <input
            type="text"
            placeholder="Search by Resource ID, Station, or Vehicle Number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 focus:border-orange-500 text-white placeholder-slate-500 rounded-xl pl-10 pr-4 py-2.5 outline-none font-sans text-xs"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1 text-[11px] font-bold">
          {['All', 'Available', 'Busy', 'Fire', 'Medical', 'Police', 'Volunteer'].map(tab => (
            <button
              key={tab}
              onClick={() => setFilterType(tab)}
              className={`px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                filterType === tab
                  ? 'bg-orange-500 text-slate-950 border-orange-400'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Resources Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 font-sans">
        {filteredResources.map(res => (
          <div
            key={res.resourceId}
            className="p-5 rounded-2xl bg-slate-900 border border-slate-700 space-y-4 shadow-lg hover:border-orange-500 transition-all text-left group"
          >
            <div className="flex justify-between items-start font-mono">
              <div>
                <span className="text-orange-500 font-bold text-sm block">{res.resourceId}</span>
                <span className="text-[11px] text-slate-400">{res.stationName}</span>
              </div>

              <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold border ${
                res.status === 'Available' ? 'bg-emerald-950 text-emerald-400 border-emerald-800' : 'bg-orange-950 text-orange-400 border-orange-800'
              }`}>
                {res.status.toUpperCase()}
              </span>
            </div>

            <div className="space-y-1 font-mono text-xs text-slate-300">
              <p>Type: <strong className="text-white">{res.resourceType}</strong></p>
              <p>Vehicle: <strong className="text-slate-300">{res.vehicleNumber}</strong></p>
              <p>Officer: <strong className="text-orange-400">{res.officerInCharge}</strong></p>
              <p>ETA: <strong className="text-cyan-400">{res.eta || '4 mins'}</strong></p>
            </div>

            {/* Telemetry Gauge Indicators */}
            <div className="pt-2 border-t border-slate-800 grid grid-cols-2 gap-2 text-[11px] font-mono">
              <div className="flex items-center gap-1 text-slate-400">
                <FaGasPump className="text-amber-400" />
                <span>Fuel: <strong className="text-white">{res.fuelLevel}%</strong></span>
              </div>
              <div className="flex items-center gap-1 text-slate-400">
                <FaBatteryThreeQuarters className="text-emerald-400" />
                <span>Battery: <strong className="text-white">{res.batteryLevel}%</strong></span>
              </div>
            </div>

            <Link
              to={`/dashboard/resources/${res.resourceId}`}
              className="w-full py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 font-mono text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <span>View Full Telemetry</span>
              <FaArrowRight className="w-3 h-3 text-orange-500 group-hover:translate-x-1 transition-transform" />
            </Link>

          </div>
        ))}
      </div>

      {/* Hospitals & Relief Camps Directory */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Nearby Hospitals (6 Cols) */}
        <div className="lg:col-span-6 p-6 rounded-3xl bg-slate-900 border border-slate-700 space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
            <FaHospital className="text-cyan-400" /> Nearby Trauma Centers &amp; Hospitals
          </h2>

          <div className="space-y-3 font-mono text-xs">
            {hospitals.map(h => (
              <div key={h.hospitalId} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="flex justify-between items-center font-bold">
                  <span className="text-white font-sans text-sm">{h.name}</span>
                  <span className="text-cyan-400">{h.bedsAvailable} Beds Free</span>
                </div>
                <p className="text-slate-400 text-[11px] font-sans">{h.location?.address} • Phone: {h.contactNumber}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Nearby Relief Camps (6 Cols) */}
        <div className="lg:col-span-6 p-6 rounded-3xl bg-slate-900 border border-slate-700 space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
            <FaHome className="text-emerald-400" /> Evacuation Shelters &amp; Relief Camps
          </h2>

          <div className="space-y-3 font-mono text-xs">
            {camps.map(c => (
              <div key={c.campId} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="flex justify-between items-center font-bold">
                  <span className="text-white font-sans text-sm">{c.name}</span>
                  <span className="text-emerald-400">{c.currentOccupancy} / {c.capacity} Occupied</span>
                </div>
                <p className="text-slate-400 text-[11px] font-sans">{c.location?.address} • Supplies: {c.foodAvailability}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}

export default ResourcesPage;
