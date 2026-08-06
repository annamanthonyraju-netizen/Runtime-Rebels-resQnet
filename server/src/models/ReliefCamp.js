import mongoose from 'mongoose';

const reliefCampSchema = new mongoose.Schema(
  {
    campId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    location: {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
      address: { type: String, required: true }
    },
    capacity: { type: Number, default: 600 },
    currentOccupancy: { type: Number, default: 150 },
    foodAvailability: { type: String, default: '5,000 Food Pouches Stocked' },
    medicalSupport: { type: String, default: 'First Aid Triage Operational' },
    waterSupply: { type: String, default: 'Continuous Filtered Supply' }
  },
  { timestamps: true }
);

export default mongoose.model('ReliefCamp', reliefCampSchema);
