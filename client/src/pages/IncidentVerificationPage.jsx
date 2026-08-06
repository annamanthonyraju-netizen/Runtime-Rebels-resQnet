import { Link } from 'react-router-dom';
import { FaCheckCircle, FaExclamationTriangle, FaArrowLeft } from 'react-icons/fa';
import Navbar from '../components/common/Navbar';

function IncidentVerificationPage() {
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
              SATELLITE & DRONE TRIAGE
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Incident Verification Portal</h1>
            <p className="text-xs text-slate-400 mt-1">Cross-verify citizen reports with satellite imagery and neural score validation</p>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-700 font-mono text-xs space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-slate-800">
            <div>
              <span className="text-orange-500 font-bold">INC-8812 • Coastal Surge Level 2</span>
              <p className="text-white font-sans text-sm font-bold mt-0.5">Zone 12 Harbor Area</p>
            </div>
            <span className="px-3 py-1 rounded bg-amber-950 text-amber-400 border border-amber-800">Pending Officer Verification</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="text-emerald-400 font-bold block">✓ AI NEURAL CONFIDENCE: 98.8%</span>
            <p className="text-slate-300">Satellite Sentinel-2 orbital imagery confirms water submersion level at 1.4m near harbor gates.</p>
          </div>

          <div className="flex gap-3 pt-2">
            <button className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold">
              Confirm &amp; Dispatch Units
            </button>
            <button className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white border border-slate-700 font-bold">
              Flag as False Alarm
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default IncidentVerificationPage;
