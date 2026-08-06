export const runResourcePlanningAgent = async (incident, severityData) => {
  const isCritical = severityData?.predictedSeverity === 'Critical' || severityData?.output?.casualtyRiskIndex === 'CRITICAL';

  return {
    agentName: "Resource Planning Agent",
    agent: "Resource Planning Agent",
    step: 4,
    status: "COMPLETED",
    confidence: 0.95,
    recommendedResources: {
      fireTenders: isCritical ? 4 : 2,
      ambulances: isCritical ? 6 : 3,
      policeSquads: 3,
      medicalTeams: 2,
      volunteersNeeded: 15,
      heavyEquipment: ['1x Hydraulic Rescue Cutter', '2x Evacuation Buses', '1x Water Tanker']
    },
    estimatedPersonnel: isCritical ? 48 : 24,
    output: {
      allocatedUnits: [
        { unit: "Fire Squad #4", eta: "4 mins", route: "Bypassing Flooded Highway Exit 16" },
        { unit: "Rescue Boat Unit #2", eta: "6 mins", route: "Waterway Vector Delta" },
        { unit: "Ambulance SOS #08", eta: "3 mins", route: "Direct Corridor" }
      ],
      recommendedShelter: "Central High Community Shelter (0.8 km)"
    }
  };
};

export const runResourceAgent = runResourcePlanningAgent;
