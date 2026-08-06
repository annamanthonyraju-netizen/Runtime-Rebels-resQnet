import { motion } from 'framer-motion';
import SectionHeader from '../common/SectionHeader';
import { FaDatabase, FaBrain, FaDesktop, FaBroadcastTower, FaArrowDown, FaNetworkWired, FaServer } from 'react-icons/fa';

const layers = [
  {
    step: "01",
    layerName: "Data Ingestion & Sensing Layer",
    icon: FaDatabase,
    tech: "Satellite SAR / Drone Streams / IoT Sensors / Mobile SOS",
    details: [
      "Multi-spectral orbital radar feeds (Sentinel-2, Landsat)",
      "Autonomous aerial drone telemetry & thermal imagery",
      "IoT water level, seismic, and meteorological sensors",
      "Encrypted mobile app citizen emergency reports"
    ],
    color: "border-orange-500/40 text-orange-400"
  },
  {
    step: "02",
    layerName: "Neural AI Processing Engine",
    icon: FaBrain,
    tech: "PyTorch / Vision Transformers / YOLOv9 / NLP Chatbot",
    details: [
      "Real-time object detection & structural damage scoring",
      "Predictive flood surge & wildfire spread simulation",
      "Multi-modal NLP triage of emergency text/voice calls",
      "Spatial risk heatmap generation (GeoJSON vector tiles)"
    ],
    color: "border-amber-500/40 text-amber-400"
  },
  {
    step: "03",
    layerName: "Unified Command & Control Mesh",
    icon: FaDesktop,
    tech: "React / Mapbox GL / WebSockets / Redis / Node.js",
    details: [
      "Real-time tactical GIS interactive emergency dashboard",
      "Dynamic A* & Dijkstra hazard-aware unit rerouting",
      "Multi-agency triage queue (Police, Fire, Medical, Military)",
      "Zero-trust RBAC role permissions & audit logging"
    ],
    color: "border-cyan-500/40 text-cyan-400"
  },
  {
    step: "04",
    layerName: "Broadcast & Dispatch Layer",
    icon: FaBroadcastTower,
    tech: "Cell Broadcast / Satellite Overrides / Multi-Lingual SMS",
    details: [
      "Sub-second localized cellular emergency warning push",
      "Automated unit dispatch instructions to responder tablets",
      "Public siren network & satellite emergency overrides",
      "Multi-lingual emergency evacuation instructions"
    ],
    color: "border-emerald-500/40 text-emerald-400"
  }
];

function SystemArchitecture() {
  return (
    <section id="architecture" className="py-24 relative z-10 w-full max-w-[1700px] mx-auto px-6 sm:px-12 lg:px-16 bg-slate-950">
      
      <SectionHeader
        badge="TECHNICAL SPECIFICATION"
        title="High-Level"
        highlightTitle="System Architecture"
        subtitle="A modular, distributed architecture engineered for high availability, sub-second latency, and fault-tolerant emergency operations."
      />

      <div className="space-y-6 max-w-6xl mx-auto">
        {layers.map((layer, index) => {
          const Icon = layer.icon;
          return (
            <div key={layer.layerName} className="flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`w-full rounded-3xl bg-slate-900/80 backdrop-blur-2xl border ${layer.color} p-8 sm:p-10 shadow-[0_0_40px_rgba(0,0,0,0.8)] relative overflow-hidden`}
              >
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                  
                  {/* Left Layer Header */}
                  <div className="flex items-center gap-5">
                    <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-orange-400">
                      <Icon className="w-8 h-8" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono font-bold text-orange-400 bg-orange-950/60 px-2.5 py-1 rounded border border-orange-500/30">
                          LAYER {layer.step}
                        </span>
                        <span className="text-xs font-mono text-slate-400">{layer.tech}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-white font-mono mt-1">
                        {layer.layerName}
                      </h3>
                    </div>
                  </div>

                  {/* Right Details Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full lg:w-3/5 font-mono text-xs sm:text-sm text-slate-300">
                    {layer.details.map((detail, idx) => (
                      <div key={idx} className="flex items-center gap-2 bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                        <span className="w-2 h-2 rounded-full bg-orange-400"></span>
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>

                </div>
              </motion.div>

              {/* Connecting Flow Arrow */}
              {index < layers.length - 1 && (
                <div className="my-3 flex items-center justify-center">
                  <div className="p-2.5 rounded-full bg-slate-900 border border-orange-500/30 text-orange-400 animate-bounce">
                    <FaArrowDown className="w-4 h-4" />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default SystemArchitecture;
