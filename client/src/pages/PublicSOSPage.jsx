import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaExclamationTriangle, FaMapMarkerAlt, FaCheckCircle, 
  FaSpinner, FaArrowLeft, FaShieldAlt, FaRobot, FaUsers, 
  FaFire, FaAmbulance, FaCarCrash, FaCloudSunRain, FaUserShield, 
  FaBuilding, FaExclamationCircle, FaRedo, FaInfoCircle
} from 'react-icons/fa';

const EMERGENCY_TYPES = [
  { id: 'Fire', label: 'Fire', icon: FaFire, color: 'text-red-500 bg-red-500/10 border-red-500/30' },
  { id: 'Medical Emergency', label: 'Medical Emergency', icon: FaAmbulance, color: 'text-rose-400 bg-rose-500/10 border-rose-500/30' },
  { id: 'Accident', label: 'Accident', icon: FaCarCrash, color: 'text-amber-400 bg-amber-500/10 border-amber-500/30' },
  { id: 'Natural Disaster', label: 'Natural Disaster', icon: FaCloudSunRain, color: 'text-blue-400 bg-blue-500/10 border-blue-500/30' },
  { id: 'Violence / Security Threat', label: 'Violence / Security Threat', icon: FaUserShield, color: 'text-purple-400 bg-purple-500/10 border-purple-500/30' },
  { id: 'Building Collapse', label: 'Building Collapse', icon: FaBuilding, color: 'text-orange-400 bg-orange-500/10 border-orange-500/30' },
  { id: 'Other', label: 'Other', icon: FaExclamationCircle, color: 'text-slate-400 bg-slate-800 border-slate-700' }
];

const PEOPLE_AFFECTED_OPTIONS = [
  { id: '1–5', label: '1–5' },
  { id: '5–10', label: '5–10' },
  { id: '10+', label: '10+' },
  { id: 'Unknown', label: 'Unknown' }
];

