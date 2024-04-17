import {Router} from 'express';
import {asyncWrapper} from '../middleware/asyncWrapper.js';
import {controllers} from '../controllers/booksControllers.js';

export const booksRouter = Router();

booksRouter
  .route('/')
  .get(asyncWrapper(controllers.getAllBooks))
  .post(asyncWrapper(controllers.createNewBook));

booksRouter
  .route('/:id')
  .get(asyncWrapper(controllers.getBook))
  .put(asyncWrapper(controllers.updateBook))
  .patch(asyncWrapper(controllers.patchBook))
  .delete(asyncWrapper(controllers.deleteBook));
