import {testRouter} from '../routes/testRouter.js';
import {toursRouter} from '../routes/toursRouter.js';
import {errorHandler} from '../middleware/errorHandler.js';
import {booksRouter} from '../routes/booksRouter.js';
import {pcPartsRouter} from '../routes/pcPartsRouter.js';
import {videoGamesRouter} from '../routes/VideoGamesRouter.js';
import {userRouter} from '../routes/usersRouter.js';
import {ordersRouter} from '../routes/ordersRouter.js';
import {resourcesRouter} from '../routes/resourcesRouter.js';

export function startRoutes(app) {
  app.use('/api/v1/test', testRouter);
  app.use('/api/v1/tours', toursRouter);
  app.use('/api/v1/books', booksRouter);
  app.use('/api/v1/pc-parts', pcPartsRouter);
  app.use('/api/v1/video-games', videoGamesRouter);
  app.use('/api/v1/users', userRouter);
  app.use('/api/v1/orders', ordersRouter);
  app.use('/api/v1/resources', resourcesRouter);
  app.use(errorHandler);
}
