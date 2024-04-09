import { testRouter } from '../routes/testRouter.js';
import  { bookRouter } from '../routes/bookRouter.js';

export function startRoutes(app) {
  app.use('/api/v1/test', testRouter);
  //TODO: Everyone creates their own routes
  app.use('/api/books', bookRouter);//claudia workspace
}
