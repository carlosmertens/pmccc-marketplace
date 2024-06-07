import { Router } from 'express';
import { controllers } from '../controllers/userControllers.js';
import { asyncWrapper } from '../middleware/asyncWrapper.js';
import { auth } from '../middleware/auth.js';
import { admin } from '../middleware/admin.js';

/** Base Route: /api/v1/users/ */

export const userRouter = Router();

userRouter.get('/', [auth, admin], asyncWrapper(controllers.getAllUsers));

userRouter.post('/signup', asyncWrapper(controllers.createNewUser));

userRouter
  .route('/me')
  .get(auth, asyncWrapper(controllers.getUser))
  .patch(auth, asyncWrapper(controllers.patchUser))
  .put(auth, asyncWrapper(controllers.updateUser))
  .delete(auth, asyncWrapper(controllers.deleteUser));

// TODO: Testing route - Verify with front end if route is not needed it anymore and delete it, also the controller
userRouter.get('/me/newsletter', auth, asyncWrapper(controllers.getNewsletter));

userRouter.post('/login', asyncWrapper(controllers.loginUser));
