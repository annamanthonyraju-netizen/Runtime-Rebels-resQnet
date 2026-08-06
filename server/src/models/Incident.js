import mongoose from 'mongoose';

const timelineSchema = new mongoose.Schema({
  event: { type: String, required: true },
  updatedBy: { type: String, default: 'System' },
  timestamp: { type: Date, default: Date.now }
});

const incidentSchema = new mongoose.Schema(
  {
    reporterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    reporterName: { type: String, default: 'Citizen' },
    type: {
      type: String,
      enum: [
        'Fire', 'Flood', 'Earthquake', 'Road Accident', 
        'Medical Emergency', 'Building Collapse', 'Landslide', 
        'Cyclone', 'Chemical Leak', 'Other'
      ],
      required: true
    },
    title: { type: String, required: true },
    description: { type: String, default: '' },
    severity: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'Critical'],
      default: 'High'
    },
    location: {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
      address: { type: String, required: true }
    },
    mediaUrls: [{ type: String }],
    voiceUrl: { type: String, default: '' },
    status: {
      type: String,
      enum: ['Pending', 'Verified', 'Dispatched', 'Resolved'],
      default: 'Pending'
    },
    assignedOfficer: { type: String, default: 'Unassigned' },
    resourceStatus: { type: String, default: 'Triage Pending' },
    timeline: [timelineSchema]
  },
  { timestamps: true }
);

export default mongoose.model('Incident', incidentSchema);
