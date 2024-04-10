import {Router} from 'express';
import {ctrlrs} from '../controllers/userControllers.js';
import {asyncWrapper} from '../middleware/asyncWrapper.js';

export const userRouter = Router();

userRouter
  .route('/')
  .get(asyncWrapper(ctrlrs.getUsersCtrlr))
  .post(asyncWrapper(ctrlrs.addUsersCtrlr));

userRouter
  .route('/:id')
  .get(asyncWrapper(ctrlrs.getUserByIdCtrlr))
  .put(asyncWrapper(ctrlrs.updateUserByIdCtrlr))
  .delete(asyncWrapper(ctrlrs.deleteUserByIdCtrlr));
