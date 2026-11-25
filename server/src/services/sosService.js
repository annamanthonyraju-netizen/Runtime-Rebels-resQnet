import Incident from '../models/Incident.js';
import { analyzeSOSSeverity } from '../ai/services/sosAIService.js';

/**
 * Generate unique human-readable report ID e.g. RSQ-8492
 */
const generateReportId = async () => {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const candidateId = `RSQ-${randomNum}`;
  
  const existing = await Incident.findOne({ reportId: candidateId });
  if (existing) {
    return `RSQ-${Math.floor(1000 + Math.random() * 9000)}`;
  }
  return candidateId;
};

export const createAnonymousSOSReport = async (sosData, clientIp = '') => {
  const { emergencyType, description = '', peopleAffected = 'Unknown', location } = sosData;

  // Duplicate submission protection (prevent identical submission within 30s)
  const windowTime = new Date(Date.now() - 30 * 1000);
  const duplicate = await Incident.findOne({
    clientIp,
    type: emergencyType,
    description: description.trim(),
    createdAt: { $gte: windowTime }
  });

  if (duplicate) {
    return duplicate;
  }

  const reportId = await generateReportId();

  // Run AI Severity Triage
  let aiTriage;
  try {
    aiTriage = await analyzeSOSSeverity({ emergencyType, description, peopleAffected, location });
  } catch (err) {
    console.error('[AI Triage Failed, using fallback]', err.message);
    aiTriage = {
      severityScore: 75,
      severityLevel: 'HIGH',
      aiReason: 'AI severity analysis temporarily unavailable. Report has still been registered successfully.'
    };
  }

  // Map severityLevel to standard model severity enum ('Low', 'Medium', 'High', 'Critical')
  let modelSeverity = 'High';
  if (aiTriage.severityLevel === 'CRITICAL') modelSeverity = 'Critical';
  else if (aiTriage.severityLevel === 'HIGH') modelSeverity = 'High';
  else if (aiTriage.severityLevel === 'MODERATE') modelSeverity = 'Medium';
  else if (aiTriage.severityLevel === 'LOW') modelSeverity = 'Low';

  const latitude = location?.latitude !== undefined && location?.latitude !== null ? Number(location.latitude) : 0;
  const longitude = location?.longitude !== undefined && location?.longitude !== null ? Number(location.longitude) : 0;
  const hasLocation = !!(latitude || longitude);
  const address = location?.address || (hasLocation ? `GPS Coordinates (${latitude.toFixed(4)}, ${longitude.toFixed(4)})` : 'Location not provided / Permission denied');

  const title = `🚨 SUPER SOS: ${emergencyType} Emergency (${peopleAffected} affected)`;

  const incident = await Incident.create({
    reportId,
    reporterName: 'Anonymous SOS Reporter',
    type: emergencyType || 'Other',
    emergencyType: emergencyType || 'Other',
    title,
    description: description || 'Super Emergency SOS submission.',
    peopleAffected: peopleAffected || 'Unknown',
    severity: modelSeverity,
    severityScore: aiTriage.severityScore,
    severityLevel: aiTriage.severityLevel,
    aiReason: aiTriage.aiReason,
    isAnonymousSOS: true,
    clientIp,
    location: {
      latitude,
      longitude,
      address,
      locationDetected: hasLocation
    },
    status: 'Pending',
    timeline: [
      { event: `Super Emergency SOS Received (Report ID: ${reportId})`, updatedBy: 'System AI' }
    ]
  });

  return incident;
};
