import {Router} from 'express';
import {controllers} from '../controllers/userControllers.js';
import {asyncWrapper} from '../middleware/asyncWrapper.js';
import auth from '../middleware/auth.js';

export const userRouter = Router();

userRouter.get('/', auth, asyncWrapper(controllers.getAllUsers));

userRouter
  .route('/:id')
  .get(asyncWrapper(controllers.getUser))
  .put(asyncWrapper(controllers.updateUser))
  .delete(asyncWrapper(controllers.deleteUserByIdCtrlr));

userRouter.post('/signup', asyncWrapper(controllers.signUpUser));

userRouter.post('/login', asyncWrapper(controllers.loginUser));
