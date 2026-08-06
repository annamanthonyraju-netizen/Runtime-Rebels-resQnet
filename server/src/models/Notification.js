import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
  {
    recipientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    targetRole: {
      type: String,
      enum: ['All', 'Citizen', 'Volunteer', 'Officer', 'Administrator'],
      default: 'All'
    },
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: {
      type: String,
      enum: [
        'Emergency Alert', 'Dispatch Alert', 'Resource Assigned', 
        'Officer Assigned', 'Volunteer Assigned', 'AI Analysis Completed', 
        'Incident Resolved', 'Weather Alert', 'System Alert'
      ],
      default: 'Emergency Alert'
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'Critical'],
      default: 'High'
    },
    isRead: { type: Boolean, default: false },
    scope: { type: String, default: 'Entire City' },
    metadata: { type: Object, default: {} }
  },
  { timestamps: true }
);

export default mongoose.model('Notification', notificationSchema);
