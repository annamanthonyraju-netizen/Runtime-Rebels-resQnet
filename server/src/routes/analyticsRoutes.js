import express from 'express';
import * as analyticsController from '../controllers/analyticsController.js';

const router = express.Router();

router.get('/overview', analyticsController.getOverviewAnalytics);
router.get('/trends', analyticsController.getIncidentTrends);
router.get('/ai-performance', analyticsController.getAiPerformance);

export default router;
