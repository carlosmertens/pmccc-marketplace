import { OrderModel } from '../models/OrderModel.js';
import { User } from '../models/UserModel.js';
import { processQuery } from '../utils/processQuery.js';

/** (GET REQUEST) */
export const getAllOrders = async (req, res) => {
  const query = processQuery(req.body);
  const data = await query;

  res.send({
    status: 'success',
    message: 'All orders has been sent',
    result: data.length,
    data,
  });
};

/** (POST REQUEST) */
export const createNewOrder = async (req, res) => {
  const order = await OrderModel.create(req.body);

  const user = await User.findById(req.user._id);

  user.orders.push(order);

  res.send({ status: 'success', message: 'Order created', order });
};

/** (GET REQUEST) */
export const getOrder = async (req, res) => {
  const data = await OrderModel.findById(req.params.id);
  if (!data) return next(new CreateAppError('Given id not found', 404));

  res.send({
    status: 'success',
    message: 'Individual request by id was provided',
    data,
  });
};

/** (DELETE REQUEST) */
export const deleteOrder = async (req, res) => {
  const data = await OrderModel.findByIdAndDelete(req.params.id);
  if (!data) return next(new CreateAppError('Given id not found', 404));

  res.send({ status: 'success', message: 'Order deleted', data });
};

export const controllers = {
  getAllOrders,
  createNewOrder,
  getOrder,
  deleteOrder,
};
