import { motion } from 'framer-motion';
import SectionHeader from '../common/SectionHeader';
import { FaClock, FaNetworkWired, FaEyeSlash, FaExclamationTriangle, FaUserAltSlash, FaAmbulance } from 'react-icons/fa';

const problems = [
  {
    icon: FaClock,
    title: "Critical Response Latency",
    description: "Traditional emergency command centers take 45–90 minutes to verify disaster reports and dispatch first responder units.",
    stat: "90 min",
    statLabel: "Average Delay",
    color: "from-red-500 to-orange-500"
  },
  {
    icon: FaNetworkWired,
    title: "Inter-Agency Information Silos",
    description: "Police, fire departments, hospitals, and NGOs operate on fragmented communications with zero real-time data sharing.",
    stat: "78%",
    statLabel: "Data Fragmentation",
    color: "from-orange-500 to-amber-500"
  },
  {
    icon: FaEyeSlash,
    title: "Blind Spot Hazard Assessment",
    description: "Damage evaluation relies on manual ground surveys, leaving emergency teams blind to structural collapses and secondary floods.",
    stat: "60%",
    statLabel: "Unmapped Zones",
    color: "from-amber-500 to-red-500"
  },
  {
    icon: FaUserAltSlash,
    title: "Preventable High Casualties",
    description: "Delayed emergency warning broadcasts leave millions of citizens trapped in high-risk evacuation corridors.",
    stat: "4.2x",
    statLabel: "Higher Risk",
    color: "from-red-600 to-orange-600"
  }
];

function ProblemStatement() {
  return (
    <section id="problem" className="py-24 relative z-10 w-full max-w-[1700px] mx-auto px-6 sm:px-12 lg:px-16 bg-slate-950">
      
      <SectionHeader
        badge="CRISIS & BOTTLENECK ANALYSIS"
        title="The Fatal Flaws of"
        highlightTitle="Traditional Disaster Response"
        subtitle="In major natural disasters, outdated manual workflows create fatal delays, fragmented communications, and misallocated rescue teams."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {problems.map((prob, index) => {
          const Icon = prob.icon;
          return (
            <motion.div
              key={prob.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative rounded-3xl bg-slate-900/60 backdrop-blur-2xl border border-red-500/20 p-8 transition-all duration-300 hover:border-orange-500/50 hover:-translate-y-2 hover:shadow-[0_0_35px_rgba(255,107,0,0.2)] flex flex-col justify-between overflow-hidden"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${prob.color} opacity-10 group-hover:opacity-25 blur-2xl transition-opacity duration-300 pointer-events-none`}></div>

              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 text-orange-400 group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7" />
                  </div>
                  <span className="text-2xl font-black font-mono text-red-400">0{index + 1}</span>
                </div>

                <h3 className="text-xl font-bold text-white font-mono mb-3 group-hover:text-orange-300 transition-colors">
                  {prob.title}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {prob.description}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between font-mono">
                <div>
                  <span className="text-2xl font-black text-red-400">{prob.stat}</span>
                  <span className="block text-[11px] text-slate-400 uppercase tracking-wider">{prob.statLabel}</span>
                </div>
                <FaExclamationTriangle className="w-5 h-5 text-red-500/60" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

export default ProblemStatement;
