import { AlertTriangle, Users, ShieldCheck, Cpu, ArrowUpRight, TrendingDown } from 'lucide-react';

const statsData = [
  {
    id: 'incidents',
    title: 'Active Incidents',
    value: '42',
    unit: 'Live Cases',
    change: '-14% vs last 24h',
    isDecreaseGood: true,
    icon: AlertTriangle,
    accentColor: 'from-amber-500 to-red-500',
    borderColor: 'border-amber-500/30',
    glowColor: 'group-hover:shadow-[0_0_35px_rgba(245,158,11,0.25)]',
    textColor: 'text-amber-400',
    badge: 'REAL-TIME TRACKING'
  },
  {
    id: 'teams',
    title: 'Rescue Teams',
    value: '184',
    unit: 'Units Deployed',
    change: '98.5% Operational',
    isDecreaseGood: false,
    icon: Users,
    accentColor: 'from-cyan-500 to-blue-500',
    borderColor: 'border-cyan-500/30',
    glowColor: 'group-hover:shadow-[0_0_35px_rgba(6,182,212,0.3)]',
    textColor: 'text-cyan-400',
    badge: 'DISPATCH READY'
  },
  {
    id: 'safe',
    title: 'Citizens Safe',
    value: '12,850+',
    unit: 'Evacuated & Protected',
    change: '+1,420 Today',
    isDecreaseGood: false,
    icon: ShieldCheck,
    accentColor: 'from-emerald-500 to-cyan-500',
    borderColor: 'border-emerald-500/30',
    glowColor: 'group-hover:shadow-[0_0_35px_rgba(16,185,129,0.3)]',
    textColor: 'text-emerald-400',
    badge: 'LIVES PROTECTED'
  },
  {
    id: 'predictions',
    title: 'AI Predictions',
    value: '99.2%',
    unit: 'Detection Accuracy',
    change: '< 2.4 min Lead Time',
    isDecreaseGood: false,
    icon: Cpu,
    accentColor: 'from-blue-500 to-indigo-500',
    borderColor: 'border-blue-500/30',
    glowColor: 'group-hover:shadow-[0_0_35px_rgba(59,130,246,0.3)]',
    textColor: 'text-blue-400',
    badge: 'NEURAL MONITOR'
  }
];

function Stats() {
  return (
    <section className="py-16 relative z-10 w-full max-w-[1700px] mx-auto px-6 sm:px-12 lg:px-16">
      
      {/* Section Header Accent */}
      <div className="flex items-center justify-between mb-8 border-b border-cyan-500/20 pb-4">
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse"></span>
          <h2 className="text-sm sm:text-base font-mono font-bold tracking-widest text-cyan-400 uppercase">
            System Telemetry & Live Incident Metrics
          </h2>
        </div>
        <span className="text-xs font-mono text-slate-400 hidden sm:inline-block">
          LIVE SYNC • ACTIVE MONITORING
        </span>
      </div>

      {/* Grid of 4 Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {statsData.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.id}
              className={`group relative rounded-3xl bg-slate-900/60 backdrop-blur-2xl border ${stat.borderColor} p-8 transition-all duration-300 hover:-translate-y-1.5 ${stat.glowColor} overflow-hidden`}
            >
              {/* Card Cyber Ambient Light */}
              <div className={`absolute -top-12 -right-12 w-32 h-32 rounded-full bg-gradient-to-br ${stat.accentColor} opacity-15 group-hover:opacity-30 blur-2xl transition-opacity duration-300 pointer-events-none`}></div>

              <div className="flex items-start justify-between">
                <span className="px-3 py-1 text-xs font-mono font-bold tracking-wider text-slate-300 bg-slate-950/90 border border-slate-800 rounded-lg">
                  {stat.badge}
                </span>
                <div className={`p-3 rounded-2xl bg-slate-950/90 border border-slate-800 ${stat.textColor} group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-xs sm:text-sm font-medium text-slate-400 tracking-wider uppercase font-mono">
                  {stat.title}
                </h3>
                <div className="mt-3 flex items-baseline gap-3">
                  <span className="text-4xl sm:text-5xl font-extrabold text-white font-mono tracking-tight group-hover:text-cyan-200 transition-colors">
                    {stat.value}
                  </span>
                  <span className="text-xs sm:text-sm text-slate-400 font-mono">
                    {stat.unit}
                  </span>
                </div>
              </div>

              {/* Status Trend Pill */}
              <div className="mt-6 pt-5 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                <span className={`flex items-center gap-1.5 font-bold ${stat.textColor}`}>
                  {stat.isDecreaseGood ? (
                    <TrendingDown className="w-4 h-4" />
                  ) : (
                    <ArrowUpRight className="w-4 h-4" />
                  )}
                  {stat.change}
                </span>
                <span className="text-slate-500">Continuous Sync</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Stats;
