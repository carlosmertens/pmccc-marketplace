import {Router} from 'express';
import {asyncWrapper} from '../middleware/asyncWrapper.js';
import {controllers} from '../controllers/resourcesController.js';

/** Base Route: /api/v1/resources/ */

export const resourcesRouter = Router();

resourcesRouter.get('/list', asyncWrapper(controllers.getResourcesList));
