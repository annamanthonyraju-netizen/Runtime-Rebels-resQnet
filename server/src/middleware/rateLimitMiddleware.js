import { sendError } from '../utils/responseHandler.js';

// In-memory sliding rate limiter store for anonymous SOS submissions
const sosRateLimitMap = new Map();
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes window
const MAX_REQUESTS = 10; // Max 10 SOS submissions per 10 mins per IP

export const sosRateLimiter = (req, res, next) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
  const now = Date.now();

  if (!sosRateLimitMap.has(ip)) {
    sosRateLimitMap.set(ip, []);
  }

  const timestamps = sosRateLimitMap.get(ip).filter(ts => now - ts < WINDOW_MS);
  
  if (timestamps.length >= MAX_REQUESTS) {
    return sendError(
      res, 
      429, 
      'Too many emergency SOS requests from this connection. Please wait a few minutes before submitting another report.'
    );
  }

  timestamps.push(now);
  sosRateLimitMap.set(ip, timestamps);

  next();
};
