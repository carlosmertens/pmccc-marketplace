import {Router} from 'express';
import {asyncWrapper} from '../middleware/asyncWrapper.js';
import {controllers} from '../controllers/toursControllers.js';
import {auth} from '../middleware/auth.js';

/** Base Route: /api/v1/tours */

export const toursRouter = Router();

toursRouter
  .route('/')
  .get(asyncWrapper(controllers.getAllTours))
  .post(auth, asyncWrapper(controllers.createNewTour));

toursRouter
  .route('/:id')
  .get(asyncWrapper(controllers.getTour))
  .put(auth, asyncWrapper(controllers.updateTour))
  .patch(auth, asyncWrapper(controllers.patchTour))
  .delete(auth, asyncWrapper(controllers.deleteTour));
