export const ADMIN_STATS = [
  { label: 'Total Incidents', value: '1,428', change: '+12% this month', type: 'incidents' },
  { label: 'Active Incidents', value: '42', change: '-4 vs yesterday', type: 'active' },
  { label: 'Resolved Incidents', value: '1,386', change: '97.0% Resolution Rate', type: 'resolved' },
  { label: 'Registered Users', value: '18,450', change: '+1,240 new citizens', type: 'users' },
  { label: 'Active Rescue Teams', value: '184', change: '98.5% Operational', type: 'teams' }
];

export const INCIDENTS_BY_CATEGORY = [
  { name: 'Fire & Thermal', value: 420, color: '#F97316' },
  { name: 'Flood & Water', value: 380, color: '#3B82F6' },
  { name: 'Accidents', value: 290, color: '#EAB308' },
  { name: 'Medical SOS', value: 210, color: '#EF4444' },
  { name: 'Structural', value: 128, color: '#A855F7' }
];

export const MONTHLY_TRENDS = [
  { month: 'Jan', incidents: 120, resolved: 115 },
  { month: 'Feb', incidents: 140, resolved: 135 },
  { month: 'Mar', incidents: 210, resolved: 195 },
  { month: 'Apr', incidents: 180, resolved: 175 },
  { month: 'May', incidents: 290, resolved: 270 },
  { month: 'Jun', incidents: 340, resolved: 310 },
  { month: 'Jul', incidents: 420, resolved: 385 }
];

export const RESOURCE_UTILIZATION = [
  { resource: 'Fire Tenders', total: 60, deployed: 48 },
  { resource: 'Ambulances', total: 90, deployed: 76 },
  { resource: 'Rescue Boats', total: 40, deployed: 32 },
  { resource: 'Drone Squads', total: 30, deployed: 28 },
  { resource: 'Evac Buses', total: 80, deployed: 55 }
];

export const ADMIN_USERS = [
  { id: 'USR-891', name: 'Cmdr. Alex Vance', email: 'alex@resqnet.ai', role: 'Administrator', status: 'Active', joined: '2025-01-10' },
  { id: 'USR-892', name: 'Capt. Sarah Jenkins', email: 'sarah@resqnet.ai', role: 'Officer', status: 'Deployed', joined: '2025-02-14' },
  { id: 'USR-893', name: 'Rajesh Kumar', email: 'rajesh@gmail.com', role: 'Volunteer', status: 'Active', joined: '2025-03-01' },
  { id: 'USR-894', name: 'Pranay Sharma', email: 'pranay@gmail.com', role: 'Citizen', status: 'Active', joined: '2025-04-12' }
];

export const AI_LOGS = [
  { id: 'LOG-9941', timestamp: '10:42:01 AM', event: 'Thermal Anomaly Detected Sector 7', confidence: '99.4%', status: 'Auto-Triggered Drone Squad #4' },
  { id: 'LOG-9940', timestamp: '10:38:15 AM', event: 'Flood Vector Mapbox Re-indexed', confidence: '98.8%', status: 'Routes Auto-Optimized' },
  { id: 'LOG-9939', timestamp: '10:25:30 AM', event: 'NLP SOS Message Triage (Banjara Hills)', confidence: '97.2%', status: 'Priority Level 1 Assigned' }
];
