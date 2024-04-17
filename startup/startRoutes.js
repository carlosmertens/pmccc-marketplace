import {testRouter} from '../routes/testRouter.js';
import {toursRouter} from '../routes/toursRouter.js';
import {errorHandler} from '../middleware/errorHandler.js';
import {bookRouter} from '../routes/bookRouter.js';
import {pcPartRouter} from '../routes/pcPartRouter.js';
import videoGameRouter from '../routes/VideoGamesRoutes.js';
import {userRouter} from '../routes/usersRouter.js';
import {orderRouter} from '../routes/orderRouter.js';

export function startRoutes(app) {
  app.use('/api/v1/test', testRouter);
  app.use('/api/v1/tours', toursRouter);
  app.use('/api/v1/books', bookRouter);
  app.use('/api/v1/pc-parts', pcPartRouter);
  app.use('/api/v1/video-games', videoGameRouter);
  app.use('/api/v1/users', userRouter);
  app.use('/api/v1/orders', orderRouter);
  app.use(errorHandler);
}
