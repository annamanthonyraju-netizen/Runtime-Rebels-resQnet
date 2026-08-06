import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaFileAlt, FaExclamationTriangle, FaCheckCircle, FaClock, FaEye, FaPlus } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

function MyReportsPage() {
  const { user } = useAuth();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/incidents/my-reports', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('resqnet_jwt_token') || ''}`
          }
        });
        const resData = await res.json();
        if (res.ok && resData.data && resData.data.length > 0) {
          setReports(resData.data);
        } else {
          // Default mock list if backend has no records yet
          setReports([
            {
              _id: "INC-9042",
              type: "Fire",
              title: "Wildfire Cluster #4B",
              location: { address: "Sector 7 Corridor, Hyderabad", latitude: 17.4455, longitude: 78.3770 },
              createdAt: "2026-08-06T10:40:00Z",
              status: "Dispatched",
              severity: "Critical",
              assignedOfficer: "Capt. Sarah Jenkins",
              resourceStatus: "12 Drone Squadrons Dispatched"
            },
            {
              _id: "INC-8812",
              type: "Flood",
              title: "Urban Surge Inundation",
              location: { address: "Zone 12 Harbor Area", latitude: 17.4200, longitude: 78.4100 },
              createdAt: "2026-08-05T14:20:00Z",
              status: "Resolved",
              severity: "High",
              assignedOfficer: "Cmdr. Rajesh Kumar",
              resourceStatus: "Evacuation Complete"
            }
          ]);
        }
      } catch (err) {
        setReports([
          {
            _id: "INC-9042",
            type: "Fire",
            title: "Wildfire Cluster #4B",
            location: { address: "Sector 7 Corridor, Hyderabad" },
            createdAt: "2026-08-06T10:40:00Z",
            status: "Dispatched",
            severity: "Critical",
            assignedOfficer: "Capt. Sarah Jenkins",
            resourceStatus: "12 Drone Squadrons Dispatched"
          }
        ]);
      }
      setLoading(false);
    };

    fetchReports();
  }, []);

  return (
    <div className="w-full space-y-6 text-left font-sans">
      
      {/* Header */}
      <div className="p-6 rounded-3xl bg-slate-800/90 border border-slate-700 flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div>
          <span className="text-xs font-mono font-bold text-orange-500 uppercase tracking-wider block mb-1">
            CITIZEN SOS REPORTING HISTORY
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white">My Emergency Reports</h1>
          <p className="text-xs text-slate-300">Track real-time status timelines, assigned officers, and dispatch progress.</p>
        </div>

        <Link
          to="/dashboard/citizen/report"
          className="px-5 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-slate-950 font-bold text-xs flex items-center gap-2"
        >
          <FaPlus />
          <span>Report New Emergency SOS</span>
        </Link>
      </div>

      {/* Reports Feed */}
      <div className="space-y-4 font-mono text-xs">
        {reports.map(rep => (
          <div
            key={rep._id}
            className="p-6 rounded-2xl bg-slate-900 border border-slate-700 space-y-4 shadow-md hover:border-slate-600 transition-all"
          >
            {/* Top Row: ID, Category, Status Badge */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-orange-500 font-bold">{rep._id} • {rep.type}</span>
                <h3 className="text-base font-bold text-white font-sans mt-0.5">{rep.title}</h3>
                <span className="text-slate-400 font-sans text-xs">
                  {rep.location?.address} • Submitted: {new Date(rep.createdAt).toLocaleString()}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-lg border font-bold text-xs ${
                  rep.status === 'Resolved'
                    ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                    : rep.status === 'Dispatched'
                    ? 'bg-orange-950 text-orange-400 border-orange-800'
                    : 'bg-amber-950 text-amber-400 border-amber-800'
                }`}>
                  STATUS: {rep.status.toUpperCase()}
                </span>

                <Link
                  to={`/dashboard/report/${rep._id}`}
                  className="px-3 py-1 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold flex items-center gap-1 cursor-pointer"
                >
                  <FaEye className="text-orange-500" />
                  <span>View Timeline</span>
                </Link>
              </div>
            </div>

            {/* Status Timeline Bar */}
            <div className="grid grid-cols-4 gap-2 pt-2 border-t border-slate-800 font-sans text-[11px] text-center">
              <div className={`p-2 rounded-xl ${rep.status === 'Pending' || rep.status === 'Verified' || rep.status === 'Dispatched' || rep.status === 'Resolved' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/40 font-bold' : 'bg-slate-950 text-slate-600'}`}>
                1. Pending
              </div>
              <div className={`p-2 rounded-xl ${rep.status === 'Verified' || rep.status === 'Dispatched' || rep.status === 'Resolved' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/40 font-bold' : 'bg-slate-950 text-slate-600'}`}>
                2. Verified
              </div>
              <div className={`p-2 rounded-xl ${rep.status === 'Dispatched' || rep.status === 'Resolved' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/40 font-bold' : 'bg-slate-950 text-slate-600'}`}>
                3. Dispatched
              </div>
              <div className={`p-2 rounded-xl ${rep.status === 'Resolved' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold' : 'bg-slate-950 text-slate-600'}`}>
                4. Resolved
              </div>
            </div>

            {/* Officer & Resource Metadata */}
            <div className="pt-2 flex flex-wrap justify-between items-center text-slate-300 text-xs font-sans">
              <span>Assigned Officer: <strong className="text-orange-400">{rep.assignedOfficer || 'Capt. Sarah Jenkins'}</strong></span>
              <span>Resource Status: <strong className="text-cyan-400">{rep.resourceStatus || 'Rescue Squad En Route'}</strong></span>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}

export default MyReportsPage;
