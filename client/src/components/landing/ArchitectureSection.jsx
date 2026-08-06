import { motion } from 'framer-motion';
import { FaReact, FaServer, FaDatabase, FaBrain, FaBroadcastTower, FaShieldAlt, FaArrowRight, FaArrowDown } from 'react-icons/fa';

const techNodes = [
  {
    step: "01",
    name: "React & Vite",
    layer: "Frontend UI Layer",
    desc: "Responsive, accessible single-page emergency command interface.",
    icon: FaReact,
    color: "text-cyan-400"
  },
  {
    step: "02",
    name: "Express.js Engine",
    layer: "API Gateway & Microservices",
    desc: "Low-latency REST & WebSocket server managing real-time data streams.",
    icon: FaServer,
    color: "text-emerald-400"
  },
  {
    step: "03",
    name: "MongoDB & PostGIS",
    layer: "Database & Spatial Index",
    desc: "Geo-spatial query database storing incident logs and unit tracks.",
    icon: FaDatabase,
    color: "text-green-500"
  },
  {
    step: "04",
    name: "Gemini AI Core",
    layer: "Neural Decision Engine",
    desc: "Multimodal damage evaluation and intelligent resource allocation.",
    icon: FaBrain,
    color: "text-orange-500"
  },
  {
    step: "05",
    name: "Notification Service",
    layer: "Broadcast Mesh",
    desc: "Sub-second cell warning pushes and SMS alert broadcasting.",
    icon: FaBroadcastTower,
    color: "text-amber-400"
  },
  {
    step: "06",
    name: "Emergency Departments",
    layer: "Authority Command",
    desc: "Dispatched direct to Police, Fire, Hospitals, and National Guard.",
    icon: FaShieldAlt,
    color: "text-blue-400"
  }
];

function ArchitectureSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs font-bold text-orange-500 uppercase tracking-wider block mb-2 font-mono">
          SYSTEM INTEGRATION PIPELINE
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-sans">
          Production Architecture &amp; Data Pipeline
        </h2>
        <p className="mt-3 text-slate-300 text-base">
          A resilient end-to-end data pipeline engineered for 99.99% uptime during natural disaster conditions.
        </p>
      </div>

      {/* Horizontal / Vertical Clean Architecture Flow */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        {techNodes.map((node, index) => {
          const Icon = node.icon;
          return (
            <div key={node.name} className="relative flex flex-col justify-between">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="rounded-2xl bg-slate-800/90 border border-slate-700 p-5 flex flex-col justify-between h-full hover:border-slate-600 transition-all shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2.5 rounded-xl bg-slate-900 border border-slate-700 ${node.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-400">{node.step}</span>
                  </div>

                  <h3 className="text-base font-bold text-white font-sans mb-0.5">
                    {node.name}
                  </h3>
                  <span className="text-[11px] font-bold text-orange-500 font-mono block mb-2">
                    {node.layer}
                  </span>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    {node.desc}
                  </p>
                </div>
              </motion.div>

              {/* Arrow Connector for Desktop */}
              {index < techNodes.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-orange-500">
                  <FaArrowRight className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default ArchitectureSection;
