import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaCog, FaUser, FaBell, FaGlobe, FaUniversalAccess, 
  FaLock, FaPhoneAlt, FaInfoCircle, FaArrowLeft, FaCheckCircle 
} from 'react-icons/fa';
import Navbar from '../components/common/Navbar';
import { useAuth } from '../context/AuthContext';

function SettingsPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [saved, setSaved] = useState(false);

  const [settingsState, setSettingsState] = useState({
    name: user?.name || 'Pranay Sharma',
    email: user?.email || 'pranay@resqnet.ai',
    phone: user?.phone || '+91 98765 43210',
    pushAlerts: true,
    smsBroadCast: true,
    language: 'English',
    highContrast: false,
    locationAccess: true
  });

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-12 px-4 sm:px-6 lg:px-8 w-full max-w-5xl mx-auto space-y-6 text-left">
        
        <Link to="/dashboard" className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white">
          <FaArrowLeft /> Return to Dashboard
        </Link>

        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-700 flex items-center gap-4 shadow-xl">
          <div className="p-3.5 rounded-2xl bg-orange-500 text-slate-950 font-bold">
            <FaCog className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">System Settings &amp; Configuration</h1>
            <p className="text-xs text-slate-400">Manage user profile, emergency notification channels, accessibility &amp; location privacy</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center gap-2 bg-slate-900 p-1.5 rounded-2xl border border-slate-800 text-xs font-mono">
          {[
            { id: 'profile', name: 'Profile', icon: FaUser },
            { id: 'notifications', name: 'Notifications', icon: FaBell },
            { id: 'language', name: 'Language & Theme', icon: FaGlobe },
            { id: 'accessibility', name: 'Accessibility', icon: FaUniversalAccess },
            { id: 'privacy', name: 'Privacy & GPS', icon: FaLock },
            { id: 'about', name: 'About', icon: FaInfoCircle }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === tab.id ? 'bg-orange-500 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>

        {/* Form Settings Area */}
        <div className="rounded-3xl bg-slate-900 border border-slate-700 p-6 sm:p-8 shadow-xl">
          
          {saved && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-950 border border-emerald-800 text-xs font-mono text-emerald-400 flex items-center gap-2">
              <FaCheckCircle /> Settings updated successfully!
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-4">
            
            {activeTab === 'profile' && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-2">User Profile Information</h3>
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-400 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={settingsState.name}
                    onChange={(e) => setSettingsState({ ...settingsState, name: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-400 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={settingsState.email}
                    onChange={(e) => setSettingsState({ ...settingsState, email: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-400 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={settingsState.phone}
                    onChange={(e) => setSettingsState({ ...settingsState, phone: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm outline-none"
                  />
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-4 font-mono text-xs">
                <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-2 font-sans">Emergency Alert Preferences</h3>
                <label className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 cursor-pointer">
                  <span>Push Emergency Alerts</span>
                  <input
                    type="checkbox"
                    checked={settingsState.pushAlerts}
                    onChange={(e) => setSettingsState({ ...settingsState, pushAlerts: e.target.checked })}
                    className="w-4 h-4 text-orange-500 rounded"
                  />
                </label>
                <label className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 cursor-pointer">
                  <span>SMS Cell Broadcast Warning</span>
                  <input
                    type="checkbox"
                    checked={settingsState.smsBroadCast}
                    onChange={(e) => setSettingsState({ ...settingsState, smsBroadCast: e.target.checked })}
                    className="w-4 h-4 text-orange-500 rounded"
                  />
                </label>
              </div>
            )}

            {activeTab === 'language' && (
              <div className="space-y-4 font-mono text-xs">
                <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-2 font-sans">Language &amp; Region</h3>
                <div>
                  <label className="block text-slate-400 mb-1">Preferred Language</label>
                  <select
                    value={settingsState.language}
                    onChange={(e) => setSettingsState({ ...settingsState, language: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl px-4 py-2.5 outline-none"
                  >
                    <option value="English">English (Default)</option>
                    <option value="Hindi">Hindi (हिंदी)</option>
                    <option value="Telugu">Telugu (తెలుగు)</option>
                  </select>
                </div>
              </div>
            )}

            {activeTab === 'privacy' && (
              <div className="space-y-4 font-mono text-xs">
                <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-2 font-sans">Privacy &amp; Location Access</h3>
                <label className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 cursor-pointer">
                  <span>Enable Browser GPS Location for Auto SOS Dispatch</span>
                  <input
                    type="checkbox"
                    checked={settingsState.locationAccess}
                    onChange={(e) => setSettingsState({ ...settingsState, locationAccess: e.target.checked })}
                    className="w-4 h-4 text-orange-500 rounded"
                  />
                </label>
              </div>
            )}

            {activeTab === 'about' && (
              <div className="space-y-3 font-mono text-xs">
                <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-2 font-sans">ResQnet AI System Info</h3>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span>Platform Version: <strong>v3.0.0 Production Release</strong></span><br />
                  <span>Build Architecture: <strong>React 19 + Express + Gemini AI Pipeline</strong></span><br />
                  <span>Security Encryption: <strong>256-Bit Mesh Protocol</strong></span>
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-slate-800">
              <button type="submit" className="px-6 py-3 rounded-xl bg-orange-500 text-slate-950 font-bold text-sm hover:bg-orange-600">
                Save Configuration
              </button>
            </div>

          </form>
        </div>

      </main>
    </div>
  );
}

export default SettingsPage;
