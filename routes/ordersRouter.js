import { Router } from 'express';
import { controllers } from '../controllers/orderControllers.js';
import { asyncWrapper } from '../middleware/asyncWrapper.js';
import { auth } from '../middleware/auth.js';
import { admin } from '../middleware/admin.js';

/** Base Route: /api/v1/orders */

export const ordersRouter = Router();

ordersRouter.get('/', [auth, admin], asyncWrapper(controllers.getAllOrders));

ordersRouter.post('/checkout', auth, asyncWrapper(controllers.createOrder));

ordersRouter
  .route('/:id')
  .get(auth, asyncWrapper(controllers.getOrder))
  .delete([auth, admin], asyncWrapper(controllers.deleteOrder));

ordersRouter.patch(
  '/:id/status',
  [auth, admin],
  asyncWrapper(controllers.orderStatus)
);
