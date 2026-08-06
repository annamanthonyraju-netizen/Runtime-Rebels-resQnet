import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  FaBoxes, FaArrowLeft, FaGasPump, FaBatteryThreeQuarters, 
  FaUserCheck, FaMapMarkerAlt, FaClock, FaCheckCircle, FaShieldAlt 
} from 'react-icons/fa';

function ResourceDetailPage() {
  const { resourceId } = useParams();
  const [resource, setResource] = useState(null);

  useEffect(() => {
    const fetchResource = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/resources/${resourceId}`);
        const resData = await res.json();
        if (res.ok && resData.data) {
          setResource(resData.data);
        } else {
          setResource({
            resourceId: resourceId || "FIRE-SQUAD-04",
            resourceType: "Fire",
            vehicleNumber: "TS-07-FT-9042",
            stationName: "Gachibowli Fire & Thermal Station",
            status: "Busy",
            assignedIncident: "INC-9042",
            location: { latitude: 17.4480, longitude: 78.3650, address: "Sector 7 Corridor, Hyderabad" },
            officerInCharge: "Capt. Sarah Jenkins",
            teamMembers: ["Capt. Sarah Jenkins", "Firefighter Anil P.", "Firefighter Vikram R."],
            equipment: ["12 Thermal Drones", "Hydraulic Rescue Cutter", "High Pressure Water Cannon", "Hazmat Suit Kit"],
            fuelLevel: 85,
            batteryLevel: 94,
            capacity: "6 Crew Members",
            eta: "4 mins"
          });
        }
      } catch (err) {
        setResource({
          resourceId: resourceId || "FIRE-SQUAD-04",
          resourceType: "Fire",
          vehicleNumber: "TS-07-FT-9042",
          stationName: "Gachibowli Fire & Thermal Station",
          status: "Busy",
          assignedIncident: "INC-9042",
          location: { latitude: 17.4480, longitude: 78.3650, address: "Sector 7 Corridor, Hyderabad" },
          officerInCharge: "Capt. Sarah Jenkins",
          teamMembers: ["Capt. Sarah Jenkins", "Firefighter Anil P."],
          equipment: ["12 Thermal Drones", "Hydraulic Rescue Cutter"],
          fuelLevel: 85,
          batteryLevel: 94,
          capacity: "6 Crew Members",
          eta: "4 mins"
        });
      }
    };

    fetchResource();
  }, [resourceId]);

  if (!resource) return <div className="p-8 text-center text-slate-400 font-mono">Loading resource telemetry...</div>;

  return (
    <div className="w-full space-y-6 text-left font-sans">
      
      <Link to="/dashboard/resources" className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white">
        <FaArrowLeft /> Back to Resource Directory
      </Link>

      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-800/90 border border-slate-700 flex flex-wrap items-center justify-between gap-6 shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-orange-500 font-mono font-bold text-sm">{resource.resourceId}</span>
            <span className="px-2.5 py-0.5 rounded text-[10px] bg-slate-900 border border-slate-800 text-cyan-400 font-mono font-bold">
              TYPE: {resource.resourceType.toUpperCase()}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">{resource.stationName}</h1>
          <p className="text-xs text-slate-300 font-mono mt-1">
            Vehicle Number: <strong>{resource.vehicleNumber}</strong> • Location: {resource.location?.address}
          </p>
        </div>

        <span className={`px-4 py-2 rounded-xl border font-bold text-sm font-mono ${
          resource.status === 'Available' ? 'bg-emerald-950 text-emerald-400 border-emerald-800' : 'bg-orange-950 text-orange-400 border-orange-800'
        }`}>
          STATUS: {resource.status.toUpperCase()}
        </span>
      </div>

      {/* Grid: Telemetry, Crew, Equipment, Mission History */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 font-mono text-xs">
        
        {/* Left Column: Telemetry & Equipment */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-700 space-y-4">
            <h2 className="text-base font-bold text-white font-sans border-b border-slate-800 pb-2">Vehicle &amp; Operational Telemetry</h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-slate-300">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">FUEL LEVEL</span>
                <strong className="text-amber-400 text-lg">{resource.fuelLevel}%</strong>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">BATTERY / POWER</span>
                <strong className="text-emerald-400 text-lg">{resource.batteryLevel}%</strong>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">ESTIMATED ETA</span>
                <strong className="text-cyan-400 text-lg">{resource.eta}</strong>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 space-y-1">
              <span className="text-slate-400 block font-bold">ASSIGNED MISSION INCIDENT</span>
              <strong className="text-orange-400 text-sm">{resource.assignedIncident || 'None (Station Standby)'}</strong>
            </div>
          </div>

          {/* Equipment List */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-700 space-y-3 font-sans">
            <h2 className="text-base font-bold text-white border-b border-slate-800 pb-2">On-Board Tactical Equipment</h2>
            <div className="flex flex-wrap gap-2">
              {resource.equipment?.map((eq, i) => (
                <span key={i} className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300">
                  ✓ {eq}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Officer & Crew Roster */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-700 space-y-4">
            <h2 className="text-base font-bold text-white font-sans border-b border-slate-800 pb-2">Officer In Charge &amp; Squad Roster</h2>
            
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-orange-400 font-bold block">COMMANDER</span>
              <p className="text-white text-sm font-bold font-sans">{resource.officerInCharge}</p>
            </div>

            <div className="space-y-2">
              <span className="text-slate-400 font-bold block">CREW MEMBERS ({resource.teamMembers?.length})</span>
              {resource.teamMembers?.map((m, i) => (
                <div key={i} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200">
                  {m}
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

export default ResourceDetailPage;
