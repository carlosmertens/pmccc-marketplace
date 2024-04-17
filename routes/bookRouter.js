import {Router} from 'express';
import {asyncWrapper} from '../middleware/asyncWrapper.js';
import {controllers} from '../controllers/booksControllers.js';

export const bookRouter = Router();

bookRouter
  .route('/')
  .get(asyncWrapper(controllers.getAllBooks))
  .post(asyncWrapper(controllers.createNewBook));

bookRouter
  .route('/:id')
  .get(asyncWrapper(controllers.getBook))
  .put(asyncWrapper(controllers.updateBook))
  .patch(asyncWrapper(controllers.patchBook))
  .delete(asyncWrapper(controllers.deleteBook));
