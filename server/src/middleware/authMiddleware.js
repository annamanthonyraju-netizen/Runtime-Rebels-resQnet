import { verifyAccessToken } from '../utils/jwtHelper.js';
import { sendError } from '../utils/responseHandler.js';

export const protect = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies && req.cookies.accessToken) {
      token = req.cookies.accessToken;
    }

    if (!token) {
      return sendError(res, 401, 'Unauthorized: Access token missing');
    }

    const decoded = verifyAccessToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    return sendError(res, 401, 'Unauthorized: Invalid or expired access token');
  }
};
