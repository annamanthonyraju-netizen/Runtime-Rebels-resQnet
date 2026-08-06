import { motion } from 'framer-motion';
import SectionHeader from '../common/SectionHeader';
import { FaEye, FaChartLine, FaRobot, FaComments, FaArrowRight } from 'react-icons/fa';

const aiFeatures = [
  {
    title: "Deep Vision Damage Scoring",
    tagline: "YOLOv9 & Vision Transformer Neural Models",
    desc: "Analyzes aerial drone footage and multi-spectral satellite imagery to automatically grade structural collapses, roof damage, and bridge vulnerabilities on a 1-10 risk scale.",
    icon: FaEye,
    badge: "COMPUTER VISION v4",
    highlights: ["Sub-meter spatial resolution", "Thermal infrared overlays", "Automated structural classification"]
  },
  {
    title: "Disaster Trajectory Predictor",
    tagline: "Physics-Informed Neural Networks (PINN)",
    desc: "Simulates wildfire propagation, river flood surges, and storm trajectories up to 48 hours in advance using real-time atmospheric telemetry and terrain elevation maps.",
    icon: FaChartLine,
    badge: "PREDICTIVE SIMULATION",
    highlights: ["48-hour forward projection", "Physics-guided neural nets", "Wind & flood surge modeling"]
  },
  {
    title: "Autonomous Drone Swarm Navigation",
    tagline: "Multi-Agent Reinforcement Learning",
    desc: "Coordinates fleets of reconnaissance drones to map blackout areas, deliver emergency medical kits, and establish mesh communication relays over disaster zones.",
    icon: FaRobot,
    badge: "SWARM ROBOTICS",
    highlights: ["Self-healing drone mesh", "Autonomous payload delivery", "GPS-denied navigation"]
  },
  {
    title: "NLP Emergency SOS Triage Bot",
    tagline: "LLM Fine-Tuned for Crisis Response",
    desc: "Understands emergency text/voice messages in 40+ languages, extracts geo-coordinates, assesses victim medical urgency, and auto-populates dispatch queues.",
    icon: FaComments,
    badge: "NATURAL NLP & SPEECH",
    highlights: ["40+ languages supported", "Voice-to-GPS extraction", "Automated Triage Level 1-4"]
  }
];

function AIFeaturesSection() {
  return (
    <section id="ai-features" className="py-24 relative z-10 w-full max-w-[1700px] mx-auto px-6 sm:px-12 lg:px-16 bg-slate-950">
      
      <SectionHeader
        badge="NEURAL CAPABILITIES"
        title="Advanced Artificial Intelligence"
        highlightTitle="Feature Suite"
        subtitle="Custom neural architectures engineered specifically for high-stakes emergency incident command."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {aiFeatures.map((feat, index) => {
          const Icon = feat.icon;
          return (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative rounded-3xl bg-slate-900/60 backdrop-blur-2xl border border-orange-500/30 p-8 sm:p-10 transition-all duration-300 hover:border-orange-400 hover:shadow-[0_0_40px_rgba(255,107,0,0.25)] flex flex-col justify-between overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-44 h-44 bg-orange-500/10 rounded-full blur-3xl group-hover:bg-orange-500/20 transition-colors pointer-events-none"></div>

              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-orange-400 group-hover:scale-110 transition-transform">
                    <Icon className="w-8 h-8" />
                  </div>
                  <span className="px-3 py-1 text-xs font-mono font-bold text-orange-400 bg-slate-950 border border-orange-500/30 rounded-lg">
                    {feat.badge}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white font-mono group-hover:text-orange-300 transition-colors">
                  {feat.title}
                </h3>
                <p className="text-xs font-mono text-orange-400 font-semibold mt-1 mb-4">
                  {feat.tagline}
                </p>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  {feat.desc}
                </p>

                <div className="pt-4 border-t border-slate-800 space-y-2 font-mono text-xs text-slate-300">
                  {feat.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-orange-400 font-bold">
                <span>AI MODULE SPECIFICATION</span>
                <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

export default AIFeaturesSection;
