import {Router} from 'express';
import {asyncWrapper} from '../middleware/asyncWrapper.js';
import {controllers} from '../controllers/booksControllers.js';
import {auth} from '../middleware/auth.js';

export const booksRouter = Router();

booksRouter
  .route('/')
  .get(asyncWrapper(controllers.getAllBooks))
  .post(auth, asyncWrapper(controllers.createNewBook));

booksRouter
  .route('/:id')
  .get(asyncWrapper(controllers.getBook))
  .put(auth, asyncWrapper(controllers.updateBook))
  .patch(auth, asyncWrapper(controllers.patchBook))
  .delete(auth, asyncWrapper(controllers.deleteBook));
