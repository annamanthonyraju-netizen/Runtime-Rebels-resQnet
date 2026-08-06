import express from 'express';
import * as authController from '../controllers/authController.js';
import { registerValidation, loginValidation } from '../validators/authValidator.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerValidation, authController.register);
router.post('/login', loginValidation, authController.login);
router.get('/profile', protect, authController.getProfile);
router.put('/profile', protect, authController.updateProfile);
router.post('/refresh-token', authController.refreshToken);
router.post('/logout', authController.logout);

export default router;
