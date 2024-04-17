import {Router} from 'express';
import {asyncWrapper} from '../middleware/asyncWrapper.js';
import {controllers} from '../controllers/pcPartsController.js';

export const pcPartsRouter = Router();

pcPartsRouter
  .route('/')
  .get(asyncWrapper(controllers.getAllPcParts))
  .post(asyncWrapper(controllers.createNewPcPart));

pcPartsRouter
  .route('/:id')
  .get(asyncWrapper(controllers.getPcPart))
  .put(asyncWrapper(controllers.updatePcPart))
  .patch(asyncWrapper(controllers.patchPcPart))
  .delete(asyncWrapper(controllers.deletePcPart));
