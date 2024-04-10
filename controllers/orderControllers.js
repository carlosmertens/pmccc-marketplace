import Order from '../models/OrderModel.js';
import User from '../models/UserModel.js';

/** Returns a list of all orders*/
export const getOrdersCtrlr = async (req, res) => {
  const allOrders = await Order.find();
  if (allOrders.length === 0)
    return res.status(404).send({status: 'fail', message: 'No orders found'});
  res.status(200).send(allOrders);
};

/** Creates a new order linked to a user*/
export const addOrderCtrlr = async (req, res) => {
  const {email} = req.body;
  const currentUser = await User.findOne({email});
  const currentUserId = currentUser._id;
  await Order.create({user: currentUserId});
  res.status(201).send({status: 'success', message: 'Order added'});
};

/** Returns the order by id with user info*/
export const getOrderByIdCtrlr = async (req, res) => {
  const idForSearch = req.params.id;
  const order = await Order.findById(idForSearch).populate(
    'user',
    '-__v -password -email -age -date -isAdmin'
  );
  res.status(200).json(order);
};

/** Deleted the order by id providing a valid id*/
export const deleteOrderByIdCtrlr = async (req, res) => {
  const idForSearch = req.params.id;
  await Order.findByIdAndDelete(idForSearch);
  res.send({status: 'success', message: 'Order deleted'});
};

export const ctrlrs = {
  getOrdersCtrlr,
  addOrderCtrlr,
  getOrderByIdCtrlr,
  deleteOrderByIdCtrlr,
};
