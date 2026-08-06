import express from 'express';
import * as notificationController from '../controllers/notificationController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, notificationController.getNotifications);
router.put('/read-all', protect, notificationController.markAllRead);
router.put('/:id/read', protect, notificationController.markRead);
router.post('/broadcast', protect, notificationController.createBroadcast);

export default router;
