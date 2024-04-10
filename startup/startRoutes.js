import {testRouter} from '../routes/testRouter.js';
import {toursRouter} from '../routes/toursRouter.js';
import {errorHandler} from '../middleware/errorHandler.js';
import { userRouter } from '../routes/usersRouter.js';
import { orderRouter } from '../routes/orderRouter.js';

export function startRoutes(app) {
  app.use('/api/v1/test', testRouter);
  //TODO: Everyone creates their own routes
  app.use('/api/v1/tours', toursRouter);
  app.use('/api/v1/users', userRouter);
  app.use('/api/v1/orders', orderRouter);
  app.use(errorHandler);
}
