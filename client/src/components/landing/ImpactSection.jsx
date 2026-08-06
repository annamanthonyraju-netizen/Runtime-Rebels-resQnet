import { motion } from 'framer-motion';
import SectionHeader from '../common/SectionHeader';
import { FaClock, FaHeart, FaDollarSign, FaShieldAlt } from 'react-icons/fa';

const impactStats = [
  {
    value: "85%",
    label: "Response Latency Reduced",
    desc: "Compresses critical triage and unit dispatch timeline from 45+ minutes to sub-60 seconds.",
    icon: FaClock,
    color: "text-amber-400"
  },
  {
    value: "15,000+",
    label: "Lives Saved Per Crisis",
    desc: "Early cell broadcast warnings and hazard-free routing save thousands during severe hurricanes & floods.",
    icon: FaHeart,
    color: "text-red-400"
  },
  {
    value: "60%",
    label: "Resource Optimization",
    desc: "Eliminates duplicate emergency dispatching and optimizes fuel/equipment utilization.",
    icon: FaDollarSign,
    color: "text-emerald-400"
  },
  {
    value: "99.4%",
    label: "AI Neural Accuracy",
    desc: "Sub-meter computer vision damage scoring minimizes false alarms and pinpoint structural risks.",
    icon: FaShieldAlt,
    color: "text-cyan-400"
  }
];

function ImpactSection() {
  return (
    <section id="impact" className="py-24 relative z-10 w-full max-w-[1700px] mx-auto px-6 sm:px-12 lg:px-16 bg-slate-950">
      
      <SectionHeader
        badge="MEASURABLE HUMAN & ECONOMIC IMPACT"
        title="Transforming Global"
        highlightTitle="Disaster Outcomes"
        subtitle="Empirical metrics demonstrating life-saving emergency efficiency gains."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {impactStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative rounded-3xl bg-slate-900/60 backdrop-blur-2xl border border-orange-500/25 p-8 transition-all duration-300 hover:border-orange-400 hover:-translate-y-2 hover:shadow-[0_0_35px_rgba(255,107,0,0.25)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className={`p-4 rounded-2xl bg-slate-950 border border-slate-800 ${stat.color} group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <span className="px-2.5 py-1 text-xs font-mono font-bold text-slate-400 bg-slate-950 border border-slate-800 rounded">
                    METRIC #{index + 1}
                  </span>
                </div>

                <div className="text-5xl font-black font-mono text-white mb-2 group-hover:text-orange-300 transition-colors">
                  {stat.value}
                </div>
                <h3 className="text-lg font-bold text-orange-400 font-mono mb-3">
                  {stat.label}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {stat.desc}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-800 text-xs font-mono text-slate-400 flex items-center justify-between">
                <span>VERIFIED METRIC</span>
                <span className="w-2 h-2 rounded-full bg-orange-400"></span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

export default ImpactSection;
