import { testRouter } from '../routes/testRouter.js';

export function startRoutes(app) {
  app.use('/api/v1/test', testRouter);
  //TODO: Everyone creates their own routes
}
