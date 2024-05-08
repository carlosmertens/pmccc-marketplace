import jwt from 'jsonwebtoken';
import {CreateAppError} from '../utils/createAppError.js';

/** Middleware function for authentication using JWT token */
export function auth(req, res, next) {
  /** Verify token in the request */
  const token = req.header('x-auth-token');
  if (!token) return next(new CreateAppError('No Token. Access denied', 401));

  try {
    /** Decode token and create user property on the request */
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;

    next();
  } catch (error) {
    next(new CreateAppError('Invalid token', 400));
  }
}

// /** Middleware function for authentication using JWT token */
// export const auth = async (req, res, next) => {
//   /** Verify token on request */
//   const token = req.header('x-auth-token');
//   if (!token)
//     return next(new CreateAppError('Access denied. No token provided!', 401));

//   try {
//     /** Decode token */
//     const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

//     /** Verify is user is admin */
//     if (!decoded.isAdmin)
//       return next(new CreateAppError('Access denied. Only admin allow!', 403));

//     /** Create user property on the request */
//     req.user = decoded;

//     next();
//   } catch (ex) {
//     next(new CreateAppError('Invalid token!', 400));
//   }
// };
