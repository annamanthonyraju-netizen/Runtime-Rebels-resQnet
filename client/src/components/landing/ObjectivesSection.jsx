import { motion } from 'framer-motion';
import SectionHeader from '../common/SectionHeader';
import { FaBullseye, FaBolt, FaShieldAlt, FaHeart, FaCompressAlt } from 'react-icons/fa';

const objectives = [
  {
    target: "85% Delay Reduction",
    title: "Sub-Minute Incident Triage",
    desc: "Compress disaster detection to dispatch cycle from 45+ minutes down to under 60 seconds through automated AI sensor aggregation.",
    icon: FaBolt,
    accent: "text-amber-400"
  },
  {
    target: "99.4% Neural Precision",
    title: "Automated Hazard Scoring",
    desc: "Deploy deep computer vision models on drone and satellite feeds to classify structural vulnerability with near-perfect accuracy.",
    icon: FaBullseye,
    accent: "text-orange-400"
  },
  {
    target: "Zero Gridlocks",
    title: "Hazard-Aware Rerouting",
    desc: "Ensure 100% of emergency response units bypass active hazards, blocked roads, and flooded bridges via real-time telemetry routing.",
    icon: FaCompressAlt,
    accent: "text-emerald-400"
  },
  {
    target: "100% Interoperability",
    title: "Unified Command Mesh",
    desc: "Break down agency silos by providing a single source of truth accessible simultaneously by Police, Fire, Medical, and Military commands.",
    icon: FaShieldAlt,
    accent: "text-cyan-400"
  }
];

function ObjectivesSection() {
  return (
    <section id="objectives" className="py-24 relative z-10 w-full max-w-[1700px] mx-auto px-6 sm:px-12 lg:px-16 bg-slate-950">
      
      <SectionHeader
        badge="CORE MISSION & OBJECTIVES"
        title="Engineering Specifications &"
        highlightTitle="Strategic Benchmarks"
        subtitle="Quantifiable performance metrics designed to redefine emergency disaster management standards."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {objectives.map((obj, index) => {
          const Icon = obj.icon;
          return (
            <motion.div
              key={obj.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative rounded-3xl bg-slate-900/60 backdrop-blur-2xl border border-orange-500/25 p-8 transition-all duration-300 hover:border-orange-400 hover:-translate-y-2 hover:shadow-[0_0_35px_rgba(255,107,0,0.2)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className={`p-4 rounded-2xl bg-slate-950/90 border border-slate-800 ${obj.accent} group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <span className="px-3 py-1 text-xs font-mono font-bold text-slate-300 bg-slate-950/90 border border-slate-800 rounded-lg">
                    TARGET #{index + 1}
                  </span>
                </div>

                <div className="text-3xl font-extrabold font-mono text-white mb-2 group-hover:text-orange-300 transition-colors">
                  {obj.target}
                </div>
                <h3 className="text-lg font-bold text-orange-400 font-mono mb-3">
                  {obj.title}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {obj.desc}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-800 text-xs font-mono text-slate-400 flex items-center justify-between">
                <span>BENCHMARK VERIFIED</span>
                <FaHeart className="w-3.5 h-3.5 text-red-500" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

export default ObjectivesSection;
