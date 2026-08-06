import { motion } from 'framer-motion';
import SectionHeader from '../common/SectionHeader';
import { FaReact, FaPython, FaNodeJs, FaDatabase, FaDocker, FaAws, FaTerminal } from 'react-icons/fa';

const techCategories = [
  {
    category: "Frontend Stack",
    icon: FaReact,
    badge: "CLIENT LAYER",
    items: [
      { name: "React 19 & Vite", role: "High-Performance SPA UI Framework" },
      { name: "Tailwind CSS v4", role: "Custom Glassmorphism & Cyber Theme" },
      { name: "Framer Motion", role: "Hardware-Accelerated Fluid Animations" },
      { name: "React Icons / Lucide", role: "Modern High-Tech Vector Icons" }
    ]
  },
  {
    category: "AI / ML Core Engine",
    icon: FaPython,
    badge: "NEURAL INFERENCE",
    items: [
      { name: "PyTorch & ONNX", role: "Deep Vision & Trajectory Inference" },
      { name: "YOLOv9 & ViT", role: "Sub-Second Structural Damage Scoring" },
      { name: "LangChain & Llama 3", role: "NLP Crisis SOS Message Triage Bot" },
      { name: "PINN Framework", role: "Physics-Informed Flood & Wildfire Sim" }
    ]
  },
  {
    category: "GIS & Spatial Intelligence",
    icon: FaTerminal,
    badge: "GEOSPATIAL LAYER",
    items: [
      { name: "Mapbox GL JS v3", role: "3D Terrain & Dynamic Vector Tile Maps" },
      { name: "PostGIS Spatial Index", role: "R-Tree Spatial Indexing & Queries" },
      { name: "Turf.js & GeoJSON", role: "Client-Side Polygon Geo-Fencing" },
      { name: "GDAL / RasterIO", role: "Satellite GeoTIFF Imagery Processing" }
    ]
  },
  {
    category: "Backend & Cloud Mesh",
    icon: FaNodeJs,
    badge: "DISTRIBUTED BACKEND",
    items: [
      { name: "Node.js & FastAPI", role: "Hybrid Microservices Architecture" },
      { name: "Redis & WebSockets", role: "Sub-10ms Live Incident Telemetry Sync" },
      { name: "Docker & Kubernetes", role: "Fault-Tolerant Container Mesh" },
      { name: "AWS ECS & S3", role: "Global Edge Infrastructure Deployment" }
    ]
  }
];

function TechStackSection() {
  return (
    <section id="tech-stack" className="py-24 relative z-10 w-full max-w-[1700px] mx-auto px-6 sm:px-12 lg:px-16 bg-slate-950">
      
      <SectionHeader
        badge="ARCHITECTURE STACK"
        title="Modern Production"
        highlightTitle="Technology Stack"
        subtitle="Built with battle-tested open-source libraries and enterprise cloud infrastructure."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {techCategories.map((cat, index) => {
          const Icon = cat.icon;
          return (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative rounded-3xl bg-slate-900/60 backdrop-blur-2xl border border-orange-500/25 p-8 transition-all duration-300 hover:border-orange-400 hover:shadow-[0_0_35px_rgba(255,107,0,0.2)]"
            >
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-orange-400">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white font-mono">
                    {cat.category}
                  </h3>
                </div>
                <span className="px-3 py-1 text-xs font-mono font-bold text-orange-400 bg-slate-950 border border-orange-500/30 rounded-lg">
                  {cat.badge}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {cat.items.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80">
                    <span className="block text-sm font-bold font-mono text-white group-hover:text-orange-300 transition-colors">
                      {item.name}
                    </span>
                    <span className="block text-xs font-mono text-slate-400 mt-1">
                      {item.role}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

export default TechStackSection;
