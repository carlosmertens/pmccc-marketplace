import { toursRouter } from '../routes/toursRouter.js';
import { booksRouter } from '../routes/booksRouter.js';
import { pcPartsRouter } from '../routes/pcPartsRouter.js';
import { videoGamesRouter } from '../routes/videoGamesRouter.js';
import { userRouter } from '../routes/usersRouter.js';
import { authRouter } from '../routes/authRouter.js';
import { ordersRouter } from '../routes/ordersRouter.js';
import { resourcesRouter } from '../routes/resourcesRouter.js';
import { routeNotFoundHandler } from '../middleware/routeNotFoundHandler.js';
import { errorHandler } from '../middleware/errorHandler.js';

export function startRoutes(app) {
  app.use('/api/v1/tours', toursRouter);
  app.use('/api/v1/books', booksRouter);
  app.use('/api/v1/pc-parts', pcPartsRouter);
  app.use('/api/v1/video-games', videoGamesRouter);
  app.use('/api/v1/users', userRouter);
  app.use('/api/v1/auth', authRouter);
  app.use('/api/v1/orders', ordersRouter);
  app.use('/api/v1/resources', resourcesRouter);

  app.use('*', routeNotFoundHandler);

  app.use(errorHandler);
}
