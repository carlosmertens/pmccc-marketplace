import {CreateAppError} from '../utils/createAppError.js';

export function admin(req, res, next) {
  if (!req.user.isAdmin) return next(new CreateAppError('Access denied', 403));

  next();
}
