import {Router} from 'express';
import {asyncWrapper} from '../middleware/asyncWrapper.js';
import {controllers} from '../controllers/pcPartsController.js';
import {auth} from '../middleware/auth.js';
import {admin} from '../middleware/admin.js';

/** Base Route: /api/v1/pc-parts */

export const pcPartsRouter = Router();

pcPartsRouter
  .route('/')
  .get(asyncWrapper(controllers.getAllPcParts))
  .post([auth, admin], asyncWrapper(controllers.createNewPcPart));

pcPartsRouter
  .route('/:id')
  .get(asyncWrapper(controllers.getPcPart))
  .put([auth, admin], asyncWrapper(controllers.updatePcPart))
  .patch([auth, admin], asyncWrapper(controllers.patchPcPart))
  .delete([auth, admin], asyncWrapper(controllers.deletePcPart));

pcPartsRouter
  .route('/:id/reviews')
  .get(asyncWrapper(controllers.getAllReviews))
  .patch(asyncWrapper(controllers.createNewReview));
