import mongoose from 'mongoose';

const OrderSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
  },
  detail: [{id: {type: mongoose.Schema.Types.ObjectId}, productType: String}],
  /**
   * guest id
   * {
   * product id
   * frozen price
   * }
   */
  TotalPrice: {type: Number},
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
