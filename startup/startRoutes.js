import { testRouter } from '../routes/testRouter.js';

export function startRoutes(app) {
  app.use('/test', testRouter);
}
