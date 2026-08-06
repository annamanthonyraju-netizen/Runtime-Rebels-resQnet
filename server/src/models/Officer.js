import mongoose from 'mongoose';

const officerSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  badgeNumber: { type: String, required: true },
  rank: { type: String, default: 'Field Commander' },
  assignedSector: { type: String, default: 'Sector 7' },
  unitStatus: { type: String, enum: ['Active', 'On Call', 'Off Duty'], default: 'Active' }
});

export default mongoose.model('Officer', officerSchema);
