import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaExclamationTriangle, FaMapMarkedAlt, FaPhoneAlt, FaDesktop, FaArrowRight } from 'react-icons/fa';

const actions = [
  {
    title: "Report Emergency",
    desc: "Submit an urgent emergency SOS report for immediate AI triage and dispatch.",
    icon: FaExclamationTriangle,
    link: "/dashboard/citizen/report",
    buttonText: "Report SOS Now",
    color: "bg-red-500/10 border-red-500/30 text-red-400 hover:border-red-500",
    badge: "URGENT SOS"
  },
  {
    title: "Live Incidents",
    desc: "Track real-time active fires, floods, and structural emergencies in your city.",
    icon: FaMapMarkedAlt,
    link: "/map",
    buttonText: "View Live Map",
    color: "bg-amber-500/10 border-amber-500/30 text-amber-400 hover:border-amber-500",
    badge: "REAL-TIME SCAN"
  },
  {
    title: "Emergency Contacts",
    desc: "Direct hotline access to National Disaster Authorities, Police, Fire, and Ambulance.",
    icon: FaPhoneAlt,
    link: "#contact",
    buttonText: "View Contacts",
    color: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:border-emerald-500",
    badge: "24/7 HOTLINES"
  },
  {
    title: "Open Dashboard",
    desc: "Access the command console to monitor unit dispatch status and AI telemetry.",
    icon: FaDesktop,
    link: "/dashboard",
    buttonText: "Launch Command",
    color: "bg-orange-500/10 border-orange-500/30 text-orange-400 hover:border-orange-500",
    badge: "COMMAND CENTER"
  }
];

function QuickActions() {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-800">
        <h2 className="text-xl sm:text-2xl font-extrabold text-white font-sans">
          Quick Actions &amp; Emergency Navigation
        </h2>
        <span className="text-xs text-slate-400 font-medium hidden sm:inline-block">
          Select an action to proceed
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {actions.map((act, index) => {
          const Icon = act.icon;
          return (
            <motion.div
              key={act.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`rounded-2xl bg-slate-800/90 border p-6 flex flex-col justify-between transition-all shadow-sm hover:shadow-md hover:-translate-y-1 ${act.color}`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-700">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300">
                    {act.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 font-sans">
                  {act.title}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  {act.desc}
                </p>
              </div>

              <Link
                to={act.link.startsWith('#') ? '#' : act.link}
                onClick={() => {
                  if (act.link.startsWith('#')) {
                    const el = document.querySelector(act.link);
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-950 border border-slate-700 font-bold text-xs sm:text-sm text-white flex items-center justify-between transition-all"
              >
                <span>{act.buttonText}</span>
                <FaArrowRight className="w-3.5 h-3.5 text-orange-500" />
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

export default QuickActions;
