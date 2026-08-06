import { Link } from 'react-router-dom';
import { FaRobot, FaArrowLeft } from 'react-icons/fa';
import Navbar from '../components/common/Navbar';
import { AI_LOGS } from '../utils/dashboardData';

function AILogsPage() {
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
              AI INFERENCE AUDIT TRAIL
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">AI Neural Prediction Logs</h1>
            <p className="text-xs text-slate-400 mt-1">Real-time confidence scores, thermal anomaly triggers, and automated dispatch logs</p>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-700 font-mono text-xs space-y-3">
          {AI_LOGS.map(log => (
            <div key={log.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-orange-500 font-bold">{log.id} • {log.timestamp}</span>
                <h4 className="text-sm font-bold text-white mt-0.5">{log.event}</h4>
              </div>
              <div className="text-right">
                <span className="text-emerald-400 font-bold block">CONFIDENCE: {log.confidence}</span>
                <span className="text-slate-400">{log.status}</span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default AILogsPage;
