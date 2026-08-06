import * as authService from '../services/authService.js';
import { sendSuccess, sendError } from '../utils/responseHandler.js';
import { verifyRefreshToken, generateAccessToken } from '../utils/jwtHelper.js';

export const register = async (req, res, next) => {
  try {
    const result = await authService.registerUser(req.body);

    res.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return sendSuccess(res, 201, 'User registered successfully', result);
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await authService.loginUser(email, password);

    res.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return sendSuccess(res, 200, 'Login successful', result);
  } catch (err) {
    next(err);
  }
};

export const getProfile = async (req, res, next) => {
  try {
    const user = await authService.getUserProfile(req.user.id);
    return sendSuccess(res, 200, 'Profile retrieved successfully', user);
  } catch (err) {
    next(err);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const updated = await authService.updateUserProfile(req.user.id, req.body);
    return sendSuccess(res, 200, 'Profile updated successfully', updated);
  } catch (err) {
    next(err);
  }
};

export const refreshToken = async (req, res, next) => {
  try {
    const token = req.cookies.refreshToken || req.body.refreshToken;
    if (!token) {
      return sendError(res, 401, 'Refresh token missing');
    }

    const decoded = verifyRefreshToken(token);
    const newAccessToken = generateAccessToken({ id: decoded.id, role: decoded.role });

    return sendSuccess(res, 200, 'Access token refreshed', { accessToken: newAccessToken });
  } catch (err) {
    return sendError(res, 401, 'Invalid or expired refresh token');
  }
};

export const logout = async (req, res) => {
  res.clearCookie('refreshToken');
  return sendSuccess(res, 200, 'Logged out successfully');
};
