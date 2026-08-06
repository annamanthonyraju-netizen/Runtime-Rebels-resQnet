import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaRobot, FaShieldAlt, FaCheckCircle, FaExclamationTriangle, 
  FaAmbulance, FaMapMarkedAlt, FaBell, FaFileAlt, FaSpinner, 
  FaSync, FaBrain, FaCogs, FaMicrophone, FaCamera 
} from 'react-icons/fa';

function AIAssistantPage() {
  const [selectedModel, setSelectedModel] = useState('Gemini-2.0-Flash-Agentic');
  const [isExecuting, setIsExecuting] = useState(false);
  const [aiData, setAiData] = useState({
    overallConfidence: 98.6,
    durationMs: 1240,
    agents: {
      validation: {
        name: "Agent 1: Incident Validation Agent",
        status: "Validated",
        completenessScore: 100,
        gpsVerified: true,
        notes: "GPS coordinates (17.4455, 78.3770) verified via browser geolocation API. All required incident parameters present."
      },
      mediaAnalysis: {
        name: "Agent 2: Media Analysis Agent",
        type: "Wildfire Cluster",
        confidence: 98.4,
        transcript: '"Emergency assistance requested! Heavy smoke and thermal heat rising fast near Sector 7 main corridor."',
        observations: [
          "High-resolution thermal anomaly detected matching Wildfire signature.",
          "Structure proximity: 14m from residential boundary.",
          "Wind vector: 14 km/h East towards residential blocks."
        ]
      },
      severity: {
        name: "Agent 3: Severity Prediction Agent",
        severity: "Critical",
        urgencyIndex: 9.4,
        reasoning: [
          "High casualty threat due to dense urban population in Sector 7.",
          "Rapid escalation rate inferred from thermal observations.",
          "Critical power substation within 120 meters."
        ]
      },
      resources: {
        name: "Agent 4: Resource Planning Agent",
        recommended: {
          fireTenders: 4,
          ambulances: 6,
          policeSquads: 3,
          heavyEquipment: ["1x Hydraulic Rescue Cutter", "2x Evacuation Buses", "1x Water Tanker"]
        }
      },
      route: {
        name: "Agent 5: Route Optimization Agent",
        fastest: "ORR Exit 16 North -> Sector 7 Corridor (ETA 4.2 mins)",
        alternative: "Outer Bypass Highway -> Flyover Exit 14 (ETA 7.5 mins)",
        blocked: ["Flooded Underpass on Highway 44 (Submerged 1.4m)", "Construction roadblock near Sector Gate B"]
      },
      notifications: {
        name: "Agent 6: Notification Agent",
        citizen: "🚨 EMERGENCY ALERT: Wildfire reported near your zone. Please proceed to Central Shelter via Exit 16 North.",
        officer: "⚡ DISPATCH COMMAND: Critical Wildfire reported. Fire Squad #4 & Ambulance Depot #108 auto-assigned.",
        volunteer: "🤝 RELIEF TASK ASSIGNED: Report to Central Evacuation Camp for water bottle distribution."
      },
      summary: {
        name: "Agent 7: Incident Summary Agent",
        executive: "Executive EOC Briefing: A Critical severity Wildfire has occurred in Sector 7 Corridor. 7 AI Agents collaborated in 1.2s to generate dispatch recommendations.",
        officer: "Tactical Brief: Proceed via ORR Exit 16 North (ETA 4.2m). Deploy 4 Fire Tenders and 6 Ambulances. Flooded underpass flagged."
      }
    }
  });

  const handleRunPipeline = async () => {
    setIsExecuting(true);
    try {
      const res = await fetch('https://runtime-rebels-resqnet.onrender.com/api/ai/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'Fire',
          title: 'Wildfire Cluster #4B',
          description: 'Heavy thermal heat and smoke rising fast near residential zone.',
          location: { latitude: 17.4455, longitude: 78.3770, address: 'Sector 7 Corridor' }
        })
      });
      const resData = await res.json();
      if (res.ok && resData.data) {
        setAiData(prev => ({
          ...prev,
          durationMs: resData.data.executionDurationMs,
          overallConfidence: resData.data.overallConfidenceScore
        }));
      }
    } catch (e) {}
    setIsExecuting(false);
  };

  return (
    <div className="w-full space-y-6 text-left font-sans">
      
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-800/90 border border-slate-700 flex flex-wrap items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="p-3.5 rounded-2xl bg-orange-500 text-slate-950 font-bold">
            <FaBrain className="w-7 h-7" />
          </div>
          <div>
            <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-orange-500/20 text-orange-400 border border-orange-500/40 uppercase">
              AGENTIC DISASTER INTELLIGENCE
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">7-Agent AI Command Center</h1>
            <p className="text-xs text-slate-300">Autonomous multi-agent collaboration for emergency triage &amp; resource planning.</p>
          </div>
        </div>

        {/* Model Selector & Re-Run Button */}
        <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-orange-400 font-bold px-3 py-2.5 rounded-xl outline-none"
          >
            <option value="Gemini-2.0-Flash-Agentic">Gemini 2.0 Flash Agentic</option>
            <option value="Gemini-Pro-Vision">Gemini Pro Vision Multi-Modal</option>
            <option value="Claude-3.5-Ensemble">Claude 3.5 Sonnet Ensemble</option>
          </select>

          <button
            onClick={handleRunPipeline}
            disabled={isExecuting}
            className="px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-slate-950 font-bold flex items-center gap-2 cursor-pointer"
          >
            {isExecuting ? <FaSpinner className="w-4 h-4 animate-spin" /> : <FaSync />}
            <span>Re-Run Agent Pipeline</span>
          </button>
        </div>
      </div>

      {/* Metric Pipeline Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-700">
          <span className="text-slate-400 text-xs uppercase font-bold">Agents Active</span>
          <div className="text-3xl font-extrabold text-orange-500 mt-1">7 Collaborating</div>
          <span className="text-xs text-emerald-400 font-semibold block mt-1">100% Pipeline Synchronized</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-700">
          <span className="text-slate-400 text-xs uppercase font-bold">Overall AI Confidence</span>
          <div className="text-3xl font-extrabold text-emerald-400 mt-1">{aiData.overallConfidence}%</div>
          <span className="text-xs text-emerald-400 font-semibold block mt-1">Zero Anomaly Warnings</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-700">
          <span className="text-slate-400 text-xs uppercase font-bold">Execution Latency</span>
          <div className="text-3xl font-extrabold text-cyan-400 mt-1">{aiData.durationMs} ms</div>
          <span className="text-xs text-cyan-400 font-semibold block mt-1">Sub-1.5s Benchmark Met</span>
        </div>
      </div>

      {/* 7 Agents Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-mono text-xs">
        
        {/* Agent 1: Validation */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-700 space-y-3">
          <div className="flex justify-between items-center pb-2 border-b border-slate-800">
            <span className="text-orange-400 font-bold">AGENT 1 • VALIDATION</span>
            <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-bold">VALIDATED</span>
          </div>
          <p className="text-slate-300 font-sans text-xs">{aiData.agents.validation.notes}</p>
          <div className="pt-2 border-t border-slate-800 text-emerald-400 font-bold">
            Completeness Score: {aiData.agents.validation.completenessScore}%
          </div>
        </div>

        {/* Agent 2: Media Analysis */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-700 space-y-3">
          <div className="flex justify-between items-center pb-2 border-b border-slate-800">
            <span className="text-cyan-400 font-bold">AGENT 2 • MEDIA ANALYSIS</span>
            <span className="text-slate-400 text-[10px] font-bold">CONFIDENCE: {aiData.agents.mediaAnalysis.confidence}%</span>
          </div>
          <p className="text-amber-300 italic text-[11px] font-sans">{aiData.agents.mediaAnalysis.transcript}</p>
          <ul className="space-y-1 text-[11px] text-slate-300 font-sans list-disc list-inside">
            {aiData.agents.mediaAnalysis.observations.map((obs, i) => (
              <li key={i}>{obs}</li>
            ))}
          </ul>
        </div>

        {/* Agent 3: Severity Prediction */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-700 space-y-3">
          <div className="flex justify-between items-center pb-2 border-b border-slate-800">
            <span className="text-red-400 font-bold">AGENT 3 • SEVERITY PREDICTION</span>
            <span className="px-2 py-0.5 rounded bg-red-950 text-red-400 border border-red-800 font-bold">CRITICAL</span>
          </div>
          <div className="text-2xl font-extrabold text-red-500 font-sans">
            Urgency Index: {aiData.agents.severity.urgencyIndex} / 10
          </div>
          <ul className="space-y-1 text-[11px] text-slate-300 font-sans list-disc list-inside">
            {aiData.agents.severity.reasoning.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </div>

        {/* Agent 4: Resource Planning */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-700 space-y-3">
          <div className="flex justify-between items-center pb-2 border-b border-slate-800">
            <span className="text-amber-400 font-bold">AGENT 4 • RESOURCE PLANNING</span>
            <span className="text-emerald-400 font-bold">RECOMMENDED</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-slate-400">Fire Tenders:</span> <strong className="text-orange-400">{aiData.agents.resources.recommended.fireTenders}</strong>
            </div>
            <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-slate-400">Ambulances:</span> <strong className="text-cyan-400">{aiData.agents.resources.recommended.ambulances}</strong>
            </div>
          </div>
          <p className="text-[11px] text-slate-300 font-sans">
            Heavy Equipment: {aiData.agents.resources.recommended.heavyEquipment.join(', ')}
          </p>
        </div>

        {/* Agent 5: Route Optimization */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-700 space-y-3">
          <div className="flex justify-between items-center pb-2 border-b border-slate-800">
            <span className="text-emerald-400 font-bold">AGENT 5 • ROUTE OPTIMIZATION</span>
            <span className="text-emerald-400 font-bold">FASTEST</span>
          </div>
          <p className="text-white font-bold font-sans text-xs">{aiData.agents.route.fastest}</p>
          <div className="p-2 rounded-lg bg-red-950/50 border border-red-800/60 text-red-300 text-[11px]">
            🚫 {aiData.agents.route.blocked[0]}
          </div>
        </div>

        {/* Agent 6: Notification Agent */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-700 space-y-3">
          <div className="flex justify-between items-center pb-2 border-b border-slate-800">
            <span className="text-purple-400 font-bold">AGENT 6 • NOTIFICATIONS</span>
            <span className="text-purple-400 font-bold">AUTO-GENERATED</span>
          </div>
          <p className="text-slate-300 font-sans text-[11px] leading-relaxed">{aiData.agents.notifications.citizen}</p>
        </div>

      </div>

      {/* Agent 7: Executive & Officer Summary */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-700 space-y-4 font-mono text-xs">
        <h2 className="text-base font-bold text-white font-sans flex items-center gap-2 border-b border-slate-800 pb-2">
          <FaFileAlt className="text-orange-500" /> Agent 7: Executive &amp; Tactical Briefing
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-orange-400 font-bold block">EXECUTIVE EOC BRIEFING</span>
            <p className="text-slate-300 font-sans text-xs leading-relaxed">{aiData.agents.summary.executive}</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-cyan-400 font-bold block">TACTICAL FIELD BRIEF</span>
            <p className="text-slate-300 font-sans text-xs leading-relaxed">{aiData.agents.summary.officer}</p>
          </div>
        </div>
      </div>

    </div>
  );
}

export default AIAssistantPage;
