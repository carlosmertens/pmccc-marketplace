import {Router} from 'express';
import {controllers} from '../controllers/userControllers.js';
import {asyncWrapper} from '../middleware/asyncWrapper.js';
import {auth} from '../middleware/auth.js';

export const userRouter = Router();

userRouter.get('/', auth, asyncWrapper(controllers.getAllUsers));

userRouter
  .route('/:id')
  .get(auth, asyncWrapper(controllers.getUser))
  .patch(asyncWrapper(controllers.patchUser))
  .put(auth, asyncWrapper(controllers.updateUser))
  .delete(asyncWrapper(controllers.deleteUser));

userRouter.post('/signup', asyncWrapper(controllers.signUpUser));

userRouter.post('/login', asyncWrapper(controllers.loginUser));
