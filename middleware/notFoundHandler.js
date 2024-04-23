import {AppError} from '../utils/appError.js';

export const notFoundHandler = (req, res, next) => {
  /**
   * Response status for not finding recurces at no especified routes.
   */
  // res.status(404).send({
  //   status: 'error',
  //   message: `Resource not found at ${req.originalUrl}`,
  // });

  next(new AppError(`Resource not found at ${req.originalUrl}`, 404));
};
