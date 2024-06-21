import { Router } from 'express';
import { controllers } from '../controllers/authControllers.js';
import { asyncWrapper } from '../middleware/asyncWrapper.js';
import { auth } from '../middleware/auth.js';

/** Base Route: /api/v2/auth */

export const authRouter = Router();

authRouter.post('/', asyncWrapper(controllers.authUser));

authRouter.post('/enable-admin', auth, asyncWrapper(controllers.enableAdmin));
