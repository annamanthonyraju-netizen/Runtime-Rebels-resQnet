import { Link } from 'react-router-dom';
import { FaBoxes, FaAmbulance, FaFireExtinguisher, FaArrowLeft } from 'react-icons/fa';
import Navbar from '../components/common/Navbar';

function ResourceAllocationPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-12 px-4 sm:px-6 lg:px-8 w-full max-w-5xl mx-auto space-y-6 text-left">
        <Link to="/dashboard?role=officer" className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white">
          <FaArrowLeft /> Return to Command Console
        </Link>

        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-700 flex justify-between items-center shadow-xl">
          <div>
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider block mb-1">
              COMMAND ASSET MATRIX
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Resource Allocation Portal</h1>
            <p className="text-xs text-slate-400 mt-1">Assign emergency vehicles, boats, and medical triage teams to active incidents</p>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-700 font-mono text-xs space-y-4">
          <h3 className="text-base font-bold text-white font-sans border-b border-slate-800 pb-2">Active Resource Allocation Matrix</h3>
          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center">
              <div>
                <span className="text-white font-bold block font-sans">Fire Squad #4 (Unit #12)</span>
                <span className="text-slate-400 text-xs">Sector 7 Corridor</span>
              </div>
              <span className="text-orange-400 font-bold">Assigned to INC-9042</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center">
              <div>
                <span className="text-white font-bold block font-sans">Coast Guard Rescue Boat #2</span>
                <span className="text-slate-400 text-xs">Zone 12 Harbor</span>
              </div>
              <span className="text-cyan-400 font-bold">Assigned to INC-8812</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ResourceAllocationPage;
