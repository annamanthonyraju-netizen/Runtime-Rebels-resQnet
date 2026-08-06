import { Link } from 'react-router-dom';
import { FaExclamationTriangle, FaArrowLeft, FaCheckCircle } from 'react-icons/fa';
import Navbar from '../components/common/Navbar';

const incidentQueueList = [
  { id: "INC-9042", title: "Wildfire Cluster #4B", priority: "Critical", status: "Assigned to Unit #12", location: "Sector 7 Corridor", time: "2 mins ago" },
  { id: "INC-8812", title: "Coastal Surge Level 2", priority: "High", status: "Pending Verification", location: "Zone 12 Harbor", time: "8 mins ago" },
  { id: "INC-7401", title: "Structural Bridge Crack", priority: "High", status: "Assigned to Squad #4", location: "ORR Exit 14", time: "14 mins ago" },
  { id: "INC-6590", title: "Gas Leak & Explosion Threat", priority: "Critical", status: "Triage Active", location: "Madhapur Block C", time: "20 mins ago" }
];

function IncidentQueuePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-12 px-4 sm:px-6 lg:px-8 w-full max-w-5xl mx-auto space-y-6 text-left">
        <Link to="/dashboard?role=officer" className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white">
          <FaArrowLeft /> Return to Officer Dashboard
        </Link>

        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-700 flex justify-between items-center shadow-xl">
          <div>
            <span className="text-xs font-mono font-bold text-orange-500 uppercase tracking-wider block mb-1">
              COMMAND DISPATCH QUEUE
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Active Incident Queue</h1>
            <p className="text-xs text-slate-400 mt-1">Review emergency priority alerts and dispatch responder squads</p>
          </div>
        </div>

        <div className="space-y-4 font-mono text-xs">
          {incidentQueueList.map(inc => (
            <div key={inc.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-700 flex flex-wrap justify-between items-center gap-4">
              <div>
                <span className="text-orange-500 font-bold">{inc.id} • Priority: {inc.priority}</span>
                <h3 className="text-base font-bold text-white font-sans mt-0.5">{inc.title}</h3>
                <span className="text-slate-400 text-xs font-sans">{inc.location} • {inc.time}</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-emerald-400 font-bold">{inc.status}</span>
                <button className="px-4 py-2 rounded-xl bg-orange-500 text-slate-950 font-bold text-xs hover:bg-orange-600">
                  Dispatch Unit
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default IncidentQueuePage;
