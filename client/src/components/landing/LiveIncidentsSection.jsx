import { Link } from 'react-router-dom';
import IncidentCard from '../incident/IncidentCard';
import { FaArrowRight, FaBroadcastTower } from 'react-icons/fa';

const sampleIncidents = [
  {
    type: 'fire',
    title: 'Industrial Fire Cluster',
    location: 'Hyderabad',
    priority: 'high',
    status: '12 Drone Squadrons Dispatched',
    timeAgo: 'Reported 2 mins ago'
  },
  {
    type: 'flood',
    title: 'River Inundation & Surge',
    location: 'Vijayawada',
    priority: 'medium',
    status: 'Evacuation Geo-Fence Active',
    timeAgo: 'Reported 10 mins ago'
  },
  {
    type: 'accident',
    title: 'Multi-Vehicle Highway Collision',
    location: 'Gachibowli',
    priority: 'high',
    status: 'Ambulance Assigned',
    timeAgo: 'Reported Now'
  },
  {
    type: 'hazard',
    title: 'Structural Cracks - Flyover #4',
    location: 'Vizag Coastal Sector',
    priority: 'low',
    status: 'Traffic Auto-Rerouted',
    timeAgo: 'Reported 18 mins ago'
  }
];

function LiveIncidentsSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-orange-500 uppercase tracking-wider mb-1">
            <FaBroadcastTower className="w-3.5 h-3.5 animate-pulse" />
            <span>Real-Time Incident Stream</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-sans">
            Live Active Incidents
          </h2>
        </div>

        <Link
          to="/map"
          className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-sm font-semibold text-orange-400 flex items-center gap-2 border border-slate-700 transition-all"
        >
          <span>View Full GIS Map</span>
          <FaArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {sampleIncidents.map((inc) => (
          <IncidentCard
            key={inc.title}
            type={inc.type}
            title={inc.title}
            location={inc.location}
            priority={inc.priority}
            status={inc.status}
            timeAgo={inc.timeAgo}
          />
        ))}
      </div>
    </section>
  );
}

export default LiveIncidentsSection;
