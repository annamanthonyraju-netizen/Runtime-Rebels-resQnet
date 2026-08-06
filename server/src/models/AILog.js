import mongoose from 'mongoose';

const aiLogSchema = new mongoose.Schema({
  eventId: { type: String, required: true },
  eventDescription: { type: String, required: true },
  confidenceScore: { type: Number, required: true },
  actionTaken: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('AILog', aiLogSchema);
