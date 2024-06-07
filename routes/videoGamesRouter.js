import { Router } from 'express';
import { asyncWrapper } from '../middleware/asyncWrapper.js';
import { controllers } from '../controllers/videoGamesControllers.js';
import { auth } from '../middleware/auth.js';
import { admin } from '../middleware/admin.js';

/** Base Route: /api/v1/video-games */

export const videoGamesRouter = Router();

videoGamesRouter
  .route('/')
  .get(asyncWrapper(controllers.getAllVideoGames))
  .post([auth, admin], asyncWrapper(controllers.createVideoGame));

videoGamesRouter
  .route('/:id')
  .get(asyncWrapper(controllers.getVideoGame))
  .put([auth, admin], asyncWrapper(controllers.updateVideoGame))
  .patch([auth, admin], asyncWrapper(controllers.patchVideoGame))
  .delete([auth, admin], asyncWrapper(controllers.deleteVideoGame));

videoGamesRouter
  .route('/:id/reviews')
  .get(asyncWrapper(controllers.getAllReviews))
  .patch(auth, asyncWrapper(controllers.createReview));
