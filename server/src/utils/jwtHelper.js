import jwt from 'jsonwebtoken';
import { ENV } from '../config/env.js';

export const generateAccessToken = (userPayload) => {
  return jwt.sign(
    { id: userPayload._id || userPayload.id, role: userPayload.role, email: userPayload.email },
    ENV.JWT_SECRET,
    { expiresIn: ENV.JWT_EXPIRE }
  );
};

export const generateRefreshToken = (userPayload) => {
  return jwt.sign(
    { id: userPayload._id || userPayload.id, role: userPayload.role },
    ENV.JWT_REFRESH_SECRET,
    { expiresIn: ENV.JWT_REFRESH_EXPIRE }
  );
};

export const verifyAccessToken = (token) => {
  return jwt.verify(token, ENV.JWT_SECRET);
};

export const verifyRefreshToken = (token) => {
  return jwt.verify(token, ENV.JWT_REFRESH_SECRET);
};
