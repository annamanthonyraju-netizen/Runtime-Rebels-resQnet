import { motion } from 'framer-motion';
import SectionHeader from '../common/SectionHeader';
import { FaRocket, FaAtom, FaSatelliteDish, FaGlobe } from 'react-icons/fa';

const futureItems = [
  {
    title: "Autonomous Recon Drone Swarms",
    timeline: "Q1 2027",
    desc: "Self-deploying drone hives stationed at emergency hubs that launch automatically upon satellite alert triggers to perform zero-human aerial inspection.",
    icon: FaRocket,
    status: "R&D PHASE"
  },
  {
    title: "Quantum Risk Trajectory Modeling",
    timeline: "Q3 2027",
    desc: "Integration with quantum computing algorithms to simulate complex fluid dynamics of multi-city storm surges in milliseconds.",
    icon: FaAtom,
    status: "PROTOTYPE"
  },
  {
    title: "Direct-to-Cell Satellite SOS Mesh",
    timeline: "Q4 2027",
    desc: "Leverages low-earth orbit satellite direct-to-cell technology so citizens can broadcast emergency GPS signals with zero cellular tower coverage.",
    icon: FaSatelliteDish,
    status: "SPECIFICATION"
  },
  {
    title: "Global UN OCHA & NGO Federation",
    timeline: "Q2 2028",
    desc: "Global multi-government data federation enabling instant cross-border disaster relief dispatch between international red cross and UN forces.",
    icon: FaGlobe,
    status: "PARTNERSHIP"
  }
];

function FutureScopeSection() {
  return (
    <section id="future-scope" className="py-24 relative z-10 w-full max-w-[1700px] mx-auto px-6 sm:px-12 lg:px-16 bg-slate-950">
      
      <SectionHeader
        badge="INNOVATION ROADMAP"
        title="Future Scope &"
        highlightTitle="Next-Gen AI Roadmap"
        subtitle="Pioneering future technologies to continuously expand global disaster resilience capabilities."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {futureItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative rounded-3xl bg-slate-900/60 backdrop-blur-2xl border border-orange-500/25 p-8 transition-all duration-300 hover:border-orange-400 hover:-translate-y-2 hover:shadow-[0_0_35px_rgba(255,107,0,0.2)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-orange-400 group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7" />
                  </div>
                  <span className="px-3 py-1 text-xs font-mono font-bold text-orange-400 bg-slate-950 border border-orange-500/30 rounded-lg">
                    {item.timeline}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white font-mono mb-3 group-hover:text-orange-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-800 text-xs font-mono text-slate-400 flex items-center justify-between">
                <span>STATUS: {item.status}</span>
                <span className="w-2 h-2 rounded-full bg-orange-400"></span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

export default FutureScopeSection;
