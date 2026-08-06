import { Link } from 'react-router-dom';
import { FaExclamationTriangle, FaHome, FaChartLine } from 'react-icons/fa';

function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-center items-center px-6 text-center font-mono relative overflow-hidden">
      <div className="absolute inset-0 bg-cyber-grid opacity-30 pointer-events-none"></div>

      <div className="relative z-10 max-w-lg space-y-6">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-red-950/80 border border-red-500/50 text-red-400 shadow-[0_0_40px_rgba(239,68,68,0.3)]">
          <FaExclamationTriangle className="w-12 h-12 animate-bounce" />
        </div>

        <h1 className="text-6xl font-black tracking-tight text-white">
          404 <span className="text-orange-500">ERROR</span>
        </h1>

        <p className="text-xl font-bold text-orange-400">
          SECTOR NOT FOUND IN COMMAND MATRIX
        </p>

        <p className="text-sm text-slate-400 leading-relaxed font-sans">
          The emergency route or coordinate matrix you requested does not exist or has been relocated by disaster command.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 text-slate-950 font-extrabold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,107,0,0.3)]"
          >
            <FaHome className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
          <Link
            to="/dashboard"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900 border border-orange-500/40 text-orange-300 font-bold flex items-center justify-center gap-2"
          >
            <FaChartLine className="w-4 h-4 text-orange-400" />
            <span>Live Dashboard</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
