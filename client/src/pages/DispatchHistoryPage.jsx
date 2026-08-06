import { Link } from 'react-router-dom';
import { FaBoxes, FaArrowLeft } from 'react-icons/fa';

const DISPATCH_HISTORY = [
  { id: "DISP-9042", incidentId: "INC-9042", type: "Fire", resource: "Fire Squad #4", officer: "Capt. Sarah Jenkins", status: "Active Mission", timestamp: "2026-08-06 10:42 AM" },
  { id: "DISP-8812", incidentId: "INC-8812", type: "Flood", resource: "Rescue Boat Unit #2", officer: "Cmdr. Rajesh Kumar", status: "Mission Complete", timestamp: "2026-08-05 02:30 PM" }
];

function DispatchHistoryPage() {
  return (
    <div className="w-full space-y-6 text-left font-sans">
      
      <Link to="/dashboard/resources" className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white">
        <FaArrowLeft /> Back to Resource Directory
      </Link>

      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-700 flex justify-between items-center shadow-xl">
        <div>
          <span className="text-xs font-mono font-bold text-orange-500 uppercase tracking-wider block mb-1">
            DISPATCH MISSION AUDIT LOG
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Emergency Dispatch History</h1>
          <p className="text-xs text-slate-400 mt-1">Audit log of all emergency unit allocations and officer authorizations</p>
        </div>
      </div>

      <div className="rounded-3xl bg-slate-900 border border-slate-700 p-6 shadow-xl font-mono text-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-950 text-slate-400 uppercase text-[11px]">
              <tr>
                <th className="p-3.5 rounded-l-xl">Dispatch ID</th>
                <th className="p-3.5">Incident ID</th>
                <th className="p-3.5">Type</th>
                <th className="p-3.5">Resource Unit</th>
                <th className="p-3.5">Officer Authorized</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 rounded-r-xl">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-200">
              {DISPATCH_HISTORY.map(row => (
                <tr key={row.id} className="hover:bg-slate-950/50">
                  <td className="p-3.5 text-orange-500 font-bold">{row.id}</td>
                  <td className="p-3.5 font-bold text-white">{row.incidentId}</td>
                  <td className="p-3.5">{row.type}</td>
                  <td className="p-3.5 text-cyan-400">{row.resource}</td>
                  <td className="p-3.5 text-slate-300">{row.officer}</td>
                  <td className="p-3.5 text-emerald-400 font-bold">{row.status}</td>
                  <td className="p-3.5 text-slate-400">{row.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

export default DispatchHistoryPage;
