import { CreateAppError } from '../utils/createAppError.js';

export function validateHandler(validator) {
  return (req, res, next) => {
    const { error } = validator(req.body);
    if (error) return next(new CreateAppError(error.message, 400));

    next();
  };
}
