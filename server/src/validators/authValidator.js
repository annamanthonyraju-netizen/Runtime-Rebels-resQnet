import { body, validationResult } from 'express-validator';
import { sendError } from '../utils/responseHandler.js';

export const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return sendError(res, 400, 'Validation Failed', errors.array());
  }
  next();
};

export const registerValidation = [
  body('fullName').notEmpty().withMessage('Full Name is required'),
  body('email').isEmail().withMessage('Valid email address is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('role').optional().isIn(['Citizen', 'Volunteer', 'Officer', 'Administrator']).withMessage('Invalid role'),
  validateRequest
];

export const loginValidation = [
  body('email').isEmail().withMessage('Valid email address is required'),
  body('password').notEmpty().withMessage('Password is required'),
  validateRequest
];
