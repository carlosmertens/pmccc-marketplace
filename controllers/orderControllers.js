import Joi from 'joi';
import { OrderModel } from '../models/OrderModel.js';
import { User } from '../models/UserModel.js';
import { processQuery } from '../utils/processQuery.js';
import { CreateAppError } from '../utils/createAppError.js';

/** (GET REQUEST) */
export const getAllOrders = async (req, res) => {
  const query = processQuery(req.body, OrderModel);
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
  const body = req.body;
  body.userId = req.user._id;

  const order = await OrderModel.create(req.body);

  const user = await User.findById(req.user._id);

  user.orders.push(order);

  user.save();

  res.send({ status: 'success', message: 'Order created', data: user });
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

/** (PATCH REQUEST) */
export const orderStatus = async (req, res, next) => {
  const { error } = validateStatus(req.body);
  if (error) return next(new CreateAppError(error.message, 400));

  const data = await OrderModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!data) return next(new CreateAppError('Given id not found', 404));

  res.status(200).send({
    status: 'success',
    message: 'Order status modified',
    data,
  });
};

function validateStatus(req) {
  const schema = Joi.object({
    status: Joi.string().valid('pending', 'complete'),
  });

  return schema.validate(req);
}

export const controllers = {
  getAllOrders,
  createNewOrder,
  getOrder,
  deleteOrder,
  orderStatus,
};
