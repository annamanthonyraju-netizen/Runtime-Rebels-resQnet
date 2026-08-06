import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaPlay, FaFire, FaWater, FaCarCrash, FaBuilding, 
  FaAmbulance, FaBiohazard, FaWind, FaCheckCircle, FaRobot, 
  FaClock, FaTimes, FaSpinner, FaPaperPlane 
} from 'react-icons/fa';
import { useSocket } from '../../context/SocketContext';

const SCENARIOS = [
  { id: 'fire', title: 'Fire in HITEC City', icon: FaFire, color: 'text-red-500', type: 'Fire', location: 'HITEC City Cyber Towers', severity: 'Critical' },
  { id: 'flood', title: 'Flood in Hyderabad', icon: FaWater, color: 'text-cyan-400', type: 'Flood', location: 'Zone 12 Harbor Area', severity: 'High' },
  { id: 'accident', title: 'Road Accident in Gachibowli', icon: FaCarCrash, color: 'text-amber-400', type: 'Road Accident', location: 'ORR Exit 14 Flyover', severity: 'High' },
  { id: 'collapse', title: 'Building Collapse', icon: FaBuilding, color: 'text-orange-500', type: 'Building Collapse', location: 'Kondapur Sector 4', severity: 'Critical' },
  { id: 'medical', title: 'Medical Emergency', icon: FaAmbulance, color: 'text-emerald-400', type: 'Medical Emergency', location: 'Madhapur Block C', severity: 'Medium' },
  { id: 'chemical', title: 'Chemical Leak', icon: FaBiohazard, color: 'text-purple-400', type: 'Chemical Leak', location: 'Industrial Zone Gate 2', severity: 'Critical' },
  { id: 'cyclone', title: 'Cyclone Warning', icon: FaWind, color: 'text-cyan-300', type: 'Cyclone', location: 'Coastal Bay Sector', severity: 'High' }
];

