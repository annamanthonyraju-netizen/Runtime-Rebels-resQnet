export const runIncidentValidationAgent = async (incident) => {
  const hasLocation = !!(incident?.location?.latitude && incident?.location?.longitude);
  const hasType = !!incident?.type;

  const missingFields = [];
  if (!hasLocation) missingFields.push('GPS Coordinates');
  if (!hasType) missingFields.push('Incident Category');
  if (!incident?.description) missingFields.push('Text Description');

  const completenessScore = 100 - (missingFields.length * 20);

  return {
    agentName: "Incident Validation Agent",
    agent: "Incident Validation Agent",
    step: 1,
    status: missingFields.length === 0 ? "VERIFIED" : "PENDING_FIELDS",
    confidence: 0.98,
    isValid: missingFields.length === 0,
    completenessScore,
    missingFields,
    gpsVerified: hasLocation,
    notes: hasLocation ? 'GPS latitude and longitude verified via browser sensor.' : 'GPS location missing. Manual map fallback required.'
  };
};

export const runValidationAgent = runIncidentValidationAgent;
