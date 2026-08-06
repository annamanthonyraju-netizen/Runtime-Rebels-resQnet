import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import { ENV } from './config/env.js';
import authRoutes from './routes/authRoutes.js';
import incidentRoutes from './routes/incidentRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import resourceRoutes from './routes/resourceRoutes.js';
import aiRoutes from './ai/routes/aiRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';
import { errorHandler, notFoundHandler } from './middleware/errorMiddleware.js';

const app = express();

// Security & Core Middleware
app.use(helmet());
app.use(cors({
  origin: ENV.CORS_ORIGIN,
  credentials: true
}));
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Root Health Check Route
app.get('/', (req, res) => {
  res.json({
    status: 'ONLINE',
    system: 'ResQnet AI Emergency Dispatch Backend',
    version: 'v3.0.0',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/v1/auth', authRoutes);

app.use('/api/incidents', incidentRoutes);
app.use('/api/v1/incidents', incidentRoutes);

app.use('/api/ai', aiRoutes);
app.use('/api/v1/ai', aiRoutes);

app.use('/api/resources', resourceRoutes);
app.use('/api/v1/resources', resourceRoutes);

app.use('/api/analytics', analyticsRoutes);
app.use('/api/v1/analytics', analyticsRoutes);

app.use('/api/notifications', notificationRoutes);
app.use('/api/v1/notifications', notificationRoutes);

// Error Handling Middleware
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
