import * as incidentService from '../services/incidentService.js';
import { sendSuccess, sendError } from '../utils/responseHandler.js';
import { getIO } from '../sockets/socketManager.js';

export const createIncident = async (req, res, next) => {
  try {
    const incident = await incidentService.createIncidentReport(
      req.body, 
      req.user?.id, 
      req.user?.fullName || req.user?.name
    );
    
    // Broadcast via Socket.IO so it immediately appears on Officer Dashboard
    try {
      getIO().emit('new-incident', incident);
    } catch (e) {}

    return sendSuccess(res, 201, 'Incident report submitted successfully', incident);
  } catch (err) {
    next(err);
  }
};

export const getMyReports = async (req, res, next) => {
  try {
    const reports = await incidentService.getMyIncidents(req.user?.id);
    return sendSuccess(res, 200, 'My reports retrieved successfully', reports);
  } catch (err) {
    next(err);
  }
};

export const getIncidentById = async (req, res, next) => {
  try {
    const incident = await incidentService.getIncidentById(req.params.id);
    if (!incident) return sendError(res, 404, 'Incident report not found');
    return sendSuccess(res, 200, 'Incident report retrieved', incident);
  } catch (err) {
    next(err);
  }
};

export const getIncidents = async (req, res, next) => {
  try {
    const incidents = await incidentService.getAllIncidents();
    return sendSuccess(res, 200, 'Incidents retrieved successfully', incidents);
  } catch (err) {
    next(err);
  }
};

export const updateStatus = async (req, res, next) => {
  try {
    const { status, assignedOfficer, resourceStatus } = req.body;
    const incident = await incidentService.updateIncidentStatus(
      req.params.id, 
      status, 
      assignedOfficer, 
      resourceStatus
    );

    try {
      getIO().emit('incident-updated', incident);
    } catch (e) {}

    return sendSuccess(res, 200, 'Incident status updated', incident);
  } catch (err) {
    next(err);
  }
};
