import * as resourceService from '../services/resourceService.js';
import { sendSuccess, sendError } from '../utils/responseHandler.js';
import { getIO } from '../sockets/socketManager.js';

export const getResources = async (req, res, next) => {
  try {
    const list = await resourceService.getResourcesList(req.query);
    return sendSuccess(res, 200, 'Resources retrieved successfully', list);
  } catch (err) {
    next(err);
  }
};

export const getResourceById = async (req, res, next) => {
  try {
    const resource = await resourceService.getResourceById(req.params.id);
    if (!resource) return sendError(res, 404, 'Resource not found');
    return sendSuccess(res, 200, 'Resource details retrieved', resource);
  } catch (err) {
    next(err);
  }
};

export const dispatchResource = async (req, res, next) => {
  try {
    const { resourceId, incidentId, officerName } = req.body;
    const dispatched = await resourceService.dispatchResourceToIncident(resourceId, incidentId, officerName);

    try {
      getIO().emit('resource-updated', dispatched);
      getIO().emit('notification-created', {
        type: 'UNIT DISPATCHED',
        title: `🚑 ${dispatched.resourceId || 'Unit'} Dispatched`,
        message: `Assigned to Incident ${incidentId}`
      });
    } catch (e) {}

    return sendSuccess(res, 200, 'Resource dispatched successfully', dispatched);
  } catch (err) {
    next(err);
  }
};

export const getHospitals = async (req, res, next) => {
  try {
    const hospitals = await resourceService.getHospitalsList();
    return sendSuccess(res, 200, 'Hospitals retrieved successfully', hospitals);
  } catch (err) {
    next(err);
  }
};

export const getReliefCamps = async (req, res, next) => {
  try {
    const camps = await resourceService.getReliefCampsList();
    return sendSuccess(res, 200, 'Relief camps retrieved successfully', camps);
  } catch (err) {
    next(err);
  }
};
