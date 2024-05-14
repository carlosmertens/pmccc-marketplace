import {Router} from 'express';
import {asyncWrapper} from '../middleware/asyncWrapper.js';
import {controllers} from '../controllers/booksControllers.js';
import {auth} from '../middleware/auth.js';
import {admin} from '../middleware/admin.js';

/** Base Route: /api/v1/books */

export const booksRouter = Router();

booksRouter
  .route('/')
  .get(asyncWrapper(controllers.getAllBooks))
  .post([auth, admin], asyncWrapper(controllers.createNewBook));

booksRouter
  .route('/reviews')
  .get(asyncWrapper((req, res) => res.send('Reviews requested!')));

booksRouter
  .route('/:id')
  .get(asyncWrapper(controllers.getBook))
  .put([auth, admin], asyncWrapper(controllers.updateBook))
  .patch([auth, admin], asyncWrapper(controllers.patchBook))
  .delete([auth, admin], asyncWrapper(controllers.deleteBook));
