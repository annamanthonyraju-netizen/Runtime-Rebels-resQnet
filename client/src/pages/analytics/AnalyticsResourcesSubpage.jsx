import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FaBoxes, FaArrowLeft } from 'react-icons/fa';
import { RESOURCE_UTILIZATION } from '../../utils/dashboardData';

function AnalyticsResourcesSubpage() {
  return (
    <div className="w-full space-y-6 text-left font-sans">
      <Link to="/dashboard/analytics" className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white">
        <FaArrowLeft /> Back to Analytics Overview
      </Link>

      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-700 font-mono">
        <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block mb-1">FLEET TELEMETRY</span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-sans">Resource Utilization &amp; Station Performance</h1>
      </div>

      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-700 space-y-4">
        <h2 className="text-lg font-bold text-white">Active vs Deployed Fleet Distribution</h2>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={RESOURCE_UTILIZATION}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="type" stroke="#94A3B8" />
              <YAxis stroke="#94A3B8" />
              <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', color: '#fff' }} />
              <Bar dataKey="available" fill="#10B981" />
              <Bar dataKey="deployed" fill="#F97316" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsResourcesSubpage;