function DemoModeModal() {
  const { addToast } = useSocket();
  const [isOpen, setIsOpen] = useState(false);
  const [runningScenario, setRunningScenario] = useState(null);
  const [activeStepIndex, setActiveStepIndex] = useState(-1);

  const PLAYBACK_STEPS = [
    { time: '10:42 AM', title: 'Citizen Emergency Report Submitted', desc: 'GPS captured (17.4455, 78.3770). Photo & Voice note attached.' },
    { time: '10:43 AM', title: '7-Agent AI Engine Initialized', desc: 'Validation Agent verified coordinates. Media Agent transcribed audio.' },
    { time: '10:43 AM', title: 'Severity & Urgency Index Predicted', desc: 'Severity: Critical (Urgency 9.4/10). Fire Squad #4 recommended.' },
    { time: '10:44 AM', title: 'Emergency Resources Allocated', desc: 'Fire Tender #4 & 108 Ambulance Unit #08 auto-assigned.' },
    { time: '10:45 AM', title: 'Officer Approval & Mission Dispatch', desc: 'Commander authorized dispatch. Socket.IO broadcast sent to GIS map.' },
    { time: '10:49 AM', title: 'Responder Squad Arrived at Scene', desc: 'First responder telemetry confirmed on-site arrival.' },
    { time: '11:10 AM', title: 'Incident Resolved & Fleet Released', desc: 'Hazard contained. Citizen evacuated to Central Shelter.' }
  ];

  const handleStartScenario = (sc) => {
    setRunningScenario(sc);
    setActiveStepIndex(0);

    addToast({
      type: 'LIVE HACKATHON DEMO',
      title: `▶ Executing: ${sc.title}`,
      message: `Simulating full SOS reporting, 7-Agent AI triage, and GIS dispatch.`
    });

    // Animate mission playback timeline steps
    let current = 0;
    const interval = setInterval(() => {
      current++;
      if (current < PLAYBACK_STEPS.length) {
        setActiveStepIndex(current);
      } else {
        clearInterval(interval);
      }
    }, 2000);
  };

  return (
    <>
      {/* Floating "Start Live Demo" Trigger Button (Bottom Left) */}
      <div className="fixed bottom-6 left-6 z-50 font-sans">
        <button
          onClick={() => setIsOpen(true)}
          className="px-5 py-3 rounded-2xl bg-orange-500 hover:bg-orange-600 text-slate-950 font-black text-xs flex items-center gap-2.5 shadow-2xl transition-transform hover:scale-105 cursor-pointer border border-orange-400"
        >
          <div className="w-3 h-3 rounded-full bg-slate-950 flex items-center justify-center">
            <FaPlay className="w-2 h-2 text-orange-500 translate-x-[0.5px]" />
          </div>
          <span>START HACKATHON DEMO MODE</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
        </button>
      </div>

      {/* Demo Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md font-sans text-left">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="max-w-2xl w-full rounded-3xl bg-slate-900 border border-slate-700 p-6 sm:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="flex justify-between items-start border-b border-slate-800 pb-4">
                <div>
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-orange-500/20 text-orange-400 border border-orange-500/40 uppercase">
                    SIMULATION &amp; PLAYBACK ENGINE
                  </span>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1">Live Disaster Scenario Simulator</h2>
                  <p className="text-xs text-slate-400">Select a real-world emergency scenario to trigger end-to-end multi-agent AI triage and GIS dispatch.</p>
                </div>
                
                <button
                  onClick={() => { setIsOpen(false); setRunningScenario(null); }}
                  className="text-slate-400 hover:text-white p-2 rounded-xl bg-slate-800"
                >
                  <FaTimes className="w-4 h-4" />
                </button>
              </div>

              {/* Scenario Selection Grid */}
              {!runningScenario ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                  {SCENARIOS.map(sc => {
                    const Icon = sc.icon;
                    return (
                      <div
                        key={sc.id}
                        onClick={() => handleStartScenario(sc)}
                        className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-orange-500 transition-all cursor-pointer flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-3">
                          <Icon className={`w-5 h-5 ${sc.color}`} />
                          <div>
                            <span className="font-bold text-white font-sans text-sm block">{sc.title}</span>
                            <span className="text-slate-400 text-[11px]">{sc.location}</span>
                          </div>
                        </div>
                        <FaPlay className="w-3 h-3 text-slate-600 group-hover:text-orange-500 transition-colors" />
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* Scenario Mission Playback Timeline */
                <div className="space-y-6">
                  
                  <div className="p-4 rounded-2xl bg-slate-950 border border-orange-500/40 flex items-center justify-between">
                    <div>
                      <span className="text-orange-400 font-mono font-bold text-xs">SIMULATING: {runningScenario.title}</span>
                      <h4 className="text-white font-bold text-sm">{runningScenario.location}</h4>
                    </div>
                    
                    <button
                      onClick={() => setRunningScenario(null)}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 text-xs font-mono font-bold text-slate-300 hover:text-white"
                    >
                      Select Different Scenario
                    </button>
                  </div>

                  {/* Playback Timeline Steps */}
                  <div className="space-y-3 font-mono text-xs relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
                    {PLAYBACK_STEPS.map((step, idx) => {
                      const isActive = activeStepIndex === idx;
                      const isDone = activeStepIndex > idx;
                      return (
                        <div
                          key={idx}
                          className={`relative pl-9 transition-all ${
                            isActive
                              ? 'scale-102 font-bold'
                              : isDone
                              ? 'opacity-80'
                              : 'opacity-40'
                          }`}
                        >
                          <div className={`absolute left-1.5 top-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                            isDone
                              ? 'bg-emerald-500 text-slate-950'
                              : isActive
                              ? 'bg-orange-500 text-slate-950 animate-ping'
                              : 'bg-slate-800 text-slate-500'
                          }`}>
                            {isDone ? '✓' : idx + 1}
                          </div>

                          <div className={`p-3 rounded-xl border ${
                            isActive ? 'bg-slate-950 border-orange-500 text-white' : 'bg-slate-950/40 border-slate-800 text-slate-300'
                          }`}>
                            <div className="flex justify-between items-center text-[11px]">
                              <span className="text-orange-400 font-bold">{step.time} — {step.title}</span>
                              {isActive && <span className="text-xs text-orange-500 font-bold animate-pulse">PROCESSING...</span>}
                            </div>
                            <p className="text-slate-400 font-sans text-xs mt-0.5">{step.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

export default DemoModeModal;
