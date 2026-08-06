import { Link } from 'react-router-dom';
import { FaExclamationTriangle, FaArrowLeft } from 'react-icons/fa';
import Navbar from '../components/common/Navbar';

function IncidentManagementPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-12 px-4 sm:px-6 lg:px-8 w-full max-w-6xl mx-auto space-y-6 text-left">
        <Link to="/dashboard?role=admin" className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white">
          <FaArrowLeft /> Return to Admin Console
        </Link>

        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-700 flex justify-between items-center shadow-xl">
          <div>
            <span className="text-xs font-mono font-bold text-orange-500 uppercase tracking-wider block mb-1">
              GLOBAL INCIDENT CONTROL
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Incident Management &amp; Audit Logs</h1>
            <p className="text-xs text-slate-400 mt-1">Review active, resolved, and archived emergency incidents platform-wide</p>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-700 font-mono text-xs space-y-3">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center">
            <div>
              <span className="text-orange-500 font-bold">INC-9042 • Wildfire Cluster #4B</span>
              <p className="text-white font-sans text-sm font-bold mt-0.5">Sector 7 Corridor • Urgency Index: 8.7</p>
            </div>
            <span className="text-emerald-400 font-bold">In Progress (Units Deployed)</span>
          </div>
        </div>
      </main>
    </div>
  );
}

export default IncidentManagementPage;
