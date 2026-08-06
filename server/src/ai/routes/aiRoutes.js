import express from 'express';
import { analyzeIncidentAI } from '../controllers/aiController.js';

const router = express.Router();

router.post('/analyze', analyzeIncidentAI);
router.post('/workflow', analyzeIncidentAI);

export default router;