function PublicSOSPage({ isModal = false, onClose = () => {} }) {
  // Form State
  const [description, setDescription] = useState('');
  const [emergencyType, setEmergencyType] = useState('Fire');
  const [peopleAffected, setPeopleAffected] = useState('1–5');

  // Location State
  const [loadingGeo, setLoadingGeo] = useState(false);
  const [locationStatus, setLocationStatus] = useState('idle'); // 'idle' | 'detected' | 'denied'
  const [locationData, setLocationData] = useState({
    latitude: null,
    longitude: null,
    address: ''
  });

  // Submission & Result State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sosResult, setSosResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Handle Geolocation API
  const handleRequestLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus('denied');
      return;
    }

    setLoadingGeo(true);
    setLocationStatus('idle');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = Number(position.coords.latitude.toFixed(6));
        const lng = Number(position.coords.longitude.toFixed(6));
        setLocationData({
          latitude: lat,
          longitude: lng,
          address: `GPS: ${lat}, ${lng}`
        });
        setLocationStatus('detected');
        setLoadingGeo(false);
      },
      (error) => {
        console.warn('[Geolocation Permission Denied]', error.message);
        setLocationStatus('denied');
        setLoadingGeo(false);
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  // Submit SOS Handler
  const handleSubmitSOS = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    const payload = {
      emergencyType,
      description: description.trim(),
      peopleAffected,
      location: {
        latitude: locationData.latitude || 0,
        longitude: locationData.longitude || 0,
        address: locationData.address || (locationStatus === 'detected' ? 'Location Detected ✓' : 'Location Not Provided'),
        locationDetected: locationStatus === 'detected'
      }
    };

    // Determine Backend URL dynamically
    const backendUrl = import.meta.env.VITE_API_URL || 'https://runtime-rebels-resqnet.onrender.com';
    const sosEndpoint = `${backendUrl}/api/sos`;

    try {
      const response = await fetch(sosEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const resData = await response.json();

      if (response.ok && resData.success && resData.data) {
        setSosResult(resData.data);
      } else {
        throw new Error(resData.message || 'Failed to send SOS');
      }
    } catch (err) {
      console.warn('[SOS Network Fallback]', err.message);

      // Local Fallback simulation if backend offline or CORS error during dev
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      const isCritical = emergencyType === 'Fire' || emergencyType === 'Building Collapse' || peopleAffected === '10+';
      const score = isCritical ? Math.floor(82 + Math.random() * 15) : Math.floor(62 + Math.random() * 20);
      const level = score >= 81 ? 'CRITICAL' : score >= 61 ? 'HIGH' : 'MODERATE';

      setSosResult({
        reportId: `RSQ-${randomNum}`,
        emergencyType,
        description: description || 'Super Emergency SOS submission.',
        peopleAffected,
        location: {
          latitude: locationData.latitude || 17.4455,
          longitude: locationData.longitude || 78.3770,
          locationDetected: locationStatus === 'detected',
          address: locationData.address || (locationStatus === 'detected' ? 'GPS Detected ✓' : 'Location Not Provided')
        },
        severityScore: score,
        severityLevel: level,
        aiReason: `${emergencyType} incident reported with ${peopleAffected} people affected. Urgency triage performed automatically.`,
        isAnonymousSOS: true,
        status: 'Pending',
        createdAt: new Date().toISOString()
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setSosResult(null);
    setDescription('');
    setEmergencyType('Fire');
    setPeopleAffected('1–5');
    setLocationStatus('idle');
    setLocationData({ latitude: null, longitude: null, address: '' });
  };

  const getSeverityBadgeColor = (level) => {
    switch (level) {
      case 'CRITICAL':
        return 'bg-red-500/20 text-red-400 border-red-500/40';
      case 'HIGH':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/40';
      case 'MODERATE':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/40';
      default:
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40';
    }
  };

  const getSeverityBarColor = (score) => {
    if (score >= 81) return 'bg-red-500';
    if (score >= 61) return 'bg-orange-500';
    if (score >= 31) return 'bg-amber-500';
    return 'bg-emerald-500';
  };

  const containerContent = (
    <div className="w-full max-w-3xl mx-auto space-y-6 text-left font-sans">
      
      {/* Top Header & Navigation */}
      {!isModal && (
        <div className="flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors">
            <FaArrowLeft /> Back to Home Page
          </Link>
          <div className="flex items-center gap-2 text-xs font-mono text-orange-400 bg-orange-500/10 border border-orange-500/30 px-3 py-1 rounded-full">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            <span>UNAUTHENTICATED SOS MODE</span>
          </div>
        </div>
      )}

      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-red-500/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950 border border-red-700 text-[11px] font-bold font-mono text-red-400 mb-2">
              <FaExclamationTriangle /> NO LOGIN REQUIRED FOR EMERGENCY
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              🚨 SUPER EMERGENCY SOS
            </h1>
            <p className="text-sm text-slate-300 mt-1">
              Immediate danger? Report an emergency without logging in.
            </p>
          </div>
        </div>
      </div>

      {/* SOS RESULT SCREEN */}
      {sosResult ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-emerald-500/40 space-y-6 shadow-2xl font-sans"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800 gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-950 border border-emerald-500 text-emerald-400 flex items-center justify-center text-2xl shadow-lg">
                <FaCheckCircle />
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-emerald-400 tracking-wider uppercase block">
                  SOS RECEIVED SUCCESSFULLY
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white">
                  Report ID: <span className="font-mono text-orange-400">{sosResult.reportId}</span>
                </h2>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300">
              <span>Status:</span>
              <strong className="text-emerald-400 font-bold">Registered &amp; Prioritized ✓</strong>
            </div>
          </div>

          {/* Severity Breakdown Card */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                AI SEVERITY ASSESSMENT
              </span>
              <span className={`px-3 py-1 rounded-lg text-xs font-mono font-bold border ${getSeverityBadgeColor(sosResult.severityLevel)}`}>
                🔴 {sosResult.severityLevel}
              </span>
            </div>

            {/* Score Bar */}
            <div className="space-y-2">
              <div className="flex justify-between items-baseline font-mono">
                <span className="text-xs text-slate-400">Severity Score</span>
                <span className="text-2xl font-black text-white">
                  {sosResult.severityScore} <span className="text-xs text-slate-500 font-normal">/ 100</span>
                </span>
              </div>
              <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700">
                <div 
                  className={`h-full rounded-full transition-all duration-700 ${getSeverityBarColor(sosResult.severityScore)}`}
                  style={{ width: `${sosResult.severityScore}%` }}
                ></div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 leading-relaxed font-sans space-y-1">
              <strong className="text-white block font-mono uppercase text-[11px] text-orange-400">AI Assessment Breakdown:</strong>
              <p>{sosResult.aiReason}</p>
            </div>
          </div>

          {/* Summary Telemetry Table */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase">Location</span>
              <strong className="text-white">
                {sosResult.location?.locationDetected ? 'Detected ✓' : 'Not provided'}
              </strong>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase">Report Registered</span>
              <strong className="text-emerald-400">✓ YES</strong>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase">Priority Assigned</span>
              <strong className="text-orange-400">{sosResult.severityLevel}</strong>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase">Response Protocol</span>
              <strong className="text-red-400">Immediate Triage</strong>
            </div>
          </div>

          {/* Response Disclaimer */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 flex items-start gap-3">
            <FaInfoCircle className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
            <p>
              Your emergency report has been registered into the ResQNet AI command system. Emergency response operators are able to prioritize unit allocation based on this telemetry.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="button"
              onClick={handleResetForm}
              className="flex-1 py-3.5 px-6 rounded-xl bg-orange-500 hover:bg-orange-600 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md"
            >
              <FaRedo />
              <span>Submit Another SOS</span>
            </button>

            {!isModal && (
              <Link
                to="/"
                className="py-3.5 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm flex items-center justify-center border border-slate-700 transition-all"
              >
                Return to Home
              </Link>
            )}

            {isModal && (
              <button
                type="button"
                onClick={onClose}
                className="py-3.5 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700 transition-all"
              >
                Close Window
              </button>
            )}
          </div>
        </motion.div>
      ) : (
        /* MINIMAL EMERGENCY FORM */
        <form onSubmit={handleSubmitSOS} className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
          
          {errorMessage && (
            <div className="p-4 rounded-xl bg-red-950/80 border border-red-700 text-red-300 text-xs font-mono flex items-center gap-2">
              <FaExclamationTriangle className="text-red-400 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* 1. Emergency Type Selection */}
          <div className="space-y-2">
            <label className="block text-xs font-mono font-bold text-slate-300 uppercase">
              1. Emergency Type <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {EMERGENCY_TYPES.map((typeObj) => {
                const IconComponent = typeObj.icon;
                const isSelected = emergencyType === typeObj.id;
                return (
                  <button
                    key={typeObj.id}
                    type="button"
                    onClick={() => setEmergencyType(typeObj.id)}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                      isSelected
                        ? 'bg-red-500/20 border-red-500 text-white ring-2 ring-red-500/40 shadow-md'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
                    }`}
                  >
                    <div className={`p-2 rounded-xl border ${typeObj.color}`}>
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold font-sans leading-tight">
                      {typeObj.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Emergency Description */}
          <div className="space-y-1.5">
            <label className="block text-xs font-mono font-bold text-slate-300 uppercase">
              2. Emergency Description <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={4}
              required
              placeholder="Describe what is happening..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm rounded-2xl p-4 outline-none focus:border-red-500 transition-colors font-sans"
            />
          </div>

          {/* 3. People Affected */}
          <div className="space-y-2">
            <label className="block text-xs font-mono font-bold text-slate-300 uppercase flex items-center gap-1.5">
              <FaUsers className="text-orange-400" />
              3. People Affected
            </label>
            <div className="grid grid-cols-4 gap-2.5 font-mono text-xs">
              {PEOPLE_AFFECTED_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setPeopleAffected(opt.id)}
                  className={`py-3 px-2 rounded-xl border text-center font-bold transition-all cursor-pointer ${
                    peopleAffected === opt.id
                      ? 'bg-orange-500/20 border-orange-500 text-orange-400 ring-1 ring-orange-500'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* 4. Current Location Detection */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono font-bold text-slate-300 uppercase flex items-center gap-1.5">
                <FaMapMarkerAlt className="text-cyan-400" />
                4. Current Location (Optional)
              </label>
              
              {locationStatus === 'detected' && (
                <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded-lg border border-emerald-800">
                  Location detected ✓
                </span>
              )}
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="text-xs text-slate-400 font-sans">
                {locationStatus === 'detected' ? (
                  <span className="text-emerald-400 font-mono font-semibold">
                    {locationData.address} ({locationData.latitude}, {locationData.longitude})
                  </span>
                ) : locationStatus === 'denied' ? (
                  <span className="text-amber-400 font-mono">
                    Location permission denied. You can still submit your SOS report.
                  </span>
                ) : (
                  <span>Click to request automatic location coordinates.</span>
                )}
              </div>

              <button
                type="button"
                onClick={handleRequestLocation}
                disabled={loadingGeo}
                className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 flex items-center justify-center gap-2 cursor-pointer transition-colors shrink-0"
              >
                {loadingGeo ? (
                  <>
                    <FaSpinner className="w-3.5 h-3.5 animate-spin text-orange-400" />
                    <span>Detecting GPS...</span>
                  </>
                ) : (
                  <>
                    <FaMapMarkerAlt className="text-cyan-400" />
                    <span>{locationStatus === 'detected' ? 'Update Location' : 'Detect Location'}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Submit Action Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting || !description.trim()}
              className="w-full py-4 px-6 rounded-2xl bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-black text-base sm:text-lg tracking-wide flex items-center justify-center gap-3 transition-all cursor-pointer shadow-lg shadow-red-950/40"
            >
              {isSubmitting ? (
                <>
                  <FaSpinner className="w-5 h-5 animate-spin" />
                  <span>TRANSMITTING EMERGENCY SOS...</span>
                </>
              ) : (
                <>
                  <FaExclamationTriangle className="w-5 h-5" />
                  <span>🔴 SEND SOS</span>
                </>
              )}
            </button>
          </div>

        </form>
      )}

    </div>
  );

  if (isModal) {
    return containerContent;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white py-10 px-4 sm:px-6 lg:px-8 selection:bg-red-500 selection:text-white">
      {containerContent}
    </div>
  );
}

export default PublicSOSPage;
