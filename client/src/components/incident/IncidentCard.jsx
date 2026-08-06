import { FaFire, FaWater, FaAmbulance, FaExclamationTriangle, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const ICON_MAP = {
  fire: FaFire,
  flood: FaWater,
  accident: FaAmbulance,
  hazard: FaExclamationTriangle
};

const PRIORITY_STYLES = {
  high: {
    bg: 'bg-red-500/10 text-red-400 border-red-500/30',
    label: 'High Priority'
  },
  medium: {
    bg: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    label: 'Medium Priority'
  },
  low: {
    bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    label: 'Low Priority'
  }
};

function IncidentCard({ type = 'fire', title, location, priority = 'high', status, timeAgo }) {
  const Icon = ICON_MAP[type] || FaExclamationTriangle;
  const priorityInfo = PRIORITY_STYLES[priority] || PRIORITY_STYLES.high;

  return (
    <div className="rounded-2xl bg-slate-800/90 border border-slate-700 p-6 flex flex-col justify-between shadow-sm hover:border-slate-600 transition-all">
      <div>
        {/* Header: Icon, Location, Priority Badge */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-700 text-orange-500">
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-slate-400 font-semibold flex items-center gap-1">
                <FaMapMarkerAlt className="w-3 h-3 text-orange-500" />
                {location}
              </span>
              <h3 className="text-lg font-bold text-white font-sans mt-0.5">
                {title}
              </h3>
            </div>
          </div>

          <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg border font-mono ${priorityInfo.bg}`}>
            {priorityInfo.label}
          </span>
        </div>
      </div>

      {/* Footer: Status & Time Ago */}
      <div className="pt-4 border-t border-slate-700/80 flex items-center justify-between text-xs font-semibold text-slate-300">
        <span className="text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded border border-emerald-800">
          {status}
        </span>
        <span className="text-slate-400 flex items-center gap-1">
          <FaClock className="w-3 h-3" />
          {timeAgo}
        </span>
      </div>
    </div>
  );
}

export default IncidentCard;
