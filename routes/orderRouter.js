import {Router} from 'express';
import {ctrlrs} from '../controllers/orderControllers.js';
import {asyncWrapper} from '../middleware/asyncWrapper.js';

export const orderRouter = Router();

orderRouter
  .route('/')
  .get(asyncWrapper(ctrlrs.getOrdersCtrlr))
  .post(asyncWrapper(ctrlrs.addOrderCtrlr));

orderRouter
  .route('/:id')
  .get(asyncWrapper(ctrlrs.getOrderByIdCtrlr))
  .delete(asyncWrapper(ctrlrs.deleteOrderByIdCtrlr));
