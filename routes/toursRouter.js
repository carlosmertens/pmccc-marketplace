import { Router } from 'express';
import { asyncWrapper } from '../middleware/asyncWrapper.js';
import { controllers } from '../controllers/toursControllers.js';
import { auth } from '../middleware/auth.js';
import { admin } from '../middleware/admin.js';

/** Base Route: /api/v1/tours */

export const toursRouter = Router();

toursRouter
  .route('/')
  .get(asyncWrapper(controllers.getAllTours))
  .post([auth, admin], asyncWrapper(controllers.createTour));

toursRouter
  .route('/:id')
  .get(asyncWrapper(controllers.getTour))
  .put([auth, admin], asyncWrapper(controllers.updateTour))
  .patch([auth, admin], asyncWrapper(controllers.patchTour))
  .delete([auth, admin], asyncWrapper(controllers.deleteTour));

toursRouter
  .route('/:id/reviews')
  .get(asyncWrapper(controllers.getAllReviews))
  .patch(auth, asyncWrapper(controllers.createReview));
