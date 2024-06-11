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
  app.use('/api/v2/tours', toursRouter);
  app.use('/api/v2/books', booksRouter);
  app.use('/api/v2/pc-parts', pcPartsRouter);
  app.use('/api/v2/video-games', videoGamesRouter);
  app.use('/api/v2/users', userRouter);
  app.use('/api/v2/auth', authRouter);
  app.use('/api/v2/orders', ordersRouter);
  app.use('/api/v2/resources', resourcesRouter);

  app.use('*', routeNotFoundHandler);

  app.use(errorHandler);
}
// Testing guthub rules
