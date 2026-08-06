import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar, Legend
} from 'recharts';
import { 
  FaUserShield, FaUsers, FaExclamationTriangle, FaCheckCircle, 
  FaChartLine, FaServer, FaCogs, FaTable, FaTerminal, FaRobot 
} from 'react-icons/fa';
import StatCard from './cards/StatCard';
import { 
  ADMIN_STATS, INCIDENTS_BY_CATEGORY, MONTHLY_TRENDS, 
  RESOURCE_UTILIZATION, ADMIN_USERS, AI_LOGS 
} from '../../utils/dashboardData';

function AdminDashboard() {
  const [activeMgmtTab, setActiveMgmtTab] = useState('users');

  return (
    <div className="space-y-8 font-sans text-left">
      
      {/* Top Header */}
      <div className="rounded-3xl bg-slate-800/90 border border-slate-700 p-6 sm:p-8 flex flex-wrap items-center justify-between gap-6 shadow-xl">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className="px-3 py-1 text-xs font-mono font-bold bg-orange-500/20 text-orange-400 border border-orange-500/40 rounded-lg uppercase">
              EXECUTIVE COMMAND PORTAL
            </span>
            <span className="text-xs text-emerald-400 font-mono font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              ALL SYSTEM NODES NOMINAL
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Administrator System Console
          </h1>
          <p className="text-sm text-slate-300 mt-1">
            Global Incident Orchestration, Resource Telemetry &amp; AI Intelligence Governance
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="px-5 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-slate-950 font-bold text-sm transition-all shadow-sm">
            Export Global Incident Audit
          </button>
        </div>
      </div>

      {/* 1. Top Statistics Bar (5 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {ADMIN_STATS.map(stat => (
          <StatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            change={stat.change}
            type={stat.type}
          />
        ))}
      </div>

      {/* 2. Recharts Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Monthly Incident Trends (8 cols) */}
        <div className="lg:col-span-8 p-6 rounded-3xl bg-slate-800/90 border border-slate-700 space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-700">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <FaChartLine className="text-orange-500" />
              Monthly Incident &amp; Resolution Trends
            </h2>
            <span className="text-xs font-mono text-slate-400">2025 YTD REPORT</span>
          </div>

          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MONTHLY_TRENDS}>
                <defs>
                  <linearGradient id="colorIncidents" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F97316" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#F97316" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="month" stroke="#94A3B8" />
                <YAxis stroke="#94A3B8" />
                <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', color: '#fff' }} />
                <Area type="monotone" dataKey="incidents" stroke="#F97316" fillOpacity={1} fill="url(#colorIncidents)" name="Total Incidents" />
                <Area type="monotone" dataKey="resolved" stroke="#10B981" fillOpacity={1} fill="url(#colorResolved)" name="Resolved Cases" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Incidents by Category Pie Chart (4 cols) */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-slate-800/90 border border-slate-700 space-y-4 shadow-xl">
          <div className="pb-3 border-b border-slate-700">
            <h2 className="text-xl font-bold text-white">Incidents by Category</h2>
            <p className="text-xs text-slate-400">Distribution across active disaster types</p>
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={INCIDENTS_BY_CATEGORY}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {INCIDENTS_BY_CATEGORY.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', color: '#fff' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            {INCIDENTS_BY_CATEGORY.map(cat => (
              <div key={cat.name} className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }}></span>
                <span className="text-slate-300">{cat.name}: <strong className="text-white">{cat.value}</strong></span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 3. Resource Utilization & System Health Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Resource Utilization Bar Chart (8 cols) */}
        <div className="lg:col-span-8 p-6 rounded-3xl bg-slate-800/90 border border-slate-700 space-y-4 shadow-xl">
          <div className="pb-3 border-b border-slate-700">
            <h2 className="text-xl font-bold text-white">Resource &amp; Vehicle Utilization</h2>
            <p className="text-xs text-slate-400">Deployed vs Available emergency vehicles &amp; equipment</p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={RESOURCE_UTILIZATION}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="resource" stroke="#94A3B8" />
                <YAxis stroke="#94A3B8" />
                <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', color: '#fff' }} />
                <Bar dataKey="total" fill="#334155" name="Total Inventory" radius={[4, 4, 0, 0]} />
                <Bar dataKey="deployed" fill="#F97316" name="Currently Deployed" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* System Health Card (4 cols) */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-slate-800/90 border border-slate-700 space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-700">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <FaServer className="text-emerald-400" />
              System Infrastructure Health
            </h2>
            <span className="text-xs text-emerald-400 font-bold">100% HEALTHY</span>
          </div>

          <div className="space-y-3 font-mono text-xs text-slate-300">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex justify-between">
              <span>CPU LOAD:</span>
              <strong className="text-emerald-400">18.4% (16 Cores)</strong>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex justify-between">
              <span>RAM USAGE:</span>
              <strong className="text-emerald-400">8.2 GB / 64 GB</strong>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex justify-between">
              <span>API GATEWAY LATENCY:</span>
              <strong className="text-orange-400">12ms Average</strong>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex justify-between">
              <span>AI INFERENCE ENGINE:</span>
              <strong className="text-cyan-400">YOLOv9 ONNX Ready</strong>
            </div>
          </div>
        </div>

      </div>

      {/* 4. Platform Management Tables */}
      <div className="rounded-3xl bg-slate-800/90 border border-slate-700 p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-700">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <FaTable className="text-orange-500" />
              Platform Management &amp; Audit Logs
            </h2>
            <p className="text-xs text-slate-400">Manage registered officers, volunteers, resources, and AI logs</p>
          </div>

          {/* Table Selector Tabs */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-900 p-1.5 rounded-2xl border border-slate-700 text-xs font-semibold">
            <button
              onClick={() => setActiveMgmtTab('users')}
              className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
                activeMgmtTab === 'users' ? 'bg-orange-500 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
              }`}
            >
              Users &amp; Officers
            </button>
            <button
              onClick={() => setActiveMgmtTab('ai-logs')}
              className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
                activeMgmtTab === 'ai-logs' ? 'bg-orange-500 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
              }`}
            >
              AI Neural Logs
            </button>
          </div>
        </div>

        {/* Table Content */}
        {activeMgmtTab === 'users' ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs sm:text-sm">
              <thead className="bg-slate-950 text-slate-400 uppercase text-[11px]">
                <tr>
                  <th className="p-3.5 rounded-l-xl">User ID</th>
                  <th className="p-3.5">Name</th>
                  <th className="p-3.5">Email</th>
                  <th className="p-3.5">Role</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 rounded-r-xl">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-200">
                {ADMIN_USERS.map(u => (
                  <tr key={u.id} className="hover:bg-slate-950/50">
                    <td className="p-3.5 text-orange-500 font-bold">{u.id}</td>
                    <td className="p-3.5 font-bold font-sans text-white">{u.name}</td>
                    <td className="p-3.5 text-slate-400">{u.email}</td>
                    <td className="p-3.5"><span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-orange-400">{u.role}</span></td>
                    <td className="p-3.5 text-emerald-400 font-bold">{u.status}</td>
                    <td className="p-3.5 text-slate-400">{u.joined}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="space-y-3 font-mono text-xs">
            {AI_LOGS.map(log => (
              <div key={log.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="text-orange-500 font-bold">{log.id} • {log.timestamp}</span>
                  <h4 className="text-sm font-bold text-white mt-0.5">{log.event}</h4>
                </div>
                <div className="text-right">
                  <span className="text-emerald-400 font-bold block">CONFIDENCE: {log.confidence}</span>
                  <span className="text-slate-400">{log.status}</span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

    </div>
  );
}

export default AdminDashboard;
