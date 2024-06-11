import { OrderModel } from '../models/OrderModel.js';
import { User } from '../models/UserModel.js';
import { validate } from '../validators/index.js';
import { processQuery } from '../utils/processQuery.js';
import { CreateAppError } from '../utils/createAppError.js';

/** (GET REQUEST) */
async function getAllOrders(req, res) {
  const query = processQuery(req.body, OrderModel);
  const orders = await query;

  res.send({
    message: 'PMCCC Marketplace API',
    status: 'success',
    result: orders.length,
    orders,
  });
}

/** (POST REQUEST) */
async function createOrder(req, res, next) {
  const { error } = validate.createOrder(req.body);
  if (error) return next(new CreateAppError(error.message, 400));

  const order = await OrderModel.create(req.body);
  const user = await User.findById(req.user._id);

  user.orders.push(order);

  user.save();

  res.status(201).send({
    message: 'PMCCC Marketplace API',
    status: 'success',
    user,
  });
}

/** (GET REQUEST) */
async function getOrder(req, res, next) {
  const order = await OrderModel.findById(req.params.id);
  if (!order) return next(new CreateAppError('Given id not found', 404));

  res.send({
    message: 'PMCCC Marketplace API',
    status: 'success',
    order,
  });
}

/** (PATCH REQUEST) */
async function patchOrder(req, res, next) {
  const { error } = validate.patchOrder(req.body);
  if (error) return next(new CreateAppError(error.message, 400));

  const order = await BookModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!order) return next(new CreateAppError('Given id not found', 404));

  res.send({
    message: 'PMCCC Marketplace API',
    status: 'success',
    order,
  });
}

/** (DELETE REQUEST) */
async function deleteOrder(req, res, next) {
  const order = await OrderModel.findByIdAndDelete(req.params.id, {
    new: true,
  });
  if (!order) return next(new CreateAppError('Given id not found', 404));

  res.send({
    message: 'PMCCC Marketplace API',
    status: 'success',
    order,
  });
}

/** (PATCH REQUEST) */
async function orderStatus(req, res, next) {
  const { error } = validate.patchOrderStatus(req.body);
  if (error) return next(new CreateAppError(error.message, 400));

  const order = await OrderModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!order) return next(new CreateAppError('Given id not found', 404));

  res.send({
    status: 'success',
    message: 'PMCCC Marketplace API',
    order,
  });
}

export const controllers = {
  getAllOrders,
  createOrder,
  getOrder,
  patchOrder,
  deleteOrder,
  orderStatus,
};
