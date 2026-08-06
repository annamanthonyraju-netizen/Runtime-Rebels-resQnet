import { Link, NavLink, useLocation } from 'react-router-dom';
import { 
  FaShieldAlt, FaChartLine, FaExclamationTriangle, FaMapMarkedAlt, 
  FaRobot, FaBoxOpen, FaChartBar, FaCog, FaSignOutAlt, FaTimes, 
  FaChevronRight, FaPhoneAlt, FaFileAlt, FaHome, FaCheckCircle, 
  FaUsers, FaComments, FaTerminal 
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

function Sidebar({ mobileOpen, setMobileOpen }) {
  const location = useLocation();
  const { user, logout } = useAuth();

  // Detect role from URL path (e.g. /dashboard/officer => officer) or user object
  let activeRole = user?.role || 'Citizen';
  if (location.pathname.includes('/dashboard/officer')) activeRole = 'Officer';
  else if (location.pathname.includes('/dashboard/volunteer')) activeRole = 'Volunteer';
  else if (location.pathname.includes('/dashboard/admin')) activeRole = 'Administrator';
  else if (location.pathname.includes('/dashboard/citizen')) activeRole = 'Citizen';

  const roleLower = activeRole.toLowerCase();

  let NAV_ITEMS = [];

  if (roleLower === 'officer') {
    NAV_ITEMS = [
      { id: 'dashboard', name: 'Dashboard', icon: FaChartLine, href: '/dashboard/officer' },
      { id: 'incident-queue', name: 'Incident Queue', icon: FaExclamationTriangle, href: '/dashboard/officer/incident-queue' },
      { id: 'incident-verification', name: 'Incident Verification', icon: FaCheckCircle, href: '/dashboard/officer/incident-verification' },
      { id: 'map', name: 'Live GIS Map', icon: FaMapMarkedAlt, href: '/dashboard/officer/map' },
      { id: 'dispatch-resources', name: 'Dispatch Resources', icon: FaBoxOpen, href: '/dashboard/officer/dispatch-resources' },
      { id: 'team-status', name: 'Team Status', icon: FaUsers, href: '/dashboard/officer/team-status' },
      { id: 'analytics', name: 'Analytics', icon: FaChartBar, href: '/dashboard/officer/analytics' },
      { id: 'settings', name: 'Settings', icon: FaCog, href: '/dashboard/officer/settings' }
    ];
  } else if (roleLower === 'volunteer') {
    NAV_ITEMS = [
      { id: 'dashboard', name: 'Dashboard', icon: FaChartLine, href: '/dashboard/volunteer' },
      { id: 'assigned-tasks', name: 'Assigned Tasks', icon: FaCheckCircle, href: '/dashboard/volunteer/assigned-tasks' },
      { id: 'map', name: 'Live GIS Map', icon: FaMapMarkedAlt, href: '/dashboard/volunteer/map' },
      { id: 'resources', name: 'Resources', icon: FaBoxOpen, href: '/dashboard/volunteer/resources' },
      { id: 'communication', name: 'Team Communication', icon: FaComments, href: '/dashboard/volunteer/communication' },
      { id: 'notifications', name: 'Notifications', icon: FaPhoneAlt, href: '/dashboard/volunteer/notifications' },
      { id: 'settings', name: 'Settings', icon: FaCog, href: '/dashboard/volunteer/settings' }
    ];
  } else if (roleLower === 'administrator' || roleLower === 'admin') {
    NAV_ITEMS = [
      { id: 'dashboard', name: 'Platform Overview', icon: FaChartLine, href: '/dashboard/admin' },
      { id: 'map', name: 'Live GIS Map', icon: FaMapMarkedAlt, href: '/dashboard/admin/map' },
      { id: 'resources', name: 'Resources & Units', icon: FaBoxOpen, href: '/dashboard/admin/resources' },
      { id: 'users', name: 'Users', icon: FaUsers, href: '/dashboard/admin/users' },
      { id: 'officers', name: 'Officers', icon: FaShieldAlt, href: '/dashboard/admin/officers' },
      { id: 'volunteers', name: 'Volunteers', icon: FaUsers, href: '/dashboard/admin/volunteers' },
      { id: 'incident-management', name: 'Incident Management', icon: FaExclamationTriangle, href: '/dashboard/admin/incident-management' },
      { id: 'ai-logs', name: 'AI Logs', icon: FaTerminal, href: '/dashboard/admin/ai-logs' },
      { id: 'analytics', name: 'Analytics', icon: FaChartBar, href: '/dashboard/admin/analytics' },
      { id: 'settings', name: 'Settings', icon: FaCog, href: '/dashboard/admin/settings' }
    ];
  } else {
    // Default Citizen Role Nav
    NAV_ITEMS = [
      { id: 'dashboard', name: 'Dashboard', icon: FaChartLine, href: '/dashboard/citizen' },
      { id: 'report', name: 'Report Emergency', icon: FaExclamationTriangle, href: '/dashboard/citizen/report' },
      { id: 'my-reports', name: 'My Reports', icon: FaFileAlt, href: '/dashboard/citizen/my-reports' },
      { id: 'emergency-contacts', name: 'Emergency Contacts', icon: FaPhoneAlt, href: '/dashboard/citizen/emergency-contacts' },
      { id: 'shelters', name: 'Nearby Shelters', icon: FaHome, href: '/dashboard/citizen/shelters' },
      { id: 'ai-assistant', name: 'AI Assistant', icon: FaRobot, href: '/dashboard/citizen/ai-assistant' },
      { id: 'settings', name: 'Settings', icon: FaCog, href: '/dashboard/citizen/settings' }
    ];
  }

  return (
    <>
      {/* Backdrop for Mobile Drawer */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 lg:hidden"
        ></div>
      )}

      <aside className={`fixed top-0 left-0 bottom-0 z-50 w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 ${
        mobileOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        
        <div>
          {/* Sidebar Top Logo */}
          <div className="h-20 px-6 flex items-center justify-between border-b border-slate-800">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-orange-500 flex items-center justify-center text-slate-950 font-bold">
                <FaShieldAlt className="w-5 h-5 text-slate-950" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white font-sans">
                ResQnet <span className="text-orange-500">AI</span>
              </span>
            </Link>

            <button
              onClick={() => setMobileOpen(false)}
              className="lg:hidden text-slate-400 hover:text-white"
            >
              <FaTimes className="w-5 h-5" />
            </button>
          </div>

          {/* User Role Badge */}
          <div className="p-4 mx-4 my-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between font-mono text-xs">
            <div>
              <span className="text-slate-400 block">ROLE CONSOLE</span>
              <span className="text-orange-500 font-bold uppercase">{activeRole}</span>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          </div>

          {/* Navigation Items */}
          <nav className="px-3 space-y-1 font-sans max-h-[calc(100vh-220px)] overflow-y-auto">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.id}
                  to={item.href}
                  end={item.href === '/dashboard/citizen' || item.href === '/dashboard/officer' || item.href === '/dashboard/volunteer' || item.href === '/dashboard/admin'}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-orange-500 text-slate-950 font-bold shadow-sm'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
                        <span>{item.name}</span>
                      </div>
                      {isActive && <FaChevronRight className="w-3 h-3 text-slate-950" />}
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Logout Button at Bottom */}
        <div className="p-4 border-t border-slate-800">
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-950 hover:bg-red-950 text-red-400 border border-slate-800 hover:border-red-800 text-sm font-bold transition-all cursor-pointer"
          >
            <FaSignOutAlt className="w-4 h-4" />
            <span>Logout Session</span>
          </button>
        </div>

      </aside>
    </>
  );
}

export default Sidebar;
