import { Router } from 'express';
import { asyncWrapper } from '../middleware/asyncWrapper.js';
import { controllers } from '../controllers/booksControllers.js';
import { auth } from '../middleware/auth.js';
import { admin } from '../middleware/admin.js';
import { isObjectId } from '../middleware/isObjectId.js';
import { validateHandler } from '../middleware/validate.js';
import { validate } from '../validators/index.js';

/** Base Route: /api/v2/books */

export const booksRouter = Router();

booksRouter
  .route('/')
  .get(asyncWrapper(controllers.getAllBooks))
  .post(
    [auth, admin, validateHandler(validate.createBook)],
    asyncWrapper(controllers.createBook)
  );

booksRouter
  .route('/:id')
  .get(isObjectId, asyncWrapper(controllers.getBook))
  .put(
    [isObjectId, auth, admin, validateHandler(validate.createBook)],
    asyncWrapper(controllers.updateBook)
  )
  .patch(
    [isObjectId, auth, admin, validateHandler(validate.patchBook)],
    asyncWrapper(controllers.patchBook)
  )
  .delete([isObjectId, auth, admin], asyncWrapper(controllers.deleteBook));

booksRouter
  .route('/:id/reviews')
  .get(isObjectId, asyncWrapper(controllers.getAllReviews))
  .post(
    [isObjectId, auth, validateHandler(validate.createReview)],
    asyncWrapper(controllers.createReview)
  );
