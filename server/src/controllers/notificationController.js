import * as notificationService from '../services/notificationService.js';
import { sendSuccess, sendError } from '../utils/responseHandler.js';
import { getIO } from '../sockets/socketManager.js';

export const getNotifications = async (req, res, next) => {
  try {
    const list = await notificationService.getNotificationsList(req.user?.role, req.user?.id);
    return sendSuccess(res, 200, 'Notifications retrieved successfully', list);
  } catch (err) {
    next(err);
  }
};

export const markRead = async (req, res, next) => {
  try {
    const notif = await notificationService.markAsRead(req.params.id);
    return sendSuccess(res, 200, 'Notification marked as read', notif);
  } catch (err) {
    next(err);
  }
};

export const markAllRead = async (req, res, next) => {
  try {
    await notificationService.markAllAsRead(req.user?.role, req.user?.id);
    return sendSuccess(res, 200, 'All notifications marked as read');
  } catch (err) {
    next(err);
  }
};

export const createBroadcast = async (req, res, next) => {
  try {
    const notif = await notificationService.broadcastNotification(req.body);

    try {
      getIO().emit('notification-created', notif);
      getIO().to(`role:${(notif.targetRole || 'all').toLowerCase()}`).emit('notification-created', notif);
    } catch (e) {}

    return sendSuccess(res, 201, 'Emergency broadcast dispatched successfully', notif);
  } catch (err) {
    next(err);
  }
};
