import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
  room: { type: String, default: 'global-emergency' },
  senderName: { type: String, required: true },
  senderRole: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Chat', chatSchema);
