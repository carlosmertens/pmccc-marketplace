import jwt from 'jsonwebtoken';
import { CreateAppError } from '../utils/createAppError.js';

export function auth(req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) return next(new CreateAppError('No Token. Access denied', 401));

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;

    next();
  } catch (error) {
    next(new CreateAppError('Invalid token', 400));
  }
}
