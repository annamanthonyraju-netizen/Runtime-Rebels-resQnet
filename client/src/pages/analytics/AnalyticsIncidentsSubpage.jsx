import { Link } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FaExclamationTriangle, FaArrowLeft } from 'react-icons/fa';
import { MONTHLY_TRENDS } from '../../utils/dashboardData';

function AnalyticsIncidentsSubpage() {
  return (
    <div className="w-full space-y-6 text-left font-sans">
      <Link to="/dashboard/analytics" className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white">
        <FaArrowLeft /> Back to Analytics Overview
      </Link>

      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-700 flex justify-between items-center shadow-xl font-mono">
        <div>
          <span className="text-xs font-bold text-orange-500 uppercase tracking-wider block mb-1">INCIDENT TELEMETRY</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-sans">Incident Time-Series &amp; District Breakdown</h1>
          <p className="text-xs text-slate-400 mt-1">Detailed breakdown of emergency cases across sectors and hazard levels</p>
        </div>
      </div>

      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-700 space-y-4">
        <h2 className="text-lg font-bold text-white">Monthly Incident Trend Time-Series</h2>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={MONTHLY_TRENDS}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="month" stroke="#94A3B8" />
              <YAxis stroke="#94A3B8" />
              <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', color: '#fff' }} />
              <Area type="monotone" dataKey="incidents" stroke="#F97316" fill="#F97316" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsIncidentsSubpage;
