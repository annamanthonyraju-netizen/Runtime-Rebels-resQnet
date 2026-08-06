import Incident from '../models/Incident.js';

export const createIncidentReport = async (data, userId, userName) => {
  const incident = await Incident.create({
    reporterId: userId,
    reporterName: userName || 'Citizen',
    type: data.type,
    title: data.title || `${data.type} SOS Emergency`,
    description: data.description || '',
    severity: data.severity || 'High',
    location: {
      latitude: data.location?.latitude || data.latitude || 17.4455,
      longitude: data.location?.longitude || data.longitude || 78.3770,
      address: data.location?.address || data.address || 'Hyderabad Sector 7 Corridor'
    },
    mediaUrls: data.mediaUrls || [],
    voiceUrl: data.voiceUrl || '',
    status: 'Pending',
    timeline: [
      { event: 'Emergency SOS Report Submitted by Citizen', updatedBy: userName || 'Citizen' }
    ]
  });
  return incident;
};

export const getMyIncidents = async (userId) => {
  return await Incident.find({ reporterId: userId }).sort({ createdAt: -1 });
};

export const getIncidentById = async (id) => {
  return await Incident.findById(id).populate('reporterId', 'fullName email phone');
};

export const getAllIncidents = async () => {
  return await Incident.find().sort({ createdAt: -1 });
};

export const updateIncidentStatus = async (id, status, assignedOfficer, resourceStatus) => {
  const incident = await Incident.findById(id);
  if (!incident) throw new Error('Incident not found');

  if (status) incident.status = status;
  if (assignedOfficer) incident.assignedOfficer = assignedOfficer;
  if (resourceStatus) incident.resourceStatus = resourceStatus;

  incident.timeline.push({
    event: `Status updated to ${status} (${resourceStatus || 'Processing'})`,
    updatedBy: assignedOfficer || 'Officer'
  });

  await incident.save();
  return incident;
};
