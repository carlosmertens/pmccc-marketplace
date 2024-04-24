import {CreateAppError} from '../utils/createAppError.js';

export const routeNotFoundHandler = (req, res, next) => {
  /**
   * Response status for not finding recurces at no especified routes.
   */
  next(new CreateAppError(`Resource not found at ${req.originalUrl}`, 404));
};
