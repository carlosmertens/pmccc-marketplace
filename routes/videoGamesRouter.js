import {Router} from 'express';
import {asyncWrapper} from '../middleware/asyncWrapper.js';
import {controllers} from '../controllers/videoGamesControllers.js';
import {auth} from '../middleware/auth.js';

export const videoGamesRouter = Router();

videoGamesRouter
  .route('/')
  .get(asyncWrapper(controllers.getAllVideoGames))
  .post(auth, asyncWrapper(controllers.createNewVideoGame));

videoGamesRouter
  .route('/:id')
  .get(asyncWrapper(controllers.getVideoGame))
  .put(auth, asyncWrapper(controllers.updateVideoGame))
  .patch(auth, asyncWrapper(controllers.patchVideoGame))
  .delete(auth, asyncWrapper(controllers.deleteVideoGame));
