export const runNotificationAgent = async (incident, severityData) => {
  return {
    agentName: "Notification Agent",
    agent: 'Notification Agent',
    step: 6,
    status: "DISPATCHED",
    confidence: 0.99,
    generatedAlerts: {
      citizen: `🚨 EMERGENCY ALERT: ${incident?.type || 'Disaster'} reported near your zone. Please proceed to Central Shelter via Exit 16 North. Keep roads clear for emergency vehicles.`,
      officer: `⚡ DISPATCH COMMAND: ${severityData?.predictedSeverity || 'Critical'} ${incident?.type || 'Emergency'} reported. Fire Squad #4 & Ambulance Depot #108 auto-assigned.`,
      volunteer: `🤝 RELIEF TASK ASSIGNED: Report to Central Evacuation Camp for water bottle and food pouch distribution.`,
      admin: `📊 SYSTEM AUDIT: High priority ${incident?.type || 'Emergency'} incident registered in Sector 7. AI confidence score: 98.4%.`
    },
    output: {
      cellBroadcastSent: true,
      subscribersAlerted: 4850,
      commandAlertText: "HIGH PRIORITY DISPATCH: Fire Squad #4 & Ambulance #08 sent to Sector 7 Corridor.",
      citizenAlertText: "EVACUATION NOTICE: Sector 7 Residents move to Central High Shelter immediately."
    }
  };
};
