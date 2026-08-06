import { motion } from 'framer-motion';
import { FaMapMarkedAlt, FaEye, FaBell, FaAmbulance, FaMobileAlt, FaDesktop, FaChartBar, FaBrain } from 'react-icons/fa';

const features = [
  {
    title: "Live Incident Tracking",
    desc: "Real-time GIS satellite and drone telemetry pinpoints active fire, flood, and accident zones.",
    icon: FaMapMarkedAlt
  },
  {
    title: "AI Damage Assessment",
    desc: "Computer vision algorithms analyze aerial imagery to grade structural vulnerability.",
    icon: FaEye
  },
  {
    title: "Emergency Alerts",
    desc: "Sub-second cell broadcast and satellite sirens push localized hazard warnings to citizens.",
    icon: FaBell
  },
  {
    title: "Resource Coordination",
    desc: "Automated routing directs fire trucks, ambulances, and police around active blockages.",
    icon: FaAmbulance
  },
  {
    title: "Citizen Reporting",
    desc: "Simple, fast mobile reporting allows citizens to submit SOS requests with geo-location.",
    icon: FaMobileAlt
  },
  {
    title: "Officer Dashboard",
    desc: "Role-based tactical interface for first responders and multi-agency command staff.",
    icon: FaDesktop
  },
  {
    title: "Analytics & Telemetry",
    desc: "Post-disaster analytics, time-series telemetry logs, and response efficiency benchmarks.",
    icon: FaChartBar
  },
  {
    title: "AI Decision Support",
    desc: "Predictive threat trajectory models suggest optimal resource deployment strategies.",
    icon: FaBrain
  }
];

function KeyFeaturesSection() {
  return (
    <section id="features" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs font-bold text-orange-500 uppercase tracking-wider block mb-2 font-mono">
          PLATFORM CAPABILITIES
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-sans">
          Key Features &amp; System Capabilities
        </h2>
        <p className="mt-3 text-slate-300 text-base">
          Built for reliability, speed, and cross-agency collaboration during critical disasters.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feat, index) => {
          const Icon = feat.icon;
          return (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="rounded-2xl bg-slate-800/90 border border-slate-700 p-6 flex flex-col justify-between hover:border-slate-600 transition-all shadow-sm"
            >
              <div>
                <div className="p-3.5 rounded-xl bg-slate-900 text-orange-500 border border-slate-700 w-fit mb-4">
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="text-lg font-bold text-white font-sans mb-2">
                  {feat.title}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

export default KeyFeaturesSection;
