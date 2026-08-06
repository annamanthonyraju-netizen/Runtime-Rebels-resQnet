import { Link } from 'react-router-dom';
import { FaHome, FaMapMarkerAlt, FaUsers, FaArrowLeft } from 'react-icons/fa';
import Navbar from '../components/common/Navbar';

const shelterDirectory = [
  { name: "Central High Community Shelter", distance: "0.8 km", capacity: "450 / 600 Space Available", status: "Open", address: "Sector 7 Main Road", phone: "+91 40 2300 1122" },
  { name: "Indoor Sports Complex Relief Hub", distance: "1.4 km", capacity: "120 / 800 Space Available", status: "Open", address: "Stadium Corridor", phone: "+91 40 2300 4455" },
  { name: "St. Mary Medical Evacuation Camp", distance: "2.5 km", capacity: "Full (Redirecting)", status: "Full", address: "Jubilee Hills Link", phone: "+91 40 2300 9988" }
];

function NearbySheltersPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-12 px-4 sm:px-6 lg:px-8 w-full max-w-5xl mx-auto space-y-6 text-left">
        <Link to="/dashboard" className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white">
          <FaArrowLeft /> Return to Dashboard
        </Link>

        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-700 flex flex-wrap items-center justify-between gap-4 shadow-xl">
          <div>
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider block mb-1">
              EVACUATION HUB DIRECTORY
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Nearby Evacuation Shelters</h1>
            <p className="text-xs text-slate-400 mt-1">Real-time open capacity and direct contact info for relief camps</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
          {shelterDirectory.map((sh, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-slate-900 border border-slate-700 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-base font-bold text-white font-sans">{sh.name}</h3>
                  <span className="text-slate-400 text-xs font-sans">{sh.address}</span>
                </div>
                <span className="text-emerald-400 font-bold text-sm">{sh.distance}</span>
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-between items-center text-slate-300">
                <span>Capacity: <strong className="text-white">{sh.capacity}</strong></span>
                <span className="text-emerald-400 font-bold">{sh.status}</span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default NearbySheltersPage;
