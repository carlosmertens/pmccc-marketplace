import {Router} from 'express';
import {ctrlrs} from '../controllers/userControllers.js';
import {asyncWrapper} from '../middleware/asyncWrapper.js';
import auth from '../middleware/auth.js';

export const userRouter = Router();

userRouter.route('/').get(auth, asyncWrapper(ctrlrs.getUsersCtrlr));

userRouter
  .route('/:id')
  .get(asyncWrapper(ctrlrs.getUserByIdCtrlr))
  .put(asyncWrapper(ctrlrs.updateUserByIdCtrlr))
  .delete(asyncWrapper(ctrlrs.deleteUserByIdCtrlr));

userRouter.post('/signup', asyncWrapper(ctrlrs.addUsersCtrlr));

// TODO: post request to signin
