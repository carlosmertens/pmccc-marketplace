import mongoose from 'mongoose';

// TODO:
// We will populate ids
const OrderSchema = mongoose.Schema({
  user: {
    id: String,
    address: String,
  }, // user _id, address
  items: String, // array of id products
  status: String, // 'pending',
});

const orderModel = mongoose.model('Orders', OrderSchema);

export default orderModel;
