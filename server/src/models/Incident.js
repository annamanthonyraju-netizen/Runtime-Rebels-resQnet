import mongoose from 'mongoose';

const timelineSchema = new mongoose.Schema({
  event: { type: String, required: true },
  updatedBy: { type: String, default: 'System' },
  timestamp: { type: Date, default: Date.now }
});

const incidentSchema = new mongoose.Schema(
  {
    reportId: { type: String, unique: true, sparse: true },
    reporterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    reporterName: { type: String, default: 'Anonymous SOS Reporter' },
    type: {
      type: String,
      enum: [
        'Fire', 'Flood', 'Earthquake', 'Road Accident', 
        'Medical Emergency', 'Building Collapse', 'Landslide', 
        'Cyclone', 'Chemical Leak', 'Violence / Security Threat', 'Other'
      ],
      required: true
    },
    emergencyType: { type: String },
    title: { type: String, required: true },
    description: { type: String, default: '' },
    peopleAffected: {
      type: String,
      enum: ['1–5', '5–10', '10+', 'Unknown'],
      default: 'Unknown'
    },
    severity: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'Critical'],
      default: 'High'
    },
    severityScore: {
      type: Number,
      min: 0,
      max: 100,
      default: 75
    },
    severityLevel: {
      type: String,
      enum: ['LOW', 'MODERATE', 'HIGH', 'CRITICAL'],
      default: 'HIGH'
    },
    aiReason: { type: String, default: '' },
    isAnonymousSOS: { type: Boolean, default: false },
    clientIp: { type: String, default: '' },
    location: {
      latitude: { type: Number, default: 0 },
      longitude: { type: Number, default: 0 },
      address: { type: String, default: 'Location permission denied / Not provided' },
      locationDetected: { type: Boolean, default: false }
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
