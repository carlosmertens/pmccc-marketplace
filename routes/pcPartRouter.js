import {Router} from 'express';
import {asyncWrapper} from '../middleware/asyncWrapper.js';
import {controllers} from '../controllers/pcPartsController.js';

export const pcPartRouter = Router();

pcPartRouter
  .route('/')
  .get(asyncWrapper(controllers.getAllPcParts))
  .post(asyncWrapper(controllers.createNewPcPart));

pcPartRouter
  .route('/:id')
  .get(asyncWrapper(controllers.getPcPart))
  .put(asyncWrapper(controllers.updatePcPart))
  .patch(asyncWrapper(controllers.patchPcPart))
  .delete(asyncWrapper(controllers.deletePcPart));
