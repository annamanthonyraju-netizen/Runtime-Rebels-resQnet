import { FaExclamationTriangle, FaCheckCircle, FaUsers, FaShieldAlt, FaChartLine } from 'react-icons/fa';

const TYPE_ICONS = {
  incidents: FaExclamationTriangle,
  active: FaExclamationTriangle,
  resolved: FaCheckCircle,
  users: FaUsers,
  teams: FaShieldAlt
};

const TYPE_COLORS = {
  incidents: 'text-orange-500 bg-orange-500/10 border-orange-500/30',
  active: 'text-red-400 bg-red-500/10 border-red-500/30',
  resolved: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
  users: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
  teams: 'text-amber-400 bg-amber-500/10 border-amber-500/30'
};

function StatCard({ label, value, change, type = 'incidents' }) {
  const Icon = TYPE_ICONS[type] || FaChartLine;
  const colorStyle = TYPE_COLORS[type] || TYPE_COLORS.incidents;

  return (
    <div className="rounded-2xl bg-slate-800/90 border border-slate-700 p-6 flex flex-col justify-between shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
          {label}
        </span>
        <div className={`p-2.5 rounded-xl border ${colorStyle}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div>
        <div className="text-4xl font-extrabold text-white font-mono tracking-tight">
          {value}
        </div>
        <span className="text-xs font-mono text-slate-400 mt-2 block font-semibold">
          {change}
        </span>
      </div>
    </div>
  );
}

export default StatCard;
