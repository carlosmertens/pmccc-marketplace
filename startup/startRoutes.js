import {testRouter} from '../routes/testRouter.js';
import {toursRouter} from '../routes/toursRouter.js';
import {booksRouter} from '../routes/booksRouter.js';
import {pcPartsRouter} from '../routes/pcPartsRouter.js';
import {videoGamesRouter} from '../routes/VideoGamesRouter.js';
import {userRouter} from '../routes/usersRouter.js';
import {ordersRouter} from '../routes/ordersRouter.js';
import {resourcesRouter} from '../routes/resourcesRouter.js';
import {routeNotFoundHandler} from '../middleware/routeNotFoundHandler.js';
import {errorHandler} from '../middleware/errorHandler.js';

/**
 * Starts the routes for the Express application.
 * @param {Express.Application} app - The Express application.
 */
export function startRoutes(app) {
  /**
   * Initialize the defined routes
   */
  app.use('/api/v1/test', testRouter);
  app.use('/api/v1/tours', toursRouter);
  app.use('/api/v1/books', booksRouter);
  app.use('/api/v1/pc-parts', pcPartsRouter);
  app.use('/api/v1/video-games', videoGamesRouter);
  app.use('/api/v1/users', userRouter);
  app.use('/api/v1/orders', ordersRouter);
  app.use('/api/v1/resources', resourcesRouter);

  /**
   * Handles routes not supported or defined in routes.
   */
  app.use('*', routeNotFoundHandler);

  /**
   * Handles errors globally.
   */
  app.use(errorHandler);
}
