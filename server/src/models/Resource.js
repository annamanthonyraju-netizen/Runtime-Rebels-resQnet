import mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema(
  {
    resourceId: { type: String, required: true, unique: true },
    resourceType: {
      type: String,
      enum: [
        'Police', 'Police Patrol', 'Fire', 'Fire Response', 
        'Ambulance', 'Medical', 'Rescue', 'Disaster Response', 
        'NDRF', 'SDRF', 'Volunteer', 'NGO', 'Helicopter', 'Drone'
      ],
      required: true
    },
    vehicleNumber: { type: String, default: 'N/A' },
    location: {
      latitude: { type: Number, required: true, default: 17.4455 },
      longitude: { type: Number, required: true, default: 78.3770 },
      address: { type: String, default: 'Hyderabad Command Corridor' }
    },
    stationName: { type: String, default: 'Central Emergency Depot' },
    status: {
      type: String,
      enum: ['Available', 'Busy', 'Maintenance', 'Offline'],
      default: 'Available'
    },
    assignedIncident: { type: String, default: 'None' },
    officerInCharge: { type: String, default: 'Unassigned' },
    teamMembers: [{ type: String }],
    equipment: [{ type: String }],
    fuelLevel: { type: Number, default: 95 },
    batteryLevel: { type: Number, default: 100 },
    capacity: { type: String, default: 'Standard Crew' },
    eta: { type: String, default: '4 mins' }
  },
  { timestamps: true }
);

export default mongoose.model('Resource', resourceSchema);
