import { body } from 'express-validator';
import { validateRequest } from './authValidator.js';

export const createIncidentValidation = [
  body('title').notEmpty().withMessage('Incident title is required'),
  body('type').isIn(['Fire', 'Flood', 'Accident', 'Medical', 'Structural', 'Storm']).withMessage('Invalid incident type'),
  body('priority').optional().isIn(['Low', 'Medium', 'High', 'Critical']).withMessage('Invalid priority level'),
  validateRequest
];
