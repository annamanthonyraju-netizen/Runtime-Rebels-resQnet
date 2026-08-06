import { Link } from 'react-router-dom';
import { Shield, Phone, Radio, Lock, HeartPulse, ExternalLink } from 'lucide-react';

function Footer() {
  return (
    <footer className="relative z-10 w-full bg-slate-950 border-t border-cyan-500/20 text-slate-400 pt-20 pb-14 font-sans">
      
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-80 bg-cyan-500/5 blur-[140px] pointer-events-none -z-10"></div>

      <div className="w-full max-w-[1700px] mx-auto px-6 sm:px-12 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-14 border-b border-cyan-500/10">
          
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-5">
            <Link to="/" className="flex items-center gap-3">
              <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 p-[1px] shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                  <Shield className="w-6 h-6 text-cyan-400" />
                </div>
              </div>
              <span className="text-3xl font-black text-white font-mono tracking-tight">
                Res<span className="text-cyan-400 glow-text-cyan">Q</span>net
              </span>
            </Link>

            <p className="text-base text-slate-300 max-w-md leading-relaxed">
              Autonomous AI-driven disaster management, real-time satellite telemetry, and coordinated emergency dispatch platform saving lives globally.
            </p>

            {/* Emergency Hotline Box */}
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-red-500/40 max-w-md shadow-[0_0_25px_rgba(239,68,68,0.15)]">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-red-500/15 text-red-400 border border-red-500/40">
                  <Phone className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <span className="block text-xs font-mono font-bold text-red-400 uppercase tracking-widest">
                    24/7 EMERGENCY SOS HOTLINE
                  </span>
                  <a
                    href="tel:18007377638"
                    className="text-xl font-mono font-extrabold text-white hover:text-red-400 transition-colors"
                  >
                    1-800-RESQ-NET
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links Column 1 */}
          <div>
            <h4 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest mb-5">
              Platform Features
            </h4>
            <ul className="space-y-3 text-sm font-medium">
              <li>
                <Link to="/" className="hover:text-cyan-300 transition-colors flex items-center gap-2">
                  Live Satellite Mapping
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-cyan-300 transition-colors flex items-center gap-2">
                  AI Damage Assessment
                </Link>
              </li>
              <li>
                <Link to="/alerts" className="hover:text-cyan-300 transition-colors flex items-center gap-2">
                  Emergency Broadcasts
                </Link>
              </li>
              <li>
                <Link to="/dashboard/citizen/report" className="hover:text-cyan-300 transition-colors flex items-center gap-2">
                  Drone Telemetry Sync
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links Column 2 */}
          <div>
            <h4 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest mb-5">
              Emergency Resources
            </h4>
            <ul className="space-y-3 text-sm font-medium">
              <li>
                <Link to="/dashboard/citizen/report" className="hover:text-cyan-300 transition-colors">
                  Report Active Incident
                </Link>
              </li>
              <li>
                <Link to="/alerts" className="hover:text-cyan-300 transition-colors">
                  Evacuation Maps
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-cyan-300 transition-colors">
                  Shelter Network Directory
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-cyan-300 transition-colors">
                  First Responder Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Security & System Operational Badge */}
          <div className="space-y-5">
            <h4 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest mb-5">
              System Network Status
            </h4>
            
            <div className="p-4 rounded-xl bg-slate-900/80 border border-cyan-500/30 text-xs font-mono space-y-2.5">
              <div className="flex items-center gap-2.5 text-emerald-400 font-bold text-sm">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span>SYSTEM STATUS: OPERATIONAL</span>
              </div>
              <p className="text-xs text-slate-400">
                Uptime: 99.99% • 24 Active Global Data Nodes
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <Lock className="w-4 h-4 text-cyan-400" />
              <span>256-Bit Encrypted Command Mesh</span>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Security Line */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <p>© {new Date().getFullYear()} ResQnet AI Disaster Management Platform. All rights reserved.</p>
          <div className="flex items-center gap-8">
            <span className="hover:text-cyan-400 cursor-pointer">Privacy Protocol</span>
            <span className="hover:text-cyan-400 cursor-pointer">Terms of Operation</span>
            <span className="hover:text-cyan-400 cursor-pointer">Security Directive</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
