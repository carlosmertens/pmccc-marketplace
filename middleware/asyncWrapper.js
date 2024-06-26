import { CreateAppError } from '../utils/createAppError.js';
import { log } from '../logs/index.js';

/** Wraps an Express middleware function in an async function */
export function asyncWrapper(ctr) {
  return async (req, res, next) => {
    try {
      await ctr(req, res, next);
    } catch (error) {
      log.error(error);
      next(new CreateAppError('Internal Server Error', 500));
    }
  };
}
