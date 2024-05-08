/** Wraps an Express middleware function in an async function */
export function asyncWrapper(ctr) {
  return async (req, res, next) => {
    try {
      await ctr(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}
