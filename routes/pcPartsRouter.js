import {Router} from 'express';
import {asyncWrapper} from '../middleware/asyncWrapper.js';
import {controllers} from '../controllers/pcPartsController.js';
import {auth} from '../middleware/auth.js';

/** Base Route: /api/v1/pc-parts */

export const pcPartsRouter = Router();

pcPartsRouter
  .route('/')
  .get(asyncWrapper(controllers.getAllPcParts))
  .post(auth, asyncWrapper(controllers.createNewPcPart));

pcPartsRouter
  .route('/:id')
  .get(asyncWrapper(controllers.getPcPart))
  .put(auth, asyncWrapper(controllers.updatePcPart))
  .patch(auth, asyncWrapper(controllers.patchPcPart))
  .delete(auth, asyncWrapper(controllers.deletePcPart));
