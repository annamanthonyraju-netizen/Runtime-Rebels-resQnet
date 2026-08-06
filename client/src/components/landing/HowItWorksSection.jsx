import { motion } from 'framer-motion';
import { FaExclamationTriangle, FaBrain, FaChartLine, FaBell, FaAmbulance, FaDesktop, FaCheckCircle, FaChevronRight } from 'react-icons/fa';

const processSteps = [
  { step: '01', title: 'Report Emergency', desc: 'Citizen SOS or AI Sensor Alert', icon: FaExclamationTriangle },
  { step: '02', title: 'AI Analysis', desc: 'Computer Vision & Data Ingestion', icon: FaBrain },
  { step: '03', title: 'Severity Prediction', desc: 'Hazard Scoring & Risk Heatmaps', icon: FaChartLine },
  { step: '04', title: 'Authority Notification', desc: 'Instant Dispatch to Agencies', icon: FaBell },
  { step: '05', title: 'Resource Allocation', desc: 'Optimal Unit Rerouting', icon: FaAmbulance },
  { step: '06', title: 'Live Monitoring', desc: 'Real-Time GIS Tracking', icon: FaDesktop },
  { step: '07', title: 'Incident Closed', desc: 'Verified Safety & Audit Logs', icon: FaCheckCircle }
];

function HowItWorksSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs font-bold text-orange-500 uppercase tracking-wider block mb-2 font-mono">
          OPERATIONAL LIFECYCLE
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-sans">
          How ResQnet AI Works
        </h2>
        <p className="mt-3 text-slate-300 text-base">
          An automated, transparent end-to-end emergency workflow engineered for sub-minute response times.
        </p>
      </div>

      {/* Process Flow Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
        {processSteps.map((ps, index) => {
          const Icon = ps.icon;
          return (
            <motion.div
              key={ps.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="relative rounded-2xl bg-slate-800/90 border border-slate-700 p-5 flex flex-col justify-between text-left hover:border-slate-600 transition-all shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 rounded-xl bg-slate-900 text-orange-500 border border-slate-700">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-400">{ps.step}</span>
                </div>

                <h3 className="text-sm font-bold text-white font-sans leading-tight mb-1">
                  {ps.title}
                </h3>
                <p className="text-[11px] text-slate-400 leading-normal">
                  {ps.desc}
                </p>
              </div>

              {index < processSteps.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-slate-500">
                  <FaChevronRight className="w-3.5 h-3.5" />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

export default HowItWorksSection;
