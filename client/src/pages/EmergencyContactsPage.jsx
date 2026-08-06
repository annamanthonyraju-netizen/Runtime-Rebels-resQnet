import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaPhoneAlt, FaMapMarkerAlt, FaHospital, FaShieldAlt, 
  FaFireExtinguisher, FaHome, FaArrowLeft, FaFemale, FaAmbulance, FaCrosshairs 
} from 'react-icons/fa';
import Navbar from '../components/common/Navbar';

const HYDERABAD_HOTLINES = [
  { name: 'National Emergency Response', number: '112', desc: 'Unified 24/7 SOS Response Number', icon: FaPhoneAlt, color: 'text-red-400 border-red-500/40 bg-red-950/40' },
  { name: 'Ambulance SOS Triage', number: '108', desc: 'Medical Emergency Dispatch', icon: FaAmbulance, color: 'text-amber-400 border-amber-500/40 bg-amber-950/40' },
  { name: 'National Police Control Room', number: '100', desc: 'Law Enforcement & Highway Patrol', icon: FaShieldAlt, color: 'text-cyan-400 border-cyan-500/40 bg-cyan-950/40' },
  { name: 'Fire & Rescue Services', number: '101', desc: 'Fire Brigade & Thermal Tenders', icon: FaFireExtinguisher, color: 'text-orange-400 border-orange-500/40 bg-orange-950/40' },
  { name: 'Women Helpline SOS', number: '181', desc: '24/7 Women Protection & Safety', icon: FaFemale, color: 'text-purple-400 border-purple-500/40 bg-purple-950/40' }
];

const NEARBY_SERVICES = [
  { category: 'Hospitals', name: 'Apollo Emergency Care', distance: '1.2 km', phone: '+91 40 2360 7777', address: 'Jubilee Hills, Hyderabad', icon: FaHospital },
  { category: 'Hospitals', name: 'KIMS Hospitals Gachibowli', distance: '2.1 km', phone: '+91 40 4488 5000', address: 'Gachibowli Junction', icon: FaHospital },
  { category: 'Police Stations', name: 'Gachibowli Police Station', distance: '0.9 km', phone: '+91 40 2785 2435', address: 'ORR Sector 7', icon: FaShieldAlt },
  { category: 'Fire Stations', name: 'Madhapur Fire Station #12', distance: '1.8 km', phone: '+91 40 2311 0101', address: 'Kavuri Hills Rd', icon: FaFireExtinguisher },
  { category: 'Shelters', name: 'Central High Relief Shelter', distance: '0.8 km', phone: '+91 40 2300 1122', address: 'Sector 7 Community Ground', icon: FaHome }
];

function EmergencyContactsPage() {
  const [loadingGeo, setLoadingGeo] = useState(false);
  const [currentCity, setCurrentCity] = useState('Hyderabad (Default Sector 7)');
  const [activeCategory, setActiveCategory] = useState('All');

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }
    setLoadingGeo(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLoadingGeo(false);
        setCurrentCity(`Detected GPS: ${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)} (Hyderabad Central)`);
      },
      () => {
        setLoadingGeo(false);
        alert("Location access denied. Using default regional numbers.");
      }
    );
  };

  const filteredServices = activeCategory === 'All'
    ? NEARBY_SERVICES
    : NEARBY_SERVICES.filter(s => s.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-12 px-4 sm:px-6 lg:px-8 w-full max-w-6xl mx-auto space-y-8 text-left">
        
        <Link to="/dashboard" className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white">
          <FaArrowLeft /> Return to Dashboard
        </Link>

        {/* Dynamic Location Banner */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-700 flex flex-wrap items-center justify-between gap-6 shadow-xl">
          <div>
            <span className="text-xs font-mono font-bold text-orange-500 uppercase tracking-wider block mb-1">
              GEOLOCATION-BASED HOTLINES
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Emergency Hotline Directory</h1>
            <p className="text-xs text-slate-400 mt-1">Current Sector: <strong className="text-emerald-400 font-mono">{currentCity}</strong></p>
          </div>

          <button
            onClick={handleDetectLocation}
            className="px-5 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-slate-950 font-bold text-xs flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <FaCrosshairs />
            <span>{loadingGeo ? 'Detecting Location...' : 'Detect Nearby Services'}</span>
          </button>
        </div>

        {/* 1. Hotlines Cards Grid (Hyderabad / National) */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white font-sans">National &amp; Regional Emergency Hotlines</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 font-mono">
            {HYDERABAD_HOTLINES.map(hotline => {
              const Icon = hotline.icon;
              return (
                <div key={hotline.number} className="p-5 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-xl border ${hotline.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs text-slate-400 font-sans block">{hotline.name}</span>
                      <a href={`tel:${hotline.number}`} className="text-2xl font-black text-white hover:text-orange-500">
                        {hotline.number}
                      </a>
                      <span className="text-[10px] text-slate-400 block font-sans">{hotline.desc}</span>
                    </div>
                  </div>

                  <a
                    href={`tel:${hotline.number}`}
                    className="p-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs"
                  >
                    Call
                  </a>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. Nearby Services Directory (Hospitals, Police, Fire, Shelters) */}
        <div className="space-y-4 pt-4 border-t border-slate-800">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-xl font-bold text-white font-sans">Nearby Emergency Facilities</h2>

            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-2 bg-slate-900 p-1.5 rounded-2xl border border-slate-800 text-xs font-mono">
              {['All', 'Hospitals', 'Police Stations', 'Fire Stations', 'Shelters'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                    activeCategory === cat ? 'bg-orange-500 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono">
            {filteredServices.map((svc, i) => {
              const Icon = svc.icon;
              return (
                <div key={i} className="p-5 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-orange-500">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs text-orange-500 font-bold">{svc.category} • {svc.distance}</span>
                      <h3 className="text-base font-bold text-white font-sans">{svc.name}</h3>
                      <span className="text-xs text-slate-400 font-sans">{svc.address}</span>
                    </div>
                  </div>

                  <a
                    href={`tel:${svc.phone}`}
                    className="px-4 py-2 rounded-xl bg-slate-950 hover:bg-slate-900 border border-slate-700 text-xs text-emerald-400 font-bold"
                  >
                    {svc.phone}
                  </a>
                </div>
              );
            })}
          </div>
        </div>

      </main>
    </div>
  );
}

export default EmergencyContactsPage;
