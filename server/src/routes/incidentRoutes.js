import express from 'express';
import * as incidentController from '../controllers/incidentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, incidentController.createIncident);
router.get('/my-reports', protect, incidentController.getMyReports);
router.get('/:id', protect, incidentController.getIncidentById);
router.get('/', protect, incidentController.getIncidents);
router.put('/:id/status', protect, incidentController.updateStatus);

export default router;
