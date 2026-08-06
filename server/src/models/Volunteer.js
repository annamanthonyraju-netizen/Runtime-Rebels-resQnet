import mongoose from 'mongoose';

const volunteerSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  skills: [String],
  availabilityStatus: { type: Boolean, default: true },
  assignedTasks: [String],
  assignedLocation: String
});

export default mongoose.model('Volunteer', volunteerSchema);
