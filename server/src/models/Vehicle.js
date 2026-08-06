import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema({
  vehicleNumber: { type: String, required: true, unique: true },
  type: { type: String, enum: ['Fire Tender', 'Ambulance', 'Rescue Boat', 'Helicopter', 'Evac Bus'], required: true },
  assignedSector: String,
  status: { type: String, enum: ['Standby', 'Deployed', 'Maintenance'], default: 'Standby' },
  gpsLocation: {
    lat: Number,
    lng: Number
  }
});

export default mongoose.model('Vehicle', vehicleSchema);
