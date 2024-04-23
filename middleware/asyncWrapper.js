/**
 * Wraps an Express middleware function in an async function that catches any errors and sends a response.
 * @param ctr - the middleware controller function to wrap
 * @returns an async function that takes the request, response, and next function as parameters
 */
export function asyncWrapper(ctr) {
  return async (req, res, next) => {
    try {
      await ctr(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}
