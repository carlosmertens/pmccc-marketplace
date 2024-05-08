import {CreateAppError} from '../utils/createAppError.js';

/** Response status for not finding recurces at no especified routes */
export const routeNotFoundHandler = (req, res, next) => {
  next(new CreateAppError(`Resource not found at ${req.originalUrl}`, 404));
};
