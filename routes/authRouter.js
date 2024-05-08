import {Router} from 'express';
import {controllers} from '../controllers/authControllers.js';

/** Base Route: /api/v1/auth */

export const authRouter = Router();

authRouter.post('/', controllers.authUser);
