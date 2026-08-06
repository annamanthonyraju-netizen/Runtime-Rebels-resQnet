import { Radio, Eye, Navigation, BellRing, ArrowRight, Sparkles, ShieldAlert, Cpu } from 'lucide-react';

const featuresData = [
  {
    id: 'incident-tracking',
    title: 'Live Incident Tracking',
    subtitle: 'Real-Time Telemetry & GIS Mapping',
    description: 'Continuous satellite feed integration, IoT ground sensors, and real-time geo-fencing to pinpoint emergency zones down to sub-meter precision.',
    icon: Radio,
    tag: 'SATELLITE & IOT',
    accent: 'cyan',
    borderColor: 'border-cyan-500/30 hover:border-cyan-400/70',
    glowColor: 'hover:shadow-[0_0_40px_rgba(6,182,212,0.25)]',
    iconBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/40',
    metrics: ['Sub-meter accuracy', '24/7 Orbital radar', 'Automated geo-fencing']
  },
  {
    id: 'ai-damage',
    title: 'AI Damage Assessment',
    subtitle: 'Computer Vision Scanning',
    description: 'Deep neural networks analyze aerial drone imagery and infrared sensors to score structural hazards and predict secondary flood/collapse risks.',
    icon: Eye,
    tag: 'DEEP LEARNING',
    accent: 'blue',
    borderColor: 'border-blue-500/30 hover:border-blue-400/70',
    glowColor: 'hover:shadow-[0_0_40px_rgba(59,130,246,0.25)]',
    iconBg: 'bg-blue-500/10 text-blue-400 border-blue-500/40',
    metrics: ['Vision Transformer v4', 'Infrared thermography', 'Risk heatmaps']
  },
  {
    id: 'rescue-coordination',
    title: 'Rescue Coordination',
    subtitle: 'Autonomous Unit Dispatch',
    description: 'Dynamic multi-agency command dispatch engine optimizes emergency vehicle routes through hazardous conditions and coordinates medical evacuations.',
    icon: Navigation,
    tag: 'MULTI-AGENT COMMAND',
    accent: 'indigo',
    borderColor: 'border-indigo-500/30 hover:border-indigo-400/70',
    glowColor: 'hover:shadow-[0_0_40px_rgba(99,102,241,0.25)]',
    iconBg: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/40',
    metrics: ['Automated re-routing', 'Inter-agency mesh', 'Medical triage']
  },
  {
    id: 'emergency-alerts',
    title: 'Emergency Alerts',
    subtitle: 'Sub-Second Broadcast',
    description: 'Instant zero-latency emergency warnings pushed directly to citizen mobile devices, satellite broadcasts, sirens, and emergency broadcast networks.',
    icon: BellRing,
    tag: 'ZERO LATENCY',
    accent: 'amber',
    borderColor: 'border-amber-500/30 hover:border-amber-400/70',
    glowColor: 'hover:shadow-[0_0_40px_rgba(245,158,11,0.25)]',
    iconBg: 'bg-amber-500/10 text-amber-400 border-amber-500/40',
    metrics: ['Cell broadcast push', 'Satellite overrides', 'Localized sirens']
  }
];

function Features() {
  return (
    <section className="py-28 relative z-10 w-full max-w-[1700px] mx-auto px-6 sm:px-12 lg:px-16">
      
      {/* Background Cyber Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[400px] bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none -z-10"></div>

      {/* Header */}
      <div className="text-center max-w-5xl mx-auto mb-20">
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900/90 border border-cyan-500/40 text-xs sm:text-sm font-mono text-cyan-300 mb-6 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>AUTONOMOUS CORE DEFENSE CAPABILITIES</span>
        </div>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white font-mono tracking-tight">
          Engineered for <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-cyan-400 to-blue-500">Zero-Delay Crisis Response</span>
        </h2>
        <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto">
          ResQnet combines multi-spectral satellite intelligence, autonomous drone networks, and neural AI models to protect human lives when seconds count.
        </p>
      </div>

      {/* 4 Feature Cards stretched across full width grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {featuresData.map((feature) => {
          const Icon = feature.icon;
          return (
            <div
              key={feature.id}
              className={`group relative rounded-3xl bg-slate-900/60 backdrop-blur-2xl border ${feature.borderColor} p-8 transition-all duration-300 ${feature.glowColor} flex flex-col justify-between overflow-hidden hover:-translate-y-2`}
            >
              {/* Card Ambient Glow Accent */}
              <div className="absolute top-0 right-0 w-44 h-44 bg-cyan-500/10 group-hover:bg-cyan-500/20 rounded-full blur-3xl transition-colors duration-500 pointer-events-none"></div>

              <div>
                {/* Header Badge & Icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`p-4 rounded-2xl border ${feature.iconBg} group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <span className="px-3 py-1 text-[11px] font-mono font-bold text-slate-300 bg-slate-950/90 border border-slate-800 rounded-lg">
                    {feature.tag}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <h3 className="text-2xl font-bold text-white font-mono group-hover:text-cyan-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-xs font-mono font-semibold text-cyan-400/90 mt-1.5 mb-4">
                  {feature.subtitle}
                </p>

                {/* Main Description */}
                <p className="text-slate-300 text-sm leading-relaxed">
                  {feature.description}
                </p>

                {/* Feature Metric Bullets */}
                <div className="mt-8 pt-6 border-t border-slate-800/80 space-y-2">
                  {feature.metrics.map((metric, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-mono text-slate-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                      <span>{metric}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Link Footer */}
              <div className="mt-8 flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 group-hover:text-cyan-300 transition-colors pt-4 border-t border-slate-800/50">
                <span>EXPLORE CAPABILITY</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Features;
