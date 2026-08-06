import { Link } from 'react-router-dom';
import { FaHandsHelping, FaCheckCircle, FaArrowLeft } from 'react-icons/fa';
import Navbar from '../components/common/Navbar';

function AssignedTasksPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-12 px-4 sm:px-6 lg:px-8 w-full max-w-5xl mx-auto space-y-6 text-left">
        <Link to="/dashboard?role=volunteer" className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white">
          <FaArrowLeft /> Return to Volunteer Dashboard
        </Link>

        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-700 flex justify-between items-center shadow-xl">
          <div>
            <span className="text-xs font-mono font-bold text-orange-500 uppercase tracking-wider block mb-1">
              VOLUNTEER RELIEF DISPATCH
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Assigned Relief Tasks</h1>
            <p className="text-xs text-slate-400 mt-1">View and execute assigned volunteer emergency tasks</p>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-700 font-mono text-xs space-y-4">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center">
            <div>
              <span className="text-orange-500 font-bold">TASK-102 • High Urgency</span>
              <h3 className="text-base font-bold text-white font-sans mt-0.5">Water Bottle &amp; Food Packet Distribution</h3>
              <span className="text-slate-400 text-xs">Central High Community Shelter</span>
            </div>
            <button className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold">
              Mark Completed
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AssignedTasksPage;
