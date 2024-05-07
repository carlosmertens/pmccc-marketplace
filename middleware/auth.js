import jwt from 'jsonwebtoken';
import {CreateAppError} from '../utils/createAppError.js';

/** Middleware function for authentication using JWT token */
export const auth = async (req, res, next) => {
  /** Verify token on request */
  const token = req.header('x-auth-token');
  if (!token)
    return next(new CreateAppError('Access denied. No token provided!', 401));

  try {
    /** Decode token */
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    /** Verify is user is admin */
    if (!decoded.isAdmin)
      return next(new CreateAppError('Access denied. User is not admin!', 403));

    /** Create user property on the request */
    req.user = decoded;

    next();
  } catch (ex) {
    next(new CreateAppError('Invalid token!', 400));
  }
};
