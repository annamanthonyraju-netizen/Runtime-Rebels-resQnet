import Resource from '../models/Resource.js';
import Hospital from '../models/Hospital.js';
import ReliefCamp from '../models/ReliefCamp.js';
import { runResourcePlanningAgent } from '../ai/agents/ResourcePlanningAgent.js';

export const getResourcesList = async (query = {}) => {
  const filter = {};
  if (query.type) filter.resourceType = query.type;
  if (query.status) filter.status = query.status;
  if (query.search) {
    filter.$or = [
      { resourceId: { $regex: query.search, $options: 'i' } },
      { stationName: { $regex: query.search, $options: 'i' } },
      { vehicleNumber: { $regex: query.search, $options: 'i' } }
    ];
  }

  let resources = await Resource.find(filter).sort({ createdAt: -1 });

  // Return initial seed resources if database is empty
  if (resources.length === 0) {
    resources = [
      {
        resourceId: "AMB-108-A",
        resourceType: "Ambulance",
        vehicleNumber: "TS-09-EQ-4089",
        stationName: "108 SOS Dispatch Depot",
        status: "Available",
        location: { latitude: 17.4380, longitude: 78.3900, address: "Madhapur 108 Depot" },
        officerInCharge: "Paramedic Rahul V.",
        teamMembers: ["Paramedic Rahul V.", "Driver Suresh K."],
        equipment: ["Defibrillator", "Oxygen Tank", "Trauma Kit"],
        fuelLevel: 92,
        batteryLevel: 100,
        capacity: "2 Patients",
        eta: "3 mins"
      },
      {
        resourceId: "FIRE-SQUAD-04",
        resourceType: "Fire",
        vehicleNumber: "TS-07-FT-9042",
        stationName: "Gachibowli Fire Station",
        status: "Busy",
        assignedIncident: "INC-9042",
        location: { latitude: 17.4480, longitude: 78.3650, address: "Sector 7 Corridor" },
        officerInCharge: "Capt. Sarah Jenkins",
        teamMembers: ["Capt. Sarah Jenkins", "Firefighter Anil P.", "Firefighter Vikram R."],
        equipment: ["12 Thermal Drones", "Hydraulic Rescue Cutter", "Water Cannon"],
        fuelLevel: 85,
        batteryLevel: 94,
        capacity: "6 Crew Members",
        eta: "4 mins"
      },
      {
        resourceId: "POL-SQD-12",
        resourceType: "Police",
        vehicleNumber: "TS-09-POL-100",
        stationName: "Madhapur Police Station",
        status: "Available",
        location: { latitude: 17.4400, longitude: 78.3800, address: "Madhapur Command Node" },
        officerInCharge: "Inspector David P.",
        teamMembers: ["Inspector David P.", "Constable Ramesh K."],
        equipment: ["Tactical Radio", "Barrier Spike Strip", "First Aid Kit"],
        fuelLevel: 98,
        batteryLevel: 100,
        capacity: "4 Patrol Officers",
        eta: "2 mins"
      },
      {
        resourceId: "VOL-SQUAD-01",
        resourceType: "Volunteer",
        vehicleNumber: "N/A - Foot Patrol",
        stationName: "Central Relief Hub",
        status: "Available",
        location: { latitude: 17.4520, longitude: 78.3820, address: "Central Shelter Camp" },
        officerInCharge: "Volunteer Lead Priya N.",
        teamMembers: ["Priya N.", "Karan S.", "Deepak M."],
        equipment: ["Food Pouches", "Water Bottles", "First Aid Kit"],
        fuelLevel: 100,
        batteryLevel: 100,
        capacity: "15 Volunteers",
        eta: "5 mins"
      }
    ];
  }

  return resources;
};

export const getResourceById = async (id) => {
  const resource = await Resource.findOne({ resourceId: id });
  if (resource) return resource;

  const list = await getResourcesList();
  return list.find(r => r.resourceId === id) || list[0];
};

export const dispatchResourceToIncident = async (resourceId, incidentId, officerName) => {
  let resource = await Resource.findOne({ resourceId });
  if (!resource) {
    return {
      resourceId,
      status: 'Busy',
      assignedIncident: incidentId,
      officerInCharge: officerName || 'Officer Command'
    };
  }

  resource.status = 'Busy';
  resource.assignedIncident = incidentId;
  if (officerName) resource.officerInCharge = officerName;

  await resource.save();
  return resource;
};

export const getHospitalsList = async () => {
  let hospitals = await Hospital.find();
  if (hospitals.length === 0) {
    hospitals = [
      { hospitalId: "HOSP-01", name: "Apollo Emergency Hospital", location: { latitude: 17.4300, longitude: 78.4050, address: "Jubilee Hills Link" }, bedsAvailable: 42, icuBeds: 8, emergencyCapacity: "High", contactNumber: "+91 40 2300 1122" },
      { hospitalId: "HOSP-02", name: "KIMS Trauma Care Center", location: { latitude: 17.4600, longitude: 78.3700, address: "Kondapur Main Road" }, bedsAvailable: 18, icuBeds: 4, emergencyCapacity: "Medium", contactNumber: "+91 40 2300 4455" }
    ];
  }
  return hospitals;
};

export const getReliefCampsList = async () => {
  let camps = await ReliefCamp.find();
  if (camps.length === 0) {
    camps = [
      { campId: "SHELTER-01", name: "Central High Community Shelter", location: { latitude: 17.4520, longitude: 78.3820, address: "Sector 7 Corridor" }, capacity: 600, currentOccupancy: 150, foodAvailability: "5,000 Pouches", waterSupply: "Filtered Continuous" }
    ];
  }
  return camps;
};
