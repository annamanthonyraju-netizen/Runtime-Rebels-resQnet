import { Link } from 'react-router-dom';
import { FaRobot, FaArrowLeft } from 'react-icons/fa';

function AnalyticsAISubpage() {
  return (
    <div className="w-full space-y-6 text-left font-sans">
      <Link to="/dashboard/analytics" className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white">
        <FaArrowLeft /> Back to Analytics Overview
      </Link>

      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-700 font-mono">
        <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-1">NEURAL ACCURACY TELEMETRY</span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-sans">AI Neural Performance &amp; Decision Accuracy</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-700">
          <span className="text-slate-400 uppercase font-bold">Severity Accuracy</span>
          <div className="text-4xl font-extrabold text-emerald-400 mt-2">98.6%</div>
        </div>
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-700">
          <span className="text-slate-400 uppercase font-bold">AI Acceptance Rate</span>
          <div className="text-4xl font-extrabold text-orange-400 mt-2">97.8%</div>
        </div>
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-700">
          <span className="text-slate-400 uppercase font-bold">Avg Agent Latency</span>
          <div className="text-4xl font-extrabold text-cyan-400 mt-2">1,240 ms</div>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsAISubpage;
