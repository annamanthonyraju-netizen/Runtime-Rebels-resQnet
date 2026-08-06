import { motion } from 'framer-motion';
import SectionHeader from '../common/SectionHeader';
import { FaShieldAlt, FaRobot, FaCheckCircle, FaSatellite, FaRoute, FaBell } from 'react-icons/fa';

const solutions = [
  {
    icon: FaRobot,
    title: "Autonomous AI Incident Mesh",
    description: "Self-healing neural network command engine that ingests IoT sensors, citizen reports, and satellite imagery to auto-triage disaster events.",
    tag: "NEURAL ENGINE"
  },
  {
    icon: FaSatellite,
    title: "Real-Time GIS & Drone Telemetry",
    description: "Sub-meter geo-fencing overlays live thermal scans, drone cameras, and satellite radar feeds onto an interactive 3D tactical map.",
    tag: "SUB-METER ACCURACY"
  },
  {
    icon: FaRoute,
    title: "Dynamic Resource Rerouting",
    description: "AI pathfinding algorithms continuously compute optimal emergency routes around flooded bridges, fires, and structural collapses.",
    tag: "DYNAMIC ROUTING"
  },
  {
    icon: FaBell,
    title: "Zero-Latency Multi-Channel Alerts",
    description: "Instant multi-channel push broadcasting warning messages across cellular networks, satellite radios, and public warning sirens.",
    tag: "SUB-SECOND PUSH"
  }
];

function SolutionSection() {
  return (
    <section id="solution" className="py-24 relative z-10 w-full max-w-[1700px] mx-auto px-6 sm:px-12 lg:px-16 bg-slate-950">
      
      <SectionHeader
        badge="THE PARADIGM SHIFT"
        title="Introducing the"
        highlightTitle="ResQnet AI Ecosystem"
        subtitle="An end-to-end autonomous command intelligence system replacing manual delay with sub-second neural decision making."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {solutions.map((sol, index) => {
          const Icon = sol.icon;
          return (
            <motion.div
              key={sol.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative rounded-3xl bg-slate-900/60 backdrop-blur-2xl border border-orange-500/30 p-8 sm:p-10 transition-all duration-300 hover:border-orange-400 hover:shadow-[0_0_40px_rgba(255,107,0,0.25)] flex flex-col justify-between overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-44 h-44 bg-orange-500/10 rounded-full blur-3xl group-hover:bg-orange-500/20 transition-colors pointer-events-none"></div>

              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="p-4 rounded-2xl bg-orange-500/15 border border-orange-500/30 text-orange-400 group-hover:scale-110 transition-transform">
                    <Icon className="w-8 h-8" />
                  </div>
                  <span className="px-3 py-1 text-xs font-mono font-bold text-orange-400 bg-slate-950/90 border border-orange-500/30 rounded-lg">
                    {sol.tag}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white font-mono mb-3 group-hover:text-orange-300 transition-colors">
                  {sol.title}
                </h3>
                <p className="text-slate-300 text-base leading-relaxed">
                  {sol.description}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between font-mono text-xs text-orange-400 font-bold">
                <span className="flex items-center gap-2">
                  <FaCheckCircle className="w-4 h-4 text-emerald-400" />
                  PRODUCTION READY SPECIFICATION
                </span>
                <span>RESQNET CORE</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

export default SolutionSection;
