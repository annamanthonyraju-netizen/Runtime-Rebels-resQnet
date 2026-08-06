import { sendError } from '../utils/responseHandler.js';
import { logger } from '../utils/logger.js';

export const errorHandler = (err, req, res, next) => {
  logger.error(err.message || 'Unhandled Server Error', { stack: err.stack, path: req.originalUrl });

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  return sendError(res, statusCode, message, err.errors || null);
};

export const notFoundHandler = (req, res, next) => {
  return sendError(res, 404, `Route not found: ${req.originalUrl}`);
};
