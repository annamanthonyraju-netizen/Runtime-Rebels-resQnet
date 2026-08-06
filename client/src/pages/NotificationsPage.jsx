import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaBell, FaCheckDouble, FaTrash, FaSearch, FaFilter, 
  FaExclamationTriangle, FaBullhorn, FaBroadcastTower, FaArrowLeft, FaCheck 
} from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useSocket } from '../context/SocketContext';

function NotificationsPage() {
  const { user } = useAuth();
  const { setUnreadCount } = useSocket();
  const [notifications, setNotifications] = useState([]);
  const [filterPriority, setFilterPriority] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/notifications', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('resqnet_jwt_token') || ''}`
          }
        });
        const resData = await res.json();
        if (res.ok && resData.data) {
          setNotifications(resData.data);
        } else {
          setNotifications([
            {
              _id: "NOTIF-901",
              title: "🚨 Wildfire Alert - Sector 7 Corridor",
              message: "High thermal anomaly confirmed. 12 Drone Squadrons Dispatched. Air quality warning active.",
              type: "Emergency Alert",
              priority: "Critical",
              targetRole: "All",
              isRead: false,
              createdAt: new Date().toISOString()
            },
            {
              _id: "NOTIF-902",
              title: "⚠️ Coastal Storm Surge Level 2",
              message: "Water level reached 1.4m near Zone 12 Harbor gates. Evacuation routes optimized via Exit 16.",
              type: "Weather Alert",
              priority: "High",
              targetRole: "All",
              isRead: false,
              createdAt: new Date(Date.now() - 3600000).toISOString()
            },
            {
              _id: "NOTIF-903",
              title: "🚑 Rescue Unit Dispatched: AMB-108-A",
              message: "Unit AMB-108-A assigned to Incident INC-9042. ETA: 3 minutes.",
              type: "Dispatch Alert",
              priority: "High",
              targetRole: "Officer",
              isRead: true,
              createdAt: new Date(Date.now() - 7200000).toISOString()
            }
          ]);
        }
      } catch (err) {
        setNotifications([
          {
            _id: "NOTIF-901",
            title: "🚨 Wildfire Alert - Sector 7 Corridor",
            message: "High thermal anomaly confirmed. 12 Drone Squadrons Dispatched.",
            type: "Emergency Alert",
            priority: "Critical",
            targetRole: "All",
            isRead: false,
            createdAt: new Date().toISOString()
          }
        ]);
      }
    };

    fetchNotifications();
  }, []);

  const handleMarkAllRead = async () => {
    try {
      await fetch('http://localhost:5000/api/notifications/read-all', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('resqnet_jwt_token') || ''}`
        }
      });
    } catch (e) {}

    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    setUnreadCount(0);
  };

  const handleMarkRead = (id) => {
    setNotifications(prev => prev.map(n => n._id === id ? { ...n, isRead: true } : n));
  };

  const handleDelete = (id) => {
    setNotifications(prev => prev.filter(n => n._id !== id));
  };

  const filteredNotifications = notifications.filter(n => {
    const matchSearch = (n.title || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
                        (n.message || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchPriority = filterPriority === 'All' || n.priority === filterPriority;
    return matchSearch && matchPriority;
  });

  const unreadNum = notifications.filter(n => !n.isRead).length;

  return (
    <div className="w-full space-y-6 text-left font-sans">
      
      {/* Header Bar */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-800/90 border border-slate-700 flex flex-wrap items-center justify-between gap-6 shadow-xl">
        <div>
          <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-400 border border-amber-500/40 uppercase">
            REAL-TIME IN-APP ALERT FEED
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">Notification Center</h1>
          <p className="text-xs text-slate-300">Targeted emergency alerts, dispatch updates, and weather warnings.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/dashboard/alerts"
            className="px-5 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-sm"
          >
            <FaBullhorn />
            <span>Broadcast Emergency Alert</span>
          </Link>
          <button
            onClick={handleMarkAllRead}
            className="px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white font-bold text-xs flex items-center gap-2 cursor-pointer"
          >
            <FaCheckDouble className="text-emerald-400" />
            <span>Mark All Read</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-700 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
        <div className="relative flex-1 max-w-md">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-3.5 h-3.5" />
          <input
            type="text"
            placeholder="Search alerts or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 focus:border-orange-500 text-white placeholder-slate-500 rounded-xl pl-10 pr-4 py-2.5 outline-none font-sans text-xs"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-bold uppercase">PRIORITY:</span>
          {['All', 'Critical', 'High', 'Medium', 'Low'].map(p => (
            <button
              key={p}
              onClick={() => setFilterPriority(p)}
              className={`px-3 py-1 rounded-xl border text-[11px] font-bold cursor-pointer transition-all ${
                filterPriority === p
                  ? 'bg-orange-500 text-slate-950 border-orange-400'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Notifications Feed List */}
      <div className="space-y-3 font-sans">
        {filteredNotifications.map(n => (
          <div
            key={n._id}
            className={`p-5 rounded-2xl border transition-all flex flex-wrap items-start justify-between gap-4 ${
              !n.isRead ? 'bg-slate-900 border-orange-500/50 shadow-md' : 'bg-slate-900/60 border-slate-800'
            }`}
          >
            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-2 font-mono text-xs">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  n.priority === 'Critical' ? 'bg-red-950 text-red-400 border border-red-800' : 'bg-amber-950 text-amber-400 border border-amber-800'
                }`}>
                  {n.priority.toUpperCase()}
                </span>
                <span className="text-slate-400">• {n.type}</span>
                <span className="text-slate-500">• {new Date(n.createdAt).toLocaleTimeString()}</span>
              </div>
              <h3 className="text-base font-bold text-white mt-1">{n.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">{n.message}</p>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs">
              {!n.isRead && (
                <button
                  onClick={() => handleMarkRead(n._id)}
                  className="px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-emerald-400 border border-slate-800 font-bold flex items-center gap-1 cursor-pointer"
                >
                  <FaCheck /> Mark Read
                </button>
              )}
              <button
                onClick={() => handleDelete(n._id)}
                className="p-2 rounded-lg bg-slate-950 hover:bg-red-950 text-slate-400 hover:text-red-400 border border-slate-800 cursor-pointer"
              >
                <FaTrash className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default NotificationsPage;
