import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaExclamationTriangle, FaChartLine, FaUser, FaRobot, FaShieldAlt, FaFireExtinguisher, FaAmbulance, FaHospital, FaLandmark, FaArrowRight, FaArrowDown } from 'react-icons/fa';

function HeroSection() {
  return (
    <section id="hero" className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Headline & Action Buttons (7 Cols) */}
        <div className="lg:col-span-7 space-y-6 text-left">
          
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-xs font-semibold text-orange-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Real-Time Emergency Command System</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight font-sans leading-tight">
            ResQnet <span className="text-orange-500">AI</span>
          </h1>

          {/* Sub Heading */}
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-200 font-sans">
            Intelligent Disaster Response Platform
          </h2>

          {/* Description */}
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
            Helping citizens, responders, and authorities coordinate emergencies using real-time intelligence and AI-assisted decision making.
          </p>

          {/* CTA Buttons */}
          <div className="pt-4 space-y-3">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                to="/sos"
                className="px-6 py-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-base tracking-wide transition-all flex items-center justify-center gap-3 shadow-lg shadow-red-950/40 hover:scale-[1.02]"
              >
                <FaExclamationTriangle className="w-5 h-5 text-white animate-pulse" />
                <span>🚨 SUPER EMERGENCY SOS</span>
              </Link>

              <Link
                to="/dashboard/citizen/report"
                className="px-6 py-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-slate-950 font-bold text-base transition-all flex items-center justify-center gap-3 shadow-md"
              >
                <span>Report Incident</span>
              </Link>

              <Link
                to="/dashboard"
                className="px-6 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-base border border-slate-700 transition-all flex items-center justify-center gap-3"
              >
                <FaChartLine className="w-5 h-5 text-orange-500" />
                <span>View Dashboard</span>
              </Link>
            </div>

            <p className="text-xs text-red-400 font-mono font-semibold pt-1">
              "Immediate danger? Report an emergency without logging in."
            </p>
          </div>

          {/* Emergency Alert Banner */}
          <div className="pt-4 flex items-center gap-3 text-xs text-slate-400 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
            <span>Active Command Hotline: <strong>1-800-RESQ-NET</strong> (24/7 Available)</span>
          </div>
        </div>

        {/* Right Column: Clean Vector Workflow Illustration (5 Cols) */}
        <div className="lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl bg-slate-800/90 border border-slate-700 p-6 shadow-xl space-y-6"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-700">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Emergency Coordination Flow
              </span>
              <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded border border-emerald-800">
                ACTIVE PIPELINE
              </span>
            </div>

            {/* Step 1: Citizen */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-orange-500/20 text-orange-500 border border-orange-500/30">
                  <FaUser className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-sm font-bold text-white block">Citizen</span>
                  <span className="text-xs text-slate-400">Reports Incident / Requests SOS</span>
                </div>
              </div>
              <span className="text-xs font-mono font-semibold text-slate-400">Step 1</span>
            </div>

            {/* Flow Arrow */}
            <div className="flex justify-center text-orange-500">
              <FaArrowDown className="w-4 h-4 animate-bounce" />
            </div>

            {/* Step 2: AI Command Center */}
            <div className="p-4 rounded-xl bg-slate-900 border border-orange-500/40 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-orange-500 text-slate-950">
                  <FaRobot className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-sm font-bold text-white block">AI Command Center</span>
                  <span className="text-xs text-orange-400 font-semibold">Processes &amp; Scores Priority</span>
                </div>
              </div>
              <span className="text-xs font-mono font-semibold text-orange-400">Step 2</span>
            </div>

            {/* Flow Arrow */}
            <div className="flex justify-center text-orange-500">
              <FaArrowDown className="w-4 h-4 animate-bounce" />
            </div>

            {/* Step 3: Emergency Responder Network */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-700 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs font-bold text-slate-300">
                <span>Dispatched Authorities</span>
                <span className="text-xs font-mono text-emerald-400">Step 3</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-semibold text-slate-300">
                <div className="p-2 rounded-lg bg-slate-950 flex items-center gap-2 border border-slate-800">
                  <FaShieldAlt className="text-blue-400 w-3.5 h-3.5" />
                  <span>Police</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-950 flex items-center gap-2 border border-slate-800">
                  <FaFireExtinguisher className="text-red-400 w-3.5 h-3.5" />
                  <span>Fire</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-950 flex items-center gap-2 border border-slate-800">
                  <FaAmbulance className="text-amber-400 w-3.5 h-3.5" />
                  <span>Ambulance</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-950 flex items-center gap-2 border border-slate-800">
                  <FaHospital className="text-emerald-400 w-3.5 h-3.5" />
                  <span>Hospitals</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-950 flex items-center gap-2 border border-slate-800 col-span-2 sm:col-span-2">
                  <FaLandmark className="text-cyan-400 w-3.5 h-3.5" />
                  <span>Government Authorities</span>
                </div>
              </div>
            </div>

          </motion.div>
        </div>

      </div>
    </section>
  );
}

export default HeroSection;
