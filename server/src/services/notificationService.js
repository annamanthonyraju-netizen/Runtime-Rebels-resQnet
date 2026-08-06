import Notification from '../models/Notification.js';

export const getNotificationsList = async (userRole, userId) => {
  let query = {
    $or: [
      { targetRole: 'All' },
      { targetRole: userRole || 'Citizen' },
      { recipientId: userId }
    ]
  };

  let notifications = await Notification.find(query).sort({ createdAt: -1 });

  if (notifications.length === 0) {
    notifications = [
      {
        _id: "NOTIF-901",
        title: "🚨 Wildfire Alert - Sector 7 Corridor",
        message: "High thermal anomaly confirmed. 12 Drone Squadrons Dispatched. Air quality warning active.",
        type: "Emergency Alert",
        priority: "Critical",
        targetRole: "All",
        isRead: false,
        createdAt: new Date().toISOString()
      },
      {
        _id: "NOTIF-902",
        title: "⚠️ Coastal Storm Surge Level 2",
        message: "Water level reached 1.4m near Zone 12 Harbor gates. Evacuation routes optimized via Exit 16.",
        type: "Weather Alert",
        priority: "High",
        targetRole: "All",
        isRead: false,
        createdAt: new Date(Date.now() - 3600000).toISOString()
      },
      {
        _id: "NOTIF-903",
        title: "🚑 Rescue Unit Dispatched: AMB-108-A",
        message: "Unit AMB-108-A assigned to Incident INC-9042. ETA: 3 minutes.",
        type: "Dispatch Alert",
        priority: "High",
        targetRole: "Officer",
        isRead: true,
        createdAt: new Date(Date.now() - 7200000).toISOString()
      }
    ];
  }

  return notifications;
};

export const markAsRead = async (id) => {
  const notif = await Notification.findById(id);
  if (notif) {
    notif.isRead = true;
    await notif.save();
  }
  return notif;
};

export const markAllAsRead = async (userRole, userId) => {
  await Notification.updateMany(
    { $or: [{ targetRole: 'All' }, { targetRole: userRole }, { recipientId: userId }] },
    { $set: { isRead: true } }
  );
  return { success: true };
};

export const broadcastNotification = async (payload) => {
  const notif = await Notification.create({
    title: payload.title,
    message: payload.message,
    type: payload.type || 'Emergency Alert',
    priority: payload.priority || 'High',
    targetRole: payload.targetRole || 'All',
    scope: payload.scope || 'Entire City'
  });
  return notif;
};
