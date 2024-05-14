import mongoose from 'mongoose';

const OrderSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
  },
  detail: [{id: {type: mongoose.Schema.Types.ObjectId}, productType: String}],
  TotalPrice: {type: Number}, // TODO: GETTER
  status: {
    type: String,
    enum: {
      values: ['pending', 'complete'],
      message: 'Options: pending | complete',
    },
  },
});

const orderModel = mongoose.model('Orders', OrderSchema);

export default orderModel;
