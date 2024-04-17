import {Router} from 'express';
import {ctrlrs} from '../controllers/orderControllers.js';
import {asyncWrapper} from '../middleware/asyncWrapper.js';

export const ordersRouter = Router();

ordersRouter
  .route('/')
  .get(asyncWrapper(ctrlrs.getOrdersCtrlr))
  .post(asyncWrapper(ctrlrs.addOrderCtrlr));

ordersRouter
  .route('/:id')
  .get(asyncWrapper(ctrlrs.getOrderByIdCtrlr))
  .delete(asyncWrapper(ctrlrs.deleteOrderByIdCtrlr));
