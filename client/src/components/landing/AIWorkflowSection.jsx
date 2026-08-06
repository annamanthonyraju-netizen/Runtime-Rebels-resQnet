import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaCheckCircle, FaSearch, FaEye, FaChartLine, FaBoxes, 
  FaBell, FaDesktop, FaFileAlt, FaPlay, FaCheck, FaSpinner, FaChevronDown 
} from 'react-icons/fa';

const AGENTS = [
  {
    step: 1,
    name: "Incident Validation Agent",
    icon: FaSearch,
    color: "text-cyan-400 border-cyan-500/40 bg-cyan-950/40",
    desc: "Validates report authenticity, normalizes GPS location, and checks duplicate databases.",
    sampleOutput: "✓ Verified. Confidence 98%. Location: Hyderabad Central Sector (17.445, 78.377)."
  },
  {
    step: 2,
    name: "Image Analysis Agent",
    icon: FaEye,
    color: "text-blue-400 border-blue-500/40 bg-blue-950/40",
    desc: "Evaluates aerial & drone imagery for flame intensity, flood submersion, and concrete stress.",
    sampleOutput: "✓ Structural hazard detected: Grade 4 Thermal Flame Intensity & Gas Pipe Proximity."
  },
  {
    step: 3,
    name: "Severity Prediction Agent",
    icon: FaChartLine,
    color: "text-orange-400 border-orange-500/40 bg-orange-950/40",
    desc: "Calculates real-time Urgency Index (1.0 - 10.0) based on weather and population density.",
    sampleOutput: "✓ Urgency Index Calculated: 8.7 / 10.0 (HIGH PRIORITY EMERGENCY)."
  },
  {
    step: 4,
    name: "Resource Planning Agent",
    icon: FaBoxes,
    color: "text-amber-400 border-amber-500/40 bg-amber-950/40",
    desc: "Auto-assigns rescue units (Fire Tenders, Boats, Ambulances) and computes optimal non-blocked routes.",
    sampleOutput: "✓ Allocated: Fire Squad #4 (ETA 4m) & Rescue Boat #2 (ETA 6m) via Exit 16 Bypass."
  },
  {
    step: 5,
    name: "Notification Agent",
    icon: FaBell,
    color: "text-red-400 border-red-500/40 bg-red-950/40",
    desc: "Dispatches automated cell broadcast sirens to nearby residents & alert pushes to command staff.",
    sampleOutput: "✓ Broadcast Dispatched: 4,850 Citizens Alerted & High Priority Unit Pushes sent."
  },
  {
    step: 6,
    name: "Monitoring Agent",
    icon: FaDesktop,
    color: "text-emerald-400 border-emerald-500/40 bg-emerald-950/40",
    desc: "Tracks orbital satellite telemetry, unit speeds, and geofence evacuation movements in real time.",
    sampleOutput: "✓ Telemetry Active: Fire Squad #4 speed 54 km/h • 1.1 km to target location."
  },
  {
    step: 7,
    name: "Incident Summary Agent",
    icon: FaFileAlt,
    color: "text-purple-400 border-purple-500/40 bg-purple-950/40",
    desc: "Generates executive post-disaster briefings, audit trails, and agency handoff summaries.",
    sampleOutput: "✓ Executive Briefing Generated: Audit Trail ID #AUDIT-AI-9042-ALPHA Created."
  }
];

function AIWorkflowSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [completedSteps, setCompletedSteps] = useState([1, 2, 3, 4, 5, 6, 7]);

  const runSimulation = () => {
    setIsRunning(true);
    setCompletedSteps([]);
    setActiveStep(1);

    let current = 1;
    const interval = setInterval(() => {
      current += 1;
      if (current <= 7) {
        setActiveStep(current);
        setCompletedSteps(prev => [...prev, current - 1]);
      } else {
        setCompletedSteps([1, 2, 3, 4, 5, 6, 7]);
        setIsRunning(false);
        clearInterval(interval);
      }
    }, 800);
  };

  return (
    <section id="ai-workflow" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs font-bold text-orange-500 uppercase tracking-wider block mb-2 font-mono">
          AUTONOMOUS MULTI-AGENT SWARM
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
          7-Agent AI Emergency Pipeline
        </h2>
        <p className="mt-3 text-slate-300 text-base">
          From citizen SOS submission to authority dispatch and summary audits — executed in milliseconds by 7 specialized AI agents.
        </p>

        {/* Run Interactive Simulation Button */}
        <div className="mt-6">
          <button
            onClick={runSimulation}
            disabled={isRunning}
            className="px-6 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-slate-950 font-bold text-sm transition-all inline-flex items-center gap-2 shadow-md cursor-pointer"
          >
            {isRunning ? (
              <>
                <FaSpinner className="w-4 h-4 animate-spin text-slate-950" />
                <span>Executing Agent Step {activeStep} of 7...</span>
              </>
            ) : (
              <>
                <FaPlay className="w-3.5 h-3.5 text-slate-950" />
                <span>Run Interactive AI Simulation</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 7 Agents Pipeline Flow */}
      <div className="space-y-4 max-w-4xl mx-auto">
        {AGENTS.map((agent) => {
          const Icon = agent.icon;
          const isDone = completedSteps.includes(agent.step);
          const isCurrent = activeStep === agent.step && isRunning;

          return (
            <div key={agent.step} className="relative">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`p-5 rounded-2xl bg-slate-800/90 border transition-all duration-300 ${
                  isCurrent 
                    ? 'border-orange-500 shadow-md ring-2 ring-orange-500/30' 
                    : isDone 
                    ? 'border-slate-700' 
                    : 'border-slate-800 opacity-60'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className={`p-3.5 rounded-xl border ${agent.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-orange-500">
                          AGENT {agent.step} OF 7
                        </span>
                        {isDone && (
                          <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 font-mono font-bold flex items-center gap-1">
                            <FaCheck className="w-2.5 h-2.5" /> PASSED
                          </span>
                        )}
                      </div>

                      <h3 className="text-lg font-bold text-white mt-0.5">
                        {agent.name}
                      </h3>
                      <p className="text-xs text-slate-300 leading-relaxed mt-1">
                        {agent.desc}
                      </p>
                    </div>
                  </div>

                  {/* Output Preview */}
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 sm:max-w-xs">
                    {agent.sampleOutput}
                  </div>
                </div>
              </motion.div>

              {agent.step < 7 && (
                <div className="flex justify-center my-1 text-slate-600">
                  <FaChevronDown className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          );
        })}
      </div>

    </section>
  );
}

export default AIWorkflowSection;
