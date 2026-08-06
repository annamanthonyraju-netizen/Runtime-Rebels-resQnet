import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from '../common/SectionHeader';
import { FaPlay, FaCheckCircle, FaExclamationTriangle, FaRoute, FaSatellite, FaArrowRight } from 'react-icons/fa';

const simSteps = [
  {
    time: "T + 00:00",
    stage: "Orbital Detection & Sensor Alert",
    details: "Sentinel-2 satellite radar detects a Category 4 Cyclone eye wall landfall. Water level IoT sensors trigger high-priority alerts in Zone 12.",
    metrics: "Wind: 215 km/h • Surge: +4.2m • Threat Level: CRITICAL",
    action: "Autonomous Command Mesh Triggered"
  },
  {
    time: "T + 00:15",
    stage: "AI Vision Damage & Hazard Scoring",
    details: "Drones launch automatically from emergency hubs. YOLOv9 vision transformers segment flooded highway bridges and structural collapse risks.",
    metrics: "2,400 Imagery Tiles Processed • 14 Hazard Zones Vectorized",
    action: "Dynamic Spatial Heatmaps Generated"
  },
  {
    time: "T + 00:45",
    stage: "Multi-Agent Unit Pathfinding",
    details: "ResQnet AI routes 28 Fire & Rescue units and 14 Coast Guard boats through hazard-free evacuation corridors around flooded bridges.",
    metrics: "28 Rescue Squads Rerouted • Zero Gridlock Traffic",
    action: "First Responder Navigation Tablets Updated"
  },
  {
    time: "T + 02:00",
    stage: "Mass Evacuation & Life Safety",
    details: "Zero-latency cell warning broadcasts alert 142,000 citizens. 15,200 high-risk individuals evacuated to emergency shelters safely.",
    metrics: "15,200 Lives Saved • 98.4% Evacuation Rate",
    action: "Mission Accomplished - Incident Resolved"
  }
];

function DemoWorkflowSection() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="demo-workflow" className="py-24 relative z-10 w-full max-w-[1700px] mx-auto px-6 sm:px-12 lg:px-16 bg-slate-950">
      
      <SectionHeader
        badge="LIVE DISASTER SIMULATION"
        title="Interactive Crisis Response"
        highlightTitle="Demo Timeline"
        subtitle="Step through a simulated Category 4 Storm emergency response from detection to successful evacuation."
      />

      <div className="w-full rounded-3xl bg-slate-900/60 backdrop-blur-2xl border border-orange-500/30 p-6 sm:p-10">
        
        {/* Step Selector Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 font-mono">
          {simSteps.map((step, idx) => (
            <button
              key={step.time}
              onClick={() => setActiveStep(idx)}
              className={`p-4 rounded-2xl border text-left transition-all ${
                activeStep === idx 
                  ? 'bg-orange-500 text-slate-950 border-orange-400 font-bold shadow-[0_0_25px_rgba(255,107,0,0.4)]' 
                  : 'bg-slate-950/80 text-slate-300 border-slate-800 hover:border-orange-500/50'
              }`}
            >
              <span className="block text-xs uppercase opacity-80">STEP {idx + 1}</span>
              <span className="block text-lg font-black">{step.time}</span>
              <span className="block text-xs truncate mt-1">{step.stage}</span>
            </button>
          ))}
        </div>

        {/* Active Step Showcase */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="p-8 sm:p-10 rounded-3xl bg-slate-950 border border-orange-500/40 space-y-6"
          >
            <div className="flex flex-wrap items-center justify-between gap-4 font-mono">
              <div className="flex items-center gap-3">
                <span className="px-3.5 py-1.5 rounded-xl bg-orange-500/20 text-orange-400 border border-orange-500/40 text-sm font-bold">
                  {simSteps[activeStep].time}
                </span>
                <span className="text-2xl font-extrabold text-white">
                  {simSteps[activeStep].stage}
                </span>
              </div>
              <span className="px-3 py-1 text-xs font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 rounded">
                SIMULATION ACTIVE
              </span>
            </div>

            <p className="text-slate-300 text-lg leading-relaxed">
              {simSteps[activeStep].details}
            </p>

            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-wrap items-center justify-between gap-3 font-mono text-sm">
              <span className="text-orange-400 font-bold">
                TELEMETRY: {simSteps[activeStep].metrics}
              </span>
              <span className="text-emerald-400 font-bold flex items-center gap-2">
                <FaCheckCircle className="w-4 h-4" />
                {simSteps[activeStep].action}
              </span>
            </div>

            <div className="pt-4 flex justify-between items-center text-xs font-mono text-slate-400">
              <span>SIMULATION TIMELINE: STEP {activeStep + 1} OF 4</span>
              {activeStep < simSteps.length - 1 && (
                <button
                  onClick={() => setActiveStep(activeStep + 1)}
                  className="flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300"
                >
                  NEXT STAGE <FaArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}

export default DemoWorkflowSection;
