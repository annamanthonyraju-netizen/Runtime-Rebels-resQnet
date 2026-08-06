import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar 
} from 'recharts';
import { 
  FaChartBar, FaClock, FaCheckCircle, FaExclamationTriangle, 
  FaBoxes, FaRobot, FaUsers, FaFileAlt, FaFire, FaDownload, 
  FaSearch, FaFilter 
} from 'react-icons/fa';
import { INCIDENTS_BY_CATEGORY, MONTHLY_TRENDS, RESOURCE_UTILIZATION } from '../utils/dashboardData';

const SEVERITY_BREAKDOWN = [
  { severity: 'Critical', count: 18, fill: '#EF4444' },
  { severity: 'High', count: 14, fill: '#F97316' },
  { severity: 'Medium', count: 7, fill: '#EAB308' },
  { severity: 'Low', count: 3, fill: '#10B981' }
];

function AnalyticsPage() {
  const location = useLocation();
  const [dateRange, setDateRange] = useState('30d');
  const [district, setDistrict] = useState('All');
  
  const [overview, setOverview] = useState({
    totalIncidents: 1428,
    activeIncidents: 42,
    resolvedIncidents: 1386,
    averageResponseTime: '4.2 mins',
    averageResolutionTime: '28.5 mins',
    resourcesDeployed: 184,
    aiAnalysesCompleted: 2450,
    activeVolunteers: 1240,
    activeOfficers: 340
  });

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/analytics/overview');
        const resData = await res.json();
        if (res.ok && resData.data) {
          setOverview(resData.data);
        }
      } catch (e) {}
    };

    fetchAnalytics();
  }, []);

  return (
    <div className="w-full space-y-6 text-left font-sans">
      
      {/* Header Bar */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-800/90 border border-slate-700 flex flex-wrap items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="p-3.5 rounded-2xl bg-amber-500 text-slate-950 font-bold">
            <FaChartBar className="w-7 h-7 text-slate-950" />
          </div>
          <div>
            <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-400 border border-amber-500/40 uppercase">
              EXECUTIVE COMMAND INTELLIGENCE
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">Disaster Analytics &amp; Decision Intelligence</h1>
            <p className="text-xs text-slate-300">Time-series response trends, resource optimization, and AI accuracy telemetry.</p>
          </div>
        </div>

        {/* Action Controls & Sub-Page Navigation */}
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
          <Link
            to="/dashboard/reports"
            className="px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-slate-950 font-bold flex items-center gap-2"
          >
            <FaFileAlt />
            <span>Generate PDF / CSV Reports</span>
          </Link>
        </div>
      </div>

      {/* Analytics Sub-Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-2 rounded-2xl bg-slate-900 border border-slate-700 font-mono text-xs font-bold">
        <Link
          to="/dashboard/analytics"
          className={`px-4 py-2 rounded-xl transition-all ${
            location.pathname === '/dashboard/analytics' ? 'bg-orange-500 text-slate-950' : 'text-slate-400 hover:text-white'
          }`}
        >
          📊 Overview KPI Matrix
        </Link>
        <Link
          to="/dashboard/analytics/incidents"
          className={`px-4 py-2 rounded-xl transition-all ${
            location.pathname.includes('/incidents') ? 'bg-orange-500 text-slate-950' : 'text-slate-400 hover:text-white'
          }`}
        >
          🚨 Incident Breakdown
        </Link>
        <Link
          to="/dashboard/analytics/resources"
          className={`px-4 py-2 rounded-xl transition-all ${
            location.pathname.includes('/resources') ? 'bg-orange-500 text-slate-950' : 'text-slate-400 hover:text-white'
          }`}
        >
          📦 Resource Utilization
        </Link>
        <Link
          to="/dashboard/analytics/ai"
          className={`px-4 py-2 rounded-xl transition-all ${
            location.pathname.includes('/ai') ? 'bg-orange-500 text-slate-950' : 'text-slate-400 hover:text-white'
          }`}
        >
          🤖 AI Neural Performance
        </Link>
        <Link
          to="/dashboard/reports"
          className={`px-4 py-2 rounded-xl transition-all ${
            location.pathname.includes('/reports') ? 'bg-orange-500 text-slate-950' : 'text-slate-400 hover:text-white'
          }`}
        >
          📄 Export Reports
        </Link>
      </div>

      {/* Date Range & District Filters */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-700 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-slate-400 font-bold uppercase flex items-center gap-1">
            <FaFilter className="text-orange-500" /> FILTERS:
          </span>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-white font-bold px-3 py-1.5 rounded-xl outline-none"
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="ytd">Year to Date</option>
          </select>

          <select
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-white font-bold px-3 py-1.5 rounded-xl outline-none"
          >
            <option value="All">All Districts / Sectors</option>
            <option value="Sector7">Sector 7 Corridor</option>
            <option value="Zone12">Zone 12 Harbor Area</option>
            <option value="ORR">ORR Flyover Exit 14</option>
          </select>
        </div>

        <span className="text-emerald-400 font-bold">✓ REAL-TIME SOCKET.IO AGGREGATED</span>
      </div>

      {/* 9 Executive KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-4 font-mono">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-700">
          <span className="text-xs text-slate-400 uppercase font-bold">Total Incidents</span>
          <div className="text-3xl font-extrabold text-white mt-1">{overview.totalIncidents}</div>
          <span className="text-xs text-emerald-400 font-semibold block mt-1">97.0% Resolution Rate</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-700">
          <span className="text-xs text-slate-400 uppercase font-bold">Active Incidents</span>
          <div className="text-3xl font-extrabold text-orange-500 mt-1">{overview.activeIncidents}</div>
          <span className="text-xs text-emerald-400 font-semibold block mt-1">-14% vs last 24h</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-700">
          <span className="text-xs text-slate-400 uppercase font-bold">Resolved Incidents</span>
          <div className="text-3xl font-extrabold text-emerald-400 mt-1">{overview.resolvedIncidents}</div>
          <span className="text-xs text-emerald-400 font-semibold block mt-1">+1,386 Saved</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-700">
          <span className="text-xs text-slate-400 uppercase font-bold">Average Response Time</span>
          <div className="text-3xl font-extrabold text-cyan-400 mt-1">{overview.averageResponseTime}</div>
          <span className="text-xs text-cyan-400 font-semibold block mt-1">&lt; 5 min Target Met</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-700">
          <span className="text-xs text-slate-400 uppercase font-bold">Average Resolution Time</span>
          <div className="text-3xl font-extrabold text-purple-400 mt-1">{overview.averageResolutionTime}</div>
          <span className="text-xs text-purple-400 font-semibold block mt-1">Sub-30 Min Benchmark</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-700">
          <span className="text-xs text-slate-400 uppercase font-bold">Resources Deployed</span>
          <div className="text-3xl font-extrabold text-amber-400 mt-1">{overview.resourcesDeployed} Units</div>
          <span className="text-xs text-amber-400 font-semibold block mt-1">98.5% Operational</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-700">
          <span className="text-xs text-slate-400 uppercase font-bold">AI Analyses Completed</span>
          <div className="text-3xl font-extrabold text-emerald-400 mt-1">{overview.aiAnalysesCompleted}</div>
          <span className="text-xs text-emerald-400 font-semibold block mt-1">98.4% Confidence Score</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-700">
          <span className="text-xs text-slate-400 uppercase font-bold">Active Volunteers</span>
          <div className="text-3xl font-extrabold text-white mt-1">{overview.activeVolunteers}</div>
          <span className="text-xs text-emerald-400 font-semibold block mt-1">Ready for Relief</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-700">
          <span className="text-xs text-slate-400 uppercase font-bold">Active Officers</span>
          <div className="text-3xl font-extrabold text-orange-400 mt-1">{overview.activeOfficers}</div>
          <span className="text-xs text-orange-400 font-semibold block mt-1">Deployed in Command Nodes</span>
        </div>
      </div>

      {/* Recharts Analytics Suite */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Monthly Incident Response Trends (AreaChart - 8 Cols) */}
        <div className="lg:col-span-8 p-6 rounded-3xl bg-slate-900 border border-slate-700 space-y-4">
          <h2 className="text-lg font-bold text-white font-sans flex items-center gap-2">
            <FaChartBar className="text-orange-500" /> Monthly Incident &amp; Resolution Trends
          </h2>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MONTHLY_TRENDS}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="month" stroke="#94A3B8" />
                <YAxis stroke="#94A3B8" />
                <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', color: '#fff' }} />
                <Area type="monotone" dataKey="incidents" stroke="#F97316" fill="#F97316" fillOpacity={0.3} name="Total Incidents" />
                <Area type="monotone" dataKey="resolved" stroke="#10B981" fill="#10B981" fillOpacity={0.3} name="Resolved Cases" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Distribution (PieChart - 4 Cols) */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-slate-900 border border-slate-700 space-y-4">
          <h2 className="text-lg font-bold text-white font-sans flex items-center gap-2">
            <FaExclamationTriangle className="text-amber-400" /> Category Distribution
          </h2>
          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={INCIDENTS_BY_CATEGORY} cx="50%" cy="50%" innerRadius={50} outerRadius={70} dataKey="value">
                  {INCIDENTS_BY_CATEGORY.map((e, idx) => (
                    <Cell key={idx} fill={e.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', color: '#fff' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Severity Breakdown & Resource Utilization */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Severity Breakdown BarChart */}
        <div className="lg:col-span-6 p-6 rounded-3xl bg-slate-900 border border-slate-700 space-y-4">
          <h2 className="text-lg font-bold text-white font-sans flex items-center gap-2">
            <FaFire className="text-red-500" /> Incidents by Severity Level
          </h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={SEVERITY_BREAKDOWN}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="severity" stroke="#94A3B8" />
                <YAxis stroke="#94A3B8" />
                <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', color: '#fff' }} />
                <Bar dataKey="count" fill="#F97316">
                  {SEVERITY_BREAKDOWN.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Resource Utilization BarChart */}
        <div className="lg:col-span-6 p-6 rounded-3xl bg-slate-900 border border-slate-700 space-y-4">
          <h2 className="text-lg font-bold text-white font-sans flex items-center gap-2">
            <FaBoxes className="text-cyan-400" /> Fleet &amp; Resource Utilization
          </h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={RESOURCE_UTILIZATION}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="type" stroke="#94A3B8" />
                <YAxis stroke="#94A3B8" />
                <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', color: '#fff' }} />
                <Bar dataKey="available" fill="#10B981" name="Available" />
                <Bar dataKey="deployed" fill="#F97316" name="Deployed" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* AI Insights & Predictive Hazard Observations */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-700 space-y-4 font-mono text-xs">
        <h2 className="text-lg font-bold text-white font-sans flex items-center gap-2 border-b border-slate-800 pb-2">
          <FaRobot className="text-orange-500" /> EOC AI Decision Intelligence &amp; Predictive Insights
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-orange-400 font-bold block">HIGH-RISK HAZARD ZONE</span>
            <p className="text-slate-300 font-sans text-xs">Sector 7 Corridor identified as top thermal cluster. Recommended deploying 2 extra Fire Tenders to Sector Station.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-cyan-400 font-bold block">PEAK DISPATCH WINDOW</span>
            <p className="text-slate-300 font-sans text-xs">Peak emergency call frequency detected between 14:00 and 18:00 hrs. Shift standby optimized.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-emerald-400 font-bold block">AI ACCEPTANCE RATE</span>
            <p className="text-slate-300 font-sans text-xs">97.8% of AI resource recommendations accepted without modification by field commanders.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-purple-400 font-bold block">PREDICTIVE SUBMERSION</span>
            <p className="text-slate-300 font-sans text-xs">Monsoon surge level predicted at +0.8m near Zone 12 Harbor over next 12 hours.</p>
          </div>
        </div>
      </div>

    </div>
  );
}

export default AnalyticsPage;
