import { Link } from 'react-router-dom';
import { AlertTriangle, Activity, Shield, Radar, Zap, Radio, ChevronRight, CheckCircle2, Satellite, Globe2, Cpu } from 'lucide-react';

function Hero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center items-center py-12 px-4 sm:px-8 lg:px-16 overflow-hidden w-full">
      
      {/* Cyber Grid Background */}
      <div className="absolute inset-0 bg-cyber-grid pointer-events-none opacity-45"></div>

      {/* Full-width Atmospheric Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[550px] bg-gradient-to-tr from-cyan-500/25 via-blue-600/20 to-transparent blur-[160px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-cyan-600/15 blur-[140px] rounded-full pointer-events-none"></div>
      <div className="absolute top-20 right-10 w-[500px] h-[500px] bg-blue-600/15 blur-[140px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-[1600px] mx-auto text-center flex flex-col items-center">
        
        {/* Top Tag Pill */}
        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-slate-900/90 border border-cyan-500/40 shadow-[0_0_20px_rgba(6,182,212,0.2)] text-xs sm:text-sm font-mono font-semibold text-cyan-300 mb-6 backdrop-blur-md">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400"></span>
          </span>
          <span className="tracking-wider">AUTONOMOUS EMERGENCY INCIDENT COMMAND</span>
          <span className="text-slate-500">|</span>
          <span className="text-cyan-400 font-bold">NEXT-GEN AI MATRIX</span>
        </div>

        {/* Main Heading - Decreased font size as requested */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white font-mono tracking-tight leading-[1.1] w-full">
          <span className="block drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
            AI Powered
          </span>
          <span className="block mt-1.5 text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-cyan-400 to-blue-500 glow-text-cyan">
            Disaster Management
          </span>
        </h1>

        {/* Subtitle */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xl sm:text-2xl md:text-3xl font-extrabold font-mono text-cyan-300">
          <span className="px-3.5 py-1 rounded-xl bg-cyan-950/70 border border-cyan-500/40 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
            Predict
          </span>
          <span className="text-cyan-500 font-bold">•</span>
          <span className="px-3.5 py-1 rounded-xl bg-blue-950/70 border border-blue-500/40 shadow-[0_0_20px_rgba(59,130,246,0.2)] text-blue-300">
            Respond
          </span>
          <span className="text-cyan-500 font-bold">•</span>
          <span className="px-3.5 py-1 rounded-xl bg-emerald-950/70 border border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.2)] text-emerald-300">
            Rescue
          </span>
        </div>

        {/* Description */}
        <p className="mt-5 text-base sm:text-lg text-slate-300 max-w-3xl font-sans leading-relaxed">
          Real-time satellite surveillance, automated damage scoring, and multi-agency AI dispatch to protect communities and accelerate life-saving rescue operations globally.
        </p>

        {/* Two Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          {/* Button 1: Report Incident */}
          <Link
            to="/dashboard/citizen/report"
            className="w-full sm:w-auto relative group overflow-hidden rounded-xl p-[1.5px] font-bold text-base transition-all duration-300 hover:scale-105"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-amber-500 via-cyan-500 to-blue-600 animate-pulse"></span>
            <span className="relative px-8 py-4 rounded-[11px] bg-slate-950 flex items-center justify-center gap-3 text-white group-hover:bg-slate-900 transition-colors shadow-[0_0_30px_rgba(6,182,212,0.3)]">
              <AlertTriangle className="w-5 h-5 text-amber-400 animate-bounce" />
              <span>Report Incident</span>
            </span>
          </Link>

          {/* Button 2: Live Dashboard */}
          <Link
            to="/dashboard"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900/90 hover:bg-slate-800/90 text-cyan-300 border border-cyan-500/40 hover:border-cyan-400 font-bold text-base transition-all duration-300 flex items-center justify-center gap-3 backdrop-blur-2xl shadow-[0_0_20px_rgba(6,182,212,0.15)] hover:shadow-[0_0_35px_rgba(6,182,212,0.35)] hover:scale-105"
          >
            <Activity className="w-5 h-5 text-cyan-400" />
            <span>Live Dashboard</span>
            <ChevronRight className="w-4 h-4 text-cyan-400" />
          </Link>
        </div>

        {/* AI Command Center Widget - INCREASED MAP & CONTENT FONT SIZES */}
        <div className="mt-12 w-full max-w-[1550px] rounded-3xl bg-slate-950/95 border border-cyan-500/40 p-6 sm:p-8 backdrop-blur-3xl shadow-[0_0_70px_rgba(6,182,212,0.25)] text-left relative overflow-hidden">
          
          {/* Widget Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-cyan-500/30 font-mono text-sm sm:text-base text-slate-300 font-bold">
            <div className="flex items-center gap-3">
              <div className="flex gap-2">
                <span className="w-4 h-4 rounded-full bg-red-500/90"></span>
                <span className="w-4 h-4 rounded-full bg-amber-500/90"></span>
                <span className="w-4 h-4 rounded-full bg-emerald-500/90"></span>
              </div>
              <span className="text-cyan-300 tracking-wider">RESQNET_COMMAND_MATRIX_V2.4</span>
            </div>

            <div className="flex items-center gap-8 text-sm sm:text-base font-semibold">
              <span className="flex items-center gap-2.5 text-cyan-400">
                <Globe2 className="w-5 h-5" />
                GLOBAL SATELLITE MESH: ONLINE
              </span>
              <span className="flex items-center gap-2.5 text-emerald-400">
                <CheckCircle2 className="w-5 h-5" />
                RESPONSE LATENCY: 12ms
              </span>
            </div>
          </div>

          {/* Widget Inner Grid Layout - LARGER MAP & BESIDE CONTENTS */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
            
            {/* Live Map / Radar Visualizer - Increased map size (5 cols) */}
            <div className="lg:col-span-5 rounded-2xl bg-slate-900/95 border border-cyan-500/40 p-6 flex flex-col items-center justify-center relative min-h-[300px] sm:min-h-[340px] overflow-hidden shadow-[inset_0_0_30px_rgba(6,182,212,0.1)]">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-60 h-60 rounded-full border border-cyan-500/25 flex items-center justify-center">
                  <div className="w-44 h-44 rounded-full border border-cyan-500/35 flex items-center justify-center">
                    <div className="w-28 h-28 rounded-full border border-cyan-500/45 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full border border-cyan-400/60"></div>
                    </div>
                  </div>
                </div>
                <div className="absolute w-60 h-60 rounded-full border-t-2 border-cyan-400 animate-radar"></div>
              </div>

              {/* Target Indicator */}
              <div className="relative z-10 flex flex-col items-center">
                <span className="relative flex h-5 w-5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-80"></span>
                  <span className="relative inline-flex rounded-full h-5 w-5 bg-red-500"></span>
                </span>
                <span className="mt-16 px-4 py-2 rounded-xl text-sm sm:text-base font-mono font-bold bg-red-950/95 border border-red-500/60 text-red-200 shadow-[0_0_25px_rgba(239,68,68,0.4)]">
                  ACTIVE THREAT: SECTOR 7 (CYCLONE STORM SURGE)
                </span>
              </div>
            </div>

            {/* Live Incident Status Feed - Beside contents with INCREASED FONT SIZES (7 cols) */}
            <div className="lg:col-span-7 rounded-2xl bg-slate-900/80 border border-cyan-500/40 p-7 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between font-mono mb-4 pb-3 border-b border-slate-800">
                  <span className="text-cyan-400 font-extrabold flex items-center gap-2.5 text-lg sm:text-xl">
                    <Radio className="w-5 h-5 text-amber-400 animate-pulse" />
                    LIVE AI INCIDENT OVERLAY
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-emerald-400 bg-emerald-950/80 px-3 py-1.5 rounded-lg border border-emerald-500/40">
                    REAL-TIME STREAMING
                  </span>
                </div>
                
                {/* Incident Items with INCREASED FONT SIZES */}
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-slate-950/95 border border-slate-800 flex flex-wrap items-center justify-between gap-3 font-mono text-sm sm:text-base">
                    <div className="flex items-center gap-3">
                      <span className="w-3 h-3 rounded-full bg-amber-400 animate-pulse"></span>
                      <span className="text-slate-100 font-bold">Wildfire Cluster #4B - Thermal Spike</span>
                    </div>
                    <span className="text-amber-400 font-extrabold px-3 py-1 rounded-lg bg-amber-950/80 border border-amber-500/40 text-xs sm:text-sm">
                      12 Drone Squadrons Dispatched
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950/95 border border-slate-800 flex flex-wrap items-center justify-between gap-3 font-mono text-sm sm:text-base">
                    <div className="flex items-center gap-3">
                      <span className="w-3 h-3 rounded-full bg-cyan-400"></span>
                      <span className="text-slate-100 font-bold">Coastal Surge Evacuation - Zone 12 Geo-Fence</span>
                    </div>
                    <span className="text-cyan-400 font-extrabold px-3 py-1 rounded-lg bg-cyan-950/80 border border-cyan-500/40 text-xs sm:text-sm">
                      Routes Auto-Optimized
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Quick Metric Bar with INCREASED FONT SIZES */}
              <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between font-mono text-sm sm:text-base text-slate-300 gap-3 font-semibold">
                <span>NEURAL AI MODEL ACCURACY: <strong className="text-cyan-400 text-lg sm:text-xl font-black">99.4%</strong></span>
                <span>CITIZEN EMERGENCY ALERTS: <strong className="text-emerald-400 text-lg sm:text-xl font-black">142,800 PUSHED</strong></span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;
