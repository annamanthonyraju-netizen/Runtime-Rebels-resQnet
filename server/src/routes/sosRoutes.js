import express from 'express';
import { submitPublicSOS } from '../controllers/sosController.js';
import { sosRateLimiter } from '../middleware/rateLimitMiddleware.js';

const router = express.Router();

// Public SOS Submission Route (No Auth Required)
router.post('/', sosRateLimiter, submitPublicSOS);

export default router;
