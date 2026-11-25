import * as sosService from '../services/sosService.js';
import { sendSuccess, sendError } from '../utils/responseHandler.js';
import { getIO } from '../sockets/socketManager.js';

export const submitPublicSOS = async (req, res, next) => {
  try {
    const { emergencyType, description, peopleAffected, location } = req.body;

    if (!emergencyType) {
      return sendError(res, 400, 'Emergency type is required.');
    }

    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';

    const incident = await sosService.createAnonymousSOSReport(
      { emergencyType, description, peopleAffected, location },
      clientIp
    );

    // Broadcast real-time Socket.IO alert to active officer dashboards
    try {
      getIO().emit('new-incident', incident);
      getIO().emit('sos-alert', {
        reportId: incident.reportId,
        type: incident.type,
        severityLevel: incident.severityLevel,
        timestamp: incident.createdAt
      });
    } catch (e) {
      // Socket emission non-blocking
    }

    return sendSuccess(
      res, 
      201, 
      'SOS received successfully. Your emergency report has been registered and prioritized.',
      {
        reportId: incident.reportId || incident._id,
        emergencyType: incident.emergencyType || incident.type,
        description: incident.description,
        peopleAffected: incident.peopleAffected,
        location: incident.location,
        severityScore: incident.severityScore,
        severityLevel: incident.severityLevel,
        aiReason: incident.aiReason,
        isAnonymousSOS: incident.isAnonymousSOS,
        status: incident.status,
        createdAt: incident.createdAt
      }
    );
  } catch (err) {
    next(err);
  }
};
