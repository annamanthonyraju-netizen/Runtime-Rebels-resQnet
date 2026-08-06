import mongoose from 'mongoose';

const hospitalSchema = new mongoose.Schema(
  {
    hospitalId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    location: {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
      address: { type: String, required: true }
    },
    bedsAvailable: { type: Number, default: 42 },
    icuBeds: { type: Number, default: 8 },
    emergencyCapacity: { type: String, default: 'High Availability' },
    bloodAvailability: { type: String, default: 'O+, A+, B+ Stocked' },
    contactNumber: { type: String, default: '+91 40 2300 1122' },
    status: { type: String, default: 'Operational' }
  },
  { timestamps: true }
);

export default mongoose.model('Hospital', hospitalSchema);
