import { sendError } from '../utils/responseHandler.js';

export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return sendError(res, 403, 'Forbidden: User role metadata not attached');
    }

    if (!allowedRoles.includes(req.user.role)) {
      return sendError(
        res, 
        403, 
        `Forbidden: Role '${req.user.role}' is not authorized to access this emergency resource`
      );
    }
    next();
  };
};
