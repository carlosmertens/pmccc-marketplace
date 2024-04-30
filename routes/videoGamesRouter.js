import {Router} from 'express';
import {asyncWrapper} from '../middleware/asyncWrapper.js';
import {controllers} from '../controllers/videoGamesControllers.js';

export const videoGamesRouter = Router();

videoGamesRouter
  .route('/')
  .get(asyncWrapper(controllers.getAllVideoGames))
  .post(asyncWrapper(controllers.createNewVideoGame));

videoGamesRouter
  .route('/:id')
  .get(asyncWrapper(controllers.getVideoGame))
  .put(asyncWrapper(controllers.updateVideoGame))
  .patch(asyncWrapper(controllers.patchVideoGame))
  .delete(asyncWrapper(controllers.deleteVideoGame));
