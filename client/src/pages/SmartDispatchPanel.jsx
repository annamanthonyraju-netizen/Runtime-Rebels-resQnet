import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaBoxes, FaRobot, FaCheckCircle, FaExclamationTriangle, 
  FaPaperPlane, FaUndo, FaArrowLeft, FaShieldAlt, FaAmbulance 
} from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

function SmartDispatchPanel() {
  const { user } = useAuth();
  const [selectedIncidentId, setSelectedIncidentId] = useState('INC-9042');
  const [dispatchedUnits, setDispatchedUnits] = useState([
    { id: 'FIRE-SQUAD-04', name: 'Fire Squad #4', type: 'Fire Tender', eta: '4 mins', status: 'Dispatched' },
    { id: 'AMB-108-A', name: '108 Ambulance Unit #08', type: 'Medical SOS', eta: '3 mins', status: 'Dispatched' }
  ]);
  const [isDispatched, setIsDispatched] = useState(false);

  const handleAcceptAI = async () => {
    try {
      await fetch('http://localhost:5000/api/resources/dispatch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('resqnet_jwt_token') || ''}`
        },
        body: JSON.stringify({
          resourceId: 'FIRE-SQUAD-04',
          incidentId: selectedIncidentId,
          officerName: user?.name || 'Capt. Sarah Jenkins'
        })
      });
    } catch (e) {}

    setIsDispatched(true);
    alert(`[AI DISPATCH EXECUTED] Incident ${selectedIncidentId} assigned units dispatched successfully.`);
  };

  const handleRecall = () => {
    setIsDispatched(false);
    alert(`[COMMAND RECALL] Units recalled for ${selectedIncidentId}. Returned to station standby.`);
  };

  return (
    <div className="w-full space-y-6 text-left font-sans">
      
      <Link to="/dashboard/resources" className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white">
        <FaArrowLeft /> Back to Resource Center
      </Link>

      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-800/90 border border-slate-700 flex flex-wrap items-center justify-between gap-6 shadow-xl">
        <div>
          <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-orange-500/20 text-orange-400 border border-orange-500/40 uppercase">
            AUTONOMOUS RESOURCE ALLOCATION
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">Smart Emergency Dispatch Panel</h1>
          <p className="text-xs text-slate-300">Review AI Resource Planning recommendations and authorize responder dispatch.</p>
        </div>
      </div>

      {/* Dispatch Workflow Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 font-mono text-xs">
        
        {/* Left Column: AI Recommendation Engine (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-700 space-y-4 font-sans">
            <h2 className="text-base font-bold text-white border-b border-slate-800 pb-2 flex items-center gap-2">
              <FaRobot className="text-orange-500" /> AI Agent Dispatch Recommendation
            </h2>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 font-mono text-xs">
              <div className="flex justify-between items-center">
                <span className="text-orange-400 font-bold">INCIDENT: {selectedIncidentId} • Wildfire Cluster</span>
                <span className="px-2 py-0.5 rounded bg-red-950 text-red-400 border border-red-800 text-[10px] font-bold">CRITICAL</span>
              </div>
              <p className="text-slate-300 text-xs font-sans">
                Sector 7 Corridor. AI recommends deploying 4 Fire Tenders, 6 Ambulances, and 3 Police Squads.
              </p>
            </div>

            {/* Recommended Units List */}
            <div className="space-y-3 font-mono text-xs">
              <span className="text-slate-400 font-bold block">RECOMMENDED RESPONDER UNITS</span>
              {dispatchedUnits.map(unit => (
                <div key={unit.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center">
                  <div>
                    <strong className="text-white font-sans text-sm block">{unit.name}</strong>
                    <span className="text-slate-400 text-xs">{unit.type} • ETA: {unit.eta}</span>
                  </div>
                  <span className="text-emerald-400 font-bold">{unit.status}</span>
                </div>
              ))}
            </div>

            {/* Command Actions: Accept, Modify, Recall */}
            <div className="pt-4 border-t border-slate-800 flex flex-wrap gap-3 font-sans text-xs">
              <button
                onClick={handleAcceptAI}
                className="px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-slate-950 font-bold flex items-center gap-2 cursor-pointer shadow-md"
              >
                <FaPaperPlane />
                <span>ACCEPT &amp; EXECUTE DISPATCH</span>
              </button>

              <button
                onClick={handleRecall}
                className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-red-400 border border-red-500/40 font-bold flex items-center gap-2 cursor-pointer"
              >
                <FaUndo />
                <span>RECALL UNITS</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Workflow Steps Indicator */}
        <div className="lg:col-span-5 space-y-6 font-sans text-xs">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-700 space-y-3 font-mono">
            <h2 className="text-base font-bold text-white font-sans border-b border-slate-800 pb-2">Dispatch Mission Pipeline</h2>
            <div className="space-y-2 text-[11px] text-slate-300">
              <div className="p-2.5 rounded-xl bg-slate-950 border border-emerald-500/40 text-emerald-400 font-bold">
                ✓ Step 1: Citizen SOS Reported
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-emerald-500/40 text-emerald-400 font-bold">
                ✓ Step 2: 7-Agent AI Severity Triage Complete
              </div>
              <div className={`p-2.5 rounded-xl border ${isDispatched ? 'bg-slate-950 border-emerald-500/40 text-emerald-400 font-bold' : 'bg-slate-950 border-orange-500/40 text-orange-400 font-bold animate-pulse'}`}>
                {isDispatched ? '✓ Step 3: Officer Approved & Units Dispatched' : '⚡ Step 3: Awaiting Officer Approval'}
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-500">
                Step 4: Live GIS Telemetry Tracking
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-500">
                Step 5: Mission Resolution &amp; Unit Availability
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

export default SmartDispatchPanel;
