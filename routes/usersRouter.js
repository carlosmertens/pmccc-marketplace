import {Router} from 'express';
import {controllers} from '../controllers/userControllers.js';
import {asyncWrapper} from '../middleware/asyncWrapper.js';
import auth from '../middleware/auth.js';

export const userRouter = Router();

userRouter.get('/', auth, asyncWrapper(controllers.getUsersCtrlr));

userRouter
  .route('/:id')
  .get(asyncWrapper(controllers.getUserByIdCtrlr))
  .put(asyncWrapper(controllers.updateUserByIdCtrlr))
  .delete(asyncWrapper(controllers.deleteUserByIdCtrlr));

userRouter.post('/signup', asyncWrapper(controllers.createNewUser));

userRouter.post('/login', asyncWrapper(controllers.loginUser));
