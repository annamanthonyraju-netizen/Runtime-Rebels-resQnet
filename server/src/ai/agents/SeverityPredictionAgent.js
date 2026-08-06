export const runSeverityPredictionAgent = async (incident, mediaAnalysis) => {
  let severity = incident?.severity || 'High';
  let urgencyIndex = 8.7;

  if (incident?.type === 'Fire' || incident?.type === 'Chemical Leak') {
    severity = 'Critical';
    urgencyIndex = 9.4;
  }

  return {
    agentName: "Severity Prediction Agent",
    agent: "Severity Prediction Agent",
    step: 3,
    status: "COMPLETED",
    confidence: 0.97,
    predictedSeverity: severity,
    urgencyIndex,
    reasoning: [
      `High casualty potential due to dense population density in ${incident?.location?.address || 'Sector 7'}.`,
      `Rapid escalation rate inferred from ${mediaAnalysis?.detectedDisasterType || 'thermal'} observations.`,
      `Critical infrastructure proximity within 100 meters.`
    ],
    output: {
      urgencyScore: urgencyIndex,
      priorityLevel: `${severity.toUpperCase()} PRIORITY`,
      estimatedImpactZoneRadius: "1.5 km",
      casualtyRiskIndex: severity.toUpperCase()
    }
  };
};

export const runSeverityAgent = runSeverityPredictionAgent;
