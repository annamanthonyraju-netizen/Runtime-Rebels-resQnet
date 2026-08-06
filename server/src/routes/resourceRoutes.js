import express from 'express';
import * as resourceController from '../controllers/resourceController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', resourceController.getResources);
router.get('/hospitals', resourceController.getHospitals);
router.get('/relief-camps', resourceController.getReliefCamps);
router.get('/:id', resourceController.getResourceById);
router.post('/dispatch', protect, resourceController.dispatchResource);

export default router;
