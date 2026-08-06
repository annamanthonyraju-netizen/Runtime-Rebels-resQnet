import { motion } from 'framer-motion';
import SectionHeader from '../common/SectionHeader';
import { FaLayerGroup, FaMapMarked, FaWifi, FaGlobeAmericas } from 'react-icons/fa';

const platformFeatures = [
  {
    title: "Multi-Tenant Command Portal",
    desc: "Dedicated role-based security access for Police, Fire Services, National Guard, Hospitals, and International Relief Agencies.",
    icon: FaLayerGroup,
    badge: "ENTERPRISE SECURITY"
  },
  {
    title: "Interactive 3D GIS Heatmaps",
    desc: "Hardware-accelerated WebGL map renders 100,000+ spatial data points, live GPS responder tracks, and evacuation vector lines simultaneously.",
    icon: FaMapMarked,
    badge: "MAPBOX GL & 3D TERRAIN"
  },
  {
    title: "Offline P2P Mesh Sync",
    desc: "When cell towers collapse, responder tablets switch to Wi-Fi Direct and LoRa P2P mesh network to sync incident data seamlessly.",
    icon: FaWifi,
    badge: "ZERO INFRASTRUCTURE DEPENDENCY"
  },
  {
    title: "Multi-Channel Broadcast Engine",
    desc: "One-click broadcast pushes localized emergency warnings via Emergency Cell Broadcasts, WhatsApp, SMS, Web Push, and Sirens.",
    icon: FaGlobeAmericas,
    badge: "MASS NOTIFICATION"
  }
];

function PlatformFeaturesSection() {
  return (
    <section id="platform-features" className="py-24 relative z-10 w-full max-w-[1700px] mx-auto px-6 sm:px-12 lg:px-16 bg-slate-950">
      
      <SectionHeader
        badge="PLATFORM CAPABILITIES"
        title="Enterprise-Grade"
        highlightTitle="Platform Features"
        subtitle="Designed for high reliability, multi-agency collaboration, and zero-downtime operation in extreme conditions."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {platformFeatures.map((pf, index) => {
          const Icon = pf.icon;
          return (
            <motion.div
              key={pf.title}
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
                  <span className="px-2.5 py-1 text-[10px] font-mono font-bold text-orange-400 bg-slate-950 border border-orange-500/30 rounded">
                    {pf.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white font-mono mb-3 group-hover:text-orange-300 transition-colors">
                  {pf.title}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {pf.desc}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-800 text-xs font-mono text-slate-400 flex items-center justify-between">
                <span>ENTERPRISE GRADE</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

export default PlatformFeaturesSection;
