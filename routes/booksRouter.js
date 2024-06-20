import { Router } from 'express';
import { asyncWrapper } from '../middleware/asyncWrapper.js';
import { controllers } from '../controllers/booksControllers.js';
import { auth } from '../middleware/auth.js';
import { admin } from '../middleware/admin.js';
import { isObjectId } from '../middleware/isObjectId.js';

/** Base Route: /api/v1/books */

export const booksRouter = Router();

booksRouter
  .route('/')
  .get(asyncWrapper(controllers.getAllBooks))
  .post([auth, admin], asyncWrapper(controllers.createBook));

booksRouter
  .route('/:id')
  .get(isObjectId, asyncWrapper(controllers.getBook))
  .put([isObjectId, auth, admin], asyncWrapper(controllers.updateBook))
  .patch([isObjectId, auth, admin], asyncWrapper(controllers.patchBook))
  .delete([isObjectId, auth, admin], asyncWrapper(controllers.deleteBook));

booksRouter
  .route('/:id/reviews')
  .get(isObjectId, asyncWrapper(controllers.getAllReviews))
  .post([isObjectId, auth], asyncWrapper(controllers.createReview));
