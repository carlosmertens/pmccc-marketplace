import {Router} from 'express';
import {asyncWrapper} from '../middleware/asyncWrapper.js';
import {controllers} from '../controllers/resourcesController.js';

export const resourcesRouter = Router();

// localhost:8000/api/v1/resources/list
resourcesRouter.get('/list', asyncWrapper(controllers.getResourcesList));
